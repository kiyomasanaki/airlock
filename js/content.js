// Airlock extension - content script
//
// Injected statically on claude.ai, and on every other site only if the user
// opted in from the Options page (dynamic registration, see js/background.js).
// Relies on js/state.js, injected just before it.
//
// Carte flottante rappelant le focus courant :
//  - ancree en bas a droite par defaut, deplacable, position persistee
//  - une pulsation par minute, a partir de 30 s apres le chargement
//
// Le rappel doit se remarquer sans harceler : une seule pulsation, jamais
// pendant un deplacement, jamais sur un onglet en arriere-plan.

const KEY = AIRLOCK_KEY;
const UI_KEY = 'airlock_ui';        // position de la carte, hors donnees exportees

const PULSE_DELAY = 30000;          // premier rappel : 30 s apres le chargement
const PULSE_EVERY = 60000;          // puis toutes les minutes
const PULSE_MS = 1100;              // duree de l'animation, cf. content.css
const MARGIN = 12;                  // marge minimale au bord de la fenetre

const ON_CLAUDE = location.hostname === 'claude.ai';

let bannerEl = null;
let pos = null;                     // { left, top } une fois deplacee
let dragging = false;
let lastSig = null;                 // evite de reconstruire la carte pour rien
let dismissed = false;              // masquee par l'utilisateur sur cette page
let shortcut = '';                  // raccourci reellement assigne, '' si aucun

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ─── etat ───────────────────────────────────────────────────────────────

// Apres un rechargement de l'extension, le script deja injecte survit dans la
// page mais n'a plus acces a chrome.* : on se tait au lieu de lever des erreurs.
function alive() {
  try { return !!chrome.runtime && !!chrome.runtime.id; } catch (e) { return false; }
}

function getState(cb) {
  if (!alive()) return;
  chrome.storage.local.get([KEY, UI_KEY], r => {
    const ui = r[UI_KEY];
    if (ui && typeof ui.left === 'number' && typeof ui.top === 'number') pos = ui;
    cb(airlockNormalize(r[KEY]));
  });
}

function savePos() {
  if (pos && alive()) chrome.storage.local.set({ [UI_KEY]: pos });
}

// ─── position ───────────────────────────────────────────────────────────

// Garde la carte entierement visible : une position enregistree sur un grand
// ecran ne doit pas la rejeter hors cadre sur un petit.
function clamp(left, top, el) {
  const w = el.offsetWidth || 310;
  const h = el.offsetHeight || 120;
  return {
    left: Math.min(Math.max(left, MARGIN), Math.max(MARGIN, window.innerWidth - w - MARGIN)),
    top: Math.min(Math.max(top, MARGIN), Math.max(MARGIN, window.innerHeight - h - MARGIN)),
  };
}

function applyPos(el) {
  if (!pos) return;                 // jamais deplacee : le CSS ancre en bas a droite
  const p = clamp(pos.left, pos.top, el);
  el.style.left = p.left + 'px';
  el.style.top = p.top + 'px';
  el.style.right = 'auto';
  el.style.bottom = 'auto';
}

function enableDrag(el, handle) {
  let dx = 0, dy = 0, id = null;

  handle.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    if (e.target.closest('.airlock-close')) return;   // le bouton reste cliquable

    const r = el.getBoundingClientRect();
    dx = e.clientX - r.left;
    dy = e.clientY - r.top;
    id = e.pointerId;
    dragging = true;

    // fige la carte en coordonnees left/top avant de la suivre
    el.style.left = r.left + 'px';
    el.style.top = r.top + 'px';
    el.style.right = 'auto';
    el.style.bottom = 'auto';
    el.classList.add('airlock-dragging');
    el.classList.remove('airlock-pulse');

    handle.setPointerCapture(id);
    e.preventDefault();
  });

  handle.addEventListener('pointermove', e => {
    if (!dragging || e.pointerId !== id) return;
    const p = clamp(e.clientX - dx, e.clientY - dy, el);
    el.style.left = p.left + 'px';
    el.style.top = p.top + 'px';
  });

  const end = e => {
    if (!dragging || (id !== null && e.pointerId !== id)) return;
    dragging = false;
    el.classList.remove('airlock-dragging');
    if (id !== null && handle.hasPointerCapture(id)) handle.releasePointerCapture(id);
    id = null;

    const r = el.getBoundingClientRect();
    pos = { left: r.left, top: r.top };
    savePos();
  };
  handle.addEventListener('pointerup', end);
  handle.addEventListener('pointercancel', end);
}

// ─── rendu ──────────────────────────────────────────────────────────────

const GRIP = '<svg class="airlock-grip" viewBox="0 0 16 16" aria-hidden="true">'
  + '<g fill="currentColor">'
  + '<circle cx="6" cy="4" r="1.4"/><circle cx="10" cy="4" r="1.4"/>'
  + '<circle cx="6" cy="8" r="1.4"/><circle cx="10" cy="8" r="1.4"/>'
  + '<circle cx="6" cy="12" r="1.4"/><circle cx="10" cy="12" r="1.4"/>'
  + '</g></svg>';

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

function createBanner(state) {
  if (dismissed) {                          // ferme par l'utilisateur : on n'insiste pas
    if (bannerEl) bannerEl.remove();
    bannerEl = null;
    return;
  }
  // document XML ou SVG ouvert directement : pas de <body> ou accrocher la carte
  if (!document.body) return;

  const isNewChat = ON_CLAUDE && (location.pathname === '/new' || location.pathname === '/');
  const hasFocus = !!state.focus;
  const next = hasFocus ? airlockNextStep(state, state.focus) : null;

  // Une ecriture sans effet visible (position, historique...) ne doit pas
  // rejouer l'animation d'entree.
  const sig = JSON.stringify([hasFocus && state.focus, next, state.queue.length, isNewChat, shortcut, airlockLang]);
  if (sig === lastSig && bannerEl && bannerEl.isConnected) return;
  lastSig = sig;

  if (bannerEl) bannerEl.remove();
  bannerEl = null;
  if (!hasFocus && !isNewChat) return;      // ni focus ni page d'accueil : silence

  const card = el('div', 'airlock-banner');
  card.id = 'airlock-banner';
  card.setAttribute('role', 'complementary');
  card.setAttribute('aria-label', airlockT('cardAria'));

  // entete
  const head = el('div', 'airlock-head');
  head.innerHTML = GRIP;
  head.appendChild(el('p', 'airlock-label', airlockT(hasFocus ? 'currentFocus' : 'cardNoFocus')));

  const close = el('button', 'airlock-close', '×');
  close.type = 'button';
  close.title = shortcut ? airlockT('cardHideShortcut', { shortcut }) : airlockT('cardHide');
  close.setAttribute('aria-label', airlockT('cardHideAria'));
  close.addEventListener('click', () => {
    dismissed = true;
    card.remove();
    bannerEl = null;
  });
  head.appendChild(close);
  card.appendChild(head);

  // corps
  const body = el('div', 'airlock-body');

  if (hasFocus) {
    const f = el('p', 'airlock-focus');
    f.appendChild(el('span', 'airlock-dot'));
    f.appendChild(el('span', 'airlock-focus-text', state.focus));
    body.appendChild(f);

    if (next) {
      const ns = el('p', 'airlock-next');
      ns.appendChild(el('span', 'airlock-next-label', airlockT('nextStep')));
      ns.appendChild(el('span', 'airlock-next-text', next));
      body.appendChild(ns);
    }

    const meta = el('div', 'airlock-meta');
    const n = (state.queue || []).length;
    const chip = el('span', 'airlock-chip');
    chip.appendChild(el('span', null, n > 0 ? airlockT('queueCount', n) : airlockT('queueEmpty')));
    meta.appendChild(chip);
    body.appendChild(meta);
  } else {
    const f = el('p', 'airlock-focus');
    f.appendChild(el('span', 'airlock-dot idle'));
    f.appendChild(el('span', 'airlock-focus-text', airlockT('cardNothing')));
    body.appendChild(f);

    body.appendChild(el('p', 'airlock-nudge', airlockT('cardNudge')));

    const meta = el('div', 'airlock-meta');
    meta.appendChild(shortcut
      ? el('kbd', null, shortcut)
      : el('span', null, airlockT('cardClickIcon')));
    body.appendChild(meta);
  }

  card.appendChild(body);
  document.body.appendChild(card);

  applyPos(card);
  enableDrag(card, head);
  bannerEl = card;
}

function refresh() {
  getState(state => createBanner(state));
}

// ─── pulsation ──────────────────────────────────────────────────────────

function pulse() {
  if (!bannerEl || dragging) return;
  if (document.hidden) return;              // inutile sur un onglet en arriere-plan
  if (reducedMotion.matches) return;

  bannerEl.classList.remove('airlock-pulse');
  void bannerEl.offsetWidth;                // force le redemarrage de l'animation
  bannerEl.classList.add('airlock-pulse');
  setTimeout(() => bannerEl && bannerEl.classList.remove('airlock-pulse'), PULSE_MS);
}

// Le calendrier part du chargement de la page, pas de chaque rendu de la carte.
setTimeout(() => {
  pulse();
  setInterval(pulse, PULSE_EVERY);
}, PULSE_DELAY);

// ─── raccourci inactif ──────────────────────────────────────────────────

// Quand le raccourci est assigne, Chrome le consomme et la page ne recoit
// jamais la touche. Si elle arrive jusqu'ici, c'est qu'il n'est relie a rien
// (pris par une autre extension ou application, ou change par l'utilisateur) :
// on le dit au lieu de laisser croire que l'extension est en panne.
const SUGGESTED = airlockSuggestedShortcut();

function comboMatches(e, combo) {
  const parts = combo.split('+');
  const key = parts.pop();
  const ctrl = parts.some(p => p === 'Ctrl' || p === 'Command' || p === 'MacCtrl');
  const pressed = e.key === ' ' ? 'Space' : e.key;
  return (e.ctrlKey || e.metaKey) === ctrl
    && e.altKey === parts.includes('Alt')
    && e.shiftKey === parts.includes('Shift')
    && pressed.toUpperCase() === key.toUpperCase();
}

let warningEl = null;
let warningTimer = null;

function showShortcutWarning(bound) {
  if (!document.body) return;               // cf. createBanner
  if (warningEl) warningEl.remove();
  clearTimeout(warningTimer);

  const box = el('div', 'airlock-warning');
  box.id = 'airlock-shortcut-warning';
  box.setAttribute('role', 'alert');

  const head = el('div', 'airlock-warning-head');
  head.appendChild(el('p', 'airlock-warning-title', airlockT(bound ? 'warnRebound' : 'warnUnbound')));
  const close = el('button', 'airlock-warning-close', '×');
  close.type = 'button';
  close.setAttribute('aria-label', airlockT('close'));
  close.addEventListener('click', () => { box.remove(); warningEl = null; });
  head.appendChild(close);
  box.appendChild(head);

  box.appendChild(el('p', 'airlock-warning-text',
    airlockT(bound ? 'warnReboundText' : 'warnUnboundText', { suggested: SUGGESTED, bound })));
  box.appendChild(el('p', 'airlock-warning-ok', airlockT('warnOk')));

  const open = el('button', 'airlock-warning-btn', airlockT('warnBtn'));
  open.type = 'button';
  open.addEventListener('click', () => {
    if (alive()) chrome.runtime.sendMessage({ type: 'airlock_open_shortcuts' }, () => void chrome.runtime.lastError);
  });
  box.appendChild(open);

  document.body.appendChild(box);
  warningEl = box;
  warningTimer = setTimeout(() => { box.remove(); if (warningEl === box) warningEl = null; }, 15000);
}

window.addEventListener('keydown', e => {
  if (e.repeat || !SUGGESTED || !comboMatches(e, SUGGESTED) || !alive()) return;
  airlockShortcut(bound => {
    if (bound === SUGGESTED) return;          // assigne : la touche ne serait pas arrivee ici
    shortcut = bound;
    showShortcutWarning(bound);
    refresh();
  });
}, true);

// ─── synchronisation ────────────────────────────────────────────────────

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  if (changes[UI_KEY] && changes[UI_KEY].newValue) {
    pos = changes[UI_KEY].newValue;
    if (bannerEl) applyPos(bannerEl);
  }
  if (changes[KEY]) createBanner(airlockNormalize(changes[KEY].newValue));
});

// Navigation interne des applications monopage, sans rechargement. Un simple
// releve d'URL par seconde : un MutationObserver sur tout le document se
// declencherait a chaque token d'une reponse en streaming, ou a chaque
// rafraichissement d'une page lourde.
let lastUrl = location.href;
setInterval(() => {
  if (location.href === lastUrl) return;
  lastUrl = location.href;
  dismissed = false;                        // nouvelle page, nouveau rappel
  lastSig = null;
  refresh();
}, 1000);

// la fenetre retrecit : la carte doit rester visible
window.addEventListener('resize', () => { if (bannerEl) applyPos(bannerEl); });

// premier rendu une fois la langue connue (evite une carte refaite aussitot),
// puis a chaque changement de langue : airlockLang fait partie de lastSig
let i18nReady = false;
if (alive()) {
  airlockI18nInit(() => {
    if (i18nReady) { refresh(); return; }
    i18nReady = true;
    airlockShortcut(s => { shortcut = s; refresh(); });
  });
}

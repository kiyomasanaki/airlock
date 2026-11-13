// Airlock extension - content script
//
// Injected statically on claude.ai, and on every other site only if the user
// opted in from the Options page (dynamic registration, see js/background.js).
// Relies on js/state.js, injected just before it.
//
// Carte flottante rappelant le focus courant :
//  - ancree en bas a droite par defaut, deplacable, position persistee
//  - visible 30 s, puis masquee 2 min, et ainsi de suite
//  - la croix la masque sur tous les onglets jusqu'au prochain focus
//
// Le rappel doit se remarquer sans harceler : il revient de lui-meme, mais ne
// disparait jamais sous la souris ni pendant un deplacement.

const KEY = AIRLOCK_KEY;
const UI_KEY = 'airlock_ui';        // position de la carte, hors donnees exportees

const SHOW_MS = 30000;              // duree d'affichage de la carte
const REST_MS = 120000;             // puis pause avant de la remontrer
const MARGIN = 12;                  // marge minimale au bord de la fenetre

const ON_CLAUDE = location.hostname === 'claude.ai';

let bannerEl = null;
let pos = null;                     // { left, top } une fois deplacee
let dragging = false;
let lastSig = null;                 // evite de reconstruire la carte pour rien
let closed = null;                  // { focus } pour lequel la croix a ete cliquee
let resting = false;                // en pause entre deux affichages
let cycleTimer = null;              // prochaine bascule affichage / pause
let hovered = false;                // pointeur sur la carte
let shortcut = '';                  // raccourci reellement assigne, '' si aucun
let dodgeField = null;              // champ de saisie que la carte doit laisser libre
let dodged = false;                 // carte ecartee de ce champ, hors de sa place

// ─── etat ───────────────────────────────────────────────────────────────

// Apres un rechargement de l'extension, le script deja injecte survit dans la
// page mais n'a plus acces a chrome.* : on se tait au lieu de lever des erreurs.
function alive() {
  try { return !!chrome.runtime && !!chrome.runtime.id; } catch (e) { return false; }
}

function getState(cb) {
  if (!alive()) return;
  chrome.storage.local.get([KEY, UI_KEY, AIRLOCK_CARD_CLOSED_KEY], r => {
    const ui = r[UI_KEY];
    if (ui && typeof ui.left === 'number' && typeof ui.top === 'number') pos = ui;
    closed = r[AIRLOCK_CARD_CLOSED_KEY] || null;
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

function setPos(el, p) {
  el.style.left = p.left + 'px';
  el.style.top = p.top + 'px';
  el.style.right = 'auto';
  el.style.bottom = 'auto';
}

function applyPos(el) {
  dodged = false;
  if (!pos) {                       // jamais deplacee : le CSS ancre en bas a droite
    el.style.left = el.style.top = el.style.right = el.style.bottom = '';
    return;
  }
  setPos(el, clamp(pos.left, pos.top, el));
}

// ─── evitement du champ de saisie ───────────────────────────────────────

// Quand on ecrit dans un champ que la carte recouvre, elle s'ecarte le temps
// de la saisie : au-dessus du champ, sinon dans un coin libre. Deplacement
// temporaire, jamais enregistre : elle revient a sa place quand le champ perd
// le focus.
const TEXT_TYPES = ['', 'text', 'search', 'email', 'url', 'tel', 'password', 'number'];

function isTextField(t) {
  if (!t || t.nodeType !== 1) return false;
  if (t.isContentEditable || t.tagName === 'TEXTAREA') return true;
  return t.tagName === 'INPUT' && TEXT_TYPES.includes((t.getAttribute('type') || '').toLowerCase());
}

function overlaps(a, b) {
  return a.left < b.right + MARGIN && a.right > b.left - MARGIN
    && a.top < b.bottom + MARGIN && a.bottom > b.top - MARGIN;
}

function dodge(el) {
  if (!dodgeField || dragging) return;
  const f = dodgeField.getBoundingClientRect();
  const c = el.getBoundingClientRect();
  if (!overlaps(c, f)) return;

  const w = el.offsetWidth, h = el.offsetHeight;   // insensibles a l'animation d'entree
  const spots = [
    { left: c.left, top: f.top - h - MARGIN },                // au-dessus du champ
    { left: MARGIN, top: window.innerHeight - h - MARGIN },   // bas gauche
    { left: MARGIN, top: MARGIN },                            // haut gauche
    { left: window.innerWidth - w - MARGIN, top: MARGIN },    // haut droite
  ];
  for (const s of spots) {
    const p = clamp(s.left, s.top, el);
    if (!overlaps({ left: p.left, top: p.top, right: p.left + w, bottom: p.top + h }, f)) {
      setPos(el, p);
      dodged = true;
      return;
    }
  }
}

document.addEventListener('input', e => {
  const t = e.target;
  if (!isTextField(t) || (bannerEl && bannerEl.contains(t))) return;
  dodgeField = t;
  if (bannerEl) dodge(bannerEl);
}, true);

document.addEventListener('focusout', e => {
  if (e.target !== dodgeField) return;
  dodgeField = null;
  if (bannerEl && dodged) applyPos(bannerEl);
}, true);

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
    dodged = false;
    dodgeField = null;                      // place choisie a la main : on ne la conteste pas
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
  // Fermee pour ce focus (sur n'importe quel onglet), ou en pause. La
  // comparaison couvre l'instant ou le focus a change mais ou le service
  // worker n'a pas encore efface la cle.
  const isClosed = closed && closed.focus === (state.focus || null);
  if (isClosed || resting) {
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
  // langue et sens d'ecriture sur la carte seulement, jamais sur la page hote
  card.lang = airlockLang;
  card.dir = airlockIsRtl() ? 'rtl' : 'ltr';
  card.setAttribute('role', 'complementary');
  card.setAttribute('aria-label', airlockT('cardAria'));

  // entete
  const head = el('div', 'airlock-head');
  head.innerHTML = GRIP;
  head.appendChild(el('p', 'airlock-label', hasFocus ? airlockT('currentFocus') : airlockT('cardNoFocus')));

  const close = el('button', 'airlock-close', '×');
  close.type = 'button';
  close.title = shortcut ? airlockT('cardHideShortcut', { shortcut }) : airlockT('cardHide');
  close.setAttribute('aria-label', airlockT('cardHideAria'));
  close.addEventListener('click', () => {
    closed = { focus: state.focus || null };
    clearTimeout(cycleTimer);
    cycleTimer = null;
    card.remove();
    bannerEl = null;
    // les autres onglets la retirent via chrome.storage.onChanged
    if (alive()) chrome.storage.local.set({ [AIRLOCK_CARD_CLOSED_KEY]: closed });
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

  hovered = false;
  card.addEventListener('pointerenter', () => { hovered = true; });
  card.addEventListener('pointerleave', () => { hovered = false; });

  applyPos(card);
  dodge(card);
  enableDrag(card, head);
  bannerEl = card;

  // Les 30 s partent de l'apparition de la carte, pas de ses reconstructions
  // (changement de focus, d'etape, de langue...).
  if (!cycleTimer) cycleTimer = setTimeout(rest, SHOW_MS);
}

function refresh() {
  getState(state => createBanner(state));
}

// ─── cycle affichage / pause ────────────────────────────────────────────

function rest() {
  // jamais retiree pendant qu'on la lit ou qu'on la deplace : on reessaie
  if (bannerEl && (dragging || hovered)) {
    cycleTimer = setTimeout(rest, 2000);
    return;
  }
  resting = true;
  if (bannerEl) bannerEl.remove();
  bannerEl = null;
  cycleTimer = setTimeout(show, REST_MS);
}

function show() {
  cycleTimer = null;
  resting = false;
  lastSig = null;                           // force le rendu : la carte a ete retiree
  refresh();
}

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
  box.lang = airlockLang;
  box.dir = airlockIsRtl() ? 'rtl' : 'ltr';
  box.setAttribute('role', 'alert');

  const head = el('div', 'airlock-warning-head');
  head.appendChild(el('p', 'airlock-warning-title', bound ? airlockT('warnRebound') : airlockT('warnUnbound')));
  const close = el('button', 'airlock-warning-close', '×');
  close.type = 'button';
  close.setAttribute('aria-label', airlockT('close'));
  close.addEventListener('click', () => { box.remove(); warningEl = null; });
  head.appendChild(close);
  box.appendChild(head);

  box.appendChild(el('p', 'airlock-warning-text',
    bound
      ? airlockT('warnReboundText', { suggested: SUGGESTED, bound })
      : airlockT('warnUnboundText', { suggested: SUGGESTED })));
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
    if (bannerEl) { applyPos(bannerEl); dodge(bannerEl); }
  }
  if (changes[AIRLOCK_CARD_CLOSED_KEY]) {
    closed = changes[AIRLOCK_CARD_CLOSED_KEY].newValue || null;
    clearTimeout(cycleTimer);               // fermee : plus de cycle ; rouverte : nouveau cycle
    cycleTimer = null;
    resting = false;
    lastSig = null;
    if (!changes[KEY]) refresh();
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
  clearTimeout(cycleTimer);                 // nouvelle page, nouveau cycle (sauf si fermee)
  show();
}, 1000);

// la fenetre retrecit : la carte doit rester visible
window.addEventListener('resize', () => { if (bannerEl) { applyPos(bannerEl); dodge(bannerEl); } });

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

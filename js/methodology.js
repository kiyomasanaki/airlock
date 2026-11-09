// Airlock extension - step breakdown ("methodology") view
//
// Volet gauche : les impulsions (focus, file, faites).
// Volet droit  : une suite d'etapes numerotees pour l'impulsion selectionnee.
//
// Les etapes s'ecrivent a la main : decouper une tache en petites actions
// concretes est ce qui debloque le demarrage, et ca ne demande aucune IA.
// En option, la generation passe par un hote natif (Native Messaging) qui
// execute `claude -p` sur la machine de l'utilisateur. Une extension Chrome ne
// peut pas lancer de processus : c'est le seul pont supporte par le navigateur.
// La permission `nativeMessaging` est optionnelle et n'est demandee qu'au
// premier clic sur "Générer avec Claude".
//
// Toutes les ecritures passent par airlockMutate (js/state.js) : relecture du
// stockage juste avant d'ecrire, pour ne jamais ecraser une capture faite dans
// le popup pendant que cette page etait ouverte.

const HOST = 'com.airlock.methodology';

let state = airlockBlank();
let selected = null;   // texte de l'impulsion selectionnee
let busy = false;
let lastError = null;  // { title, body, detail } affiche sous la barre d'action
let shortcut = '';     // raccourci reellement assigne, '' si aucun
let ready = false;     // premier rendu fait (etat et selection connus)

const $ = id => document.getElementById(id);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

// ─── etat ──────────────────────────────────────────────────────────────

function load(cb) {
  chrome.storage.local.get([AIRLOCK_KEY], r => {
    state = airlockNormalize(r[AIRLOCK_KEY]);
    cb();
  });
}

function mutate(fn) {
  airlockMutate(fn, fresh => { state = fresh; render(); });
}

function methodologyOf(s, text) {
  if (!s.methodologies[text]) s.methodologies[text] = { steps: [] };
  return s.methodologies[text];
}

// L'index affiche peut etre perime (deux clics avant le rendu, autre onglet) :
// l'etape est retrouvee par son texte, l'index ne departage que des doublons.
function stepIndex(steps, i, text) {
  if (steps[i] && steps[i].text === text) return i;
  return steps.findIndex(st => st.text === text);
}

function allImpulses() {
  return [state.focus, ...state.queue, ...state.done.map(d => d.text)].filter(Boolean);
}

// ─── volet gauche ──────────────────────────────────────────────────────

function impulseButton(text, kind) {
  const b = el('button', 'impulse');
  b.type = 'button';
  b.setAttribute('aria-current', String(text === selected));

  const dot = el('span', 'pill' + (kind === 'focus' ? ' is-focus' : kind === 'queue' ? ' is-queue' : ''));
  const txt = el('span', 'txt', text);
  b.append(dot, txt);

  const m = state.methodologies[text];
  if (m && m.steps.length) {
    const done = m.steps.filter(s => s.done).length;
    b.appendChild(el('span', 'badge-count', `${done}/${m.steps.length}`));
  }

  b.addEventListener('click', () => { selected = text; lastError = null; render(); });
  return b;
}

function renderList() {
  const host = $('impulseList');
  host.innerHTML = '';

  // un meme texte peut apparaitre plusieurs fois dans l'historique
  const doneTexts = [...new Set(state.done.map(d => d.text).reverse())];
  const groups = [
    [airlockT('mGroupFocus'), state.focus ? [state.focus] : [], 'focus'],
    [airlockT('mGroupQueue'), state.queue, 'queue'],
    [airlockT('mGroupDone'), doneTexts, 'done'],
  ];

  let any = false;
  groups.forEach(([label, items, kind]) => {
    if (!items.length) return;
    any = true;
    const g = el('section', 'impulse-group');
    g.appendChild(el('div', 'eyebrow', label));
    items.forEach(t => g.appendChild(impulseButton(t, kind)));
    host.appendChild(g);
  });

  if (!any) {
    host.appendChild(el('div', 'empty sunken', shortcut
      ? airlockT('mEmptyShortcut', { shortcut })
      : airlockT('mEmpty')));
  }
}

// ─── volet droit ───────────────────────────────────────────────────────

function stateBlock(title, body, cls) {
  const d = el('div', 'state' + (cls ? ' ' + cls : ''));
  d.appendChild(el('h2', null, title));
  if (body) d.appendChild(el('p', null, body));
  return d;
}

function addStepForm(isFirst) {
  const form = el('form', 'add-step');
  const input = el('input');
  input.type = 'text';
  input.maxLength = 300;
  input.placeholder = isFirst
    ? airlockT('mFirstPlaceholder')
    : airlockT('mNextPlaceholder');
  input.setAttribute('aria-label', airlockT('mAddAria'));
  const btn = el('button', 'btn', airlockT('mAdd'));
  btn.type = 'submit';
  form.append(input, btn);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || !selected) return;
    const target = selected;
    mutate(s => {
      const m = methodologyOf(s, target);
      m.steps.push({ text, done: false });
      m.updatedAt = Date.now();
    });
    // le rendu remplace le formulaire : on redonne le focus au nouveau champ
    setTimeout(() => { const i = document.querySelector('.add-step input'); if (i) i.focus(); }, 60);
  });
  return form;
}

function renderDetail() {
  const host = $('detail');
  host.innerHTML = '';

  if (!selected) {
    host.appendChild(stateBlock(airlockT('mPickTitle'), airlockT('mPickBody')));
    return;
  }

  // entete
  const head = el('div', 'head');
  head.appendChild(el('h1', null, selected));
  const m = state.methodologies[selected];
  if (m && m.generatedAt) {
    head.appendChild(el('div', 'meta',
      airlockT('mGeneratedAt', { date: new Date(m.generatedAt).toLocaleString(airlockLocale()) })));
  }
  host.appendChild(head);

  // barre d'action
  const bar = el('div', 'toolbar');
  const gen = el('button', 'btn', airlockT(busy ? 'mGenerating' : m ? 'mRegenerate' : 'mGenerate'));
  gen.type = 'button';
  gen.disabled = busy;
  gen.title = airlockT('mGenerateTitle');
  gen.addEventListener('click', generate);
  bar.appendChild(gen);

  if (m) {
    const clear = el('button', 'btn', airlockT('mClear'));
    clear.type = 'button';
    clear.disabled = busy;
    clear.addEventListener('click', () => {
      if (!confirm(airlockT('mClearConfirm'))) return;
      const target = selected;
      mutate(s => { delete s.methodologies[target]; });
    });
    bar.appendChild(clear);
  }
  host.appendChild(bar);

  if (lastError) {
    const s = stateBlock(lastError.title, lastError.body, 'error');
    if (lastError.detail) s.appendChild(el('code', null, lastError.detail));
    host.appendChild(s);
  }

  if (busy) {
    const s = stateBlock(airlockT('mBusyTitle'), airlockT('mBusyBody'));
    s.prepend(el('div', 'spinner'));
    host.appendChild(s);
    return;
  }

  if (!m) {
    if (!lastError) {
      host.appendChild(stateBlock(airlockT('mStartTitle'), airlockT('mStartBody')));
    }
    host.appendChild(addStepForm(true));
    return;
  }

  // progression
  const total = m.steps.length;
  const done = m.steps.filter(s => s.done).length;
  const pw = el('div', 'progress-wrap');
  const bar2 = el('div', 'progress');
  const fill = el('i');
  fill.style.width = total ? `${Math.round((done / total) * 100)}%` : '0';
  bar2.appendChild(fill);
  pw.append(bar2, el('div', 'progress-label', airlockT('mProgress', done, total)));
  host.appendChild(pw);

  // etapes
  const ol = el('ol', 'steps');
  // the first step not done is the one to do now
  const current = m.steps.findIndex(s => !s.done);
  m.steps.forEach((step, i) => {
    const li = el('li', 'step' + (step.done ? ' done' : i === current ? ' current' : ''));
    const n = el('div', 'step-n', String(i + 1));
    const t = el('div', 'step-text', step.text);

    const actions = el('div', 'step-actions');
    const c = el('button', 'step-check', step.done ? '✓' : '○');
    c.type = 'button';
    c.setAttribute('aria-pressed', String(step.done));
    c.setAttribute('aria-label', airlockT(step.done ? 'mUntick' : 'mTick', { n: i + 1 }));
    const target = selected;
    c.addEventListener('click', () => mutate(s => {
      const mm = s.methodologies[target];
      const k = mm ? stepIndex(mm.steps, i, step.text) : -1;
      if (k !== -1) mm.steps[k].done = !mm.steps[k].done;
    }));

    const del = el('button', 'step-del', '×');
    del.type = 'button';
    del.title = airlockT('mDelTitle');
    del.setAttribute('aria-label', airlockT('mDelAria', { n: i + 1 }));
    del.addEventListener('click', () => mutate(s => {
      const mm = s.methodologies[target];
      const k = mm ? stepIndex(mm.steps, i, step.text) : -1;
      if (k === -1) return;
      mm.steps.splice(k, 1);
      if (!mm.steps.length) delete s.methodologies[target];
    }));

    actions.append(c, del);
    li.append(n, t, actions);
    ol.appendChild(li);
  });
  host.appendChild(ol);
  host.appendChild(addStepForm(false));
}

function render() {
  renderList();
  renderDetail();
}

// ─── generation optionnelle via l'hote natif ───────────────────────────

// in the interface language, so the steps come back in it too
function buildPrompt(impulse) {
  return airlockT('mPrompt', impulse);
}

function parseSteps(raw) {
  if (typeof raw !== 'string') return null;
  let t = raw.trim();

  // le modele encadre parfois sa reponse d'un bloc de code
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) t = fence[1].trim();

  // sinon on isole le premier objet JSON rencontre
  if (!t.startsWith('{')) {
    const i = t.indexOf('{'), j = t.lastIndexOf('}');
    if (i === -1 || j === -1 || j <= i) return null;
    t = t.slice(i, j + 1);
  }

  let data;
  try { data = JSON.parse(t); } catch { return null; }
  if (!data || !Array.isArray(data.steps)) return null;

  const steps = data.steps
    .filter(s => typeof s === 'string' && s.trim())
    .map(s => ({ text: s.trim(), done: false }));

  return steps.length ? steps : null;
}

function fail(title, body, detail) {
  busy = false;
  lastError = { title, body, detail };
  render();
}

function generate() {
  if (busy || !selected) return;
  const impulse = selected;
  const existing = state.methodologies[impulse];
  if (existing && existing.steps.length &&
      !confirm(airlockT('mRegenConfirm'))) return;

  // Doit partir directement du clic : Chrome n'affiche la demande de
  // permission que pendant un geste utilisateur.
  chrome.permissions.request({ permissions: ['nativeMessaging'] }, granted => {
    if (chrome.runtime.lastError || !granted) {
      fail(airlockT('mErrPermTitle'), airlockT('mErrPermBody'));
      return;
    }
    busy = true;
    lastError = null;
    render();

    chrome.runtime.sendNativeMessage(HOST, { prompt: buildPrompt(impulse) }, response => {
      if (chrome.runtime.lastError) {
        fail(airlockT('mErrHostTitle'), airlockT('mErrHostBody'), chrome.runtime.lastError.message);
        return;
      }
      if (!response || response.ok === false) {
        fail(airlockT('mErrFailTitle'), airlockT('mErrFailBody'),
          (response && response.error) || airlockT('mErrEmpty'));
        return;
      }

      const steps = parseSteps(response.output);
      if (!steps) {
        fail(airlockT('mErrParseTitle'), airlockT('mErrParseBody'),
          String(response.output || '').slice(0, 200));
        return;
      }

      busy = false;
      selected = impulse;
      mutate(s => { s.methodologies[impulse] = { steps, generatedAt: Date.now() }; });
    });
  });
}

// ─── demarrage ─────────────────────────────────────────────────────────

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local' || !changes[AIRLOCK_KEY]) return;
  state = airlockNormalize(changes[AIRLOCK_KEY].newValue);
  // l'impulsion affichee a disparu (supprimee, laissee tomber, tout vide) :
  // des etapes ajoutees ici n'auraient plus de proprietaire
  const all = allImpulses();
  if (selected && !all.includes(selected)) {
    selected = state.focus || all[0] || null;
    lastError = null;
    render();
    return;
  }
  // ne pas reconstruire sous les doigts de quelqu'un qui tape une etape
  const typing = document.activeElement && document.activeElement.matches('.add-step input')
    && document.activeElement.value !== '';
  if (typing) renderList(); else render();
});

// le raccourci d'abord : la liste vide le cite des le premier rendu
airlockShortcut(s => { shortcut = s; load(() => {
  const params = new URLSearchParams(location.search);
  const wanted = params.get('impulse');
  const all = allImpulses();
  selected = (wanted && all.includes(wanted)) ? wanted : (state.focus || all[0] || null);
  render();
  ready = true;
  const first = document.querySelector('.add-step input');
  if (first && !(state.methodologies[selected] || {}).steps) first.focus();
}); });

// changement de langue : tout le texte du volet droit est construit en JS
airlockI18nInit(() => { if (ready) render(); });

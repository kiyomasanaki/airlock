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
    ['Focus actuel', state.focus ? [state.focus] : [], 'focus'],
    ['File de priorités', state.queue, 'queue'],
    ['Fait', doneTexts, 'done'],
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
    host.appendChild(el('div', 'empty sunken', 'aucune impulsion — capture-en une avec Ctrl+Shift+Q'));
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
    ? 'la toute première action, faisable en moins de 10 minutes…'
    : 'étape suivante…';
  input.setAttribute('aria-label', 'ajouter une étape');
  const btn = el('button', 'btn', 'Ajouter');
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
    host.appendChild(stateBlock(
      'Choisis une impulsion',
      'Sélectionne une impulsion à gauche pour la découper en petites étapes concrètes.'
    ));
    return;
  }

  // entete
  const head = el('div', 'head');
  head.appendChild(el('h1', null, selected));
  const m = state.methodologies[selected];
  if (m && m.generatedAt) {
    head.appendChild(el('div', 'meta',
      `Étapes générées le ${new Date(m.generatedAt).toLocaleString('fr-FR')}`));
  }
  host.appendChild(head);

  // barre d'action
  const bar = el('div', 'toolbar');
  const gen = el('button', 'btn', busy ? 'Génération…' : (m ? 'Regénérer avec Claude' : 'Générer avec Claude'));
  gen.type = 'button';
  gen.disabled = busy;
  gen.title = 'Optionnel : nécessite Claude Code et l’hôte natif Airlock installés sur cette machine';
  gen.addEventListener('click', generate);
  bar.appendChild(gen);

  if (m) {
    const clear = el('button', 'btn', 'Tout effacer');
    clear.type = 'button';
    clear.disabled = busy;
    clear.addEventListener('click', () => {
      if (!confirm('Effacer toutes les étapes de cette impulsion ?')) return;
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
    const s = stateBlock('Génération en cours…', 'Claude construit la marche à suivre. Ça prend quelques secondes.');
    s.prepend(el('div', 'spinner'));
    host.appendChild(s);
    return;
  }

  if (!m) {
    if (!lastError) {
      host.appendChild(stateBlock(
        'Par quoi commencer ?',
        'Écris la toute première action concrète, si petite qu’elle paraît ridicule. Démarrer est le plus dur — le reste suit.'
      ));
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
  pw.append(bar2, el('div', 'progress-label', `${done} étape${done > 1 ? 's' : ''} sur ${total}`));
  host.appendChild(pw);

  // etapes
  const ol = el('ol', 'steps');
  m.steps.forEach((step, i) => {
    const li = el('li', 'step' + (step.done ? ' done' : ''));
    const n = el('div', 'step-n', String(i + 1));
    const t = el('div', 'step-text', step.text);

    const actions = el('div', 'step-actions');
    const c = el('button', 'step-check', step.done ? '✓' : '○');
    c.type = 'button';
    c.setAttribute('aria-pressed', String(step.done));
    c.setAttribute('aria-label', step.done
      ? `Marquer l’étape ${i + 1} comme non faite`
      : `Marquer l’étape ${i + 1} comme faite`);
    const target = selected;
    c.addEventListener('click', () => mutate(s => {
      const mm = s.methodologies[target];
      if (mm && mm.steps[i]) mm.steps[i].done = !mm.steps[i].done;
    }));

    const del = el('button', 'step-del', '×');
    del.type = 'button';
    del.title = 'Supprimer cette étape';
    del.setAttribute('aria-label', `Supprimer l’étape ${i + 1}`);
    del.addEventListener('click', () => mutate(s => {
      const mm = s.methodologies[target];
      if (!mm) return;
      mm.steps.splice(i, 1);
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

function buildPrompt(impulse) {
  return [
    'Tu aides quelqu\'un qui a un TDAH ou un fort pattern de context-switching : il capture une intention de travail et a besoin de savoir par où commencer, tout de suite.',
    '',
    `Intention : « ${impulse} »`,
    '',
    'Produis une méthodologie de 4 à 8 étapes numérotées pour la mener à terme.',
    'Contraintes :',
    '- chaque étape est une action concrète, commençable immédiatement, pas un conseil vague',
    '- la première étape doit pouvoir être faite en moins de 10 minutes',
    '- une phrase par étape, pas de sous-listes',
    '- réponds en français',
    '',
    'Réponds UNIQUEMENT par du JSON valide, sans texte autour, sans bloc de code, à ce format exact :',
    '{"steps":["première étape","deuxième étape"]}',
  ].join('\n');
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
      !confirm('Remplacer les étapes actuelles par une nouvelle génération ?')) return;

  // Doit partir directement du clic : Chrome n'affiche la demande de
  // permission que pendant un geste utilisateur.
  chrome.permissions.request({ permissions: ['nativeMessaging'] }, granted => {
    if (chrome.runtime.lastError || !granted) {
      fail('Permission refusée',
        'La génération par Claude a besoin d’échanger avec un programme installé sur ta machine. Tu peux continuer à écrire tes étapes à la main.');
      return;
    }
    busy = true;
    lastError = null;
    render();

    chrome.runtime.sendNativeMessage(HOST, { prompt: buildPrompt(impulse) }, response => {
      if (chrome.runtime.lastError) {
        fail('Hôte natif introuvable',
          'Chrome n’a pas pu joindre l’hôte qui exécute `claude -p`. Cette option demande Claude Code et l’hôte natif Airlock installés sur cette machine. Les étapes manuelles fonctionnent sans.',
          chrome.runtime.lastError.message);
        return;
      }
      if (!response || response.ok === false) {
        fail('La génération a échoué', 'L’hôte natif a répondu avec une erreur.',
          (response && response.error) || 'réponse vide');
        return;
      }

      const steps = parseSteps(response.output);
      if (!steps) {
        fail('Réponse illisible', 'Le modèle n’a pas renvoyé le JSON attendu. Relance la génération.',
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
  // ne pas reconstruire sous les doigts de quelqu'un qui tape une etape
  const typing = document.activeElement && document.activeElement.matches('.add-step input')
    && document.activeElement.value !== '';
  if (typing) renderList(); else render();
});

load(() => {
  const params = new URLSearchParams(location.search);
  const wanted = params.get('impulse');
  const all = allImpulses();
  selected = (wanted && all.includes(wanted)) ? wanted : (state.focus || all[0] || null);
  render();
  const first = document.querySelector('.add-step input');
  if (first && !(state.methodologies[selected] || {}).steps) first.focus();
});

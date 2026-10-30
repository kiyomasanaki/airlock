// Airlock extension - popup logic
//
// Every mutation is saved immediately, including a capture still waiting for its
// switch/queue/drop answer (`pending`): the popup closes as soon as it loses
// focus, and an impulse typed then lost is exactly what Airlock exists to prevent.
const THEME_KEY = 'airlock_theme';
const UNDO_MS = 8000;

let state = airlockBlank();
let loaded = false;          // a capture typed before the first read is replayed after it
let captureWaiting = false;
const ownWrites = new Set(); // serialized states we wrote, to recognise their echo
let undoSnapshot = null;
let undoTimer = null;

const $ = id => document.getElementById(id);

// Theme is applied synchronously in <head> (see js/theme.js) to avoid a flash;
// this just wires the toggle button and persists the choice.
$('btnTheme').onclick = () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
};

function load() {
  chrome.storage.local.get([AIRLOCK_KEY], r => {
    state = airlockNormalize(r[AIRLOCK_KEY]);
    loaded = true;
    render();
    if (captureWaiting) { captureWaiting = false; capture(); }
  });
}

// Content scripts and the service worker pick the change up through
// chrome.storage.onChanged: no message passing needed.
function save() {
  state = airlockNormalize(state);
  const json = JSON.stringify(state);
  ownWrites.add(json);
  chrome.storage.local.set({ [AIRLOCK_KEY]: state });
}

// Another surface (methodology tab, options import) changed the data while the
// popup was open: adopt it so the next save doesn't write a stale copy back.
// The echo of our own writes is ignored: it can arrive after a newer local
// change (Enter then "2" in quick succession) and would roll it back.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local' || !changes[AIRLOCK_KEY]) return;
  const incoming = airlockNormalize(changes[AIRLOCK_KEY].newValue);
  const json = JSON.stringify(incoming);
  if (ownWrites.delete(json)) return;
  state = incoming;
  render();
});

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function render() {
  // Focus bar
  const dot = $('dot'), ft = $('focusText'), ns = $('nextStep');
  if (state.focus) {
    dot.className = 'dot';
    ft.className = 'focus-text';
    ft.textContent = state.focus;
  } else {
    dot.className = 'dot idle';
    ft.className = 'focus-text empty';
    ft.textContent = 'aucun — tape ci-dessous';
  }
  $('btnDone').disabled = !state.focus;

  const next = airlockNextStep(state, state.focus);
  if (next) {
    ns.innerHTML = '<b>prochaine étape :</b> <span></span>';
    ns.querySelector('span').textContent = next;
    ns.hidden = false;
  } else {
    ns.hidden = true;
  }

  // Decision (restored if the popup was closed before answering)
  if (state.pending) {
    $('decisionQ').innerHTML = `<b></b><br><span class="sub">ça passe devant "<span class="cur"></span>" ?</span>`;
    $('decisionQ').querySelector('b').textContent = `"${state.pending}"`;
    $('decisionQ').querySelector('.cur').textContent = state.focus || '';
    $('decision').className = 'decision visible';
    $('hint').textContent = '1 switch · 2 file · 3 laisser tomber';
  } else {
    $('decision').className = 'decision';
    $('hint').textContent = 'Entrée pour valider · Ctrl+Shift+Q pour rouvrir';
  }

  // Queue
  const q = $('queue');
  if (state.queue.length === 0) {
    q.innerHTML = '<div class="empty">vide — bonne concentration</div>';
  } else {
    q.innerHTML = '';
    state.queue.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'queue-item' + (i === 0 ? ' top' : '');
      div.innerHTML = `
        <span class="qnum">${i+1}</span>
        <span class="qtext"></span>
        <div class="qbtns">
          <button class="btn-x go" data-act="focus" data-i="${i}" title="passer en focus" aria-label="passer en focus">→</button>
          ${i > 0 ? `<button class="btn-x" data-act="up" data-i="${i}" title="monter" aria-label="monter">↑</button>` : ''}
          <button class="btn-x danger" data-act="del" data-i="${i}" title="supprimer" aria-label="supprimer">×</button>
        </div>`;
      div.querySelector('.qtext').textContent = item;
      q.appendChild(div);
    });
  }

  // Done today (the full history is on the Options page)
  const ds = $('doneSection'), dl = $('done');
  const since = startOfToday();
  const today = state.done.filter(d => d.at && d.at >= since);
  if (today.length === 0) {
    ds.style.display = 'none';
  } else {
    ds.style.display = 'block';
    dl.innerHTML = '';
    today.slice(-5).reverse().forEach(d => {
      const div = document.createElement('div');
      div.className = 'done-item';
      div.innerHTML = '<span class="check">✓</span><span></span>';
      div.querySelector('span:last-child').textContent = d.text;
      dl.appendChild(div);
    });
  }

  $('count').textContent = `${state.queue.length} en file`;
}

// ─── undo ───────────────────────────────────────────────────────────────

// A misclick must never cost an idea: every removal can be reverted for a few
// seconds, without a confirmation dialog in the way.
function withUndo(message, mutate) {
  undoSnapshot = JSON.stringify(state);
  mutate();
  save(); render();

  $('toastText').textContent = message;
  $('toast').className = 'toast visible';
  clearTimeout(undoTimer);
  undoTimer = setTimeout(hideToast, UNDO_MS);
}

function hideToast() {
  $('toast').className = 'toast';
  undoSnapshot = null;
}

function undo() {
  if (!undoSnapshot) return;
  state = airlockNormalize(JSON.parse(undoSnapshot));
  hideToast();
  save(); render();
}

// ─── actions ────────────────────────────────────────────────────────────

function capture() {
  if (!loaded) { captureWaiting = true; return; }
  const val = $('input').value.trim();
  if (!val) return;
  $('input').value = '';

  if (!state.focus) {
    state.focus = val;
    save(); render();
    return;
  }

  // A previous capture still unanswered: park it in the queue rather than lose it.
  if (state.pending) state.queue.push(state.pending);

  state.pending = val;
  save(); render();
  // Focus stays in the (now empty) field: 1/2/3 answer from there. Moving it to
  // a decision button would let the Enter that just captured "click" it.
}

function decide(kind) {
  if (!state.pending) return;
  const val = state.pending;
  state.pending = null;
  if (kind === 'switch') {
    if (state.focus) state.queue.unshift(state.focus);
    state.focus = val;
  } else if (kind === 'queue') {
    state.queue.push(val);
  } else if (kind === 'drop') {
    // drop is a legitimate answer: no counter, no trace, only a safety net for misclicks
    state.pending = val;
    withUndo('laissé tomber — c\'est très bien', () => { state.pending = null; });
    $('input').focus();
    return;
  }
  save(); render();
  $('input').focus();
}

function markDone() {
  if (!state.focus) return;
  const finished = state.focus;
  withUndo(`terminé : ${finished}`, () => {
    state.done.push({ text: finished, at: Date.now() });
    if (state.done.length > AIRLOCK_DONE_MAX) state.done = state.done.slice(-AIRLOCK_DONE_MAX);
    state.focus = state.queue.shift() || null;
  });
}

// ─── event handlers ─────────────────────────────────────────────────────

$('btnAdd').onclick = capture;
$('input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); capture(); }
});

$('btnGo').onclick = () => decide('switch');
$('btnQueue').onclick = () => decide('queue');
$('btnDrop').onclick = () => decide('drop');
$('btnDone').onclick = markDone;
$('btnUndo').onclick = undo;

// Keyboard-first: the whole capture → decide loop works without the mouse.
document.addEventListener('keydown', e => {
  const typing = e.target === $('input') && $('input').value !== '';
  if (state.pending && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const kind = { '1': 'switch', '2': 'queue', '3': 'drop' }[e.key];
    if (kind) { e.preventDefault(); decide(kind); return; }
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && undoSnapshot && !typing) {
    e.preventDefault();
    undo();
  }
});

$('queue').addEventListener('click', e => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const i = parseInt(btn.dataset.i, 10);
  const act = btn.dataset.act;
  if (!(i >= 0 && i < state.queue.length)) return;
  if (act === 'del') {
    const item = state.queue[i];
    withUndo(`supprimé : ${item}`, () => { state.queue.splice(i, 1); });
    return;
  }
  if (act === 'up' && i > 0) {
    [state.queue[i-1], state.queue[i]] = [state.queue[i], state.queue[i-1]];
  } else if (act === 'focus') {
    const item = state.queue.splice(i, 1)[0];
    if (state.focus) state.queue.unshift(state.focus);
    state.focus = item;
  }
  save(); render();
});

// Opens the step-breakdown view in a tab, on the current focus if there is one
$('btnMethod').onclick = () => {
  const url = state.focus
    ? `pages/methodology.html?impulse=${encodeURIComponent(state.focus)}`
    : 'pages/methodology.html';
  chrome.tabs.create({ url: chrome.runtime.getURL(url) });
};

$('btnReset').onclick = () => {
  if (confirm('Vider focus, file, historique et étapes ?')) {
    withUndo('tout a été vidé', () => { state = airlockBlank(); });
  }
};

load();

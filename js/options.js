// Airlock extension - options page logic
const EVERYWHERE_ORIGINS = ['https://*/*', 'http://*/*'];

const $ = id => document.getElementById(id);

function showStatus(id, msg, ok) {
  const el = $(id);
  el.textContent = msg;
  el.className = 'status ' + (ok ? 'ok' : 'err');
  setTimeout(() => { el.textContent = ''; el.className = 'status'; }, 5000);
}

// ─── history ────────────────────────────────────────────────────────────

function dayLabel(ts) {
  if (!ts) return 'date inconnue';
  const d = new Date(ts);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const day = new Date(d); day.setHours(0, 0, 0, 0);
  const diff = Math.round((today - day) / 86400000);
  if (diff === 0) return 'aujourd\'hui';
  if (diff === 1) return 'hier';
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// Grouped by day, most recent first: seeing what got finished is the point,
// there is no total, no streak and no comparison between days.
function renderDone(done) {
  const el = $('doneList');
  if (!done || done.length === 0) {
    el.innerHTML = '<div class="empty">rien de fait pour l\'instant</div>';
    return;
  }
  el.innerHTML = '';
  let current = null;
  done.slice().reverse().forEach(d => {
    const label = dayLabel(d.at);
    if (label !== current) {
      current = label;
      const h = document.createElement('div');
      h.className = 'day';
      h.textContent = label;
      el.appendChild(h);
    }
    const div = document.createElement('div');
    div.className = 'done-item';
    div.innerHTML = '<span class="check">✓</span><span class="txt"></span><span class="time"></span>';
    div.querySelector('.txt').textContent = d.text;
    if (d.at) {
      div.querySelector('.time').textContent =
        new Date(d.at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    el.appendChild(div);
  });
}

function loadState(cb) {
  chrome.storage.local.get([AIRLOCK_KEY], r => cb(airlockNormalize(r[AIRLOCK_KEY])));
}

// ─── shortcut ───────────────────────────────────────────────────────────

function renderShortcut() {
  chrome.commands.getAll(cmds => {
    const c = cmds.find(x => x.name === '_execute_action');
    $('currentShortcut').textContent = c && c.shortcut ? c.shortcut : 'aucun (à définir)';
  });
}

$('btnShortcut').onclick = () => {
  chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
};

// ─── reminder on every site ─────────────────────────────────────────────

function renderEverywhere() {
  chrome.permissions.contains({ origins: EVERYWHERE_ORIGINS }, on => {
    $('everywhereState').textContent = on ? 'activé' : 'désactivé';
    $('everywhereState').className = 'pill ' + (on ? 'on' : 'off');
    $('btnEverywhere').textContent = on ? 'Désactiver' : 'Activer sur tous les sites';
    $('btnEverywhere').dataset.on = on ? '1' : '';
  });
}

function syncEverywhere(cb) {
  chrome.runtime.sendMessage({ type: 'airlock_sync_everywhere' }, () => {
    void chrome.runtime.lastError;
    renderEverywhere();
    cb && cb();
  });
}

$('btnEverywhere').onclick = () => {
  if ($('btnEverywhere').dataset.on) {
    chrome.permissions.remove({ origins: EVERYWHERE_ORIGINS }, () => syncEverywhere(() =>
      showStatus('everywhereStatus', 'Rappel limité à claude.ai.', true)));
    return;
  }
  // Must run straight from the click: Chrome only shows the prompt during a user gesture.
  chrome.permissions.request({ origins: EVERYWHERE_ORIGINS }, granted => {
    if (chrome.runtime.lastError || !granted) {
      showStatus('everywhereStatus', 'Permission non accordée — rien n’a changé.', false);
      renderEverywhere();
      return;
    }
    syncEverywhere(() => showStatus('everywhereStatus',
      'Activé. Le rappel apparaît sur les pages que tu ouvres ou recharges à partir de maintenant.', true));
  });
};

// ─── export / import ────────────────────────────────────────────────────

$('btnExport').onclick = () => {
  loadState(state => {
    const data = {
      app: 'airlock',
      version: 2,
      focus: state.focus,
      queue: state.queue,
      done: state.done,
      methodologies: state.methodologies,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `airlock-export-${date}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showStatus('status', 'Export téléchargé.', true);
  });
};

$('btnImportTrigger').onclick = () => $('fileImport').click();

// Accepts both the current export format and the first one (done as plain strings,
// no methodologies).
function validImport(data) {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return false;
  if (data.focus != null && typeof data.focus !== 'string') return false;
  if (!Array.isArray(data.queue) || !data.queue.every(x => typeof x === 'string')) return false;
  if (!Array.isArray(data.done) || !data.done.every(x =>
    typeof x === 'string' || (x && typeof x === 'object' && typeof x.text === 'string'))) return false;
  if (data.methodologies != null &&
      (typeof data.methodologies !== 'object' || Array.isArray(data.methodologies))) return false;
  return true;
}

$('fileImport').addEventListener('change', e => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    let data;
    try {
      data = JSON.parse(reader.result);
    } catch {
      showStatus('status', 'Fichier invalide : JSON illisible.', false);
      return;
    }

    if (!validImport(data)) {
      showStatus('status', 'Fichier invalide : structure inattendue.', false);
      return;
    }

    if (!confirm('Remplacer les données actuelles (focus, file, historique, étapes) par le contenu de ce fichier ?')) return;

    loadState(current => {
      const state = airlockNormalize({
        focus: data.focus,
        queue: data.queue,
        done: data.done,
        pending: null,
        // an older export has no step breakdowns: keep the ones already here
        methodologies: data.methodologies != null ? data.methodologies : current.methodologies,
      });
      chrome.storage.local.set({ [AIRLOCK_KEY]: state }, () => {
        renderDone(state.done);
        showStatus('status', 'Import réussi.', true);
      });
    });
  };
  reader.readAsText(file);
});

// ─── startup ────────────────────────────────────────────────────────────

loadState(state => renderDone(state.done));
renderShortcut();
renderEverywhere();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[AIRLOCK_KEY]) {
    renderDone(airlockNormalize(changes[AIRLOCK_KEY].newValue).done);
  }
});
chrome.permissions.onAdded.addListener(renderEverywhere);
chrome.permissions.onRemoved.addListener(renderEverywhere);

// Airlock extension - options page logic
const EVERYWHERE_ORIGINS = ['https://*/*', 'http://*/*'];

const $ = id => document.getElementById(id);

// One timer per status line: an older message's timer must not clear a newer one.
const statusTimers = {};

function showStatus(id, msg, ok) {
  const el = $(id);
  el.textContent = msg;
  el.className = 'status ' + (ok ? 'ok' : 'err');
  clearTimeout(statusTimers[id]);
  statusTimers[id] = setTimeout(() => { el.textContent = ''; el.className = 'status'; }, 5000);
}

// ─── history ────────────────────────────────────────────────────────────

function dayLabel(ts) {
  if (!ts) return airlockT('dayUnknown');
  const d = new Date(ts);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const day = new Date(d); day.setHours(0, 0, 0, 0);
  const diff = Math.round((today - day) / 86400000);
  if (diff === 0) return airlockT('dayToday');
  if (diff === 1) return airlockT('dayYesterday');
  return d.toLocaleDateString(airlockLocale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// Grouped by day, most recent first: seeing what got finished is the point,
// there is no total, no streak and no comparison between days.
function renderDone(done) {
  const el = $('doneList');
  if (!done || done.length === 0) {
    el.innerHTML = '<div class="empty"></div>';
    el.firstChild.textContent = airlockT('optHistoryEmpty');
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
        new Date(d.at).toLocaleTimeString(airlockLocale(), { hour: '2-digit', minute: '2-digit' });
    }
    el.appendChild(div);
  });
}

function loadState(cb) {
  chrome.storage.local.get([AIRLOCK_KEY], r => cb(airlockNormalize(r[AIRLOCK_KEY])));
}

// ─── shortcut ───────────────────────────────────────────────────────────

function renderShortcut() {
  airlockShortcut(shortcut => {
    $('suggestedShortcut').textContent = airlockSuggestedShortcut();
    $('currentShortcut').textContent = shortcut || airlockT('optShortcutNone');
    $('shortcutWarning').hidden = !!shortcut;
  });
  // the service worker re-reads it too, to set or clear the "!" badge
  chrome.runtime.sendMessage({ type: 'airlock_check_shortcut' }, () => void chrome.runtime.lastError);
}


chrome.storage.local.get([AIRLOCK_SHORTCUT_DISMISSED_KEY], r => {
  $('chkShortcutDismiss').checked = !!r[AIRLOCK_SHORTCUT_DISMISSED_KEY];
});
$('chkShortcutDismiss').addEventListener('change', e => {
  chrome.storage.local.set({ [AIRLOCK_SHORTCUT_DISMISSED_KEY]: e.target.checked });
});

// back from chrome://extensions/shortcuts: show the new state without a reload
document.addEventListener('visibilitychange', () => { if (!document.hidden) renderShortcut(); });

$('btnShortcut').onclick = () => {
  chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
};

// ─── reminder on every site ─────────────────────────────────────────────

function renderEverywhere() {
  chrome.permissions.contains({ origins: EVERYWHERE_ORIGINS }, on => {
    $('everywhereState').textContent = airlockT(on ? 'optOn' : 'optOff');
    $('everywhereState').className = 'pill ' + (on ? 'on' : 'off');
    $('btnEverywhere').textContent = airlockT(on ? 'optEverywhereDisable' : 'optEverywhereEnable');
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
      showStatus('everywhereStatus', airlockT('optEverywhereOff'), true)));
    return;
  }
  // Must run straight from the click: Chrome only shows the prompt during a user gesture.
  chrome.permissions.request({ origins: EVERYWHERE_ORIGINS }, granted => {
    if (chrome.runtime.lastError || !granted) {
      showStatus('everywhereStatus', airlockT('optEverywhereDenied'), false);
      renderEverywhere();
      return;
    }
    syncEverywhere(() => showStatus('everywhereStatus', airlockT('optEverywhereOnMsg'), true));
  });
};

// ─── language ───────────────────────────────────────────────────────────

// One option per language, each written in its own language.
for (const [code, meta] of Object.entries(AIRLOCK_LANG_META)) {
  const o = document.createElement('option');
  o.value = code;
  o.lang = code;
  o.textContent = meta.native;
  $('selLang').appendChild(o);
}

// Stored as chosen ('auto' included): the resolved language is recomputed by
// every surface, so 'auto' keeps following the browser.
function renderLang() {
  chrome.storage.local.get([AIRLOCK_LANG_KEY], r => {
    $('selLang').value = r[AIRLOCK_LANG_KEY] || 'auto';
  });
}
$('selLang').addEventListener('change', e => {
  chrome.storage.local.set({ [AIRLOCK_LANG_KEY]: e.target.value });
});

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
    showStatus('status', airlockT('optExported'), true);
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
      showStatus('status', airlockT('optBadJson'), false);
      return;
    }

    if (!validImport(data)) {
      showStatus('status', airlockT('optBadShape'), false);
      return;
    }

    if (!confirm(airlockT('optImportConfirm'))) return;

    loadState(current => {
      const state = airlockNormalize({
        focus: data.focus,
        queue: data.queue,
        done: data.done,
        // exports never carry it: a capture still waiting for its answer survives
        pending: current.pending,
        // an older export has no step breakdowns: keep the ones already here
        methodologies: data.methodologies != null ? data.methodologies : current.methodologies,
      });
      chrome.storage.local.set({ [AIRLOCK_KEY]: state }, () => {
        renderDone(state.done);
        showStatus('status', airlockT('optImported'), true);
      });
    });
  };
  reader.readAsText(file);
});

// ─── startup ────────────────────────────────────────────────────────────

// The shortcut and everywhere texts are rebuilt by data-i18n-html, which
// recreates their <kbd> placeholders: refill everything after a language change.
airlockI18nInit(() => {
  renderLang();
  loadState(state => renderDone(state.done));
  renderShortcut();
  renderEverywhere();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes[AIRLOCK_KEY]) {
    renderDone(airlockNormalize(changes[AIRLOCK_KEY].newValue).done);
  }
});
chrome.permissions.onAdded.addListener(renderEverywhere);
chrome.permissions.onRemoved.addListener(renderEverywhere);

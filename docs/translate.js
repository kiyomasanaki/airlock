// Airlock - translation fixes (docs/translate.html).
//
// One line per translated string, editable. Nothing leaves this browser until
// the visitor sends it: a pre-filled GitHub issue holding only the lines they
// changed, or the same text copied to paste anywhere. The draft is kept in this
// browser's localStorage, per language.
//
// Data comes from the extension itself, copied here by docs/build.py:
// i18n.js (engine and English), locales/<code>.js, locales.js (manifest strings).

const ISSUES_URL = 'https://github.com/kiyomasanaki/airlock/issues/new';
const MAX_URL = 7500;                 // longer links get cut by browsers or GitHub
const DRAFT_KEY = 'airlock_translate_draft_';
const SAMPLE_COUNTS = [0, 1, 2, 3, 5, 11, 22, 100];

const $ = id => document.getElementById(id);
let lang = null;
let rows = [];                        // { id, label, en, current, input }

// ─── rows ───────────────────────────────────────────────────────────────

// Strings, plural forms and prompt lines all become one editable line each.
function buildRows(code) {
  const en = AIRLOCK_STRINGS.en, tr = AIRLOCK_STRINGS[code] || {};
  const out = [];
  const plural = new Intl.PluralRules(AIRLOCK_LANG_META[code].locale);
  for (const [key, ev] of Object.entries(en)) {
    const tv = tr[key];
    if (Array.isArray(ev)) {
      (tv || []).forEach((line, i) => {
        if (line.trim()) out.push({ id: `${key}.${i + 1}`, label: `${key} · line ${i + 1}`, en: ev[i] || '', current: line });
      });
    } else if (typeof ev === 'object') {
      for (const [cat, text] of Object.entries(tv || {})) {
        const counts = SAMPLE_COUNTS.filter(n => plural.select(n) === cat);
        out.push({ id: `${key}.${cat}`, label: `${key} · ${cat}${counts.length ? ` (n = ${counts.join(', ')}…)` : ''}`,
          en: ev[cat] || ev.other, current: text });
      }
    } else if (tv != null) {
      out.push({ id: key, label: key, en: ev, current: tv });
    }
  }
  const m = (AIRLOCK_MANIFEST_STRINGS || {})[code];
  if (m) {
    for (const k of Object.keys(m)) {
      out.push({ id: `_locales.${k}`, label: `Chrome Web Store · ${k}`, en: AIRLOCK_MANIFEST_STRINGS.en[k], current: m[k] });
    }
  }
  return out;
}

function loadDraft(code) {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY + code)) || {}; } catch (e) { return {}; }
}

function saveDraft() {
  const d = {};
  for (const r of rows) if (r.input.value !== r.current) d[r.id] = r.input.value;
  try {
    if (Object.keys(d).length) localStorage.setItem(DRAFT_KEY + lang, JSON.stringify(d));
    else localStorage.removeItem(DRAFT_KEY + lang);
  } catch (e) {}
}

function render() {
  const meta = AIRLOCK_LANG_META[lang];
  const rtl = AIRLOCK_RTL.includes(lang);
  const draft = loadDraft(lang);
  rows = buildRows(lang);
  const list = $('rows');
  list.innerHTML = '';
  for (const r of rows) {
    const li = document.createElement('li');
    li.className = 'tr-row';
    const head = document.createElement('div');
    head.className = 'tr-key';
    head.textContent = r.label;
    const en = document.createElement('div');
    en.className = 'tr-en';
    en.lang = 'en';
    en.textContent = r.en;
    const input = document.createElement('textarea');
    input.className = 'tr-input';
    input.lang = lang;
    input.dir = rtl ? 'rtl' : 'ltr';
    input.rows = Math.min(6, Math.max(1, Math.ceil(r.current.length / 70)));
    input.value = r.id in draft ? draft[r.id] : r.current;
    input.setAttribute('aria-label', `${r.label} (${meta.native})`);
    input.addEventListener('input', () => { li.classList.toggle('changed', input.value !== r.current); saveDraft(); update(); });
    li.classList.toggle('changed', input.value !== r.current);
    li.append(head, en, input);
    list.appendChild(li);
    r.input = input;
  }
  update();
}

// ─── output ─────────────────────────────────────────────────────────────

const cell = s => s.replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');

function changes() {
  return rows.filter(r => r.input.value !== r.current);
}

function report() {
  const meta = AIRLOCK_LANG_META[lang];
  const lines = changes().map(r => `| \`${r.id}\` | ${cell(r.current)} | ${cell(r.input.value)} |`);
  return [
    `Language: ${meta.native} (\`${lang}\`)`,
    '',
    '| Key | Current | Proposed |',
    '|---|---|---|',
    ...lines,
    '',
    '_Sent from https://kiyomasanaki.github.io/airlock/translate.html_',
  ].join('\n');
}

function issueUrl() {
  const n = changes().length;
  const title = `[translation] ${lang}: ${n} fix${n > 1 ? 'es' : ''}`;
  return `${ISSUES_URL}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(report())}`;
}

function update() {
  const n = changes().length;
  $('count').textContent = n === 0 ? 'No correction yet.' : `${n} correction${n > 1 ? 's' : ''}`;
  const url = issueUrl();
  const tooLong = url.length > MAX_URL;
  $('btnIssue').disabled = n === 0 || tooLong;
  $('btnCopy').disabled = n === 0;
  $('btnReset').disabled = n === 0;
  $('tooLong').hidden = !(n && tooLong);
}

$('btnIssue').onclick = () => { window.open(issueUrl(), '_blank', 'noopener'); };

$('btnCopy').onclick = async () => {
  try {
    await navigator.clipboard.writeText(report());
    $('copied').textContent = 'Copied. Paste it in a new issue or a message.';
  } catch (e) {
    $('copied').textContent = 'Copy failed: select the lines by hand.';
  }
  setTimeout(() => { $('copied').textContent = ''; }, 5000);
};

$('btnReset').onclick = () => {
  if (!confirm('Discard your corrections for this language?')) return;
  try { localStorage.removeItem(DRAFT_KEY + lang); } catch (e) {}
  render();
};

// ─── language ───────────────────────────────────────────────────────────

function pick(code) {
  if (!AIRLOCK_LANG_META[code] || code === 'en') return;
  lang = code;
  $('lang').value = code;
  if (location.hash.slice(1) !== code) history.replaceState(null, '', '#' + code);
  render();
}

for (const [code, meta] of Object.entries(AIRLOCK_LANG_META)) {
  if (code === 'en') continue;                 // English is the source text
  const o = document.createElement('option');
  o.value = code;
  o.lang = code;
  o.textContent = `${meta.native} (${code})`;
  $('lang').appendChild(o);
}
$('lang').addEventListener('change', e => pick(e.target.value));
addEventListener('hashchange', () => pick(location.hash.slice(1)));

// #code from the extension's credits page, else the browser language
const fromHash = location.hash.slice(1);
const fromBrowser = airlockResolveLang(null);
pick(AIRLOCK_LANG_META[fromHash] && fromHash !== 'en' ? fromHash : fromBrowser !== 'en' ? fromBrowser : 'fr');

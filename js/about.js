// Airlock - credits page: who makes it, why, and where to fix a translation.
const AUTHOR = 'kiyomasanaki';      // pseudonym, as in the legal notice
const TRANSLATE_URL = 'https://kiyomasanaki.github.io/airlock/translate.html';

const $ = id => document.getElementById(id);

function render() {
  $('version').textContent = airlockT('aboutVersion', { version: chrome.runtime.getManifest().version });
  $('author').textContent = airlockT('aboutBy', { author: AUTHOR });
  // straight to the strings of the language the user is reading
  $('lnkTranslate').href = `${TRANSLATE_URL}#${airlockLang}`;
  $('lnkTranslate').textContent = airlockT('aboutTransLink', { lang: AIRLOCK_LANG_META[airlockLang].native });
}

render();
airlockI18nInit(render);

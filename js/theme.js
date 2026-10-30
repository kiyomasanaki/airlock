// Airlock - popup theme, applied synchronously from <head> before first paint
// so there is no light/dark flash on open. Must be an external file: Manifest V3's
// content security policy blocks inline <script> in extension pages.
try {
  let t = localStorage.getItem('airlock_theme');
  if (t !== 'light' && t !== 'dark') {
    t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = t;
} catch (e) {}

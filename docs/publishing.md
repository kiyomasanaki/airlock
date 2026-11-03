# Publishing on the Chrome Web Store

Phase 3 of the [roadmap](roadmap.md): what is in `docs/`, the blockers, the package,
and the Store form field by field. Work through the blockers first: the Store rejects
a submission that is missing any of them.

## What is in `docs/`

| File | Purpose |
|---|---|
| `privacy-policy.md` | Privacy policy. The URL the Store requires |
| `legal-notice.md` | Legal notice (publisher, hosting, licence) |
| `*.html`, `index.html` | Public pages built from the two files above, served by GitHub Pages |
| `build.py` | Builds the HTML pages: `python3 docs/build.py` |
| `fonts/` | Montserrat (SIL Open Font License), self-hosted so the pages call no third party |
| `store-listing.md` | Store listing copy, ready to paste |
| `screenshots/` | The 3 Store screenshots |
| `roadmap.md` | Project roadmap and guiding constraints |

The legal pages are edited in Markdown, then rebuilt: re-run `python3 docs/build.py`
after any edit to them, and commit the result. Nothing in `docs/` goes into the
extension package (`package.sh` copies a fixed list of runtime files).

---

## Blockers: nothing can be submitted until these are done

### 1. Public privacy policy URL

The Store requires a publicly reachable URL. `docs/` is ready to be served by GitHub
Pages, it just needs turning on:

1. Repo **Settings → Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main`, folder **`/docs`**, then Save
4. Wait for the first deploy, then check:
   `https://kiyomasanaki.github.io/airlock/privacy-policy.html`

That URL is what goes in the Store form. The legal notice lives next to it:
`legal-notice.html`.

### 2. Legal notice

`legal-notice.md` is written for an anonymous, non-professional publisher (LCEN
article 6-III-2): only the pseudonym, a contact email and the hosting providers are
public, and the publisher's identity is held by the host. This only holds while the
extension stays free with no revenue; if it is ever monetised, the full legal identity
(name, address, SIREN/SIRET) must be published instead.

In the Store dashboard, declare yourself **non-trader** so no postal address is shown
on the listing.

No separate terms of service are needed as long as the extension is free, creates no
account, takes no payment and sends no data to a server of ours. Add them if that
changes (freemium, backend).

### 3. Developer account

One-off 5 USD registration fee at
[Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

---

## Strongly recommended before submitting

### UI language

The interface is **French only** while the English listing and all documentation are
in English. This is visible in the screenshots themselves: English marketing copy next
to a French popup.

Either localise the UI via `chrome.i18n` (French as fallback), or say so in the
listing (the detailed description already ends with that note). Submitting an English listing with a French UI invites one-star reviews
from users who feel misled.

### Screenshots

**1280×800 PNG**, one of the two formats the Store accepts (the other being 640×400).
They follow the narrative the roadmap called for: problem, capture, prioritisation.

| File | Shows |
|---|---|
| `screenshots/1-capture.png` | Capturing the impulse |
| `screenshots/2-decision.png` | The "does this go first?" decision |
| `screenshots/3-priorisation.png` | One focus, an ordered queue |

They are real captures of the extension, not mockups (popup captured at 2×, then
composed at 1× so it stays sharp).

> **Out of date:** they still show the old `Ctrl+Shift+Q` shortcut in the popup hint.
> Regenerate them before submitting.

The generation script is not versioned: it depends on Playwright and a local Chromium,
outside the scope of a build-step-free extension. To redo them after a UI change:

1. load the repo root into Chromium with `--load-extension`
2. inject the desired state via `chrome.storage.local.set({ airlock_state: … })`
3. screenshot `chrome-extension://<id>/pages/popup.html`
4. compose onto a 1280×800 canvas

### Icons and promotional image

- The roadmap calls for final icons validated at 16px; the current ones are
  placeholders. The Store also wants a dedicated 128×128 listing icon
  (`icons/icon128.png` can serve meanwhile).
- Promotional image 440×280: optional, only needed to be featured.

### Cross-OS testing

Only tested on Chromium/Linux so far. Test at least on Windows, and check on a Mac
that `Cmd+Shift+E` opens the popup.

---

## The package

```bash
./package.sh
```

Produces `airlock-<version>.zip` containing only what the extension executes:
`manifest.json` at the root, `pages/`, `js/` (including the service worker and the
shared `state.js`), `css/`, and the four icon sizes Chrome actually uses. `docs/` is
deliberately excluded.

The script verifies that `manifest.json` sits at the root and that every file it
references, and every script or stylesheet the HTML pages load, is present. The
archive is git-ignored (`*.zip`); rebuild it rather than committing it.

---

## Filling in the form

Copy from [`store-listing.md`](store-listing.md).

| Field | Value |
|---|---|
| **Name** | `Airlock: Capture & prioritise` |
| **Short description** | see `store-listing.md` (110 chars, under the 132 limit) |
| **Detailed description** | see `store-listing.md` |
| **Category** | Productivity |
| **Language** | English |
| **Screenshots** | the 3 PNGs in `screenshots/`, 1280×800 |
| **Privacy policy URL** | `https://kiyomasanaki.github.io/airlock/privacy-policy.html` |
| **Single purpose** | Capture and prioritise user-entered focus items locally, in order to reduce context switching. |
| **Data usage** | Tick **"This extension does not collect or use user data"** |

### Permission justifications

The Store asks for one per permission. Reviewers scrutinise host permissions in
particular, so be precise:

- **`storage`**: Persist the current focus, the priority queue and the history of
  completed items locally. No data is transmitted.
- **`https://claude.ai/*`**: Display a banner reminding the user of their current
  focus when a new conversation is opened. The extension does not read, log or
  transmit any page content.
- **`scripting`**: Register the focus reminder card on other websites, only once the
  user turns that option on and grants the optional site access below.
- **Optional `https://*/*`, `http://*/*`**: Requested at runtime only when the user
  enables "reminder on every site" on the Options page; removed when it is turned off.
  Used solely to display the reminder card.
- **Optional `nativeMessaging`**: Requested at runtime only on the first click on
  "Générer avec Claude". Inert without the separately installed host.

> Because `nativeMessaging` is optional, the Store build can ship as is: the native
> host is never required, and users who don't install it never see the prompt.

> Expect the `claude.ai` host permission to draw a question during review. The
> justification above is accurate: `content.js` only injects a banner element and
> reads `chrome.storage.local`, it never touches page content.

---

## Publish as **Unlisted** first

The roadmap is explicit: Unlisted, not Public. You get a direct URL, invisible in
Store search. Share it with a small circle, collect qualitative feedback, and only
switch to Public in Phase 5, once Phase 4 has confirmed the extension holds up.

Google review typically takes a few days.

## After acceptance

- Share the URL with a small circle
- Set up a feedback channel: GitHub issues on this repo is enough to start
- Collect feedback over a meaningful period before touching the code again;
  Phase 4 only codes what several different users actually ask for

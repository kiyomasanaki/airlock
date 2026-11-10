#!/usr/bin/env python3
"""Build the GitHub Pages site in docs/ from the legal Markdown next to it.

Standard library only, like the rest of the project. Handles the subset of
Markdown the legal documents use: headings, paragraphs, "-" lists, bold,
italics, inline code, [links](url), <autolinks> and bare URLs.

Look: the wqqz.dev Astro theme (MIT, github.com/imwqqz/wqqz.dev), the same one
the extension uses: zinc greys, JetBrains Mono for all text, one violet accent,
centred text nav, a single 48rem column, bracketed contact links. Light or dark
follows the system. The font is served from docs/fonts, no third-party request.

Run from anywhere: python3 docs/build.py
"""
import html
import re
from pathlib import Path

DOCS = Path(__file__).resolve().parent
REPO = "https://github.com/kiyomasanaki/airlock"

# source file -> (output file, lang, nav label)
PAGES = {
    "privacy-policy.md": ("privacy-policy.html", "en", "Privacy"),
    "legal-notice.md": ("legal-notice.html", "en", "Legal notice"),
}

CSS = """
@font-face { font-family: "JetBrains Mono"; font-style: normal; font-weight: 100 800;
  font-display: swap; src: url(fonts/jetbrains-mono-latin-wght.woff2) format("woff2"); }
:root { --background: #fbfcfd; --foreground: #18181b; --muted: #606067; --card: #ffffff;
  --border: #e4e4e7; --accent: #7945df; --accent-soft: rgba(121, 69, 223, .5); color-scheme: light; }
@media (prefers-color-scheme: dark) {
  :root { --background: #0a0a0c; --foreground: #e4e4e7; --muted: #8e8e96; --card: #121215;
    --border: #262629; --accent: #a889ff; --accent-soft: rgba(168, 137, 255, .5); color-scheme: dark; }
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; scroll-padding-top: 80px; }
body { min-height: 100vh; display: flex; flex-direction: column; background: var(--background); color: var(--foreground);
  font: 15px/1.7 "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  -webkit-font-smoothing: antialiased; }
::selection { background: var(--accent); color: var(--background); }
a { color: inherit; text-decoration: none; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 2px; }

/* sticky centred text nav, as in the theme */
nav { position: sticky; top: 0; z-index: 50; background: color-mix(in srgb, var(--background) 88%, transparent);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
nav ul { list-style: none; display: flex; justify-content: center; align-items: center; gap: 24px; height: 64px;
  padding: 0 24px; flex-wrap: wrap; }
nav a { font-size: .875rem; color: var(--muted); transition: color .15s; }
nav a:hover { color: var(--foreground); }
nav a[aria-current="page"] { color: var(--foreground); font-weight: 500; }

main { flex: 1; display: flex; flex-direction: column; width: 100%; max-width: 48rem; margin: 0 auto; padding: 48px 24px 64px; }
main.home { justify-content: center; }

h1 { font-size: 2.25rem; line-height: 1.15; font-weight: 700; letter-spacing: -.025em; text-wrap: balance; margin-bottom: 8px; }
.role { font-size: 1.125rem; color: var(--muted); margin-bottom: 16px; }
.lead { color: color-mix(in srgb, var(--foreground) 85%, transparent); text-wrap: pretty; margin-bottom: 16px; }

/* [label: link] rows */
.contacts { display: flex; flex-wrap: wrap; gap: 8px 20px; margin-top: 24px; font-size: .875rem; }
.contacts a, .prose a { color: var(--muted); text-decoration: underline; text-underline-offset: 3px;
  text-decoration-color: var(--accent-soft); overflow-wrap: anywhere; transition: color .15s, text-decoration-color .15s; }
.contacts a:hover, .prose a:hover { color: var(--accent); text-decoration-color: var(--accent); }

.list { list-style: none; margin-top: 40px; border-top: 1px solid var(--border); }
.list li { border-bottom: 1px solid var(--border); }
.list a { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 16px; padding: 16px 0; transition: color .15s; }
.list a:hover .t { color: var(--accent); }
.list .t { font-weight: 600; }
.list .d { color: var(--muted); font-size: .875rem; }

/* document pages */
.updated { font-size: .875rem; color: var(--muted); margin-bottom: 8px; }
.prose { color: color-mix(in srgb, var(--foreground) 85%, transparent); }
.prose h2 { margin: 40px 0 12px; font-size: 1.25rem; line-height: 1.4; font-weight: 700; letter-spacing: -.01em;
  color: var(--foreground); }
.prose h2::before { content: "## "; color: var(--accent); font-weight: 500; }
.prose h4 { margin: 24px 0 8px; font-size: 1rem; font-weight: 600; color: var(--foreground); }
.prose p, .prose ul { margin-bottom: 16px; }
.prose ul { list-style: none; }
.prose li { position: relative; padding-left: 20px; margin-bottom: 6px; }
.prose li::before { content: "-"; position: absolute; left: 0; color: var(--muted); }
.prose strong { color: var(--foreground); font-weight: 600; }
.prose code { font-family: inherit; font-size: .875em; color: var(--foreground); background: var(--card);
  border: 1px solid var(--border); border-radius: 6px; padding: 1px 6px; overflow-wrap: anywhere; }

footer { border-top: 1px solid var(--border); }
footer div { max-width: 48rem; margin: 0 auto; padding: 24px; display: flex; flex-wrap: wrap; gap: 8px 24px;
  justify-content: space-between; font-size: .8125rem; color: var(--muted); }
footer a:hover { color: var(--foreground); }

@media (min-width: 768px) {
  body { font-size: 16px; }
  h1 { font-size: 3rem; }
  .role { font-size: 1.25rem; }
  main { padding-top: 64px; }
}
@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
"""


def inline(text):
    """Escape, then apply inline Markdown. Code spans are protected first."""
    codes = []

    def keep_code(m):
        codes.append(html.escape(m.group(1)))
        return f"\x00{len(codes) - 1}\x00"

    text = re.sub(r"`([^`]+)`", keep_code, text)
    text = html.escape(text, quote=False)
    text = re.sub(r"&lt;(https?://[^\s&]+)&gt;", r'<a href="\1">\1</a>', text)
    text = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", r'<a href="\2">\1</a>', text)
    # bare URLs, skipping those already inside a link
    text = re.sub(r'(?<!["=>])(https?://[^\s<]*[^\s<.,;:)])', r'<a href="\1">\1</a>', text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", text)
    return re.sub(r"\x00(\d+)\x00", lambda m: f"<code>{codes[int(m.group(1))]}</code>", text)


def to_html(md):
    """Hero from the title and lead lines, then one template section per "##"."""
    out, para, items = [], [], []
    lead, title = [], ""
    count = 0

    def flush():
        if para:
            text = inline(" ".join(para))
            (lead if not count else out).append(text if not count else f"<p>{text}</p>")
            para.clear()
        if items:
            out.append("<ul>\n" + "\n".join(f"<li>{inline(i)}</li>" for i in items) + "\n</ul>")
            items.clear()

    for line in md.splitlines():
        stripped = line.strip()
        heading = re.match(r"(#{1,3})\s+(.*)", stripped)
        if not stripped:
            flush()
        elif heading:
            flush()
            level = len(heading.group(1))
            if level == 1:
                title = heading.group(2)
                continue
            if level == 2:
                count += 1
                out.append(f"<h2>{inline(heading.group(2))}</h2>")
            else:
                out.append(f"<h4>{inline(heading.group(2))}</h4>")
        elif re.match(r"[-*]\s+", stripped):
            if para:
                flush()
            items.append(re.sub(r"^[-*]\s+", "", stripped))
        elif items and line.startswith((" ", "\t")):
            items[-1] += " " + stripped     # wrapped list item
        else:
            if items:
                flush()
            para.append(stripped)
    flush()

    # "Privacy Policy - Airlock Extension" -> "Privacy Policy"
    short = re.sub(r"\s+-\s+.*$", "", title)
    hero = (f'<h1>{inline(short)}</h1>'
            f'<p class="updated">{"<br>".join(lead)}</p>')
    return title, f'<main>{hero}\n<div class="prose">\n' + "\n".join(out) + "\n</div></main>"


def page(title, lang, current, body):
    items = [("index.html", "Home")] + [(dest, label) for dest, _, label in PAGES.values()]
    links = "\n".join(
        f'<li><a href="{href}"{" aria-current=\"page\"" if href == current else ""}>{label}</a></li>'
        for href, label in items
    )
    return f"""<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<link rel="preload" href="fonts/jetbrains-mono-latin-wght.woff2" as="font" type="font/woff2" crossorigin>
<style>{CSS}</style>
</head>
<body>
<nav><ul>
{links}
</ul></nav>
{body}
<footer><div><span>Airlock · MIT licence</span>
<a href="{REPO}">github.com/kiyomasanaki/airlock</a></div></footer>
</body>
</html>
"""


INDEX = f"""<main class="home">
<h1>Airlock</h1>
<p class="role">Chrome extension · built for ADHD</p>
<p class="lead">A buffer zone between an impulse and the action it triggers. Capture the idea with one
shortcut instead of diving into it, then decide: switch, queue or drop.</p>
<p class="lead">100% local, zero telemetry, no account.</p>
<div class="contacts">
<div>[github: <a href="{REPO}">kiyomasanaki/airlock</a>]</div>
<div>[licence: <a href="{REPO}/blob/main/LICENSE">MIT</a>]</div>
</div>
<ul class="list">
<li><a href="privacy-policy.html"><span class="t">Privacy policy</span><span class="d">What Airlock stores, and what never leaves your machine.</span></a></li>
<li><a href="legal-notice.html"><span class="t">Legal notice</span><span class="d">Publisher, hosting, licence.</span></a></li>
</ul>
</main>"""


def main():
    for src, (dest, lang, _) in PAGES.items():
        title, body = to_html((DOCS / src).read_text(encoding="utf-8"))
        (DOCS / dest).write_text(page(title, lang, dest, body), encoding="utf-8")
        print(f"docs/{dest}")
    (DOCS / "index.html").write_text(page("Airlock", "en", "index.html", INDEX), encoding="utf-8")
    # serve the files as they are, without Jekyll processing
    (DOCS / ".nojekyll").write_text("", encoding="utf-8")
    print("docs/index.html")


if __name__ == "__main__":
    main()

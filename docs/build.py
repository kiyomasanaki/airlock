#!/usr/bin/env python3
"""Build the GitHub Pages site in docs/ from the legal Markdown next to it.

Standard library only, like the rest of the project. Handles the subset of
Markdown the legal documents use: headings, paragraphs, "-" lists, bold,
italics, inline code, [links](url), <autolinks> and bare URLs.

Look: the darkminimal.vercel.app template, followed as is (#101010
background, Montserrat, floating nav with active dot, hairline-separated
sections with a small accent label above a large title). The only change:
the template's shining violet text (.shiny-sec) shines violet to yellow.

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
@font-face { font-family: "Montserrat Variable"; font-style: normal; font-weight: 100 900;
  font-display: swap; src: url(fonts/montserrat-latin-wght-normal.woff2) format("woff2-variations"); }
:root { --background: #101010; --sec: #a476ff; --yellow: #ffd84d; --white: #dfdfdf;
  --white-icon: #f3f3f398; --white-icon-tr: #f3f3f310; color-scheme: dark; }
* { box-sizing: border-box; margin: 0; padding: 0;
  font-family: "Montserrat Variable", -apple-system, system-ui, sans-serif; }
html { -webkit-text-size-adjust: 100%; line-height: 1.5; scroll-padding-top: 100px; }
body { background: var(--background); color: var(--white); padding: 0 36px 70px; }
::selection { background-color: var(--sec); color: var(--background); }
a { color: inherit; text-decoration: inherit; }

/* the template's shining accent text, violet to yellow instead of violet to white */
.shiny-sec { background: linear-gradient(135deg, var(--sec) 0%, var(--yellow) 50%, var(--sec) 100%) 0 0 / 200% 100%;
  color: transparent; -webkit-background-clip: text; background-clip: text; animation: shine 3s linear infinite; }
@keyframes shine { 0% { background-position: 100%; } 30%, 70% { background-position: 0%; } }

/* floating nav: bottom on phones, top on desktop, active dot like the template */
.nav-wrap { display: flex; justify-content: center; width: 100%; }
nav { position: fixed; left: 50%; transform: translateX(-50%); bottom: 0; z-index: 100; width: 80%;
  background: var(--background); border: 1px solid transparent; backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px); transition: all .5s ease-in-out; }
nav.scrolling { border-color: #ffffff10; border-radius: 1rem 1rem 0 0; }
nav ul { list-style: none; display: flex; justify-content: space-between; gap: 24px; padding: 12px; }
nav li { flex: 1; text-align: center; }
nav a { position: relative; display: inline-block; color: var(--white-icon); font-size: 12px; transition: color .3s; }
nav a:hover, nav a.active { color: #fff; }
nav a .dot { display: none; position: absolute; left: -24px; top: 50%; width: 8px; height: 8px; border-radius: 50%;
  background: #A9FF5B; transform: translateY(-50%) scale(0); opacity: 0; transition: all .3s; }
nav a.active .dot { transform: translateY(-50%) scale(1); opacity: 1; }

.wrap { max-width: 64rem; margin: 0 auto; }

/* hero */
.hero { margin-top: 48px; padding-bottom: 56px; }
.hero .hi { font-size: 1rem; color: var(--white-icon); margin-bottom: 16px; }
.hero .row { display: flex; flex-direction: column; gap: 16px; }
.hero h1 { color: var(--white); font-size: 3rem; line-height: 1; font-weight: 500; text-wrap: pretty; }
.hero .lead { font-size: 1rem; color: var(--white-icon); }
.hero .pill-row { display: flex; gap: 8px; padding-top: 12px; }

/* sections */
section { padding: 48px 0; border-top: 1px solid #ffffff10; color: var(--white); }
section h2 { font-size: 1.125rem; line-height: 1.75rem; margin-bottom: 8px; font-weight: 400; }
section h3 { font-size: 2.25rem; line-height: 2.5rem; font-weight: 500; margin-bottom: 32px; }
section h4 { font-size: 1.25rem; font-weight: 600; margin: 24px 0 8px; }
.prose { color: var(--white-icon); max-width: 48rem; }
.prose p, .prose ul { margin-bottom: 16px; }
.prose ul { list-style: none; }
.prose li { position: relative; padding-left: 20px; margin-bottom: 8px; }
.prose li::before { content: ""; position: absolute; left: 0; top: .65em; width: 6px; height: 6px; border-radius: 50%;
  background: var(--white-icon); }
.prose strong { color: var(--white); font-weight: 600; }
.prose a { color: var(--white); text-decoration: underline; text-decoration-color: var(--white-icon);
  text-underline-offset: 3px; overflow-wrap: anywhere; transition: text-decoration-color .3s; }
.prose a:hover { text-decoration-color: var(--white); }
.prose code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .9em; color: var(--white);
  background: #1414149c; border: 1px solid var(--white-icon-tr); border-radius: 6px; padding: 1px 6px; overflow-wrap: anywhere; }

/* buttons and cards, as in the template */
.icon-btn { display: inline-flex; align-items: center; gap: 8px; color: var(--white-icon); border: 1px solid var(--white-icon-tr);
  padding: 12px 16px; border-radius: .75rem; background: #1414149c; transition: all .3s ease-in-out; }
.icon-btn:hover { color: #fff; background: var(--white-icon-tr); }
.pill { border-radius: 9999px; }
.grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
.card { display: block; border: 1px solid var(--white-icon-tr); border-radius: 1rem; background: #1414149c;
  padding: 28px; transition: all .3s ease-in-out; }
.card:hover { background: var(--white-icon-tr); }
.card h4 { font-size: 1.5rem; font-weight: 600; color: var(--white); margin-bottom: 4px; }
.card span { font-size: .875rem; color: var(--white-icon); }

footer { padding: 48px 0; border-top: 1px solid #ffffff10; }
footer .wrap { display: flex; flex-wrap: wrap; gap: 16px 40px; justify-content: space-between; align-items: center;
  color: var(--white-icon); font-size: .875rem; }
footer a:hover { color: var(--white); }

@media (min-width: 640px) { body { padding-left: 112px; padding-right: 112px; } }
@media (min-width: 768px) {
  nav { top: 24px; bottom: auto; }
  nav.scrolling { border-radius: 9999px; }
  nav ul { justify-content: center; gap: 48px; }
  nav li { flex: none; }
  nav a { font-size: 1rem; }
  nav a .dot { display: block; }
  body { padding-bottom: 0; }
  .hero { margin-top: 0; padding: 144px 0 56px; }
  .hero .hi { font-size: 1.125rem; }
  .hero h1 { font-size: 3.75rem; }
  .hero .lead { font-size: 1.5rem; line-height: 2rem; }
  .hero .pill-row { padding-top: 24px; }
  section h3 { font-size: 3rem; line-height: 1; }
  .grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1024px) {
  body { padding-left: 80px; padding-right: 80px; }
  .hero .row { flex-direction: row; align-items: center; gap: 48px; }
  .hero h1 { flex: none; }
}
@media (prefers-reduced-motion: reduce) { .shiny-sec { animation: none; } * { transition: none !important; } }
"""

# the template's nav turns into a bordered pill once the page scrolls
SCRIPT = """addEventListener('scroll', () =>
  document.querySelector('nav').classList.toggle('scrolling', scrollY > 10), { passive: true });"""


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
                if count:
                    out.append("</div></div></section>")
                count += 1
                out.append(f'<section><div class="wrap"><h2 class="shiny-sec">{count:02d}</h2>'
                           f'<h3>{inline(heading.group(2))}</h3><div class="prose">')
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
    if count:
        out.append("</div></div></section>")

    # "Privacy Policy - Airlock Extension" -> "Privacy Policy"
    short = re.sub(r"\s+-\s+.*$", "", title)
    hero = (f'<header class="hero"><div class="wrap"><p class="hi">Airlock extension</p>'
            f'<div class="row"><h1>{inline(short)}</h1>'
            f'<p class="lead">{"<br>".join(lead)}</p></div></div></header>')
    return title, hero + "\n" + "\n".join(out)


def page(title, lang, current, body):
    items = [("index.html", "Home")] + [(dest, label) for dest, _, label in PAGES.values()]
    links = "\n".join(
        f'<li><a href="{href}"{" class=\"active\"" if href == current else ""}>'
        f'<span class="dot"></span>{label}</a></li>'
        for href, label in items
    )
    return f"""<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<link rel="preload" href="fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<style>{CSS}</style>
</head>
<body>
<div class="nav-wrap"><nav><ul>
{links}
</ul></nav></div>
{body}
<footer><div class="wrap"><span>Airlock · MIT licence</span>
<a href="{REPO}">github.com/kiyomasanaki/airlock</a></div></footer>
<script>{SCRIPT}</script>
</body>
</html>
"""


INDEX = f"""<header class="hero"><div class="wrap">
<p class="hi">Chrome extension</p>
<div class="row"><h1>Airlock</h1>
<p class="lead">A buffer zone between an impulse and the action it triggers. Built for ADHD brains,
<span class="shiny-sec">100% local, zero telemetry</span>.</p></div>
<div class="pill-row"><a class="icon-btn" href="{REPO}">GitHub</a></div>
</div></header>
<section><div class="wrap">
<h2 class="shiny-sec">Transparency</h2>
<h3>Legal</h3>
<div class="grid">
<a class="card" href="privacy-policy.html"><h4>Privacy policy</h4><span>What Airlock stores, and what never leaves your machine.</span></a>
<a class="card" href="legal-notice.html"><h4>Legal notice</h4><span>Publisher, hosting, licence.</span></a>
</div>
</div></section>"""


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

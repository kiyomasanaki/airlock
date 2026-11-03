#!/usr/bin/env python3
"""Build the GitHub Pages site in docs/ from the legal Markdown next to it.

Standard library only, like the rest of the project. Handles the subset of
Markdown the legal documents use: headings, paragraphs, "-" lists, bold,
italics, inline code, [links](url), <autolinks> and bare URLs.

Look: dark minimal (after darkminimal.vercel.app: #101010 background,
Montserrat, floating pill nav, hairline-bordered rounded cards) with a
diagonal yellow-to-violet gradient as the dominant colour.

Run from anywhere: python3 docs/build.py
"""
import html
import re
from pathlib import Path

DOCS = Path(__file__).resolve().parent
REPO = "https://github.com/kiyomasanaki/airlock"

# source file -> (output file, lang, nav label)
PAGES = {
    "privacy-policy.md": ("privacy-policy.html", "en", "Privacy policy"),
    "legal-notice.md": ("legal-notice.html", "en", "Legal notice"),
}

CSS = """
@font-face { font-family: "Montserrat Variable"; font-style: normal; font-weight: 100 900;
  font-display: swap; src: url(fonts/montserrat-latin-wght-normal.woff2) format("woff2-variations"); }
:root {
  --background: #101010; --card: #1414149c; --white: #dfdfdf;
  --white-icon: #f3f3f398; --white-icon-tr: #f3f3f310;
  --yellow: #ffd84d; --violet: #a476ff;
  --gradient: linear-gradient(135deg, var(--yellow), #ff9478 50%, var(--violet));
  color-scheme: dark;
}
@supports (background: linear-gradient(in oklch 135deg, red, blue)) {
  :root { --gradient: linear-gradient(in oklch 135deg, var(--yellow), var(--violet)); }
}
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; scroll-padding-top: 110px; }
body { margin: 0; min-height: 100vh; color: var(--white); line-height: 1.7;
  font-family: "Montserrat Variable", ui-sans-serif, system-ui, sans-serif;
  background:
    radial-gradient(55rem 38rem at -5% -10%, #ffd84d40, transparent 62%),
    radial-gradient(60rem 45rem at 105% 110%, #a476ff55, transparent 62%),
    var(--background);
  background-attachment: fixed; }
::selection { background: var(--violet); color: var(--background); }
a { color: var(--white); text-decoration: none;
  background: var(--gradient) bottom / 100% 1px no-repeat; transition: color .3s; }
a:hover { color: var(--yellow); }

/* floating pill nav: top on desktop, bottom on phones (like the original) */
nav { position: fixed; left: 50%; transform: translateX(-50%); z-index: 100;
  top: 24px; width: min(720px, calc(100% - 32px));
  display: flex; justify-content: center; gap: 6px; padding: 6px;
  border: 1px solid var(--white-icon-tr); border-radius: 1rem;
  background: #101010cc; backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
nav a { flex: 0 1 auto; padding: 8px 14px; border-radius: .75rem; background: none;
  color: var(--white-icon); font-size: 14px; font-weight: 500; text-align: center; white-space: nowrap; }
nav a:hover { color: #fff; background: var(--white-icon-tr); }
nav a[aria-current] { color: var(--background); background: var(--gradient); font-weight: 600; }

main { max-width: 760px; margin: 0 auto; padding: 120px 16px 64px; }

/* hero: the gradient panel */
.hero { position: relative; overflow: hidden; border-radius: 1.5rem; padding: 40px 32px;
  background: var(--gradient); color: var(--background); }
.hero::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(30rem 18rem at 85% 0%, #ffffff40, transparent 70%); }
.hero .eyebrow { position: relative; margin: 0 0 12px; font-size: 13px; font-weight: 600; letter-spacing: .14em;
  text-transform: uppercase; opacity: .65; }
.hero h1 { margin: 0; font-size: clamp(32px, 6vw, 52px); line-height: 1.05; font-weight: 600;
  letter-spacing: -.02em; text-wrap: balance; }
.hero p { margin: 16px 0 0; font-weight: 500; color: var(--background); }
.hero strong { font-weight: 700; color: var(--background); }

/* one hairline card per section */
section { margin-top: 20px; padding: 28px 28px 20px; border: 1px solid var(--white-icon-tr);
  border-radius: 1rem; background: var(--card); }
h2 { margin: 0 0 12px; font-size: 22px; line-height: 1.3; font-weight: 600;
  display: flex; align-items: center; gap: 12px; }
h2::before { content: ""; flex: none; width: 10px; height: 10px; border-radius: 50%;
  background: var(--gradient); box-shadow: 0 0 14px #ffd84d66; }
h3 { margin: 24px 0 8px; font-size: 17px; font-weight: 600;
  background: var(--gradient); -webkit-background-clip: text; background-clip: text; color: transparent; }
p, li { color: #dfdfdfd9; }
strong { color: #fff; font-weight: 600; }
ul { padding: 0; list-style: none; }
li { position: relative; margin: 8px 0; padding-left: 22px; }
li::before { content: ""; position: absolute; left: 2px; top: .7em; width: 8px; height: 2px;
  border-radius: 2px; background: var(--gradient); }
code { font-size: .88em; padding: 2px 6px; border-radius: 6px; overflow-wrap: anywhere;
  background: var(--white-icon-tr); border: 1px solid var(--white-icon-tr); color: #fff; }

/* index cards */
.cards { display: grid; gap: 16px; margin-top: 20px; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); }
.card { display: block; padding: 22px; border: 1px solid var(--white-icon-tr); border-radius: 1rem;
  background: var(--card); transition: border-color .3s, transform .3s; }
.card:hover { color: var(--white); border-color: #ffd84d55; transform: translateY(-2px); }
.card b { display: block; font-size: 18px; font-weight: 600; margin-bottom: 4px; }
.card span { color: var(--white-icon); font-size: 14px; }

footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--white-icon-tr);
  color: var(--white-icon); font-size: 14px; display: flex; flex-wrap: wrap; gap: 8px 20px;
  justify-content: space-between; }

@media (max-width: 640px) {
  nav { top: auto; bottom: 12px; }
  nav a { flex: 1 1 0; padding: 8px 6px; font-size: 12px; white-space: normal; line-height: 1.3; }
  main { padding: 24px 16px 110px; }
  .hero { padding: 28px 22px; }
  section { padding: 22px 18px 14px; }
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
    """Body HTML split into the hero (title + lead lines) and one <section> per h2."""
    out, para, items = [], [], []
    in_section = False

    def flush():
        if para:
            out.append(f"<p>{inline(' '.join(para))}</p>")
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
                out.append('<header class="hero">\n<p class="eyebrow">Airlock</p>')
                out.append(f"<h1>{inline(heading.group(2))}</h1>")
                continue
            if level == 2:
                out.append("</section>" if in_section else "</header>")
                out.append("<section>")
                in_section = True
            out.append(f"<h{level}>{inline(heading.group(2))}</h{level}>")
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
    out.append("</section>" if in_section else "</header>")
    return "\n".join(out)


def page(title, lang, current, body):
    links = []
    for dest, _, label in PAGES.values():
        cur = ' aria-current="page"' if dest == current else ""
        links.append(f'<a href="{dest}"{cur}>{label}</a>')
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
<nav>
<a href="index.html"{' aria-current="page"' if current == "index.html" else ""}>Airlock</a>
{chr(10).join(links)}
</nav>
<main>
{body}
<footer><span>Airlock · MIT</span><a href="{REPO}">github.com/kiyomasanaki/airlock</a></footer>
</main>
</body>
</html>
"""


INDEX = """<header class="hero">
<p class="eyebrow">Chrome extension</p>
<h1>Airlock</h1>
<p>An airlock between impulse and action. <strong>100% local, zero telemetry.</strong></p>
</header>
<div class="cards">
<a class="card" href="privacy-policy.html"><b>Privacy policy</b><span>What Airlock stores, and what never leaves your machine.</span></a>
<a class="card" href="legal-notice.html"><b>Legal notice</b><span>Publisher, hosting, licence.</span></a>
</div>"""


def main():
    for src, (dest, lang, _) in PAGES.items():
        md = (DOCS / src).read_text(encoding="utf-8")
        title = re.search(r"^#\s+(.*)", md, re.M).group(1)
        (DOCS / dest).write_text(page(title, lang, dest, to_html(md)), encoding="utf-8")
        print(f"docs/{dest}")
    (DOCS / "index.html").write_text(page("Airlock", "en", "index.html", INDEX), encoding="utf-8")
    # serve the files as they are, without Jekyll processing
    (DOCS / ".nojekyll").write_text("", encoding="utf-8")
    print("docs/index.html")


if __name__ == "__main__":
    main()

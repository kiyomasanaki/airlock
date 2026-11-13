"""Shared reader for the Airlock string files (js/i18n.js, js/locales/*.js).

Each language is one call `airlockAddStrings('<code>', { ...JSON... });`, so the
data can be read here without running JavaScript.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CALL = re.compile(r"airlockAddStrings\('([A-Za-z-]+)',\s*(\{.*?\})\);\s*$", re.S | re.M)


def read_file(path):
    """Returns [(code, dict)] for every airlockAddStrings call in the file."""
    text = Path(path).read_text(encoding="utf-8")
    return [(m.group(1), json.loads(m.group(2))) for m in CALL.finditer(text)]


def read_all():
    """{code: dict} for English (js/i18n.js) and every js/locales/<code>.js."""
    out = dict(read_file(ROOT / "js" / "i18n.js"))
    for f in sorted((ROOT / "js" / "locales").glob("*.js")):
        for code, data in read_file(f):
            if code != f.stem:
                raise SystemExit(f"{f}: declares '{code}', expected '{f.stem}'")
            out[code] = data
    return out


def dump(code, data):
    """Source of js/locales/<code>.js, keys in the given order."""
    body = json.dumps(data, ensure_ascii=False, indent=2)
    return f"// Airlock - {code} strings, loaded by js/i18n.js on demand.\nairlockAddStrings('{code}', {body});\n"

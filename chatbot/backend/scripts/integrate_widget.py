"""
Integrate the chatbot widget into all HTML pages by injecting a script tag
before the closing </body> tag. Safe to run multiple times (idempotent).
"""

import os
import re
import glob
from pathlib import Path

HTML_DIR = Path(__file__).resolve().parent.parent.parent.parent / "html"

WIDGET_MARKER = "<!-- Anyway Flooring Chatbot -->"

WIDGET_SNIPPET = """
<!-- Anyway Flooring Chatbot -->
<script src="{api_url}/widget/chatbot-widget.js" data-api-url="{api_url}" defer></script>
"""


def inject_widget(filepath: str, api_url: str) -> bool:
    """Inject the chatbot widget into an HTML file. Returns True if modified."""
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    if WIDGET_MARKER in content:
        return False

    snippet = WIDGET_SNIPPET.format(api_url=api_url).strip()

    body_close = re.search(r"</body>", content, re.IGNORECASE)
    if body_close:
        insert_pos = body_close.start()
        new_content = content[:insert_pos] + snippet + "\n" + content[insert_pos:]
    else:
        new_content = content + "\n" + snippet

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    return True


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Inject chatbot widget into HTML pages")
    parser.add_argument(
        "--api-url",
        default="https://your-api-domain.com",
        help="Backend API URL (default: https://your-api-domain.com)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be changed without modifying files",
    )
    args = parser.parse_args()

    html_files = (
        glob.glob(str(HTML_DIR / "*.html"))
        + glob.glob(str(HTML_DIR / "**" / "*.html"), recursive=True)
    )

    seen = set()
    unique_files = []
    for f in html_files:
        real = os.path.realpath(f)
        if real not in seen:
            seen.add(real)
            unique_files.append(f)

    modified = 0
    skipped = 0

    for fpath in unique_files:
        basename = os.path.basename(fpath)
        if args.dry_run:
            with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            if WIDGET_MARKER not in content:
                print(f"  [WOULD MODIFY] {basename}")
                modified += 1
            else:
                skipped += 1
        else:
            if inject_widget(fpath, args.api_url):
                modified += 1
            else:
                skipped += 1

    action = "Would modify" if args.dry_run else "Modified"
    print(f"\n{action}: {modified} files")
    print(f"Skipped (already injected): {skipped} files")
    print(f"Total: {modified + skipped} files")

    if args.dry_run:
        print("\nRun without --dry-run to apply changes.")


if __name__ == "__main__":
    main()

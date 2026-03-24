"""
Extract product data and article content from Anyway Flooring HTML pages.
Outputs structured Markdown files for RAG ingestion.
"""

import os
import re
import glob
import json
from pathlib import Path
from bs4 import BeautifulSoup


HTML_DIR = Path(__file__).resolve().parent.parent.parent.parent / "html"
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "data" / "extracted"


def clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def extract_product_page(filepath: str) -> dict | None:
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        soup = BeautifulSoup(f.read(), "lxml")

    name_el = soup.select_one("h1.this-description-name")
    if not name_el:
        return None

    product = {
        "name": clean_text(name_el.get_text()),
        "source_file": os.path.basename(filepath),
        "brand": "",
        "model": "",
        "sku_options": {},
        "specifications": {},
        "description": "",
        "meta_keywords": "",
        "meta_description": "",
    }

    meta_kw = soup.select_one('meta[name="keywords"]')
    if meta_kw:
        product["meta_keywords"] = meta_kw.get("content", "")

    meta_desc = soup.select_one('meta[name="description"]')
    if meta_desc:
        product["meta_description"] = meta_desc.get("content", "")

    for li in soup.select(".pro-info-list li, li.prod-specifics-brand"):
        label_el = li.select_one("label")
        value_el = li.select_one("p")
        if label_el and value_el:
            key = clean_text(label_el.get_text()).rstrip(":")
            val = clean_text(value_el.get_text())
            if "brand" in key.lower():
                product["brand"] = val
            elif "model" in key.lower():
                product["model"] = val

    for row in soup.select("tr.skuParams"):
        th = row.select_one("th")
        if not th:
            continue
        param_name = clean_text(th.get_text())
        options = []
        for btn in row.select("td .description-choose-btns a, td .description-btn-wrap a"):
            opt_text = btn.get("title") or clean_text(btn.get_text())
            if opt_text:
                options.append(opt_text)
        if param_name and options:
            product["sku_options"][param_name] = options

    for table in soup.select(".prodDetail-editor-container table"):
        for tr in table.select("tr"):
            cells = tr.select("td")
            if len(cells) >= 2:
                key = clean_text(cells[0].get_text())
                val = clean_text(cells[1].get_text())
                if key and val:
                    product["specifications"][key] = val

    desc_container = soup.select_one(".prodDetail-editor-container")
    if desc_container:
        paragraphs = []
        for el in desc_container.children:
            if el.name and el.name != "table":
                text = clean_text(el.get_text())
                if text and len(text) > 5:
                    paragraphs.append(text)
        product["description"] = "\n".join(paragraphs)

    return product


def extract_article_page(filepath: str) -> dict | None:
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        soup = BeautifulSoup(f.read(), "lxml")

    title_el = soup.select_one(".articledetail-title h1")
    if not title_el:
        return None

    content_el = soup.select_one(".articledetail-cont")
    if not content_el:
        return None

    content_text = clean_text(content_el.get_text())
    if len(content_text) < 50:
        return None

    return {
        "title": clean_text(title_el.get_text()),
        "content": content_text,
        "source_file": os.path.basename(filepath),
    }


def product_to_markdown(product: dict) -> str:
    lines = [f"# {product['name']}\n"]

    if product["brand"]:
        lines.append(f"**Brand:** {product['brand']}")
    if product["model"]:
        lines.append(f"**Model:** {product['model']}")

    if product["sku_options"]:
        lines.append("\n## Available Options\n")
        for param, opts in product["sku_options"].items():
            lines.append(f"- **{param}:** {', '.join(opts)}")

    if product["specifications"]:
        lines.append("\n## Specifications\n")
        lines.append("| Parameter | Value |")
        lines.append("|-----------|-------|")
        for k, v in product["specifications"].items():
            lines.append(f"| {k} | {v} |")

    if product["description"]:
        lines.append(f"\n## Description\n\n{product['description']}")

    return "\n".join(lines)


def article_to_markdown(article: dict) -> str:
    return f"# {article['title']}\n\n{article['content']}"


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    products_dir = OUTPUT_DIR / "products"
    articles_dir = OUTPUT_DIR / "articles"
    products_dir.mkdir(exist_ok=True)
    articles_dir.mkdir(exist_ok=True)

    html_files = glob.glob(str(HTML_DIR / "*.html"))
    product_sub = glob.glob(str(HTML_DIR / "products" / "*.html"))
    news_sub = glob.glob(str(HTML_DIR / "news" / "*.html"))
    all_files = html_files + product_sub + news_sub

    product_count = 0
    article_count = 0
    catalog = []

    for fpath in all_files:
        basename = os.path.basename(fpath)

        if "-pd" in basename or "-pl" in basename:
            product = extract_product_page(fpath)
            if product:
                slug = Path(basename).stem
                md = product_to_markdown(product)
                out_path = products_dir / f"{slug}.md"
                out_path.write_text(md, encoding="utf-8")
                catalog.append({
                    "type": "product",
                    "name": product["name"],
                    "file": f"products/{slug}.md",
                })
                product_count += 1

        elif "-id" in basename or "news" in fpath.lower():
            article = extract_article_page(fpath)
            if article:
                slug = Path(basename).stem
                md = article_to_markdown(article)
                out_path = articles_dir / f"{slug}.md"
                out_path.write_text(md, encoding="utf-8")
                catalog.append({
                    "type": "article",
                    "title": article["title"],
                    "file": f"articles/{slug}.md",
                })
                article_count += 1

    for page_name in [
        "spc.html", "lvt-flooring.html", "wall-panel.html",
        "spc-herringbone-flooring.html", "water-resistant-laminate-flooring.html",
        "mfb-flooring.html", "mspc-flooring.html", "quickstone-wall-tiles.html",
        "our-story.html", "why-anyway.html", "quality-management.html",
        "oem-odm.html",
    ]:
        fpath = HTML_DIR / page_name
        if fpath.exists():
            article = extract_article_page(str(fpath))
            if article:
                slug = Path(page_name).stem
                md = article_to_markdown(article)
                out_path = articles_dir / f"page-{slug}.md"
                out_path.write_text(md, encoding="utf-8")
                catalog.append({
                    "type": "page",
                    "title": article["title"],
                    "file": f"articles/page-{slug}.md",
                })
                article_count += 1

    catalog_path = OUTPUT_DIR / "catalog.json"
    catalog_path.write_text(json.dumps(catalog, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"Extraction complete:")
    print(f"  Products: {product_count}")
    print(f"  Articles: {article_count}")
    print(f"  Catalog:  {catalog_path}")


if __name__ == "__main__":
    main()

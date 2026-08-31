# Prose agent guide

## Purpose

Apply finished descendant typography, rhythm, and readable measure to trusted React content.

## Use when

- An application, CMS adapter, or Markdown renderer already produced trusted React children that need coherent editorial typography.

## Choose something else when

- Content is untrusted or still needs HTML or Markdown parsing. Use an application-owned sanitizer and parser before Prose.
- A small explicit piece of interface copy needs one recipe. Use Text.
- Content needs editing behavior. Use a source-installed editor composition.

## Required composition

- Pass trusted native React descendants to Prose and let the application own document structure, trust, and data loading.
- Use direct Brick components when richer anatomy or behavior is needed; their classes intentionally override Prose's low-specificity descendant styles.

## Rules

- **MUST:** Sanitize and parse untrusted external content before it becomes Prose children; Prose never makes raw HTML safe.
- **MUST:** Keep heading hierarchy, landmark choice, link destinations, table headers, language, and alternative text application-owned.
- **MUST:** Use the narrow, default, wide, or none reading measure intentionally rather than adding duplicate width CSS.
- **MUST:** Use direct Link, List, Blockquote, Code Block, Table, or Image components when their richer public contract is required, including accessible preserved horizontal scrolling for source or complex tables.
- **MUST:** Load styles.css or core.css plus prose.css.

## Common mistakes

- **Avoid:** Passing unsanitized HTML through dangerouslySetInnerHTML inside Prose. **Instead:** Keep trust and sanitization in the application, then render trusted React children.
- **Avoid:** Using Prose as a generic spacing wrapper around interface controls. **Instead:** Use Stack and Text for interface composition; reserve Prose for editorial descendants.

## Validation checklist

- Confirm native descendant semantics and source order remain unchanged.
- Confirm size and measure, headings, lists, links, quotes, tables, code, media, dark appearance, forced colors, narrow widths, zoom, text spacing, localization, RTL, SSR, refs, and modular CSS delivery.

## Related guidance

- `text`
- `link`
- `list`
- `blockquote`
- `code`
- `code-block`
- `table`
- `image`
- `interface-composition`

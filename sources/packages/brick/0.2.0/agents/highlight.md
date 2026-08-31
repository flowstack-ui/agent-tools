# Highlight agent guide

## Purpose

Discover literal queries in plain text through exact Atom behavior and render finished semantic match styling.

## Use when

- One plain text string needs deterministic visible query matches without recreating escaping, overlap, case, or whole-word behavior.

## Choose something else when

- The relevant passage is already selected by the author. Use Mark.
- Content is arbitrary React nodes or the application needs active result navigation. Use application-owned rich-content traversal or search navigation.

## Required composition

- Pass plain text through text and literal query values through query; keep surrounding sentence typography on Text or another content owner.
- Let Highlight delegate all matching to Atom and keep search input, active result, counters, and navigation in the application.

## Rules

- **MUST:** Use exact Atom Highlight behavior; do not copy or replace its segmentation, escaping, overlap, or exact-match logic.
- **MUST:** Use Highlight only for plain text and literal queries, never by flattening or cloning arbitrary React content.
- **MUST:** Preserve Brick's fixed native span root and Atom-generated native mark matches.
- **MUST:** Select only the documented subtle, solid, or underline variant and accent or neutral tone.
- **MUST:** Keep search state, active-result navigation, counts, keyboard commands, and announcements outside Highlight.
- **MUST:** Load styles.css or core.css plus highlight.css.

## Common mistakes

- **Avoid:** Using Mark or a consumer regular expression to discover query matches. **Instead:** Pass the plain string and literal query to Highlight so exact Atom behavior owns segmentation.

## Validation checklist

- Confirm literal, empty, repeated, overlapping, punctuation, Unicode, case-sensitive, whole-word, and first-match-only inputs preserve original text and copy order.
- Confirm native span and mark output, closed recipes, forced colors, wrap, zoom, text spacing, localization, RTL, SSR, refs, and CSS delivery without focus or interaction.

## Related guidance

- `mark`
- `text`
- `interface-composition`

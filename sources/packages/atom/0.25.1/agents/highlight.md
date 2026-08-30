# Highlight agent guide

## Purpose

Segment plain text against one or more literal queries and render matched text with native mark semantics without owning visual styling or search application state.

## Use when

- Visible plain text needs deterministic, server-safe query highlighting and the styled layer should not recreate matching, overlap, or whole-word behavior.

## Choose something else when

- The emphasis is authored rather than query-driven, the content contains arbitrary React nodes, or the application needs interactive find navigation. Use a native mark or em element, application-owned rich-content traversal, or application-owned search navigation.

## Required composition

- Pass plain text and literal query values to Highlight.Root. Style its root and Highlight.Match slots in Brick, or call findHighlightSegments when another renderer must preserve the same matching contract.

## Rules

- **MUST:** Treat every query as literal text rather than executable regular-expression syntax.
- **MUST:** Use Highlight only for plain text; do not flatten or clone arbitrary React content to search through it.
- **MUST:** Resolve matches from left to right, preferring the longest query at the same offset and authored query order as the final tie breaker.
- **MUST:** Use exactMatch only for Unicode-aware whole-word matching; it is not equality of the complete input string.
- **MUST:** Keep color, decoration, theme variants, result navigation, and search state outside Atom.

## Common mistakes

- **Avoid:** Building a regular expression directly from user-entered search text or duplicating matching in Brick. **Instead:** Pass literal queries to Highlight.Root or findHighlightSegments and let Atom escape and resolve them.
- **Avoid:** Using Highlight to make arbitrary JSX searchable or to control the active search result. **Instead:** Keep rich-content traversal and active-result navigation in the application and use Highlight only at plain-text rendering boundaries.

## Validation checklist

- Verify empty, repeated, overlapping, punctuation, Unicode, case-sensitive, whole-word, and first-match-only inputs preserve the original text and stable offsets.
- Verify Root and Match remain server-safe, emit native span and mark semantics, preserve native props and refs, and introduce no keyboard or focus behavior.
- Verify the exact public subpath, namespace, pure utility, generated Agent Knowledge, and packed Consumer all resolve from the same candidate.

## Related guidance

- `native-element (native-application)`
- `application-state (native-application)`

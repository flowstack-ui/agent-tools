# Feed agent guide

## Purpose

Provide a named ARIA feed of focusable articles with article-to-article keyboard movement, loading state, logical position and size metadata, and safe integration with dynamic or virtualized streams.

## Use when

- A changing, paged, infinite, or virtualized stream of articles needs keyboard movement article by article while people read.

## Choose something else when

- The content is a static set that needs only ordinary list semantics, or items are selectable options or commands rather than articles. Use List or the matching interactive collection primitive.
- Only visual infinite scrolling is needed and article keyboard navigation or feed semantics are not appropriate. Use the semantic collection that matches the content, optionally composed with Virtualizer.

## Required composition

- Give Root an accessible name and truthful busy and setSize state, then render one Item per article with a useful internal heading, stable identity, and accurate one-based position or zero-based index. Compose Virtualizer only when scale justifies windowing and preserve the logical feed contract.

## Rules

- **MUST:** Give Root an accessible name and preserve feed and direct article relationships; give every Item meaningful article content and a useful heading or accessible name.
- **MUST:** Expose accurate one-based positions and the total logical set size, using unknown only when the total truly cannot be known and not merely because a rendered window is partial.
- **MUST:** Set busy while articles are being added or replaced and clear it only after the DOM and position metadata represent the completed update.
- **MUST:** Preserve PageUp and PageDown article movement, Control or Command Home and End movement outside the feed, focus of the target article, nearest scrolling, and consumer preventDefault cancellation.
- **MUST:** Keep each Item focusable by default while allowing focusable descendants, and ensure navigation identifies the containing direct article when focus starts inside it.
- **MUST:** When windowing, keep the current and keyboard target articles mounted or materialize them before focus moves, retain stable keys and logical positions, and remember that Virtualizer supplies measurement rather than feed semantics or loading.

## Common mistakes

- **Avoid:** Using Feed as a visual synonym for any list or reporting the rendered window length as aria-setsize. **Instead:** Use Feed only for article streams and report the logical full set size or genuinely unknown size.
- **Avoid:** Unmounting the focused article during virtualization or setting busy for the entire lifetime of an infinite stream. **Instead:** Preserve or deliberately move focus before unmounting and scope busy to each concrete DOM mutation.

## Validation checklist

- Verify Root naming, direct article roles, meaningful article headings, stable identities, accurate logical positions and known or unknown total size, and busy transitions during mutations.
- Exercise PageUp and PageDown from Items and their descendants, Control and Command Home and End to outside targets, first and last boundaries, nearest scrolling, and consumer preventDefault cancellation.
- Verify native prop, tabIndex, asChild, render, ref, and server/client entrypoint behavior without losing feed or article semantics.
- For paged or virtualized feeds, verify stable keys and full logical metadata and ensure the focused and next navigation target articles exist before focus moves.

## Related guidance

- `list`
- `virtualizer`

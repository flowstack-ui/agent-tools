# Feed agent guide

## Purpose

Present a styled dynamic stream of rich focusable articles while Atom owns feed semantics, busy state, positions, and keyboard movement.

## Use when

- Activity, news, social posts, or rich notifications may change while a person reads and article-by-article keyboard movement is useful.

## Choose something else when

- The sequence is static or has tabular, hierarchical, or purely visual relationships. Use List, Table/DataGrid, Tree, or Stack/Grid according to the relationship.

## Required composition

- Compose direct Feed.Item articles inside one named Feed.Root; give every Item a useful heading or other accessible name, accurate position metadata, and item-local actions that do not turn the article into one whole-row control.
- Compose ScrollArea outside Root only when a Frame or another parent supplies a definite bounded size.
- Use dividerStrength=default only when a compact utility feed needs clearer row separation; preserve the subtle default for ordinary continuous reading.

## Rules

- **MUST:** Use Feed only for a dynamic rich article stream where feed semantics and article keyboard movement improve the experience.
- **MUST:** Keep Feed.Item articles as direct Root children with useful accessible names and accurate positions and totals.
- **MUST:** Set busy only while adding or replacing Feed DOM; do not make a passive feed a live region or treat busy paint as an announcement.
- **MUST:** Keep links, buttons, and menus as independently named descendants; do not make the entire Feed Item a hover or activation target.
- **MUST:** When the stream is bounded, let Frame own the definite size and ScrollArea own overflow outside Feed.Root.
- **MUST:** When an application windows articles, preserve stable identities and full logical positions, keep the focused and next keyboard target articles mounted or materialize them before focus moves, and remember that geometry utilities do not own feed loading or semantics.
- **MUST:** Load styles.css or core.css plus feed.css and every composed child stylesheet.

## Common mistakes

- **Avoid:** Using Feed for any repeated row, putting non-article children directly in Root, or adding aria-live to a passive notification tray. **Instead:** Choose Feed only for a dynamic article stream, keep direct Item anatomy, and reserve live announcements for application-owned asynchronous feedback.

## Validation checklist

- Check Root naming, Item headings, direct article children, positions and totals, busy state, PageUp/PageDown, Control/Command+Home/End, nested control focus, and scroll reveal.
- Check divided, plain, and outline boundaries at narrow widths, zoom, RTL, forced colors, reduced motion, and light/dark appearance.
- For paged or windowed feeds, verify stable keys and full logical metadata and ensure the focused and next PageUp/PageDown target articles exist before focus moves.

## Related guidance

- `@flowstack-ui/atom/agents/feed`
- `list`
- `scroll-area`
- `frame`
- `button`
- `dropdown-menu`

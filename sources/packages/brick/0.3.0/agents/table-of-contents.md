# TableOfContents agent guide

## Purpose

Finished same-document navigation with current-section feedback and optional logical line indicator.

## Use when

- A long document needs a live, explicitly authored section outline.

## Choose something else when

- Destinations navigate routes. Use NavList.
- Items switch content panels. Use Tabs.

## Required composition

- Compose Root > Nav > Title and List > Item > Link. Indicator is a sibling of List inside Nav. RootProvider shares a useTableOfContents controller without adding a DOM host.

## Rules

- **MUST:** Let Atom's controller own tracking, activation, focus and history; never add consumer scroll listeners to repair current state.
- **MUST:** Supply stable unique IDs and heading depths; author localized labels as children. Keep parsing, page layout, sticky offsets and responsive visibility application-owned.
- **MUST:** Give Nav a Title or explicit accessible name. Keep nested Lists inside Item and Indicator outside List. Keep native anchors and one aria-current location per Nav.
- **MUST:** Use responsive sm/md size and plain/line variant with scalar neutral/accent tone. Sparse breakpoint objects inherit sm/plain defaults. Load styles.css or core.css plus table-of-contents.css. Do not add focus gutters or override component geometry in playground CSS.
- **MUST:** Distinguish the article scroll element from Nav's optional bounded rail viewport. Use managed navigation for scoped scrolling, refresh after external layout changes, and preserve controlled activeId authority.

## Common mistakes

- **Avoid:** Using Tabs, multiple current links, a second observer or a sticky page-specific component recipe. **Instead:** Use TableOfContents behavior and compose page layout outside it.

## Validation checklist

- Check current state after clicks and scrolling, final sections, history, keyboard focus, independent rail scrolling, light/dark, RTL, long labels and reduced motion.

## Related guidance

- `nav-list`
- `link`
- `list`
- `scroll-area`
- `collapsible`

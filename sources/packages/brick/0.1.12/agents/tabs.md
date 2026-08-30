# Tabs agent guide

## Purpose

Style related in-page panel switching while Atom owns tab semantics, selection, roving focus, and indicator geometry.

## Use when

- A small set of related panels shares one page and one panel is normally active.

## Choose something else when

- Choices navigate to routes or multiple sections should remain open. Use Link/NavList or Accordion.

## Required composition

- Compose Trigger and optional Indicator inside List with matching Content values inside Root; lay out panel content with Brick components.
- Keep the default panel inset for ordinary copy; use Content inset=none for edge-to-edge media or nested surfaces rather than overriding component CSS.
- When a page-header control row visually continues the tab divider, keep unrelated controls outside List and let the surrounding Brick layout own the continuing decorative Divider.
- Use List triggerRadius=none when line tabs need square underline geometry; the option applies to every variant and changes paint only.
- When vertical tab semantics stay correct but mobile needs full-width content, use responsive Root layout stacked to side; do not change semantic orientation with CSS.
- When the same vertical selector needs a compact mobile grid, use responsive List columns (for example, initial 2 and lg 1) rather than application selectors; keyboard orientation remains vertical.
- When a solid or soft List is nested inside a clipping parent that owns the outer corners, use List radius=none rather than overriding Tabs selectors; add triggerRadius=default only when individual Trigger surfaces should remain rounded.
- Keep the shipped solid and soft List inset at or above the complete focus-ring reach; do not reduce it inside a clipping Card or Surface.

## Rules

- **MUST:** Use Tabs only for related in-page panels, not to imitate a site navigation underline.
- **MUST:** Define a deliberate narrow-width overflow or wrapping policy without clipping triggers or indicator focus.
- **MUST:** Treat List columns as visual placement only; keep DOM order and the semantic orientation that matches the intended arrow keys.
- **MUST:** Treat List radius and Trigger radius as independent visual geometry only; neither may alter inset, selection, focus, orientation, columns, or keyboard behavior.
- **MUST:** For line Tabs, keep active label and icon paint on primary text and reserve accent paint for the selected edge or authored metadata such as Badge.
- **MUST:** Load styles.css or core.css plus tabs.css.

## Common mistakes

- **Avoid:** Using Tabs for routes, putting sorting or actions inside List to extend its divider, clipping focus/indicator edges, or mismatching Trigger and Content values. **Instead:** Use navigation links for routes, keep unrelated controls outside the tablist, continue shared decorative edges with the surrounding Brick layout, and keep complete paired tab anatomy.

## Validation checklist

- Check automatic/manual activation, arrows, Home/End, Enter/Space, disabled, controlled, keep-mounted, overflow, complete focus rings at every List edge and inside clipping parents, themes, zoom, and RTL.
- Confirm CSS is loaded.

## Related guidance

- `accordion`
- `navigation-menu`
- `bottom-navigation`
- `scroll-area`

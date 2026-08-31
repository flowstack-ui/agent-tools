# Breadcrumb agent guide

## Purpose

Present page ancestry as a finished named navigation trail while preserving Atom breadcrumb semantics.

## Use when

- Users need to see the current page's place in a hierarchy and navigate to ancestors.

## Choose something else when

- The relationship is result pagination, local panels, or general navigation. Use Pagination, Tabs, or NavList.

## Required composition

- Compose Root > List with Item containing ancestor Link or the one current Page, separated by decorative Separator; use an accessible button when Ellipsis is interactive.

## Rules

- **MUST:** Render one current Page and keep ancestor destinations as Links.
- **MUST:** Load styles.css or core.css plus breadcrumb.css.

## Common mistakes

- **Avoid:** Recreating the trail with spans and manual separators or making the current page a link. **Instead:** Use the complete Breadcrumb anatomy and its current Page part.

## Validation checklist

- Check landmark naming, current state, collapsed hierarchy, focus rings, overflow, zoom, and RTL.
- Confirm separators are decorative and CSS is loaded.

## Related guidance

- `link`
- `pagination`
- `nav-list`

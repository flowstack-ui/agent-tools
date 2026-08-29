# NavList agent guide

## Purpose

Style persistent route navigation with current state, optional section labels, and collapsible grouped content.

## Use when

- A sidebar, drawer, rail, or page region contains a persistent list of destinations, optionally grouped.

## Choose something else when

- Navigation uses top-bar disclosure panels or local tab panels. Use NavigationMenu or Tabs.

## Required composition

- Compose Root > List > Item > Link; use SectionLabel for static groups and add SectionTrigger plus SectionContent only for real collapsible groups. Pass decorative artwork directly to Link or SectionTrigger startIcon so NavList owns its size and alignment. When repeated rows need Dividers, each Item owns its complete row or collapsible Section before the following boundary.

## Rules

- **MUST:** Set current destination state from the route and keep route items as links.
- **MUST:** Use NavList's section and item anatomy rather than rebuilding rows, badges, icons, and collapse behavior with arbitrary divs.
- **MUST:** Pass decorative artwork directly to Link or SectionTrigger startIcon; those parts own the wrapper, size, and first-label-line alignment. Do not compensate with consumer margins or transforms.
- **MUST:** Keep decorative artwork in startIcon/endIcon; when a count or Badge is meaningful content, compose it with the label inside one Brick HStack within Link so the complete row remains one destination.
- **MUST:** Place a Divider after the complete navigation item or collapsible section it separates; never place it between a SectionTrigger and the SectionContent that trigger controls, and keep repeated boundaries under one consistent layout owner.
- **MUST:** Let SectionLabel use NavList's size-aware typography and logical leading-column alignment; use the logical row-padding tokens only when navigation rows need independent alignment with a surrounding shell, and do not shift indicators with margins or transforms.
- **MUST:** Load styles.css or core.css plus nav-list.css.

## Common mistakes

- **Avoid:** Using buttons for routes, wrapping decorative artwork in a second Icon size owner, placing meaningful metadata in aria-hidden icon slots, adding a collapsible trigger that controls no content, placing a Divider between a trigger and the SectionContent that trigger controls, or moving disclosure indicators with positional CSS. **Instead:** Use Link for destinations, pass raw decorative artwork to startIcon, compose meaningful row content inside Link, keep a collapsible Section intact before its boundary, and let SectionLabel own group-title alignment.

## Validation checklist

- Check current, hover, focus, collapsed, expanded, disclosure motion, section-label alignment, complete-group divider placement, long labels, icons, counts, zoom, narrow widths, and RTL.
- Confirm links and section relationships remain semantic and CSS is loaded.

## Related guidance

- `sidebar`
- `drawer`
- `navigation-menu`
- `link`
- `divider`

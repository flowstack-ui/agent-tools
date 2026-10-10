# AppBar agent guide

## Purpose

Provide a finished top surface and one-row start, geometrically centered, and end alignment structure built on Atom AppBar.

## Use when

- A page or application header needs branding, navigation, location, search, or persistent actions on one top surface.

## Choose something else when

- The need is a complete responsive shell, navigation system, or grouped-control keyboard model. Use AppBar composed with Show/Hide, NavigationMenu or NavList, Drawer, and Toolbar as appropriate.

## Required composition

- Root renders a semantic header by default. For a contained full-bleed bar, compose Root > Container > Toolbar inset=none > Start, Center, and End so Container alone owns the page gutter; omit Container only when Toolbar should use the full available width.

## Rules

- **MUST:** Keep AppBar.Root's default header when it owns page or application banner content; use asChild or render only when another semantic or neutral host is intentionally required, such as non-banner chrome inside a Drawer.
- **MUST:** Place Container between Root and Toolbar when the AppBar surface should remain full bleed while its content uses a bounded measure, and set Toolbar inset to none so Container alone owns the gutter; do not cap Root itself or recreate Toolbar geometry.
- **MUST:** Do not treat AppBar.Toolbar as an ARIA toolbar; compose Toolbar for grouped-control keyboard behavior.
- **MUST:** Keep application-specific visibility and wrapping policy outside AppBar and implement it with Brick responsive/layout components.
- **MUST:** When application layout references an App Bar density measurement, use the matching public comfortable or compact minimum block-size token instead of repeating Brick's value; allow the rendered bar and adjacent content to grow under zoom or enlarged content.
- **MUST:** Load styles.css or core.css plus app-bar.css.
- **MUST:** Use responsive layout, density, inset and gap props rather than layout CSS. Balanced keeps a geometric center; flex gives Center remaining width and End logical-end alignment. Sections accept gap. Reduce optional content with Show/Hide before controls overlap; checking page overflow alone is insufficient.
- **MUST:** Use elevation none/low/medium/high for semantic shadows; explicit elevation overrides elevated. Responsive offset sets logical block-start positioning only and never reserves page space. Body offsets and scroll policy remain application-owned.
- **MUST:** Accent solid AppBar adapts neutral ghost Button and IconButton colors. Preserve explicit non-ghost variants and compose overlays with their owning components.
- **MUST:** Use treatment translucent for an opt-in preset; backgroundOpacity, backdropBlur, backdropSaturate, borderColor and borderOpacity independently tune the painted root. Exact px/rem/em blur values need no token. Preserve semantic foregrounds, native overflow and portalled popup ownership; backdrop filtering contains positioned descendants. Instance effect inputs do not inherit into nested owners. Theme defaults tune opted-in presets only.

## Common mistakes

- **Avoid:** Hand-building a header row with div and flex CSS, assuming Root defaults to div, capping the full AppBar surface with application width CSS, double-insetting contained Toolbar content, or expecting AppBar to create menus and breakpoints. **Instead:** Use Root's default header for banner content, place Container around Toolbar with Toolbar inset set to none when Container owns the gutter, and compose the dedicated navigation, layout, and visibility owners inside it.

## Validation checklist

- Check the final Root element and landmark ownership, including non-banner composed hosts.
- Check geometric centering with unequal side content, truncation, zoom, narrow widths, and RTL.
- Confirm contained App Bars have one page-gutter owner rather than stacked Container and Toolbar insets.
- Confirm landmark names, actions, navigation, and modular CSS are complete.
- Verify unchanged default and legacy blurred paint, independent effect inputs, nested instances, transparent levels, unsupported filters, reduced transparency and forced colors. Do not claim opaque Theme contrast validation proves contrast over arbitrary backdrops.

## Related guidance

- `container`
- `toolbar`
- `navigation-menu`
- `nav-list`
- `drawer`
- `show`
- `hide`
- `stack`

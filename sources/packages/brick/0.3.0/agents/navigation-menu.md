# NavigationMenu agent guide

## Purpose

Present polished disclosure navigation while Atom owns trigger geometry, viewport positioning, focus, keyboard, pointer, and dismissal behavior.

## Use when

- A top-level site or product navigation combines direct links with disclosure panels of related destinations.

## Choose something else when

- The content is an action menu, persistent route rail, mobile drawer, or tab switcher. Use DropdownMenu, NavList, Drawer, or Tabs.

## Required composition

- Compose Root > List > Item containing Link or Trigger plus Content, with Viewport and optional Indicator/Arrow according to the documented anatomy; lay out content with Brick components.
- Set Root viewport=false and omit Viewport and Indicator for non-viewport panels. They stay in the Item DOM without changing the navigation row. Use Viewport for collision-aware placement. Use useNavigationMenu with RootProvider for external control; Context exposes public state/actions. Content forwards its ref to the real host.

## Rules

- **MUST:** Let Content supply destination Link presentation; List resets nested top-level links to control. Explicit control/destination/panel variants win. Use tight Stack gaps, default sm Content inset for compact lists and md for rich grids. Do not use width=100% or control-radius overrides to repair row composition. Use List surface=raised for a coordinated standalone bar, or the default transparent inside a header; avoid duplicate Surface paint. Contrast is stronger neutral emphasis, not an inverse appearance. Use Appearance around Root for a light/dark boundary.
- **MUST:** Keep Indicator and Viewport inside the Root-owned coordinate system and let Atom's measured trigger and viewport geometry position them; use documented NavigationMenu tokens and public parts for visual customization.
- **MUST:** Let Atom position Viewport: anchor=trigger follows the active trigger by default; anchor=navigation aligns to the navigation Root. Both retain collision handling. Do not position it against the page header with application CSS.
- **MUST:** Use Viewport align=start/center/end and collisionPadding for supported alignment; do not invent Popover side, sideOffset or alignOffset props.
- **MUST:** Keep contents focused on navigation destinations rather than commands or unrelated marketing panels.
- **MUST:** Use Link variant=panel with one direct Surface child when one rich destination should own the complete clickable area; let Surface own inset, radius, border, elevation, and background, and keep all composed children non-interactive and concise.
- **MUST:** Preserve the panel Link's focus fallback; with a direct Surface the ring follows that Surface, and without one the Link itself must remain visibly focused.
- **MUST:** In React Server Components, import the component subpath as import * as NavigationMenu from @flowstack-ui/brick/navigation-menu; use the legacy root-package runtime object only inside a client-owned module.
- **MUST:** Load styles.css or core.css plus navigation-menu.css and every child component stylesheet.
- **MUST:** Use neutral/accent/contrast navigation tones, not status colors. Tone controls trigger and inner-link interaction paint, not the neutral panel surface. Use Root size/variant/tone, Trigger variant/tone/radius, Link controlVariant/tone/radius, Content inset and Viewport radius before custom CSS. Trigger indicator is the sole replacement switch: undefined default, null none, custom replaces; never infer suppression from children.
- **MUST:** NavigationMenu.Indicator retains its moving navigation geometry and border/fill artwork. Its default triangle base derives from the shared --brick-overlay-arrow-size seed (12px square-equivalent). Override --brick-navigation-menu-indicator-size for a local base width; do not substitute a popup Arrow or apply popup gutter semantics.

## Common mistakes

- **Avoid:** Anchoring the panel or arrow to the logo/page, adding custom hover state that fights Atom, or applying Popover-style offset props that NavigationMenu does not own. **Instead:** Keep Viewport and Indicator under Root, let NavigationMenu own geometry and open state, then customize documented recipes, tokens, and public parts.
- **Avoid:** Adding use client to an entire Next page only to dereference the legacy NavigationMenu runtime object. **Instead:** Use the RSC-safe module-namespace subpath so only the interactive Navigation Menu parts remain client-owned.
- **Avoid:** Placing a small link inside a separately clickable-looking Surface, styling NavigationMenu.Link as a duplicate Surface, or nesting a Link or Button inside NavigationMenu.Link. **Instead:** Wrap one direct Surface child with the panel Link so the anchor owns interaction and Surface owns container paint and geometry.

## Validation checklist

- Check the second inline trigger, end-aligned arrow base, and horizontal RTL down/up chevron. Compose asChild with an unstyled anchor/router link, not another styled Brick Link that overwrites navigation recipe attributes.
- Test hover, click, focus, arrow keys, Escape, outside interaction, links, viewport transitions, active-trigger centering, boundary collision, arrow alignment, zoom, narrow widths, and RTL.
- Confirm destination semantics, Root-relative geometry, panel focus fallback, documented customization hooks, and CSS delivery.
- In a React Server Component consumer, confirm the module-namespace form passes a production prerender without promoting the page to use client.
- Check retained hidden/inert state, inline and shared refs, nested Sub overrides, pointer-only policy flags, canceled selection/outside events, RootProvider/controller and ItemIndicator. Activity requires React 19.2+.

## Related guidance

- `app-bar`
- `nav-list`
- `drawer`
- `dropdown-menu`
- `link`
- `interface-composition`

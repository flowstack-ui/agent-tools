# NavigationMenu agent guide

## Purpose

Present polished disclosure navigation while Atom owns trigger geometry, viewport positioning, focus, keyboard, pointer, and dismissal behavior.

## Use when

- A top-level site or product navigation combines direct links with disclosure panels of related destinations.

## Choose something else when

- The content is an action menu, persistent route rail, mobile drawer, or tab switcher. Use DropdownMenu, NavList, Drawer, or Tabs.

## Required composition

- Compose Root > List > Item containing Link or Trigger plus Content, with Viewport and optional Indicator/Arrow according to the documented anatomy; lay out content with Brick components.

## Rules

- **MUST:** Keep Indicator and Viewport inside the Root-owned coordinate system and let Atom's measured trigger and viewport geometry position them; use documented NavigationMenu tokens and public parts for visual customization.
- **MUST:** Let the horizontal Viewport use Atom's active-trigger-centered, collision-aware position; do not re-center it on the full Navigation Menu list or page header.
- **MUST:** Do not invent overlay props such as side, align, sideOffset, or alignOffset; NavigationMenu does not expose the floating-overlay positioning API.
- **MUST:** Keep contents focused on navigation destinations rather than commands or unrelated marketing panels.
- **MUST:** Use Link variant=panel with one direct Surface child when one rich destination should own the complete clickable area; let Surface own inset, radius, border, elevation, and background, and keep all composed children non-interactive and concise.
- **MUST:** Preserve the panel Link's focus fallback; with a direct Surface the ring follows that Surface, and without one the Link itself must remain visibly focused.
- **MUST:** In React Server Components, import the component subpath as import * as NavigationMenu from @flowstack-ui/brick/navigation-menu; use the legacy root-package runtime object only inside a client-owned module.
- **MUST:** Load styles.css or core.css plus navigation-menu.css and every child component stylesheet.

## Common mistakes

- **Avoid:** Anchoring the panel or arrow to the logo/page, adding custom hover state that fights Atom, or applying Popover-style offset props that NavigationMenu does not own. **Instead:** Keep Viewport and Indicator under Root, let NavigationMenu own geometry and open state, then customize documented recipes, tokens, and public parts.
- **Avoid:** Adding use client to an entire Next page only to dereference the legacy NavigationMenu runtime object. **Instead:** Use the RSC-safe module-namespace subpath so only the interactive Navigation Menu parts remain client-owned.
- **Avoid:** Placing a small link inside a separately clickable-looking Surface, styling NavigationMenu.Link as a duplicate Surface, or nesting a Link or Button inside NavigationMenu.Link. **Instead:** Wrap one direct Surface child with the panel Link so the anchor owns interaction and Surface owns container paint and geometry.

## Validation checklist

- Test hover, click, focus, arrow keys, Escape, outside interaction, links, viewport transitions, active-trigger centering, boundary collision, arrow alignment, zoom, narrow widths, and RTL.
- Confirm destination semantics, Root-relative geometry, panel focus fallback, documented customization hooks, and CSS delivery.
- In a React Server Component consumer, confirm the module-namespace form passes a production prerender without promoting the page to use client.

## Related guidance

- `app-bar`
- `nav-list`
- `drawer`
- `dropdown-menu`
- `link`
- `interface-composition`

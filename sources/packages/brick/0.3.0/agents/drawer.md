# Drawer agent guide

## Purpose

Present a finished modal side sheet while Atom owns focus, dismissal, portal, scroll-lock, and labeling behavior.

## Use when

- A temporary modal task or navigation panel should enter from a screen edge.

## Choose something else when

- The side region is persistent layout or the overlay has no edge meaning. Use Sidebar or Dialog.

## Required composition

- Compose Trigger and Portal with sibling Overlay and Positioner; place Content inside Positioner. Use Header, Title, Body, Footer and authored CloseButton. Context supplies open/setOpen without another state owner.
- Title is a native heading rather than a polymorphic layout host. Use its as prop to choose the heading level; do not pass a multi-element brand or layout through asChild. When the surface intentionally has no visible heading, give Content an explicit accessible name such as aria-label="Mobile navigation".

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use Drawer parts rather than hand-building overlay, focus trap, Escape, outside interaction, or portal behavior.
- **MUST:** Give Content an accessible name with a concise Title or, when no visible heading is appropriate, an explicit aria-label or aria-labelledby on Content.
- **MUST:** Choose size and placement from content needs: use xl when content may need the viewport but should shrink when short, and full only when the surface must always fill it.
- **MUST:** Let top and bottom Drawers grow naturally to their selected size cap; keep long overflow in Drawer.Body instead of forcing a fixed application height.
- **MUST:** Use Footer justify for simple action distribution, a Brick layout component inside Footer for complex grouping, and Button fullWidth only when the action itself should fill the row.
- **MUST:** In React Server Components, import the component subpath as import * as Drawer from @flowstack-ui/brick/drawer; use the legacy root-package runtime object only inside a client-owned module.
- **MUST:** Load styles.css or core.css plus drawer.css.
- **MUST:** Use Positioner inset for offset panels. For container geometry pair absolute Positioner and Overlay inside a positioned region; Portal alone does not contain geometry. Container geometry does not scope document modality.
- **MUST:** Size and placement accept sparse ResponsiveValue with xs/end defaults. Use CSS-only responsive values on one Content tree. Choose full only when the whole available region must fill.
- **MUST:** Nonmodal is opt-in via modal=false. Omit Overlay; Positioner leaves its empty area pointer-transparent. trapFocus and preventScroll default to modal. Use cancelable Escape/outside events rather than rebuilding dismissal.

## Common mistakes

- **Avoid:** Building a mobile menu as an absolutely positioned div or placing Close outside the labeled content hierarchy. **Instead:** Use Drawer anatomy and compose the menu content with Brick navigation and layout components.
- **Avoid:** Adding use client to an entire Next page only to dereference the legacy Drawer runtime object. **Instead:** Use the RSC-safe module-namespace subpath so only Drawer remains client-owned.
- **Avoid:** Using asChild on Title or treating a brand lockup as a heading. **Instead:** Keep branding in the visual header and name Content explicitly when there is no concise visible title.

## Validation checklist

- Test labeling, initial focus, focus containment/return, Escape, overlay, Close, scroll lock, content growth and capped Body overflow, touch, reduced motion, narrow screens, and nested portals.
- Confirm CSS and every composed child component stylesheet are loaded.
- In a React Server Component consumer, confirm the module-namespace form passes a production prerender without promoting the page to use client.
- Verify retained DOM/input state, Context actions, responsive edges, container bounds, nonmodal background interaction, cancelable dismissal and named documentation parts.

## Related guidance

- `sidebar`
- `dialog`
- `nav-list`
- `stack`
- `show`
- `hide`

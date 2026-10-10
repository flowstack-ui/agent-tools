# Collapsible agent guide

## Purpose

Reveal one independent in-flow region while Atom owns disclosure state, relationships, keyboard behavior, and measured mount lifecycle.

## Use when

- One control should progressively reveal one related region without creating an overlay or modal interaction.

## Choose something else when

- Several named peer sections form one coordinated set. Use Accordion.
- The temporary content must layer, dismiss outside, lock scroll, or contain focus. Use Dialog, Drawer, Popover, or Menu according to the interaction.

## Required composition

- Compose Root with one Trigger and one Content; put ContentInner inside Content so visible padding does not corrupt measured animation geometry.
- Use Indicator inside Trigger for the canonical decorative state cue; the default points down while closed and up while open, and normal Brick layout and content components belong inside ContentInner.
- Use Trigger iconOnly for a square, centered disclosure control; give it a complete accessible name and let the Root size own its target.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use Root, Trigger, Content, and ContentInner rather than rebuilding disclosure state, ARIA relationships, measurement, or animation lifecycle.
- **MUST:** Use Trigger highlight=none to remove hover/open backgrounds while retaining focus. For a finished Button or IconButton, compose Trigger unstyled asChild so the child alone owns visuals. asChild by itself does not remove the Trigger recipe. Root unstyled is independent and removes only the containing visual/layout recipe.
- **MUST:** Keep visible padding in ContentInner rather than Content so Atom can measure and animate the region accurately. Use ContentInner inset=none and asChild when a Brick layout should own spacing. Use Content motion=none for an immediate reveal, not application animation overrides.
- **MUST:** Use Collapsible for in-flow disclosure, not as a substitute for modal Drawer behavior or responsive Show/Hide policy.
- **MUST:** Root lazyMount and unmountOnExit default true. Set unmountOnExit=false to retain state after first opening; lazyMount=false also mounts before first opening. keepMounted is deprecated and explicitly overrides both options with a conflict warning. Partial collapsedHeight/collapsedWidth previews stay mounted but are inert and aria-hidden while closed: keep required summaries/actions outside Content. Activity pauses hidden effects on React 19.2+; older React falls back to display-none without pausing effects. Size and variant accept sparse responsive objects.
- **MUST:** Consume Atom's live content width and height variables for Brick motion across responsive reflow and intrinsic content changes; never hard-code a stale measured dimension or animate a competing wrapper.
- **MUST:** Load styles.css or core.css plus collapsible.css.
- **MUST:** Keep the default Indicator pointing down while closed and up while open in both LTR and RTL; use custom decorative artwork only for a deliberate alternate state language.
- **MUST:** Use Trigger iconOnly instead of sizing a general Trigger with layout wrappers when the disclosure control contains only artwork.

## Common mistakes

- **Avoid:** Using Collapsible Trigger asChild around a finished Button or IconButton without unstyled. **Instead:** Add Trigger unstyled to delegate visuals. Do not add iconOnly or highlight in this mode; the child recipe owns those decisions.
- **Avoid:** Forcing a normal Trigger into a square with Frame or local alignment CSS. **Instead:** Use Trigger iconOnly so its Root size supplies square geometry and centered artwork.
- **Avoid:** Putting padding on Content or animating an application wrapper independently. **Instead:** Keep Content as the measured motion boundary and put visible spacing in ContentInner.
- **Avoid:** Choosing Collapsible when the page must be inert behind the open panel. **Instead:** Use Drawer or Dialog so Atom can own modal isolation, focus, dismissal, and scroll locking.

## Validation checklist

- Test the accessible Trigger name, aria-expanded/aria-controls relationship, Enter and Space, controlled and uncontrolled state, disabled behavior, focus retention, the default down/up Indicator state, and icon-only centering.
- Test default unmount, keepMounted hidden descendants, initial-open state, open/close measurement, dynamic and responsive width/height changes, exit presence, reduced motion, long labels, narrow widths, RTL, and horizontal overflow without unintended page-load entrance motion.
- Test RootProvider/useCollapsible/Context, IDs, partial inertness, cancelled exits, nested orientation and indicators, Button composition, all highlight modes, inset=none, motion=none and Activity runtime support. Use Root unstyled when removing containing geometry; plain is not behavior-only.

## Related guidance

- `@flowstack-ui/atom/agents/collapsible`
- `accordion`
- `drawer`
- `app-bar`
- `nav-list`
- `show`
- `hide`
- `stack`

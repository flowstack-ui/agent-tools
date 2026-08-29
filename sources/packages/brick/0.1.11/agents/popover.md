# Popover agent guide

## Purpose

Present a finished compact click-open interactive panel anchored to a trigger or explicit anchor while Atom owns placement, dismissal, focus, portal, and optional modal behavior.

## Use when

- A trigger needs a small contextual panel for details, filters, or compact editing that belongs near its point of invocation.

## Choose something else when

- The content is noninteractive help, a passive hover preview, a command or option collection, or a larger blocking task. Use Tooltip, HoverCard, Menu, Select or Combobox, or Dialog.
- The task should enter from a screen edge or remain as persistent page content. Use Drawer or an in-page Brick composition.

## Required composition

- Compose Popover.Root with Popover.Trigger and Popover.Portal; add Popover.Anchor only when positioning must reference an element other than Trigger. Inside Popover.Content, arrange Header with Title and optional Description, Body, Footer, and Close as needed; keep Arrow as a direct Content child.
- Use density=compact for concise filter and utility panels. When a local Appearance scope owns the trigger, portal into that scope or apply the same Appearance to Content because ordinary portal ancestry does not preserve the local theme boundary.

## Rules

- **MUST:** Use Brick Popover for compact click-open interactive work; choose Menu, Select, or Combobox when the panel's job is command or option selection, and Dialog for a larger blocking workflow.
- **MUST:** Keep Trigger and portalled Content inside one Root, use Anchor only for a distinct positioning reference, and use the public structure parts instead of recreating panel spacing or hierarchy with private selectors.
- **MUST:** Give Content an accessible name with one visible Title or an explicit native aria-label or aria-labelledby; add Description or native aria-describedby only when descriptive text is present.
- **MUST:** Keep the default non-modal behavior for ordinary attached work; set modal only when the compact panel must trap focus, isolate the background, and lock document scrolling.
- **MUST:** Provide a visible Close when modal is enabled or when outside interaction, Escape, and trigger toggling do not make the dismissal path obvious.
- **MUST:** Use the owned initial and final focus targets and onInteractOutside preventDefault contract when customization is required; do not replace Atom's focus-out, Escape, completed-interaction, restoration, and nested-layer handling.
- **MUST:** Use the comfortable default for ordinary contextual work and density=compact for concise filter and utility panels; do not recreate compact rhythm with private selectors.
- **MUST:** When Content leaves a local Appearance scope through Portal, reproduce that scope on the portalled visual root or target a container inside it.
- **MUST:** Style from resolved data-side and available-size variables, keep Arrow as a direct Content child, and preserve its shared border and surface paint instead of assuming requested placement or independently recoloring it.
- **SHOULD:** Keep the panel compact and verify collision shifts and flips, constrained scrolling, action reachability, zoom, touch input, narrow viewports, and LTR and RTL placement.
- **MUST:** Load styles.css or core.css plus popover.css.

## Common mistakes

- **Avoid:** Hand-positioning a floating div, using Popover for a menu or tooltip, forcing it modal for every utility panel, or closing it with ad hoc document listeners. **Instead:** Choose by interaction job, use complete Popover anatomy, keep ordinary popovers non-modal, and use the preventable outside-interaction contract.
- **Avoid:** Assuming portalled Content inherits a nearby Appearance scope or placing Arrow inside an authored viewport wrapper. **Instead:** Make the portal scope explicit and keep Arrow directly under Content so placement and finished surface paint remain intact.

## Validation checklist

- Verify trigger and Content naming, controlled and disabled state, keyboard, pointer, and touch opening, initial focus, Tab behavior, Close, Escape, outside interaction, focus-out dismissal, outside focus destination, and trigger restoration.
- Verify explicit Anchor positioning, collision shifts and flips at every supported side, LTR and RTL, available-size variables, direct Arrow geometry, constrained scrolling, nested portalled controlled layers, zoom, and narrow viewports.
- When modal is enabled, verify a visible close path, focus containment, background isolation, scroll lock, and exit presence; check light and dark Appearance on actual portalled Content and required CSS.

## Related guidance

- `@flowstack-ui/atom/agents/popover`
- `dialog`
- `drawer`
- `dropdown-menu`
- `select`
- `combobox`
- `hover-card`
- `tooltip`
- `appearance`

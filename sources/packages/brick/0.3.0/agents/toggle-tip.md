# ToggleTip agent guide

## Purpose

Compact optional help deliberately opened by click or tap using Popover behavior.

## Use when

- A small explanation needs explicit keyboard or touch activation.

## Choose something else when

- Help is essential, passive hover text, or a larger form. Use Visible text, Tooltip, or Popover.

## Required composition

- Root > Trigger asChild + Portal > Content > Body. Give Content a Title inside Body or an explicit accessible label. Arrow stays directly under Content. Compose IconButton for an info trigger; no InfoTip export.
- Content size xs/sm/md/lg changes complete typography and padding, defaults xs. Radius defaults sm. Root and useToggleTip default gutter to 4 but honor overrides. Use the original controller with RootProvider.
- Shared parts retain Popover props. Inline rendering pairs Portal disabled with Root portalled=false. Reproduce local Appearance on the portal target or Content.

## Rules

- **MUST:** Keep dialog semantics and managed focus. Name the trigger independently and name Content with Title or native ARIA. Do not use role=tooltip for interactive content.
- **MUST:** Use Body for padding and scrolling; keep Arrow outside Body as a direct Content child. Do not patch compact geometry with application CSS.
- **MUST:** Provide an explicit Close if normal dismissal is disabled; choose Popover for larger or modal workflows.
- **MUST:** Load styles.css or core.css plus toggle-tip.css and composed trigger styles. Behavior stays with Popover; do not add local listeners, timers or focus effects.
- **MUST:** Overlay arrows share a 12px square-equivalent seed (--brick-overlay-arrow-size), exposed-edge artwork and owner surface/border paint. Prefer the shipped Arrow; do not add directional filters or translations. SVG Arrow width/height remain supported; positioning gutter measures the empty gap to the tip. Explicit positioning.offset remains raw. ToggleTip inherits Popover; Select/MultiSelect retain span hosts. NavigationMenu Indicator remains separately positioned.

## Common mistakes

- **Avoid:** Treating compact help as a Tooltip or using it for required instructions. **Instead:** Retain Popover dialog semantics and render essential guidance visibly.

## Validation checklist

- Check keyboard/touch opening, naming, focus return, outside/Escape, link access, sizes, arrow, RTL, narrow width, appearances and nesting.

## Related guidance

- `popover`
- `tooltip`
- `icon-button`
- `appearance`

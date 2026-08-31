# ToggleGroup agent guide

## Purpose

Coordinate a related set of single- or multiple-selection pressed commands with shared Brick recipes and Atom keyboard behavior.

## Use when

- Related view, formatting, filter, or presentation commands need a visible pressed state and arrow-key movement.

## Choose something else when

- One independent command toggles, a form submits one required choice, or the selection changes the displayed panel. Use Toggle, RadioGroup, or Tabs according to the user job.

## Required composition

- Compose named Item controls directly inside Root, choose single or multiple value semantics deliberately, and let Root own the shared variant, tone, size, shape, attachment, and width policy.
- Use iconOnly only when an Item contains an icon with a complete accessible name; keep visible labels when the icon is not universally understood.

## Rules

- **MUST:** Choose single or multiple mode from the command model and keep the value and onValueChange types consistent with that choice.
- **MUST:** Do not use ToggleGroup for a form choice that requires radio semantics, validation, or ordinary form submission.
- **MUST:** Give Root an accessible name when surrounding context is insufficient and give every Item a stable complete name.
- **MUST:** Give every Item a stable unique value, route controlled changes through onValueChange, and keep string values for single mode and string-array values for multiple mode.
- **MUST:** Preserve one roving Tab stop, DOM-order registration, disabled-item skipping, looping policy, orientation-specific Arrow keys, Home/End, and horizontal RTL mirroring.
- **MUST:** Use accent or neutral tone for selection emphasis; do not use semantic status colors to imply error, success, warning, or danger.
- **MUST:** Choose wrapping, orientation, or an alternative narrow layout without changing DOM order or clipping focus; attached groups do not wrap.
- **MUST:** Load styles.css or core.css plus toggle-group.css.

## Common mistakes

- **Avoid:** Using ToggleGroup as visual tabs, omitting the group name, or styling every Item independently so selected states drift. **Instead:** Use Tabs for panels, name the command group, and configure the shared variant and tone on Root.

## Validation checklist

- Check single and multiple values, pressed state, arrows, Home and End, looping, disabled-item skipping, and controlled behavior.
- Check wrapping or vertical layout, touch targets, focus visibility, themes, zoom, and RTL.

## Related guidance

- `@flowstack-ui/atom/agents/toggle-group`
- `toggle`
- `radio-group`
- `checkbox-group`
- `switch`
- `tabs`
- `toolbar`
- `icon`

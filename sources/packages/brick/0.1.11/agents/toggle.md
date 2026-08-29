# Toggle agent guide

## Purpose

Present one persistent pressed or unpressed command with Brick recipes and Atom-owned button behavior.

## Use when

- One command such as Favorite, Pin, Bold, or Show completed needs a persistent pressed state.

## Choose something else when

- Related pressed commands need shared selection and arrow navigation. Use ToggleGroup.
- A momentary action, submitted choice, boolean setting, or panel switch is required. Use Button, Checkbox, Switch, or Tabs according to the job.

## Required composition

- Keep one stable visible or accessible name across pressed states; use iconOnly only with a complete accessible name.
- Choose variant for the selected-state treatment and accent or neutral tone for its emphasis before applying local customization.

## Rules

- **MUST:** Use Toggle only when the same command meaning remains valid in pressed and unpressed states.
- **MUST:** Use accent or neutral tone for selection emphasis; do not use semantic status colors to imply error, success, warning, or danger.
- **MUST:** Preserve Atom-owned native button semantics, aria-pressed state, activation, disabled behavior, and composition.
- **MUST:** Use pressed with onPressedChange for controlled state or defaultPressed for uncontrolled state, and keep one stable command name across both aria-pressed states.
- **MUST:** When using asChild or render, preserve one element with Atom props, handlers, refs, tab stop, Enter and Space activation, button semantics, and disabled exposure.
- **MUST:** Load styles.css or core.css plus toggle.css.

## Common mistakes

- **Avoid:** Using Toggle as Checkbox, Switch, Button, or a visual tab, or changing its accessible name with state. **Instead:** Select the component matching the interaction and keep Toggle's command name stable.

## Validation checklist

- Check pointer and keyboard activation, controlled and uncontrolled state, stable naming, disabled state, and complete icon-only names.
- Check every adopted variant and accent/neutral tone in light, dark, forced colors, narrow layouts, zoom, and RTL.

## Related guidance

- `@flowstack-ui/atom/agents/toggle`
- `toggle-group`
- `toolbar`
- `button`
- `checkbox`
- `switch`
- `tabs`

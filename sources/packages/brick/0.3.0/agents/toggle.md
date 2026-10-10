# Toggle agent guide

## Purpose

Present one persistent pressed or unpressed command with Brick recipes and Atom-owned button behavior.

## Use when

- One command such as Favorite, Pin, Bold, or Show completed needs a persistent pressed state.

## Choose something else when

- Related pressed commands need shared selection and arrow navigation. Use ToggleGroup.
- A momentary action, submitted choice, boolean setting, or panel switch is required. Use Button, Checkbox, Switch, or Tabs according to the job.

## Required composition

- Omitted variant and tone use ghost and neutral: quiet toolbar commands with a flat pressed fill. Choose accent or a bordered variant explicitly when stronger emphasis is needed.
- Keep one stable visible or accessible name across pressed states; use iconOnly only with a complete accessible name.
- Choose variant for the selected-state treatment and accent or neutral tone for its emphasis before applying local customization.
- Toggle, ToggleGroup and Toolbar.ToggleItem share variant/tone state paint. Preserve each owner’s anatomy, geometry and Atom keyboard behavior instead of substituting one for another.
- Share Button sizes 2xs through 2xl (24/32/36/40/44/48/64px); md is the 40px default. Sparse responsive size objects inherit md below their first breakpoint. Choose outside or inside focusRing for the composition. Keep Atom as the behavior owner, not a nested Button.
- Variants are solid, soft, subtle, surface, outline, ghost and plain; tones are neutral, accent and contrast. Contrast is inverse solid emphasis, not a semantic status.

## Rules

- **MUST:** Disabled controls fade once to 50% with a not-allowed cursor; do not add an opacity wrapper. Forced colors keeps full opacity and system disabled colors.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use Toggle only when the same command meaning remains valid in pressed and unpressed states.
- **MUST:** Use accent, neutral or contrast tone for selection emphasis; do not use semantic status colors to imply error, success, warning, or danger.
- **MUST:** Preserve Atom-owned native button semantics, aria-pressed state, activation, disabled behavior, and composition.
- **MUST:** Use pressed with onPressedChange for controlled state or defaultPressed for uncontrolled state, and keep one stable command name across both aria-pressed states.
- **MUST:** When using asChild or render, preserve one element with Atom props, handlers, refs, tab stop, Enter and Space activation, button semantics, and disabled exposure.
- **MUST:** Load styles.css or core.css plus toggle.css.
- **MUST:** The owning artwork slot sets final Icon dimensions even with larger standalone/provider sizes; do not add compensating Icon size props.

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

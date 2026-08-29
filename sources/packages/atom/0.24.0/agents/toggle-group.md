# ToggleGroup agent guide

## Purpose

Coordinate related toggle-button commands with single or multiple pressed selection and one orientation-aware roving focus stop.

## Use when

- Several related commands, such as alignment or formatting controls, should expose pressed state and navigate as one keyboard group.

## Choose something else when

- The controls are unrelated, represent form answers, or turn settings on and off immediately. Use individual Toggle controls, RadioGroup or CheckboxGroup, or Switch.

## Required composition

- Give Root an accessible group name, choose type=single or type=multiple, and compose uniquely valued Item parts with visible text or accessible labels.

## Rules

- **MUST:** Give Root a concise accessible name and every icon-only Item its own accessible command name.
- **MUST:** Choose single when at most one command may be pressed and multiple for independent pressed commands; match controlled value and defaultValue shapes to that type.
- **MUST:** Provide stable unique Item values and route controlled updates through onValueChange.
- **MUST:** Preserve one roving Tab stop, disabled-item skipping, DOM-order registration, looping policy, orientation-specific Arrow keys, Home/End, and horizontal RTL mirroring.
- **MUST:** Preserve each Item's button and aria-pressed behavior and Root's group behavior when using asChild or render.

## Common mistakes

- **Avoid:** Using ToggleGroup for radio form answers, mixing string and array controlled values with the wrong type, or giving every Item a Tab stop. **Instead:** Choose the correct semantic group, keep value shape aligned to type, and retain the owned roving-focus model.

## Validation checklist

- Verify Root and Item names, single and multiple controlled and uncontrolled state, unique values, pressed semantics, disabled Root and Items, pointer, Enter, Space, and selection callbacks.
- Verify one roving Tab stop when selected and unselected, DOM-order changes, Arrow navigation by orientation, Home/End, loop boundaries, horizontal LTR/RTL, and native, asChild, and render composition.

## Related guidance

- `toggle`
- `radio-group`
- `checkbox-group`
- `switch`
- `toolbar`

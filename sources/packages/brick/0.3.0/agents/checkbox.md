# Checkbox agent guide

## Purpose

Render a finished independent checked, unchecked, or mixed selection with Atom interaction and form behavior.

## Use when

- A user independently turns an option on or off, or an aggregate parent represents mixed child selection.

## Choose something else when

- Exactly one option must be selected from a set. Use RadioGroup.

## Required composition

- Use <Checkbox>Plain label</Checkbox> for non-interactive text. For linked text, use Checkbox.Root with direct Control and Label siblings, optionally followed by Description and Error.
- Root owns size and Field availability/validation flags. Control owns checked/defaultChecked/onCheckedChange/name/value/form and automatically includes the private mark and Atom form proxy. No public Indicator or HiddenInput is required.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Give every checkbox a visible associated label unless context is genuinely redundant and an accessible name remains.
- **MUST:** Never put links, buttons or other interactive descendants inside standalone Checkbox or Checkbox.Control. Use the separate Checkbox.Label for linked consent text. Control and Label are direct Root children; Description/Error follow in the label column.
- **MUST:** Place field-level disabled/readOnly/required/invalid and size on Root; place checked/defaultChecked/onCheckedChange/name/value/form on Control. Root replaces Field.Root for this one control. Do not override Control id independently of its generated label association.
- **MUST:** Load styles.css or core.css plus checkbox.css; add styles for composed Link or other components. Compound Checkbox does not require field.css.
- **MUST:** Use responsive xs/sm/md/lg, solid/outline/subtle, tone, radius, density and labelPlacement props before local CSS. Compound Root supplies defaults; Control may override visual props. Comfortable retains a 44px row; compact has a 24px floor.
- **MUST:** Pass decorative Checkbox.Indicator through indicator to replace checked/mixed artwork. Keep one managed visual square and input; inputRef/inputProps integrate with the automatic input. useCheckbox plus RootProvider renders the callable control, not the Field Root; inputValue is the provider's submitted value.

## Common mistakes

- **Avoid:** Using Checkbox for a one-of-many choice. **Instead:** Use RadioGroup for mutually exclusive options.

## Validation checklist

- Toggle with Space, pointer, and touch.
- Inspect checked/mixed and disabled states, label hit target, submitted value, focus, and contrast.
- For compound labels, verify pointer and keyboard links navigate independently without toggling, label clicks toggle once, labels/support text resolve, and multiline layout holds in RTL and narrow views.

## Related guidance

- `@flowstack-ui/atom/agents/checkbox`
- `field`
- `fieldset`
- `radio-group`

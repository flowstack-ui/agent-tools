# NumberInput agent guide

## Purpose

Present finished exact numeric entry with typing and step actions while Atom owns parsing, formatting, limits, spinbutton keyboard behavior, validation, and numeric form submission.

## Use when

- A value is genuinely numeric and a person should type an exact value or adjust it in known increments.

## Choose something else when

- Digits identify something, adjustment by feel is primary, a small fixed set is valid, or the value is read-only completion. Use Input, Slider, Select or RadioGroup, or Progress.

## Required composition

- Compose a visibly labelled Field with NumberInput.Root containing exactly one NumberInput.Input plus optional NumberInput.Increment and NumberInput.Decrement. Name both step actions because their default artwork is decorative.
- Choose outline, soft, or underline plus sm, md, or lg and an allowed shape on Root. Keep formatter and parser reversible, use number or null controlled state, and keep units and application quantity policy outside the component.

## Rules

- **MUST:** Use NumberInput only for values that can be meaningfully stepped and clamped; postal codes, phone numbers, account numbers, and similar identifiers remain Input values.
- **MUST:** Render exactly one NumberInput.Input inside Root and keep Increment and Decrement inside that same Root so Atom retains numeric state, focus, limits, and aria-controls ownership.
- **MUST:** Use number or null with value and onValueChange for controlled state, preserve intermediate editing, keep formatter and parser reversible, choose positive step and suitable precision, and decide clampOnBlur deliberately.
- **MUST:** Give Input a visible Field label or equivalent accessible name and give Increment and Decrement localized action names while preserving spinbutton ARIA, Arrow/Page/Home/End keys, native validity, and pointer focus retention.
- **MUST:** Keep the visible Input as validity owner and Root's named parsed value as the submission contract, including external form association, Field reporting, reset, disabled, read-only, required, and invalid state.
- **MUST:** Keep the shrinkable input and fixed logical-end action column contained at narrow widths and in RTL; preserve coarse-pointer step targets and do not use viewport width as a touch proxy.
- **MUST:** Load styles.css or core.css plus number-input.css and Field CSS when composed.

## Common mistakes

- **Avoid:** Using NumberInput for digit-like identifiers, rendering more than one Input, formatting without a matching parser, or submitting display text as the numeric value. **Instead:** Choose Input for identifiers, keep one compound Input, make parsing and formatting symmetric, and preserve Atom's parsed form contract.
- **Avoid:** Leaving decorative step buttons unnamed or adding unit selection and business limits inside the component. **Instead:** Name both actions and keep units, inventory rules, calculations, and other application policy at the application boundary.

## Validation checklist

- Verify controlled number and null state, uncontrolled default, intermediate typing, parsing, formatting, precision, min/max, clampOnBlur, step and largeStep, Arrow/Page/Home/End, empty state, boundary action state, and pointer/touch focus preservation.
- Verify visible naming, localized step-action names, required and numeric native validity, Field reporting, named parsed submission, external form, reset, disabled/read-only behavior, refs, native props, and custom action children.
- Verify outline, soft, and underline recipes; all sizes and allowed shapes; full-width and intrinsic layouts; narrow width, coarse pointer, RTL, zoom, forced colors, light and dark appearance, focus, invalid, and disabled paint.

## Related guidance

- `@flowstack-ui/atom/agents/number-input`
- `input`
- `slider`
- `progress`
- `select`
- `radio-group`
- `field`
- `form`

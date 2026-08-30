# NumberInput agent guide

## Purpose

Edit an exact numeric value through text and spinbutton stepping with parsing, formatting, limits, Field validation, and optional native form submission.

## Use when

- A value is truly numeric and users should type an exact value or increment and decrement it.

## Choose something else when

- The text merely contains digits, spatial adjustment by feel is primary, or the value is read-only progress. Use Input, Slider, or Progress.

## Required composition

- Use Root alone for its automatic Input, use the render callback for the legacy custom-control path, or provide static compound children containing exactly one Input with optional Increment and Decrement buttons. Give the spinbutton an accessible name and localize step-button action labels when necessary.

## Rules

- **MUST:** Use NumberInput only for values that can be meaningfully stepped and clamped; postal codes, phone numbers, account numbers, and similar identifiers remain text Input values.
- **MUST:** Use number or null controlled state with onValueChange, preserve intermediate display text while editing, and treat null as an intentional empty numeric value.
- **MUST:** Keep parser and formatter reversible for valid values, choose positive step and appropriate precision, and decide whether clampOnBlur should normalize out-of-range input.
- **MUST:** Preserve Input's spinbutton name, numeric ARIA, Arrow/Page/Home/End keys, disabled/read-only/required/invalid state, and native validity.
- **MUST:** Use Increment and Decrement only inside Root, preserve input focus on pointer activation, aria-controls, boundary disabled state, and localized accessible action names.
- **MUST:** Keep the visible Input as validity owner and the named hidden parsed value as submission-only, including external form association, Field reporting, and uncontrolled reset.

## Common mistakes

- **Avoid:** Using NumberInput for digit-like identifiers, rendering an automatic and compound Input together, formatting without a matching parser, or submitting the formatted display string as the numeric value. **Instead:** Choose text semantics for identifiers, use one composition path, keep parsing and formatting symmetric, and preserve the hidden parsed submission value.

## Validation checklist

- Verify controlled number and null state, uncontrolled default, intermediate typing, parsing, formatting, inferred and explicit precision, min/max, clampOnBlur, step and largeStep, Arrow/Page/Home/End, empty state, disabled/read-only behavior, and boundary step buttons with pointer/touch focus preservation.
- Verify automatic, static one-Input, and render-callback paths; accessible name and value text; required and numeric native validity; inline/native Field reporting; hidden parsed name/form submission; external form; reset; native props; refs; asChild; and render composition.

## Related guidance

- `input`
- `slider`
- `progress`
- `field`
- `form`

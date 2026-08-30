# Rating agent guide

## Purpose

Choose a value on a small ordered rating scale through one slider-semantic control with decorative whole or fractional item targets.

## Use when

- A user chooses a score on a short ordered scale where each successive item means more of the same quality.

## Choose something else when

- The numeric setting is general-purpose or every choice has a distinct categorical meaning. Use Slider or RadioGroup.

## Required composition

- Give Root an accessible name and render an ordered Item for each visual scale segment with its numeric upper value. Use step and getValueLabel or aria-valuetext for fractional or domain-specific meaning; Items remain decorative while Root is the single control.

## Rules

- **MUST:** Keep Root as the only focusable role=slider control and every Item aria-hidden; do not turn rating symbols into separate radio or button stops.
- **MUST:** Give Root an accessible name and meaningful aria-valuetext, using getValueLabel when the default value-out-of-maximum wording is insufficient.
- **MUST:** Use a valid ordered min/max range, positive step, and Item values that represent the visual segments; preserve snapping and partial-fill state for fractional ratings.
- **MUST:** Keep repeated selection stable by default and enable allowClear only when clearing back to the minimum is an intentional product action.
- **MUST:** Preserve one-pointer capture, cross-item dragging, vertical page scrolling, cancellation rollback, lost-capture finalization, keyboard steps, and horizontal LTR and RTL behavior.
- **MUST:** Preserve disabled, read-only, invalid, required-above-minimum validity, Field relationships, named hidden submission, validation focus, and uncontrolled form reset.

## Common mistakes

- **Avoid:** Giving each star a Tab stop, using Rating for unrelated categorical choices, clearing on repeated selection without product intent, or exposing only the numeric value without a meaningful label. **Instead:** Keep one slider control with decorative Items, use RadioGroup for categories, opt into clearing deliberately, and expose understandable value text.

## Validation checklist

- Verify Root name and slider ARIA, whole and fractional controlled/uncontrolled values, snapping, generated and custom value text, decorative Item empty/partial/full fill, Arrow, PageUp/PageDown, Home/End, disabled/read-only state, and LTR/RTL.
- Verify pointer selection within each segment and across gaps, drag capture, one-pointer ownership, vertical scroll preservation, true cancellation rollback, lost-capture finalization, repeated selection with and without allowClear, required-above-minimum validation, Field integration, hidden form value, and reset.

## Related guidance

- `slider`
- `radio-group`
- `field`
- `form`

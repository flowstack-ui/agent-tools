# Progress agent guide

## Purpose

Communicate determinate or indeterminate completion of ongoing work with progressbar semantics, normalized range state, and a presentation-only Indicator.

## Use when

- Work is ongoing and users should know either how much is complete or that completion is still indeterminate.

## Choose something else when

- The value is a stable measurement rather than ongoing work, users manipulate the value, or only a short transient completion message is needed. Use the native meter element, Slider, or Toast.

## Required composition

- Give Root a concise accessible name, pass a measurable value for determinate work or null/omit value for indeterminate work, set a truthful range, and add Indicator only as the visual fill. Provide aria-valuetext or getValueLabel when the numeric value needs domain-specific wording.

## Rules

- **MUST:** Give Root an accessible name that identifies the ongoing task, through visible labeling or native ARIA.
- **MUST:** Use a current numeric value only when progress is measurable; omit it or pass null when indeterminate so aria-valuenow is absent.
- **MUST:** Supply truthful min and max values and understand that Atom clamps the value and normalizes an invalid max to min plus 100 before exposing ARIA and percent state.
- **SHOULD:** Provide concise human-readable value text when the numeric range alone does not communicate meaningful completion.
- **MUST:** Keep Indicator presentation-only and aria-hidden because Root is the sole semantic value owner; do not create a duplicate progressbar or live announcement path.
- **MUST:** Do not make Progress interactive or keyboard adjustable; use Slider or another input when users control the value.

## Common mistakes

- **Avoid:** Passing zero as a stand-in for unknown progress or using Progress for storage capacity or another static quantity. **Instead:** Use null or omit value for indeterminate work and use the native meter element for a stable measurement.
- **Avoid:** Putting progressbar semantics on Indicator or announcing every value update through another live region. **Instead:** Keep Root as the single semantic owner and add announcements only when independently justified.

## Validation checklist

- Verify accessible naming, determinate loading and complete states, indeterminate state without aria-valuenow, clamping, invalid-range normalization, data attributes, and percent calculations.
- Verify explicit aria-valuetext precedence and getValueLabel argument order and output for domain-specific ranges.
- Confirm Indicator remains aria-hidden, Root owns the only progressbar role, no keyboard interaction is introduced, and asChild or render composition preserves semantics and refs.

## Related guidance

- `native-element (native-application)`
- `slider`
- `toast`

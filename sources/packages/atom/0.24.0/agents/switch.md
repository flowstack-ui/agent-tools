# Switch agent guide

## Purpose

Represent an immediately applied on/off setting with switch semantics, controlled or uncontrolled state, field integration, and optional native form participation.

## Use when

- A setting becomes active or inactive immediately when the user operates it.

## Choose something else when

- The choice is a form answer applied later or a command whose pressed state remains active. Use Checkbox or Toggle.

## Required composition

- Give Root visible text or a native accessible name and add Thumb only when the styled layer needs a decorative movable part. Use name, value, and form when checked state must submit.

## Rules

- **MUST:** Give Root a complete accessible name with visible text, aria-label, aria-labelledby, or Field labeling; Thumb remains decorative and aria-hidden.
- **MUST:** Use checked with onCheckedChange for controlled state or defaultChecked for uncontrolled state, and preserve role=switch with aria-checked.
- **MUST:** Use Switch only for an immediately applied on/off setting; do not substitute it for a deferred checkbox answer or pressed command.
- **MUST:** Keep read-only Switch focusable while preventing Enter, Space, pointer, and custom-element activation from changing state.
- **MUST:** Preserve aligned native submission and required-validity proxies, Field state and descriptions, validation focus, and uncontrolled form reset when form behavior applies.

## Common mistakes

- **Avoid:** Using Switch for a submit-later checkbox, relying on Thumb as the accessible control, or using disabled when the value should remain focusable and read-only. **Instead:** Choose by timing and semantics, name Root, keep Thumb decorative, and use readOnly for discoverable locked state.

## Validation checklist

- Verify accessible name, role and checked state, controlled and uncontrolled updates, pointer, Enter, and Space activation, disabled and read-only behavior, Thumb state inheritance, and native and custom asChild/render semantics.
- Verify named checked-value submission, required validity with and without name, invalid and Field descriptions, inline/native validation focus, form association, and uncontrolled reset.

## Related guidance

- `checkbox`
- `toggle`
- `field`
- `form`

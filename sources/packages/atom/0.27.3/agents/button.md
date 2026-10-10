# Button agent guide

## Purpose

Provide native action behavior or safe emphasized-link behavior while preserving the correct button or link semantics through custom rendering.

## Use when

- The user triggers an action such as submit, save, open, dismiss, or retry.
- A destination is intentionally presented as an emphasized action control and Button receives its href.

## Choose something else when

- A destination should read as ordinary inline or standalone navigation. Use Link.

## Required composition

- Use Button.Root without href for an action and with href for an emphasized destination; compose through asChild or render only when the replacement preserves the resolved semantics.

## Rules

- **MUST:** Omit href for actions and provide href for emphasized destinations so Button resolves the correct native semantics.
- **SHOULD:** Set type explicitly inside a form unless submit is intended.

## Common mistakes

- **Avoid:** Navigating from onPress without exposing a destination. **Instead:** Provide href for Button link mode, or use Link when the destination should read as ordinary navigation.

## Validation checklist

- Confirm the rendered element has an accessible name.
- Confirm keyboard activation and disabled behavior match the intended action.

## Related guidance

- `link`
- `pressable`
- `form`

# Button agent guide

## Purpose

Render a finished accessible action or emphasized native link with Brick size, tone, variant, loading, and composition contracts.

## Use when

- The user triggers an action such as submit, save, open, dismiss, or retry.
- A destination intentionally needs a filled, soft, outlined, or ghost action treatment.

## Choose something else when

- A destination should read as ordinary inline or standalone navigation. Use Link.

## Required composition

- Omit href for actions and supply href for emphasized destinations; choose tone, variant, and size from intent and add an icon only when it improves recognition.

## Rules

- **MUST:** Use action mode for operations and href link mode for emphasized destinations; visual prominence never justifies hiding navigation in onPress.
- **MUST:** Load styles.css or core.css plus button.css.

## Common mistakes

- **Avoid:** Navigating from onPress without a real href. **Instead:** Use Button href mode for emphasized navigation or Link for ordinary navigation.

## Validation checklist

- Confirm an accessible name and action semantics.
- Test focus, keyboard activation, disabled/loading behavior, and contrast in every supported appearance; disabled labels must remain readable while ghost and outline controls stay transparent.

## Related guidance

- `@flowstack-ui/atom/agents/button`
- `link`
- `form`

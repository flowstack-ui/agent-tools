# IconButton agent guide

## Purpose

Provide a compact finished icon-only action or deliberate icon-only navigation control with an explicit accessible name.

## Use when

- A familiar icon represents one action and visible button text would be redundant in the available space.
- A compact rail or similarly constrained navigation context deliberately uses a recognizable icon-only destination.

## Choose something else when

- A destination needs persistent visible explanatory text or should read as an ordinary inline or standalone link. Use Link or a navigation collection's Link part.
- The control represents a persistent pressed selection. Use Toggle.

## Required composition

- Place one decorative Icon or SVG inside IconButton, provide an accessible label through the component's naming API, and supply href when the control is a destination. Tooltip may supplement an unfamiliar icon but never replaces the control name.

## Rules

- **MUST:** Give every IconButton a concise discernible accessible name; the icon alone and a portalled Tooltip are not names.
- **MUST:** Use the default button path for operations and supply href for a deliberate icon-only navigation destination so the final host remains a native anchor.
- **MUST:** Keep temporary aria-expanded feedback distinct from a persistent pressed selection; use Toggle when the state itself is the user-controlled value.
- **MUST:** Load styles.css or core.css plus icon-button.css and icon.css when using Brick Icon.

## Common mistakes

- **Avoid:** Using a random glyph, code icon for GitHub, an unlabeled SVG inside a generic button, a command button without href for a route, or Tooltip as the only name. **Instead:** Use the correct icon asset in a named IconButton, supply href for navigation, and keep Tooltip supplemental.

## Validation checklist

- Check accessible name, button versus anchor semantics, href, icon alignment, touch target, focus ring, Tooltip discovery when present, expanded disclosure feedback, disabled/loading states, contrast, and forced colors.
- Confirm component CSS and every composed Tooltip or Icon stylesheet are loaded.

## Related guidance

- `button`
- `icon`
- `link`
- `toolbar`
- `tooltip`

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

- ButtonGroup supplies size/variant/tone/radius/focusRing defaults; explicit props win. Subtle/surface/plain are available alongside existing recipes.
- Place one decorative Icon or SVG inside IconButton, provide an accessible label through the component's naming API, and supply href when the control is a destination. Use the same action size as adjacent Buttons; a sparse responsive size inherits the normal 44px lg default until its first override. Tooltip may supplement an unfamiliar icon but never replaces the control name.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Give every IconButton a concise discernible accessible name; the icon alone and a portalled Tooltip are not names.
- **MUST:** Use the default button path for operations and supply href for a deliberate icon-only navigation destination so the final host remains a native anchor.
- **MUST:** Keep temporary aria-expanded feedback distinct from a persistent pressed selection; use Toggle when the state itself is the user-controlled value.
- **MUST:** Preserve perceptible ghost hover and pressed feedback on canvas, base, subtle, raised, and overlay surfaces instead of overriding it with a coincident surface color.
- **MUST:** Load styles.css or core.css plus icon-button.css and icon.css when using Brick Icon.
- **MUST:** Support scalar focusRing="outside" | "inside"; omission stays outside. Inside uses paired foreground and canonical negative-width offset without changing Atom behavior.
- **MUST:** Button owns shared action recipes; IconButton and CloseButton specialize icon-only presentation. Preserve accessible names, square geometry, group defaults and centered loading; do not add independent paint recipes.
- **MUST:** Both outer-control and inner-artwork NotificationBadge anchoring are valid. In IconButton > NotificationBadge > SVG/IMG/Icon, IconButton owns artwork size and NotificationBadge owns indicator size. Do not replace the button with a passive icon or manually synchronize sizes.

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

# HoverCard agent guide

## Purpose

Reveal supplemental, nonessential preview content from mouse-capable hover or focus-visible interaction without creating popup semantics or replacing the trigger's native action.

## Use when

- A link or other focusable subject benefits from a richer passive preview that is supplemental, nonessential, and contains no required actions.

## Choose something else when

- The content is a brief text hint, contains interactive controls, must hold focus, or is essential on touch and other non-hover input. Use Tooltip, Popover, Dialog, or visible inline content.

## Required composition

- Compose Root with Trigger and Content; preserve the Trigger's native semantic element with asChild when it owns an action. Add Portal only when Content must leave its DOM location and Arrow only when the styled preview needs a pointer.

## Rules

- **MUST:** Keep all essential information and required actions available outside Content because touch does not open HoverCard and Content has no popup relationship.
- **MUST:** Do not put buttons, links, inputs, or required interaction inside Content; use Popover for interactive floating content.
- **MUST:** Preserve Trigger's native action and tab order through asChild, and do not add aria-expanded, aria-controls, or dialog semantics to this preview pattern.
- **MUST:** Preserve mouse-capable hover, focus-visible opening, touch and compatibility-event suppression, delays, the safe pointer corridor, and top-layer Escape behavior.
- **SHOULD:** Style from resolved side and measured available-size data rather than assuming the requested placement remains unchanged after collision handling.

## Common mistakes

- **Avoid:** Putting a profile action or essential fact only in HoverCard, expecting touch to open it, or adding popup ARIA relationships. **Instead:** Keep the preview passive and redundant, preserve the trigger action, and use Popover or visible content when users must interact or access the information.

## Validation checklist

- Verify controlled state, disabled state, mouse hover and focus-visible opening, ordinary focus behavior, delays, Trigger-to-Content pointer corridor, Escape, exit presence, and that touch taps and long presses preserve the native Trigger action without opening.
- Verify no essential or interactive content is hidden in the preview, no popup ARIA is introduced, asChild semantics, portals, explicit and inherited direction, collision placement, available-size properties, and optional Arrow geometry.

## Related guidance

- `tooltip`
- `popover`
- `dialog`

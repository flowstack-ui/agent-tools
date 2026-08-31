# VisuallyHidden agent guide

## Purpose

Keep a short authored name or equivalent context available to assistive technology without adding a visible layout footprint.

## Use when

- A nearby visual already communicates the same short meaning but a control, state, or relationship still needs an accessible text equivalent.

## Choose something else when

- The text is an essential instruction, visible state, error, focusable control, or asynchronous announcement. Use visible Text or the application-owned feedback and live-region pattern.

## Required composition

- Place a short equivalent phrase in VisuallyHidden.Root inside the semantic owner whose accessible name or reading context it extends; keep the focusable control itself visible and keep live-region policy outside Root.

## Rules

- **MUST:** Keep hidden text short, specific, correctly ordered, and equivalent to nearby visual meaning; prefer visible Text whenever information benefits everyone.
- **MUST:** Do not visually hide keyboard-focusable or interactive content; keep an icon-only Button visible and place VisuallyHidden text inside it.
- **MUST:** Do not use VisuallyHidden as a substitute for visible feedback or deliberate application-owned live-region behavior.
- **MUST:** Do not override Atom's authoritative hiding geometry or confuse visually hidden accessible content with aria-hidden decorative content.
- **MUST:** Load styles.css or core.css plus visually-hidden.css.

## Common mistakes

- **Avoid:** Hiding essential instructions, wrapping a focusable control in Root, using it for decoration, or duplicating an existing name. **Instead:** Keep essential content and controls visible, use aria-hidden for decoration, and add concise hidden text once inside the semantic owner.

## Validation checklist

- Inspect the accessibility tree and computed name or description to confirm hidden wording is present exactly once in the intended reading order.
- Confirm Root has no layout footprint, no visually absent focus target, authoritative hiding survives consumer style and composition, decorative content uses aria-hidden, and behavior remains stable across zoom, direction, and appearance.

## Related guidance

- `@flowstack-ui/atom/agents/visually-hidden`
- `icon`
- `icon-button`
- `text`
- `status`

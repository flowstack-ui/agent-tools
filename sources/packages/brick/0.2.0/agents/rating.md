# Rating agent guide

## Purpose

Collect a short ordered score, present a repeated-star aggregate, or present a compact one-star numeric summary.

## Use when

- A person chooses a score on a short ordered scale, or an aggregate score needs recognizable repeated-star presentation.

## Choose something else when

- The value is a general numeric setting, a named choice, progress, or status. Use Slider, Radio Group, Progress, or Badge.

## Required composition

- For input, compose Root with one Item for every endpoint and use it as the sole control in Field or name the standalone Root.
- For aggregate product or review data, use Display with repeated stars or Summary with one star and a visible value; give either a localized label and do not use readOnly Root as a passive summary.

## Rules

- **MUST:** Use Root and Item only when the person can choose a score; use Display for aggregate or read-only presentation so passive content does not create a focusable slider.
- **MUST:** Give Display and Summary a localized label that states the score and maximum, such as label="4.5 out of 5 stars"; use Summary valueText for localized visible formatting and keep adjacent review counts as ordinary text.
- **MUST:** Provide one visible Field label for an input Rating or a complete accessible name for a standalone Root.
- **MUST:** Use a valid ordered min and max, positive step, and Item endpoint values; keep repeated selection stable by default and enable allowClear only when clearing to the minimum is intentional.
- **MUST:** Preserve one focusable slider Root with decorative Items, one-pointer capture, cross-item dragging, vertical page scrolling, cancellation rollback, lost-capture finalization, keyboard steps, and horizontal LTR and RTL behavior.
- **MUST:** Preserve disabled, read-only, invalid, required-above-minimum validity, Field relationships, named hidden submission, validation focus, and uncontrolled form reset for input Rating.
- **MUST:** Load styles.css or core.css plus rating.css.

## Common mistakes

- **Avoid:** Using readOnly Root to show a product's average rating, creating a focusable slider that cannot be changed. **Instead:** Use Rating.Display for aggregate scores and reserve readOnly Root for rare form review states where slider semantics remain meaningful.
- **Avoid:** Making every star focusable, repeating the score through five accessible icons, or relying on star color alone. **Instead:** Keep one logical Root for input or one labelled Display image for aggregate output; repeated artwork stays decorative.
- **Avoid:** Using max=1 or an ordinary star Icon to fake a compact aggregate rating. **Instead:** Use Rating.Summary so one decorative star and the visible numeric value share one localized aggregate label.

## Validation checklist

- For input, check pointer, touch, keyboard, fractional values, form ownership, reset, disabled, read-only, invalid, and Field relationships.
- For Display and Summary, check the localized accessible name, absence from tab order, aggregate geometry, RTL, forced colors, zoom, and long adjacent review text.
- Confirm CSS is loaded.

## Related guidance

- `@flowstack-ui/atom/agents/rating`
- `field`
- `slider`
- `radio-group`
- `progress`
- `badge`

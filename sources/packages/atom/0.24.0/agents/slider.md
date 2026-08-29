# Slider agent guide

## Purpose

Adjust one numeric value or an ordered numeric range by pointer, touch, or keyboard with slider semantics, snapping, commit events, and optional form submission.

## Use when

- A user adjusts a number or range by feel and continuous spatial manipulation is more useful than exact text entry.

## Choose something else when

- An exact typed number matters, the value is read-only progress, or the ordered scale is specifically a small rating. Use NumberInput, Progress, or Rating.

## Required composition

- Give Root an accessible name and compose Track with one Thumb for a scalar value or one indexed Thumb per range value; add Range only when the styled layer needs decorative selected geometry. Use ariaValueText for values whose meaning is not obvious from the number.

## Rules

- **MUST:** Match Thumb count and indices to Root's scalar or array values; every Thumb is a focusable slider and Range remains decorative.
- **MUST:** Give every Thumb an accessible name through Root native ARIA or Field labeling and provide ariaValueText when numeric values need human meaning.
- **MUST:** Choose valid min, max, positive step, largeStep, and minStepsBetweenThumbs values and preserve each range Thumb's effective adjacent bounds.
- **MUST:** Use onValueChange for live updates and onValueCommit for completed interactions; true pointer cancellation restores the pointer-down value without commit while lost capture commits the latest value.
- **MUST:** Preserve one active pointer session, non-slider-axis page scrolling, orientation-aware keys, and horizontal LTR and RTL pointer and Arrow behavior.
- **MUST:** Preserve disabled, read-only, invalid, required, Field, form submission, and uncontrolled reset behavior across every Thumb.

## Common mistakes

- **Avoid:** Using Slider when exact entry is required, rendering fewer Thumbs than range values, labeling only the decorative Track, or treating every live drag update as a committed value. **Instead:** Use NumberInput for exact entry, align values and Thumbs, label the slider controls through Root, and separate change from commit effects.

## Validation checklist

- Verify scalar and range controlled/uncontrolled values, Thumb indices and names, min/max/step snapping, effective dependent bounds, minimum gaps, Arrow, PageUp/PageDown, Home/End, orientation, disabled/read-only state, and LTR/RTL.
- Verify track click, mouse, touch and pen dragging, nearest Thumb, one-pointer ownership, preserved cross-axis scrolling, true cancellation rollback without commit, lost-capture commit, onValueChange/onValueCommit timing, form values, Field relationships, and reset.

## Related guidance

- `number-input`
- `progress`
- `rating`
- `field`
- `form`

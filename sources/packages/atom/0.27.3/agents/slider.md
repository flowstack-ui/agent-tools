# Slider agent guide

## Purpose

Adjust one numeric value or an ordered numeric range by pointer, touch, or keyboard with slider semantics, snapping, commit events, and optional form submission.

## Use when

- A user adjusts a number or range by feel and continuous spatial manipulation is more useful than exact text entry.

## Choose something else when

- An exact typed number matters, the value is read-only progress, or the ordered scale is specifically a small rating. Use NumberInput, Progress, or Rating.

## Required composition

- Give Root an accessible name and compose Control and Track with one Thumb for a scalar value or one indexed Thumb per range value; add Range only when the styled layer needs selected geometry. Use distinct per-thumb names for ranges and ariaValueText for values whose meaning is not obvious from the number. Legacy Track-owned interaction remains supported.

## Rules

- **MUST:** Match Thumb count and indices to Root's scalar or array values; every Thumb is a focusable slider and Range remains decorative.
- **MUST:** Give every Thumb an accessible name through Root native ARIA or Field labeling and provide ariaValueText when numeric values need human meaning.
- **MUST:** Prefer explicit per-Thumb names for range endpoints; explicit Thumb naming wins over Root naming, which wins over Slider.Label or Field fallback.
- **MUST:** Use one state owner: Root or a useSlider controller with RootProvider, never both.
- **MUST:** Choose automatic hidden inputs or explicit HiddenInput parts and never duplicate indexed form values.
- **MUST:** Keep the measured Thumb box visual-sized and expand hit targeting out of flow, or provide explicit thumbSize. Scalar boundary fills reach rail edges; range fills join thumb centers. Preserve clearance for centered endpoint overhang.
- **MUST:** Treat none as clamped identity, push as neighbor propagation, and swap as pointer identity transfer; keyboard changes stay constrained to the focused indexed thumb.
- **MUST:** Choose valid min, max, positive step, largeStep, and minStepsBetweenThumbs values and preserve each range Thumb's effective adjacent bounds.
- **MUST:** Use onValueChange for live updates and onValueCommit for completed interactions; true pointer cancellation restores the pointer-down value without commit while lost capture commits the latest value.
- **MUST:** Preserve one active pointer session, non-slider-axis page scrolling, orientation-aware keys, and horizontal LTR and RTL pointer and Arrow behavior.
- **MUST:** Preserve disabled, read-only, invalid, required, Field, form submission, and uncontrolled reset behavior across every Thumb.

## Common mistakes

- **Avoid:** Using Slider when exact entry is required, rendering fewer Thumbs than range values, labeling only decorative geometry, duplicating hidden inputs, or treating every live drag update as committed. **Instead:** Use NumberInput for exact entry, align values and Thumbs, name each slider control, choose one input mode, and separate change from commit effects.

## Validation checklist

- Verify scalar/range controlled and controller values, Thumb indices/names, origins, alignment, resize/reveal recovery, min/max/step snapping, effective bounds, gaps, collisions, Arrow/Shift+Arrow/Page/Home/End, orientation, disabled/read-only state, and nested LTR/RTL.
- Verify control/track click, mouse, touch and pen dragging, nearest Thumb, one-pointer ownership, focus/active identity, preserved cross-axis scrolling, cancellation rollback without commit, lost-capture commit, callback ordering, automatic/explicit form values, external forms, Field relationships, and reset.

## Related guidance

- `number-input`
- `progress`
- `rating`
- `field`
- `form`

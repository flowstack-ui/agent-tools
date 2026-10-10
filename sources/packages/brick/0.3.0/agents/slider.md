# Slider agent guide

## Purpose

Provide a styled approximate numeric single-value or range input while Atom owns state, pointer and keyboard interaction, geometry, focus, accessibility and forms.

## Use when

- Direct manipulation of an approximate value or bounded range is more useful than exact text entry.

## Choose something else when

- Exact entry, a small named choice set, or read-only completion is the real job. Use NumberInput, Select or RadioGroup, or Progress.

## Required composition

- Prefer Root > Label + Control > Track > Range + Thumb. Control is the single pointer-coordinate owner; legacy Track-owned composition remains compatible.
- Render one indexed Thumb per value or use Thumbs, and give range thumbs distinct explicit names.
- Use MarkerGroup with MarkerIndicator and MarkerLabel, or the Marks shortcut, for decorative scale context.

## Rules

- **MUST:** Disabled controls preserve their recipe and use one 50% fade with a not-allowed cursor. Forced colors restores full opacity and uses system disabled colors.
- **MUST:** Use Root or useSlider plus RootProvider as one state owner, never both.
- **MUST:** Use Slider for approximate direct manipulation and NumberInput for exact entry.
- **MUST:** Use onValueChange for live changes and onValueCommit for completion; cancellation restores without commit and lost capture commits once.
- **MUST:** Preserve explicit per-thumb naming; otherwise use Root naming, Slider.Label, or Field fallback in that order.
- **MUST:** Choose automatic or explicit hidden-input ownership and submit every thumb exactly once in index order.
- **MUST:** Preserve resolved local LTR/RTL and horizontal/vertical geometry, focus identity, one active pointer, and cross-axis scrolling.
- **SHOULD:** Use origin for scalar fill origin only; ranges fill between their selected extremes.
- **SHOULD:** Contain keeps the visible thumb within the rail; its expanded 44px pointer area and focus ring still need unclipped clearance. Center alignment also permits visible overhang. Do not compensate with track padding or a 44px thumbSize.
- **SHOULD:** Use ValueText for dense or long output, ValueLabel for persistent thumb output, and DraggingIndicator only for drag feedback.
- **SHOULD:** Treat markers as decorative and keep their indicator and label anatomy distinct.
- **SHOULD:** Use responsive size and outline/solid/soft variant; tone selects neutral/accent/contrast while invalid remains state.
- **MUST:** Load styles.css, or core.css plus slider.css.

## Common mistakes

- **Avoid:** Creating another value state inside a controller integration or rendering automatic and explicit inputs together. **Instead:** Keep one controller and one form-proxy ownership mode.
- **Avoid:** Using marker labels or a shared range name when each thumb needs a meaningful identity. **Instead:** Name each thumb explicitly and keep markers decorative.

## Validation checklist

- Verify mouse, pen and touch geometry, track click, collision modes, Shift/Page/Home/End, cancellation/lost capture, focus, controlled/reset and disabled/read-only changes.
- Verify accessible names/value text, automatic and explicit forms, external forms, range order, light/dark, nested direction, vertical, responsive, narrow, hidden reveal, endpoints, reduced motion and forced colors.

## Related guidance

- `@flowstack-ui/atom/agents/slider`
- `field`
- `number-input`
- `select`
- `progress`
- `rating`
- `form`

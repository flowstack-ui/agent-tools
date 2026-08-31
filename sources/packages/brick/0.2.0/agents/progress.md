# Progress agent guide

## Purpose

Present finished linear read-only task progress for known, unknown, or buffered work while Atom owns progressbar semantics, normalized range state, and the presentation-only Indicator.

## Use when

- Ongoing work such as upload, download, processing, or synchronization needs a linear indication of measurable completion or indeterminate activity.

## Choose something else when

- The value is a stable measurement, users manipulate it, stages rather than amount matter, the finished layout is loading, compact circular presentation fits better, or only a transient result is needed. Use the native meter element, Slider, Steps, Skeleton, ProgressCircle, or Toast.

## Required composition

- Give Progress.Root a concise Label or native accessible name, pass a measurable value or null/omit it for indeterminate work, set a truthful range, and compose optional Value then Track with optional Buffer before Indicator.
- Choose horizontal or vertical orientation, size, shape, and semantic tone. Keep application region aria-busy state and announcements outside Progress, and provide aria-valuetext or getValueLabel when the numeric range needs domain wording.

## Rules

- **MUST:** Give Root an accessible name identifying the ongoing task through Progress.Label or native ARIA; visible Value does not name the task.
- **MUST:** Use a current numeric value only for measurable work and pass null or omit value for unknown work so aria-valuenow is absent rather than pretending unknown progress is zero.
- **MUST:** Supply truthful min and max, understand Atom clamping and invalid-range normalization, and keep optional bufferValue within the same task and range rather than treating it as a second progressbar.
- **SHOULD:** Provide concise human-readable aria-valuetext or getValueLabel output when the numeric range alone does not communicate meaningful completion; localize visible Value formatting separately.
- **MUST:** Keep Indicator and Buffer presentation-only, ordered Buffer before Indicator inside Track, and Root as the sole progressbar and announcement owner.
- **MUST:** Do not make Progress interactive or keyboard adjustable and do not use it for static capacity; choose Slider for input and native meter for stable measurement.
- **MUST:** Keep horizontal Progress shrinkable, vertical length explicit, label wrapping and value alignment intact, logical fill correct in RTL, and reduced-motion indeterminate state understandable as a static segment.
- **MUST:** Load styles.css or core.css plus progress.css.

## Common mistakes

- **Avoid:** Passing zero for unknown progress, using Progress for capacity, omitting its task name, or adding progressbar semantics to Indicator. **Instead:** Use indeterminate null state, native meter for stable quantity, name Root, and keep visual parts silent.
- **Avoid:** Announcing every percent change in another live region or treating tone as the sole status meaning. **Instead:** Keep one semantic progressbar, add independently justified announcements sparingly, and provide textual task or state context.

## Validation checklist

- Verify naming, determinate loading/complete and indeterminate states, aria-valuenow absence, clamping, invalid-range normalization, buffer percentage, data state, explicit aria-valuetext precedence, getValueLabel, and localized visible Value formatting.
- Verify Root is the only progressbar; Indicator and Buffer are silent; no keyboard interaction exists; all parts remain under Root with Buffer before Indicator; native props, refs, and composition are preserved.
- Verify both orientations, five sizes, all shapes and tones, narrow width, explicit vertical length, long labels, zoom, RTL logical fill, light/dark appearance, forced colors, reduced motion, and track/indicator contrast.

## Related guidance

- `@flowstack-ui/atom/agents/progress`
- `progress-circle`
- `slider`
- `toast`
- `skeleton`

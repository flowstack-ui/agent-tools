# Splitter agent guide

## Purpose

Present resizable adjacent panels using Atom sizing and a theme-aware separator and grip.

## Use when

- Neighboring content panels share resizable space.

## Choose something else when

- A boundary is not interactive. Use Divider.
- Only one preview element is resized. Use A qualified application adapter rather than fake empty panels.

## Required composition

- Root declares stable panels; compose Panel and named ResizeTrigger in the same order. Frame establishes outer dimensions; Surface supplies optional panel paint. Empty triggers include a separator and indicator.

## Rules

- **MUST:** Use public Atom-backed sizing; do not replace drag, keyboard, collapse or ARIA in consumer CSS.
- **MUST:** Load styles.css or core.css plus splitter.css. Keep panel padding, paint and scrolling on their proper owners.
- **MUST:** Name every ResizeTrigger and provide application non-drag controls such as presets/reset. Preserve stable IDs and logical order.

## Common mistakes

- **Avoid:** Treating the indicator's small visual width as its interaction target. **Instead:** Keep the default independent target geometry; decorative children must not contain actions.

## Validation checklist

- Verify orientation, RTL, constraints, hover/focus/drag, disabled, forced colors, nested panels and iframe crossings.
- Verify definite vertical size, localized names and controlled sizes; persistence belongs to the app.
- Use percentage numbers or %, px, em, rem, vw and vh strings, not calc(). Percent defaults are deterministic before measurement. useSplitter with one RootProvider owns external state; orientation remains scalar.
- Keep descriptors, panels and adjacent boundaries synchronized. One panel is valid, zero is not. CSS-hidden panels remain registered. Applications own redistribution and storage; shared createSplitterRegistry coordinates perpendicular intersection dragging.

## Related guidance

- `divider`
- `frame`
- `surface`
- `scroll-area`
- `slider`

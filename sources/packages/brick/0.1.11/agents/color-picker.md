# Color Picker agent guide

## Purpose

Edit, choose, and submit an opaque hexadecimal color through a finished text, native chooser, preset, or optional floating composition.

## Use when

- A form needs one #rrggbb color value selected through editable text, the browser chooser, named presets, or a popover that combines them.

## Choose something else when

- The interface only previews a color. Use Color Swatch.
- The task requires alpha, gradients, color-space conversion, channels, an eyedropper, or contrast analysis. Use an application-owned specialist until Atom releases that behavior.

## Required composition

- Place Label and Control inside Root; include HiddenInput when the value participates in native form submission.
- Compose Trigger with Content for a floating picker, or omit both for inline editing.
- Put ColorSwatch.Root inside Trigger and SwatchTrigger for finished previews while the surrounding control carries the accessible name and selected state.

## Rules

- **MUST:** Give Input and NativeInput accessible names through Label or explicit aria-label values.
- **MUST:** Provide name to Root and render exactly one HiddenInput when the color must submit.
- **MUST:** Use #rgb or #rrggbb; this release intentionally supports opaque hexadecimal values only.
- **MUST:** Load styles.css, or core.css plus both color-picker.css and color-swatch.css when swatches are composed.
- **SHOULD:** Give presets human-readable names; do not rely on color alone or a raw hex string when a product name exists.

## Common mistakes

- **Avoid:** Reimplementing color parsing, picker state, or Popover behavior in Brick or application code. **Instead:** Use the Atom-backed ColorPicker parts and controlled props.
- **Avoid:** Naming both Input and HiddenInput for form submission. **Instead:** Put name on Root and render one HiddenInput.
- **Avoid:** Assuming Chakra's area, alpha, channel, format, or eyedropper parts exist. **Instead:** Stay within the released Brick anatomy and treat richer behavior as Atom-first future work.

## Validation checklist

- Test text, native, preset, controlled, disabled, read-only, invalid, form submit/reset, Escape/focus restoration, light/dark, forced-colors, narrow/zoom, RTL, and non-color selection cues.

## Related guidance

- `color-swatch`
- `field`
- `form`
- `input`
- `popover`

# Color Picker agent guide

## Purpose

Provide headless hexadecimal color selection with controlled or uncontrolled state, native picker access, preset selection, popover behavior, and form submission.

## Use when

- A form needs an editable hexadecimal color value, a native color chooser, preset color choices, or a popover that combines those inputs.

## Choose something else when

- The interface only previews a color and does not select or submit it. Use a styled-layer Color Swatch or a passive application element.

## Required composition

- Place ColorPicker.Label and ColorPicker.Control inside ColorPicker.Root; include ColorPicker.HiddenInput when the value participates in form submission.
- Compose ColorPicker.Trigger with ColorPicker.Content for a floating picker, or omit both for an inline picker.

## Rules

- **MUST:** Give the editable and native color inputs an accessible name through ColorPicker.Label or an explicit aria-label.
- **MUST:** Provide name to ColorPicker.Root and render ColorPicker.HiddenInput when the selected value must submit with a form.
- **MUST:** Use CSS hexadecimal values in #rrggbb or #rgb form; Atom normalizes valid values to lowercase #rrggbb.
- **SHOULD:** Give preset triggers human-readable aria-label values when the raw color string is not a sufficient name.

## Common mistakes

- **Avoid:** Adding a visual swatch directly in Atom. **Instead:** Keep Atom headless and render the finished Color Swatch from Brick inside triggers or adjacent content.
- **Avoid:** Rendering a text input with no persistent label. **Instead:** Use ColorPicker.Label or provide an explicit accessible name.

## Validation checklist

- Test keyboard editing, native color selection, preset selection, controlled state, disabled and read-only behavior, and form submission.
- Verify invalid text is not committed and the last valid value is restored on blur.

## Related guidance

- `field`
- `form`
- `input`
- `popover`

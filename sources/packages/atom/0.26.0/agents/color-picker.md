# Color Picker agent guide

## Purpose

Provide complete headless color selection with one shared color model, accessible area and channel interaction, alpha, format conversion, presets, optional positioned content, form submission, and progressive screen sampling.

## Use when

- A form, editor, or settings surface needs one selectable and editable color.

## Choose something else when

- The interface only previews a color. Use Brick Color Swatch.
- The product needs saved palettes, automatic names, contrast analysis, gradients, or persistence. Use application or dedicated higher-layer state composed around Color Picker.

## Required composition

- Place Label and the editable controls inside Root; include HiddenInput when a named value must submit.
- For an inline picker set inline and compose Area plus channel controls directly; for a popup compose Trigger, Positioner, and Content.
- Build each ChannelSlider from Track and Thumb; optional Label and ValueText inherit the parent channel.
- Build presets from SwatchGroup, SwatchTrigger, Swatch, and optional SwatchIndicator; Brick owns the visible checkmark.

## Rules

- **MUST:** Keep color value, format, area, channels, alpha, and presets on the same ColorPicker.Root model.
- **MUST:** Give the picker, channel controls, and presets meaningful accessible names and never communicate selection by color alone.
- **MUST:** Use onValueChangeEnd for expensive work that should wait for a pointer drag, committed channel input, or eyedropper completion; area and slider keyboard steps use the ordinary value-change event.
- **MUST:** Merge Atom-provided inline styles and CSS variables instead of replacing area, slider, thumb, positioning, or color-math styles.
- **MUST:** Treat EyeDropper and NativeInput as progressive platform features; NativeInput is opaque-only and unsupported or cancelled EyeDropper use is a no-op.
- **SHOULD:** Use visual swatch shapes through Brick Color Swatch styling rather than adding shape behavior to Atom Root.

## Common mistakes

- **Avoid:** Reimplementing color conversion or pointer math in Brick or an application. **Instead:** Compose the Atom area, channel, and format parts.
- **Avoid:** Storing saved colors inside Color Picker. **Instead:** Store the palette in application state and render it through SwatchTrigger.
- **Avoid:** Presenting NativeInput as the full picker. **Instead:** Label it as the browser-owned opaque chooser or use the complete area/channel anatomy.

## Validation checklist

- Test pointer, touch, arrow/Page/Home/End keys, pointer-drag completion, LTR/RTL, alpha, all formats, controlled/uncontrolled state, popup dismissal, swatch selection, disabled/read-only behavior, external form association, and reset.
- Verify EyeDropper support, success, cancellation, and unsupported behavior in a secure browser context without claiming unavailable engines.
- Verify the styled layer in narrow, zoomed, light/dark, and forced-color modes.

## Related guidance

- `field`
- `form`
- `input`
- `popover`
- `slider`

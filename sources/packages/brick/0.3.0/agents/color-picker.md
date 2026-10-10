# Color Picker agent guide

## Purpose

Edit, inspect, choose, and submit one color through a finished popup or inline editor with area, channel, format, preset, native chooser, and EyeDropper paths.

## Use when

- A form, editor, or settings surface needs one color value with a finished visual editor.
- Users need alpha, RGB, HSL, HSB, channel sliders, named presets, or a progressive platform color-picking path.

## Choose something else when

- The interface only previews a color. Use Color Swatch.
- The task requires gradients, automatic color naming, contrast scoring, palette persistence, or a color wheel. Use application-owned specialist behavior composed around Color Picker.

## Required composition

- Place Label and Control inside Root; include HiddenInput when the value participates in native form submission.
- For a popup, compose Trigger, Positioner, and Content. For an always-visible editor, set Root inline and render Content directly.
- Build the visual editor from Area, ChannelSlider, format controls, channel inputs, and SwatchGroup; ValueSwatch and ValueText expose the current value.
- Choose one of the seven closed sizes from 2xs through 2xl; prefer xs or sm for dense creative tooling and md or larger for ordinary form and touch contexts.
- Use Control layout=integrated when swatch, editable input, and optional EyeDropper or popup Trigger must share one finished field boundary.
- Keep ValueSwatch as the compact current-value preview supplied by the Root size recipe; use Swatch for the larger selectable preset geometry.
- For alpha, render TransparencyGrid as a direct sibling immediately before ChannelSliderTrack so the stable white and light-neutral checker sits beneath the channel gradient.
- Keep ValueSwatch and Swatch transparency previews intact; Brick paints an appearance-aware surface checker beneath Atom's represented color, including when alpha is below one.
- Keep area and channel color planes free of decorative hard borders, make each channel track and transparency check inherit one semantic radius, and use the finished white thumb ring with the small Theme shadow.
- Keep the alpha thumb's color preview opaque across the full range; slider position and value text communicate alpha, while the underlying color value remains Atom-owned.
- Choose SwatchTrigger shape=sharp|rounded|circle so frame and swatch match; choose frame=none only when a frameless visual is intended.
- Place SwatchIndicator inside Swatch or ValueSwatch whenever selection needs a visible non-color cue.
- Add curated presets only when the product needs them; saved and recent palettes are optional application-owned state, not required popup anatomy.
- Area and ChannelSlider provide default anatomy when children are omitted; explicit children replace it, including null. Sliders composes hue and alpha. EyeDropper is the icon-bearing EyeDropperTrigger shortcut.
- Use useColorPicker with RootProvider for an external Atom-owned controller. Configure lifecycle on Root or the hook; retained closed content remains inert.
- size accepts ResponsiveValue including sparse objects; md is the baseline. Use subtle for a muted fill without a resting border. Swatch, ValueSwatch and SwatchTrigger accept radius tokens.
- Use getColorChannels(format) and ChannelText for channel presentation. parseColorPickerValue and normalizeColorPickerValue return null for invalid input; they do not throw or duplicate conversion.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use Brick parts for the finished interface and keep parsing, format conversion, selection, focus, dismissal, and form state in the exact Atom-backed machine.
- **MUST:** Give the primary editable or native input an accessible name through Label or an explicit aria-label.
- **MUST:** Provide name to Root and render exactly one HiddenInput when the color must submit.
- **MUST:** Wrap popup Content in Positioner; do not recreate positioning, focus restoration, or outside dismissal.
- **MUST:** Name every SwatchTrigger and render SwatchIndicator or an equivalent visible non-color selected cue.
- **MUST:** Load styles.css, or core.css plus color-picker.css for modular delivery.
- **MUST:** Treat NativeInput and EyeDropperTrigger as optional platform enhancements, not the only way to edit the color; unsupported EyeDropper triggers are disabled with data-unsupported.
- **MUST:** Use Trigger with Positioner and Content for the Brick popup; EyeDropperTrigger invokes only the optional browser-native EyeDropper API.
- **MUST:** Keep the area and channel editor or NativeInput available when EyeDropper is unsupported; do not simulate privileged operating-system screen sampling in application code.
- **MUST:** Keep every channel-slider thumb above its track, keep the alpha track's stable white and light-neutral checker appearance-independent, and keep translucent ValueSwatch and Swatch checkers appearance-aware.
- **MUST:** Preserve the finished borderless area and track treatment, inherited subtle channel radius, and white-ring-plus-small-shadow thumb treatment outside forced-colors mode.
- **MUST:** Render the alpha thumb as one opaque selected-color preview even at zero opacity; do not expose different surfaces through a transparent thumb.

## Common mistakes

- **Avoid:** Reimplementing color conversion, pointer math, keyboard state, or popup behavior in Brick or application code. **Instead:** Compose the released ColorPicker anatomy and controlled callbacks.
- **Avoid:** Putting popup Content beside Root without Positioner. **Instead:** Use Trigger, Positioner, and Content as the released popup composition.
- **Avoid:** Naming both visible inputs and HiddenInput for submission. **Instead:** Put name on Root and render one HiddenInput.
- **Avoid:** Using raw color alone to show the selected preset. **Instead:** Render SwatchIndicator and an accessible preset name.
- **Avoid:** Rebuilding a one-border input group or matching swatch frames with application CSS. **Instead:** Use Control layout=integrated and the public swatch frame and shape recipes.
- **Avoid:** Nesting TransparencyGrid inside ChannelSliderTrack. **Instead:** Render them as siblings so the checker sits below the alpha gradient.
- **Avoid:** Adding saved or preset palettes to every popup. **Instead:** Keep the base popup compact and add those optional application compositions only where the product requires them.

## Validation checklist

- Test all seven sizes, compact ValueSwatch geometry distinct from selectable Swatch geometry, square swatch-only triggers, compact and default popup widths, integrated one-border and ghost-action geometry, equal format/input control geometry, borderless area and tracks, one inherited subtle track/checker radius, centered labelled and unlabelled slider thumbs above their tracks at middle and endpoint values, an opaque alpha-thumb color preview at zero and one, a white thumb ring with the small Theme shadow and no hard dark outline, an appearance-independent white and light-neutral checker below the alpha gradient, appearance-aware checkers beneath translucent ValueSwatch and Swatch colors, area and channel synchronization, alpha, RGB/HSL/HSB format changes, matching square, rounded, and circle frames, optional and frameless presets, text, native, and EyeDropper fallback paths, controlled state, popup focus and dismissal, disabled, read-only, invalid, form submit and reset, light and dark, forced colors, reduced motion, narrow and zoom layouts, RTL, and non-color selection cues.

## Related guidance

- `color-swatch`
- `field`
- `form`
- `input`
- `popover`

# DatePicker agent guide

## Purpose

Segmented or strict text entry and calendar selection with one coordinated popup.

## Use when

- Segmented or strict text entry and calendar selection with one coordinated popup.

## Choose something else when

- Scheduling, recurrence or remote business availability is required. Use Application composition.

## Required composition

- Localized TextInput placeholders require paired parse/format codecs. Keep canonical submitted values independent of display formatting. Use Context.formValues.length for conditional clear visibility. Use a fit-content Frame for button-only examples when the trigger should not stretch.
- Content's viewport owns the popup inset, including presets and time controls; nested Calendar has no second padding layer. Range endpoints can use separate Controls under one Root/Content; the final Control is the popup anchor. Use setFocusedValue for today-navigation without selecting a value.
- Date fields default to neutral segment emphasis. Use tone="accent" for branded focus and selection; RootProvider and PropsProvider accept the same tone. Calendar selection tone remains independent. Place clear/open actions after the growing segment group; do not position them with consumer offsets. Placeholders use muted foreground on transparent fields and secondary foreground on soft/subtle or read-only fills to preserve contrast; literals use muted foreground. Outline and surface use stronger segment emphasis than subdued variants.
- A Trigger composed through asChild or render keeps the child's Button geometry; the default trigger uses compact action geometry. Calendar accepts its own seven-step size independently of input size. Keep portalled content above a parent modal and verify actual pointer selection, not only DOM presence.
- Input remains a segmented div. Use entryMode="text" with native TextInput, or entryMode="none" for button-only selection. TextInput accepts strict ISO dates by default; multiple dates use semicolons. Supply paired parse/format codecs for other grammars. Dirty invalid text must not submit an older committed value.
- Root automatically owns canonical form controls for all modes. Use formControl="manual" with one HiddenInput only for explicit placement. A legacy HiddenInput in auto mode is an unnamed compatibility mirror. Range names remain name[start]/name[end]; multiple values repeat name.
- useDatePicker and RootProvider share editing, calendar and popup state. PropsProvider supplies only presentation defaults. Use IndicatorGroup for clear/open actions and PresetTrigger asChild with Button for presets. Keep one Popover owner; Calendar never creates another popup.
- Root supports seven responsive field variants and sizes; Calendar size and neutral/accent/contrast selection tone are independent. minView/maxView constrain period selection; month/year values represent period starts.
- Use date-value helpers without converting date-only values to UTC midnight.
- For removable multiple-date chips, compose non-editable value artwork and separate remove buttons beside Trigger, never inside it. Typed multiple text remains a separate grammar-based editor. Render Calendar directly without Portal/Content for inline presets. Root positioning forwards to the existing Popover owner; tall preset panels can constrain flip to vertical placements. Content side/align applies when Root positioning does not override placement.

## Rules

- **MUST:** Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Keep date behavior in Atom and presentation in Brick. Do not duplicate popup engines or silently replace Input's segmented semantics; choose TextInput explicitly.
- **MUST:** Load styles.css or core.css plus styles/date-picker.css. Use documented visual props and locale overrides.

## Common mistakes

- **Avoid:** Inventing current dates during hydration or submitting localized strings. **Instead:** Supply stable referenceDate and typed values; preserve canonical form mirrors.

## Validation checklist

- Verify keyboard, locale/RTL, constraints, reset, narrow width, appearance and forced colors.

## Related guidance

- `locale-provider`
- `field`
- `popover`

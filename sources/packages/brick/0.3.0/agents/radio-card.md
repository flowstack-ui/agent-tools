# RadioCard agent guide

## Purpose

Present one rich whole-card choice while Atom owns radio semantics, selection, keyboard navigation, focus, forms, validation, direction, and reset.

## Use when

- A short single-choice set needs icons, titles, descriptions, prices, badges, or supporting metadata inside large selectable targets.

## Choose something else when

- Choices are concise, multiple, compact, or immediate commands. Use RadioGroup, CheckboxGroup, Select, SegmentGroup, or ToggleGroup.

## Required composition

- Compose a named Root with uniquely valued label Items, each with exactly one native HiddenInput. Title names the input and Description describes it.
- Use RootProvider with useRadioCard for external controller state. Use one group with Grid/Stack/Group; controlled owners handle reset.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Give Root an accessible group name and every Item a complete visible option name.
- **MUST:** Keep Item values unique and use controlled or uncontrolled state consistently.
- **SHOULD:** Use one semantic Root with Brick Grid or Stack for responsive tracks; never duplicate divergent radio-group state.
- **MUST:** Load styles.css or core.css plus radio-card.css and every composed Brick component stylesheet.
- **MUST:** Item is a label and requires one HiddenInput. Item ref targets label; HiddenInput ref targets input. Keep descendants passive and preserve native activation.
- **MUST:** orientation is scalar keyboard navigation; responsive contentOrientation changes only internal presentation. Do not duplicate semantic groups.
- **MUST:** Indicator is decorative. checked supplies checked-only artwork; children replaces default dot. Do not add control semantics.

## Common mistakes

- **Avoid:** Styling RadioGroup internals into cards. **Instead:** Use RadioCard as the independent finished owner.
- **Avoid:** Using RadioCard as a navigation destination or command. **Instead:** Use Card with Link or Button.

## Validation checklist

- Verify naming, selection, roving focus, orientation-matched keyboard navigation and Control layout, disabled skipping, read-only, forms, reset, Fieldset validation, sizes, variants, alignment, indicator composition, addon containment, long content, narrow widths, RTL, light/dark, forced colors, and touch targets.

## Related guidance

- `@flowstack-ui/atom/agents/radio-card`
- `radio-group`
- `fieldset`
- `grid`
- `stack`
- `icon`
- `badge`

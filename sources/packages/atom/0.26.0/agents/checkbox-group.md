# CheckboxGroup agent guide

## Purpose

Manage a named set of independent checkbox choices with multi-value state, group validation, form submission, structured item relationships, and deterministic select-all behavior.

## Use when

- A user may select any number of related form choices and the choices share naming, state, validation, or submission behavior.

## Choose something else when

- There is one yes-or-no choice, exactly one option must be chosen, or the controls represent pressed commands instead of form choices. Use Checkbox, RadioGroup, or ToggleGroup.

## Required composition

- Give Root an accessible group name and compose uniquely valued Item parts. Plain Item children may name concise options; use ItemLabel and ItemDescription for structured relationships. Add Parent only with an explicit complete allValues set, and use a native fieldset and legend when a visible legend is required.

## Rules

- **MUST:** Give Root a concise accessible name with native ARIA or an inherited Fieldset Legend; do not use unsupported aria-required on role=group.
- **MUST:** Give every Item a stable unique value and keep controlled value arrays synchronized through onValueChange; use name and form when the checked values must submit.
- **MUST:** Render Parent only when Root allValues explicitly names the complete currently selectable set; omit disabled values while disabled and preserve selected values outside that declared set.
- **MUST:** Use plain children as an Item name or pair one ItemLabel and optional ItemDescription; preserve native aria-label, aria-labelledby, and aria-describedby precedence.
- **MUST:** Preserve disabled, read-only, invalid, and required behavior, including one-or-more group validity, first-enabled validation focus, form reset, and hidden per-item submission inputs.

## Common mistakes

- **Avoid:** Treating required as every checkbox being required, computing Parent from only mounted or selected values, or using CheckboxGroup for exclusive or pressed-button choices. **Instead:** Required means at least one selected; declare Parent's full selectable set with allValues and choose RadioGroup or ToggleGroup for different interaction models.

## Validation checklist

- Verify controlled and uncontrolled arrays, unique values, independent Enter and Space toggling, disabled and read-only items, group and item naming, structured descriptions, orientation metadata, and asChild/render prop and ref merging.
- Verify named form submission, group-level required validity with and without a name, inline and native validation, first-enabled focus, Fieldset integration, reset, Parent unchecked/mixed/checked transitions, disabled-value exclusion, and preservation of outside values.

## Related guidance

- `checkbox`
- `radio-group`
- `toggle-group`
- `fieldset`
- `form`

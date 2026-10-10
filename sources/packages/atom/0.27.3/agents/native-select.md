# NativeSelect agent guide

## Purpose

Preserve browser-native option selection with coordinated Field and Form semantics.

## Use when

- The browser or operating system should present predefined options.

## Choose something else when

- Rich option content or editable filtering is needed. Use Select or Combobox.

## Required composition

- Render NativeSelect.Root with native option and optgroup children, usually inside a labelled Field.

## Rules

- **MUST:** Keep selection, keyboard and uncontrolled reset native; do not add a popup or hidden duplicate value.
- **MUST:** Supply an accessible name through Field.Label or native label/ARIA and preserve native name, required and form.
- **MUST:** Do not emulate readonly by disabling the select; native select has no readonly state.

## Common mistakes

- **Avoid:** Confusing the custom Select form proxy with a native picker. **Instead:** Use NativeSelect.Root as the visible native control.

## Validation checklist

- Verify native selection, multiple values, grouping, disabled options, form reset and external association.
- Verify Field labels/descriptions and state precedence, native validation, SSR, refs, keyboard and physical mobile picker.

## Related guidance

- `field`
- `form`
- `select`
- `combobox`

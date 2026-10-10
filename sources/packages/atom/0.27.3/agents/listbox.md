# Listbox agent guide

## Purpose

Present a persistently visible single- or multiple-selection option collection with listbox semantics, active-descendant focus, typeahead, grouping, and optional form submission.

## Use when

- A visible option list should let users choose one or several values while remaining one composite keyboard control.

## Choose something else when

- Choices should stay collapsed, users must type to filter, entries are commands, or every choice should be a separate native form control. Use Select or MultiSelect, Combobox, Menu, or RadioGroup or CheckboxGroup.

## Required composition

- Give Root an accessible name, choose multiple deliberately, and compose uniquely valued Option parts. Add OptionText when option content is complex or needs explicit typeahead text, and pair Group with Label only for announced option sections.

## Rules

- **MUST:** Give the focusable Root an accessible name through native ARIA or Field labeling and preserve its listbox role and active-descendant relationship.
- **MUST:** Use scalar or null state for single selection and array state for multiple selection; keep value, defaultValue, and onValueChange shapes aligned with multiple.
- **MUST:** Give every Option a stable unique value and accessible text, using label or OptionText when rendered children do not provide reliable searchable text.
- **MUST:** Keep DOM focus on Root and preserve aria-activedescendant, orientation-specific Arrow movement, Home/End, loop policy, typeahead, disabled-option skipping, and Enter/Space selection.
- **MUST:** Preserve disabled, read-only, required, invalid, Field descriptions, named hidden value submission, and controlled/uncontrolled behavior without turning Options into independent form controls.

## Common mistakes

- **Avoid:** Using Listbox for commands, giving every Option a Tab stop, mixing scalar and array values, or relying on decorative content for typeahead and naming. **Instead:** Choose Menu for commands, keep Root as the composite focus owner, align state to multiple, and provide explicit option text where needed.

## Validation checklist

- Verify Root and Option names, single and multiple controlled/uncontrolled state, unique values, active-descendant focus, orientation Arrow keys, Home/End, loop boundaries, typeahead, Enter/Space, pointer selection, and disabled options.
- Verify read-only navigation without selection, required and invalid exposure, Field relationships, named single and repeated multiple hidden inputs, group-label relationships, OptionText registration, and asChild/render prop and ref merging.

## Related guidance

- `select`
- `multi-select`
- `combobox`
- `menu`
- `radio-group`
- `checkbox-group`

# Combobox agent guide

## Purpose

Provide editable option filtering and single-value selection with independent committed value, input text, and popup state, plus listbox focus, positioning, dismissal, and form validation.

## Use when

- Users should type to find one option in a longer collection, with optional explicitly allowed free-form entry.

## Choose something else when

- Typing is unnecessary, choices should remain visible, several values are selected, or arbitrary input is not valid. Use Select, Listbox, MultiSelect, or Combobox without freeSolo.

## Required composition

- Provide Root options and an accessible Input, preferably inside Control with optional Clear and Trigger so Content positions from the complete visible control. Inside optional Portal and Content, render exactly one Listbox containing an Item for each available filtered option plus optional Group with Label, Empty, and Loading states.

## Rules

- **MUST:** Treat committed value, editable inputValue, and open state as independent controllable contracts and route each controlled prop through its matching callback.
- **MUST:** Give Root the complete stable option data and render matching uniquely valued Items for filtered options; mark disabled options and keep labels consistent with filtering and display.
- **MUST:** Enable freeSolo only when arbitrary typed values are valid domain values, and choose clearOnSelect deliberately for both option and free-form commits.
- **MUST:** Give Input an accessible Label or native relationship and preserve its combobox, listbox, active-descendant, editable focus, Arrow/Home/End, Enter, Escape, Tab, open-on-focus, and pointer-selection suppression behavior.
- **MUST:** Treat only the committed logical value as satisfying required validity; display text alone must not satisfy the aligned native value proxy.
- **MUST:** Keep Content as positioning and dismissal owner and Listbox as the semantic option owner; use preventDefault on onInteractOutside rather than competing document listeners.

## Common mistakes

- **Avoid:** Conflating input text with committed value, enabling freeSolo for a closed vocabulary, omitting rendered Items for options, or putting listbox role on Content instead of Listbox. **Instead:** Manage the three states explicitly, restrict freeSolo to valid arbitrary values, keep option data and Items aligned, and preserve the compound semantic owners.

## Validation checklist

- Verify controlled/uncontrolled committed value, input text, and open state; default label initialization; filtering and grouping; disabled options; Input typing; Arrow/Home/End; Enter option and freeSolo commits; Escape close-then-clear; Tab; openOnFocus with Empty; Clear; Trigger mobile focus; pointer selection; and clearOnSelect.
- Verify Label and Field relationships, required committed-value validity, inline/native validation focus, hidden named value and external form, reset, loading/empty states, Control-sized collision positioning, portals, completed mouse/touch/pen/virtual outside dismissal, cancellation, and highlighted-item scrolling.

## Related guidance

- `select`
- `listbox`
- `multi-select`
- `input`
- `field`
- `form`

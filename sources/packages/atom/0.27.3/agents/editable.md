# Editable agent guide

## Purpose

Own inline preview/edit transactions, commit/cancel and focus without visual styling.

## Use when

- An existing text value should become editable on demand and support cancellation.

## Choose something else when

- A value is permanently shown as a form field. Use Input or Textarea.

## Required composition

- Use Root or RootProvider with Area, Preview and exactly one Input or Textarea. Provide Label or another accessible name; explicit controls are optional.

## Rules

- **MUST:** Root, RootProvider, Area, Control and Preview support one-child asChild projection. Preserve native Input/Textarea/Label hosts. Keep preview children synchronized through Context valueText; do not nest interactive descendants inside a preview.
- **MUST:** Treat onValueChange as draft changes and onValueCommit as a commit request; persistence belongs to the application.
- **MUST:** Update controlled value/edit in their callbacks; refused edit transitions do not commit or revert.
- **MUST:** Use one named input or textarea; do not render both or add a duplicate hidden form value.

## Common mistakes

- **Avoid:** Saving every draft keystroke as a completed rename. **Instead:** Save on commit and preserve application-owned error/retry state.

## Validation checklist

- Test empty/default-edit rollback, controlled transitions, outside cancellation, explicit controls and IME.
- Test multiline newlines/modifier submit, native form reset/validation, Field naming and nested dialog focus.
- With autoResize, verify responsive width changes, settled textarea height and cleanup without observer errors; allow a rendering frame for observer-driven updates.

## Related guidance

- `input`
- `field`
- `form`
- `dialog`

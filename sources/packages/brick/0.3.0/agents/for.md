# For agent guide

## Purpose

Render a typed collection or one explicit fallback without inserting a wrapper.

## Use when

- An authored collection renders repeated JSX while keeping its collection owner and item identity explicit.

## Choose something else when

- The operation transforms, filters, groups, or aggregates data rather than rendering JSX. Use native array methods or the domain collection owner.

## Required composition

- Place For inside a semantic List, Grid, Stack, Select, MultiSelect, or other authored owner and put a stable key on each returned item root. Do not place it directly inside an owner such as AvatarGroup that must count and wrap its immediate authored children.

## Rules

- **MUST:** Author stable keys on returned item roots; For does not infer identity.
- **MUST:** Do not add a wrapper merely for For; choose the semantic collection owner separately.
- **MUST:** Load any styles required by rendered children; For itself needs no CSS and its compatibility stylesheet is empty.

## Common mistakes

- **Avoid:** Using the source index as identity for reorderable data. **Instead:** Use the item's stable domain identifier as the returned root key.
- **Avoid:** Placing For directly inside a component that counts or transforms immediate authored children, such as AvatarGroup. **Instead:** Author the fixed children explicitly or use that owner's collection API so its direct-child contract remains visible.

## Validation checklist

- Verify direct child structure, item order, empty and undefined fallback, inferred item types, and key ownership.

## Related guidance

- `list`
- `grid`
- `stack`
- `select`
- `multi-select`
- `avatar-group`

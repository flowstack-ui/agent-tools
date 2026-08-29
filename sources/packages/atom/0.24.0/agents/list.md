# List agent guide

## Purpose

Render server-safe native ordered or unordered list structure without adding selection, activation, focus, or navigation behavior.

## Use when

- Content is naturally a set of peer items or a sequence whose order may carry meaning.

## Choose something else when

- Items are persistent route destinations. Use NavList.
- Items form a keyboard-operated choice or action collection. Use Listbox, Menu, RadioGroup, or another matching interactive primitive.
- Content only needs visual spacing and has no list relationship. Use the styled layer's layout primitive.

## Required composition

- Compose List.Root with List.Item children and set ordered only when item sequence changes meaning.
- Preserve ul or ol and li semantics when using render or asChild.
- Treat Item disabled state as descriptive metadata; separately disable or remove every interactive descendant when required.

## Rules

- **MUST:** Preserve a native list root and list-item descendants unless an equivalent composed host retains the same semantics.
- **MUST:** Use ordered=true only when sequence changes meaning; visual numbering alone is not enough.
- **MUST:** Do not add selection, activation, roving focus, or route-current behavior to List; choose the primitive that owns that interaction.
- **SHOULD:** Keep static List composition server-safe unless authored descendants introduce a genuine client behavior requirement.

## Common mistakes

- **Avoid:** Using List as a generic row layout or adding click and keyboard behavior to its items. **Instead:** Use native list semantics only for real item relationships and select NavList, Listbox, Menu, or another behavior owner for interaction.
- **Avoid:** Assuming Item disabled metadata disables nested controls. **Instead:** Apply the correct disabled contract to each interactive descendant because List only exposes descriptive item metadata.

## Validation checklist

- Inspect the rendered ul or ol and li anatomy and confirm ordered meaning, start, reversed, and item values where used.
- Check list announcement in assistive technology, nested-list ownership, long content, zoom, and custom-render semantics.
- Confirm List adds no keyboard model and every interactive descendant owns its own accessible name and disabled state.

## Related guidance

- `nav-list`
- `listbox`
- `menu`
- `feed`

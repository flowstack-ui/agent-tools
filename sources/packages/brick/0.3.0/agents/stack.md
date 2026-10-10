# Stack agent guide

## Purpose

CSS flexbox layout through Stack/HStack/VStack: responsive direction, reverse, wrapping, independent gaps, multiline alignment, and explicit item allocation.

## Use when

- Content needs one-dimensional vertical or horizontal layout.

## Choose something else when

- Both rows and columns need explicit track control. Use Grid.
- Content overlaps in depth. Use ZStack or Surface media anatomy.

## Required composition

- Use VStack for a fixed column, HStack for a fixed centered row, and Stack for configurable or reverse directions. Root supports inline and asChild.
- Use as="ul" or as="ol" when the one-dimensional peers form a semantic list; Stack removes native list geometry while preserving the relationship.
- Use Stack.Item when one direct child must remain content-sized, fixed, or consume a proportional share.
- When the parent changes axis, review each Item flex recipe too; a proportional desktop column usually becomes content-sized in a mobile column.
- Keep the Item wrapper when equal outer tracks contain children with different padding or borders; use asChild only when the child's own box should participate in flex allocation.
- When Stack.Item composes a control with asChild, rely on the control's own size recipe; Stack preserves its declared minimum block size while adding flex participation.
- Use Stack.Item grow/shrink/basis for custom allocation, order for intentional visual placement, and logical margin props including auto for displaced groups. Frame owns size constraints; Surface owns paint.

## Rules

- **MUST:** Use separator with Stack.Separator for decorative direct-peer lines; gap is applied on each side. Never combine automatic separators with asChild or ul/ol. Templates cannot carry id/ref or interactive children. For/Fragments/custom output are opaque; author separators within those collections. Wrapping and CSS-hidden peers do not receive visual-row filtering.
- **MUST:** Use Stack for one primary layout axis and allow wrapping only when the resulting order remains clear.
- **MUST:** Use non-negative numeric spacing factors for ordinary gap and logical edge spacing; use an explicit CSS value only for a measured exception or application spacing token, and preserve legacy string tokens when maintaining existing geometry.
- **MUST:** Use a semantic list host when Stack children form a real set; do not add consumer CSS to cancel native ul or ol margins or markers because Stack owns that host geometry.
- **MUST:** Use responsive Stack values for arrangement changes; use Show/Hide only when the actual interface changes.
- **MUST:** Reverse and order change visual placement only. Preserve meaningful DOM, reading and keyboard sequences; never repair ordering with positive tabindex or duplicate responsive content.
- **MUST:** Load styles.css or core.css plus stack.css.
- **MUST:** Explicit rowGap/columnGap override gap independently. Explicit grow/shrink/basis override recipe channels and persist across later recipe changes. Use each prop's own responsive value to reset it.
- **MUST:** Spacing numbers are base-unit factors; basis numbers are pixel lengths. Factors must be finite/nonnegative; order is a finite integer.

## Common mistakes

- **Avoid:** Duplicating the same content through Show/Hide only to switch row and column. **Instead:** Use responsive Stack direction.
- **Avoid:** Writing grow/shrink CSS for ordinary columns. **Instead:** Use Stack.Item flex recipes or explicit grow/shrink/basis props; prefer intrinsic wrapping when the available container width owns the change.
- **Avoid:** Adding a local class only because the desired gap is outside the legacy zero-through-six token scale. **Instead:** Use a numeric factor such as gap={8}, an explicit CSS length, or an application custom property through the supported spacing prop.
- **Avoid:** Assuming reverse also changes keyboard order, or alignContent aligns individual items. **Instead:** Keep meaningful source order. Use align for individual cross-axis alignment and alignContent for wrapped lines.

## Validation checklist

- Check source and visual order at narrow widths and zoom.
- Confirm numeric, explicit, and responsive spacing values create the intended computed geometry; reject negative, non-finite, and empty values.
- For ul and ol hosts, confirm zero native margin, no visual marker, and preserved list semantics.
- Check every authored breakpoint, logical edge spacing, wrapping, alignment, and RTL behavior.
- Check responsive gap/longhand precedence, nested reset, root/Item asChild composition and control minimum sizes.
- For order/reverse, manually judge meaningful keyboard and reading order; automation is not sufficient.

## Related guidance

- `grid`
- `z-stack`
- `show`
- `hide`
- `surface`
- `card`

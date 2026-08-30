# SwipeableItem agent guide

## Purpose

Enhance a list-like row with direction-aware start or end action panels revealed by horizontal drag or equivalent keyboard commands while preserving vertical scrolling.

## Use when

- A row has a few quick actions that benefit from touch swipe reveal and the same actions remain available through an obvious tap or click route and keyboard reveal.

## Choose something else when

- There are many actions, discovery is critical, or swipe would be surprising or the only single-pointer path. Use Menu, visible actions, or another explicit application control.

## Required composition

- Compose Root with one focusable Content surface and an Actions group for each supported logical start or end side. Put real accessible buttons or links inside Actions and provide an obvious non-swipe route to every important command.

## Rules

- **MUST:** Treat swipe as enhancement only; keyboard reveal does not replace the required obvious tap or click alternative for important actions.
- **MUST:** Give every Actions panel an accessible group name and its child controls complete semantics; keep closed panels inert and accessibility-hidden.
- **MUST:** Preserve vertical pan, horizontal intent detection, pointer capture, cancellation rollback, measured side sizes, threshold settlement, and one owned pointer interaction rather than blocking page scrolling.
- **MUST:** Keep Content focusable and preserve direction-aware Arrow reveal, opposite-Arrow close, same-Arrow full swipe, and Escape close only when Content itself owns the key; descendant controls retain their keys.
- **MUST:** Enable onFullSwipe only for an action safe to invoke from a threshold gesture and retain an explicit equivalent control; choose thresholds deliberately.
- **MUST:** Use openSide with onOpenSideChange for controlled state or defaultOpenSide for uncontrolled state and preserve disabled versus focusable read-only behavior and logical LTR/RTL sides.

## Common mistakes

- **Avoid:** Making swipe the only route to Delete, preventing vertical page scroll, firing a destructive full swipe too easily, or letting Arrow keys from nested controls reveal actions. **Instead:** Provide an explicit action route, retain pan-y behavior and intent thresholds, reserve full swipe for deliberate safe policy, and preserve keyboard target isolation.

## Validation checklist

- Verify controlled/uncontrolled start/end/null state, LTR and RTL logical side mapping, measured widths and offsets, pointer down/move/up settlement, threshold boundaries, cancellation rollback, capture, vertical pan, disabled/read-only state, and action closeOnClick.
- Verify Content focus, Arrow reveal and close, same-Arrow full swipe, Escape, descendant keyboard isolation, hidden/inert closed panels, accessible action group and controls, obvious pointer fallback, full-swipe equivalent action, asChild/render composition, and real-browser mouse/touch scrolling behavior.

## Related guidance

- `menu`
- `list`

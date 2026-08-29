# ContextMenu agent guide

## Purpose

Open the shared Menu command model at the invocation point of a secondary-click, keyboard context-menu action, or cancel-safe touch and pen long press.

## Use when

- Commands belong to the exact file, row, canvas object, or region a user invokes contextually and every important command also has a discoverable route.

## Choose something else when

- The actions need a visible button, are the only route to an important task, or belong to a persistent application command bar. Use DropdownMenu, visible controls, or Menubar.

## Required composition

- Compose Root with Trigger wrapping the owned target region and Content. Add Portal and Arrow only when needed; compose Content from the shared Menu Item, selection, grouping, separator, and paired submenu parts.

## Rules

- **MUST:** Provide another visible or keyboard-discoverable route to every important action; ContextMenu must remain an enhancement rather than the only access path.
- **MUST:** Keep Trigger as a behavior wrapper without invented button semantics and preserve the wrapped target's native semantics and actions through asChild or render composition.
- **MUST:** Preserve secondary-click coordinates, keyboard anchor behavior, cross-trigger handoff, and the cancel-safe 700 ms touch and pen long press with its movement, scroll, multi-pointer, and native-event cancellation.
- **MUST:** Give Content an explicit ariaLabel when the non-semantic Trigger cannot provide an appropriate menu label.
- **MUST:** Preserve the shared Menu item roles, real focus, typeahead, disabled navigation, selection close policy, submenus, modal ownership, outside dismissal, and focus restoration.

## Common mistakes

- **Avoid:** Making right-click the only route to an action, adding button semantics to the target wrapper, or implementing a second long-press and point-positioning system. **Instead:** Keep visible alternatives, preserve target semantics, and use ContextMenu's owned invocation and Menu contracts.

## Validation checklist

- Verify secondary click at changing coordinates, keyboard invocation, preventDefault consumer handling, transfer between registered targets, disabled state, and touch and pen long press cancellation for movement, scroll, release, cancellation, second pointer, native contextmenu, and unmount.
- Verify Content naming, item focus and typeahead, selection roles and close policies, submenu behavior, Tab and Escape, outside dismissal, modal isolation, parent-modal portals, LTR and RTL, and focus return.

## Related guidance

- `menu`
- `dropdown-menu`
- `menubar`

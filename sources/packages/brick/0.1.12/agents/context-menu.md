# ContextMenu agent guide

## Purpose

Present finished target-specific commands at a secondary-click, keyboard context-menu invocation, or cancel-safe touch and pen long press while Atom owns invocation, menu semantics, focus, dismissal, and positioning.

## Use when

- Commands belong to the exact file, row, canvas object, or region invoked contextually and every important command also has a visible or keyboard-discoverable route.

## Choose something else when

- The actions need a visible button, are the only route to an important task, or belong to a persistent application command bar. Use DropdownMenu, visible Brick controls, or Menubar.
- The content is site navigation or form-value selection. Use NavigationMenu or NavList, or Select.

## Required composition

- Compose ContextMenu.Root with ContextMenu.Trigger around the owned target and ContextMenu.Portal with ContextMenu.Content. Build Content from uniquely valued Item, CheckboxItem, RadioGroup and RadioItem, Group and Label, Separator, and paired Sub, SubTrigger, and SubContent parts; use Leading, ItemLabel, Description, Shortcut, and ItemIndicator for finished rows.
- Keep Trigger paintless and preserve the target's native semantics through asChild or render. Give Content ariaLabel when the target cannot supply an appropriate menu label, and reproduce any local Appearance scope on the portalled visual root.

## Rules

- **MUST:** Provide another visible or keyboard-discoverable route to every important command; ContextMenu is an enhancement, never the only access path.
- **MUST:** Keep Trigger as a paintless behavior wrapper and preserve the target's native role, name, action, handlers, and composition instead of inventing button semantics or target paint.
- **MUST:** Rely on Atom for secondary-click coordinates, Shift+F10 and Context Menu key anchoring, cross-target handoff, and the fixed cancel-safe 700 ms touch and pen long press; do not add gesture timers or positioning listeners.
- **MUST:** Give Content an explicit ariaLabel when the contextual target cannot generate an appropriate accessible menu name.
- **MUST:** Use uniquely valued command, checkbox, and radio item roles, provide textValue when rendered content is not searchable text, and preserve disabled-item navigation, typeahead, closeOnSelect, and paired submenu behavior.
- **MUST:** Use Leading, ItemLabel, Description, Shortcut, ItemIndicator, and tone=danger for their documented jobs instead of rebuilding row columns, selection glyphs, or destructive emphasis.
- **SHOULD:** Keep Content collision-aware and internally scrollable at its available height; verify repeated invocation points, edge collision, zoom, narrow viewports, long labels, and LTR and RTL submenus without changing it into a mobile tray.
- **MUST:** When Portal leaves a local Appearance scope, reproduce that scope on the portalled visual root or target a portal container inside it.
- **MUST:** Load styles.css or core.css plus context-menu.css and every composed child component stylesheet.

## Common mistakes

- **Avoid:** Making right-click the only route to an action, styling Trigger as a control, or implementing another long-press and point-positioning system. **Instead:** Keep visible alternatives, preserve target semantics, and use ContextMenu's owned invocation contract.
- **Avoid:** Using ContextMenu for navigation or form selection, hand-building row columns, or closing the menu tree with document listeners. **Instead:** Choose the semantic owner, compose the public item anatomy, and rely on Atom's Menu focus and dismissal behavior.

## Validation checklist

- Verify the visible alternative, secondary click at changing coordinates, Shift+F10 and Context Menu key opening, repeated and cross-target invocation, disabled state, and touch and pen hold cancellation for movement, scroll, release, cancellation, second pointer, native contextmenu, and unmount.
- Verify Content naming, real item focus, Home/End and typeahead, disabled navigation without activation, checkbox mixed and radio state, selection close policy, submenu keys and whole-tree dismissal, Tab, Escape, outside activation, and focus return.
- Verify three densities, row anatomy and danger meaning, constrained scrolling, collision placement, zoom, narrow viewports, LTR and RTL, reduced motion, forced colors, light and dark portalled appearance, and complete CSS.

## Related guidance

- `@flowstack-ui/atom/agents/context-menu`
- `@flowstack-ui/atom/agents/menu`
- `dropdown-menu`
- `menubar`
- `navigation-menu`
- `nav-list`
- `select`
- `button`
- `appearance`

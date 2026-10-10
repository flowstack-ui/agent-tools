# Menubar agent guide

## Purpose

Coordinate a persistent application-style set of top-level menus with menubar semantics, roving trigger focus, adjacent-menu handoff, and shared Menu content behavior.

## Use when

- A desktop-like application has several persistent command groups such as File, Edit, and View that must behave as one keyboard menubar.

## Choose something else when

- There is one temporary command menu, ordinary website navigation, a normal link list, or only a few independent buttons. Use DropdownMenu, NavigationMenu, NavList, Toolbar, or Button.

## Required composition

- Give Root an accessible name and compose one or more uniquely valued Menu scopes, each with Trigger and Content. Use shared Menu items and add Portal, Arrow, grouping, selection items, separators, or paired submenus only when required.

## Rules

- **MUST:** Pointer opening and adjacent pointer handoff focus the popup without automatically highlighting a command. Keyboard and assistive activation preserve first/last entry. Test initial opening before moving the pointer onto any item, not only pointer-leave clearing.
- **MUST:** Keep the owning strip inside each popup interaction boundary. Adjacent pointer/focus handoff must open the requested menu without an outside-dismiss race; preserve consumer persistentElements alongside the internal boundary.
- **MUST:** Use useMenu/useDropdownMenu/useContextMenu with the matching RootProvider; pass the unchanged controller. Menubar uses its own useMenubar coordinator. Root and RootProvider are alternatives, not nested state owners.
- **MUST:** Use highlightedValue with onHighlightChange for controlled highlight. Repeated radio values require { value, groupId } and a stable RadioGroup id. A rejected controlled update must not move DOM focus independently.
- **MUST:** Use Item onSelect and root onSelect as one cancellable transaction. preventDefault prevents choice mutation and menu closing. Use asChild native links and navigate only for normal router navigation; preserve modified clicks, download and target behavior.
- **MUST:** Use positioning and presence options instead of document positioning or focus workarounds. Content keeps the semantic scroll/ref target; Arrow is hosted outside its clipping region. Retained closed content stays hidden/inert and cannot receive focus.
- **MUST:** Give the role=menubar Root an accessible name and keep each top-level Trigger as its role=menuitem child with one roving tab stop.
- **MUST:** Provide a unique value for every top-level Menu and keep its Trigger and Content inside that Menu scope.
- **MUST:** Match orientation to the rendered arrangement and preserve direction-aware top-level Arrow movement, adjacent open-menu handoff, and nested submenu keys in LTR and RTL.
- **MUST:** Preserve Menu's real item focus, typeahead, selection roles, disabled navigation, close policies, submenus, Tab exit across the complete Root, Escape stack, portals, and parent-modal ownership.
- **MUST:** When Root, Trigger, Content, or shared retained parts use asChild or render, preserve Atom roles, refs, handlers, native props, ARIA, data state, and children.

## Common mistakes

- **Avoid:** Using Menubar as styled website navigation, omitting its accessible name, duplicating top-level values, or implementing each heading as an independent dropdown. **Instead:** Use Menubar only for application command groups and preserve its single roving, orientation-aware top-level ownership.

## Validation checklist

- Verify Root naming and orientation, unique menu values, one top-level tab stop, Home/End, horizontal and vertical Arrow movement, LTR and RTL, pointer and touch opening, keyboard first/last opening, hover switching, controlled active value, disabled triggers, and adjacent-menu focus ownership.
- Verify shared item roles, typeahead, checkbox and radio state, submenus, selection close policy, whole-root Tab exit, top-layer Escape, focus return, portals, parent-modal focus registration, and asChild/render composition.

## Related guidance

- `menu`
- `dropdown-menu`
- `context-menu`
- `navigation-menu`
- `nav-list`
- `toolbar`

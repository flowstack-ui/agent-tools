# Menu agent guide

## Purpose

Provide the shared command and settings menu engine with real item focus, selection roles, typeahead, submenus, positioning, dismissal, and optional modal behavior.

## Use when

- A temporary list of commands or settings opens directly or a custom trigger primitive must reuse Atom's complete menu behavior.

## Choose something else when

- A visible button, contextual gesture, or persistent application command bar owns invocation, or the main job is choosing a form value or navigating links. Use DropdownMenu, ContextMenu, Menubar, Select, Listbox, or NavigationMenu.

## Required composition

- Compose Root around Content and uniquely valued Item parts; use ariaLabel when no trigger labels Content. Add Portal and Arrow only when needed, Group with Label for announced grouping, CheckboxItem for independent settings, RadioGroup with RadioItem for exclusive settings, and Sub with its paired SubTrigger and SubContent for a cascade.

## Rules

- **MUST:** Ordinary command, checkbox and radio rows clear mouse-owned highlight on pointer departure without closing the menu. Preserve keyboard focus and selection independently, controlled highlight acceptance and submenu pointer intent. Do not restore sticky mouse highlight through consumer handlers.
- **MUST:** Keep Content and its positioning host in the owning overlay scope, including nested menus in dialogs. Open parent modal registrations remain active while descendants own focus. Do not patch menu ordering with application z-index values or mirror the runtime overlay layer index as a theme token.
- **MUST:** Use useMenu/useDropdownMenu/useContextMenu with the matching RootProvider; pass the unchanged controller. Menubar uses its own useMenubar coordinator. Root and RootProvider are alternatives, not nested state owners.
- **MUST:** Use highlightedValue with onHighlightChange for controlled highlight. Repeated radio values require { value, groupId } and a stable RadioGroup id. A rejected controlled update must not move DOM focus independently.
- **MUST:** Use Item onSelect and root onSelect as one cancellable transaction. preventDefault prevents choice mutation and menu closing. Use asChild native links and navigate only for normal router navigation; preserve modified clicks, download and target behavior.
- **MUST:** Use positioning and presence options instead of document positioning or focus workarounds. Content keeps the semantic scroll/ref target; Arrow is hosted outside its clipping region. Retained closed content stays hidden/inert and cannot receive focus.
- **MUST:** Preserve placement-aware initial focus and menu-local item reveal. Do not add scrollIntoView or page-scroll restoration workarounds; long-menu scrolling must remain within the owning menu.
- **MUST:** Preserve inert on closed Content and SubContent while presence retains their exit animation. Closed surfaces must not reclaim focus or accept activation.
- **MUST:** Give standalone or context-driven Content an accessible name with ariaLabel; trigger-based compositions may use the generated trigger relationship.
- **MUST:** Use Item, CheckboxItem, and RadioItem for their matching menuitem roles, provide unique values within each item registry, and provide textValue when rendered children do not expose searchable text.
- **MUST:** Preserve Menu's real DOM item focus, disabled-item navigation without activation, typeahead, owner-aware Tab exit, Escape stack, and reason-aware focus restoration.
- **MUST:** Let newer focus handoffs win over deferred close restoration, including when their destination subsequently blurs. Native inert/removal fallback to the document body is not a new focus owner. Reopening or unmounting cancels obsolete restoration; do not add consumer restoration workarounds.
- **MUST:** Choose closeOnSelect by interaction: commands normally close, while checkbox and radio settings normally remain open; do not close the tree with competing item handlers.
- **MUST:** Keep SubTrigger and SubContent within one Sub, preserve direction-aware open and close keys, and do not silently replace the cascade with a viewport-inferred drill-in model.
- **MUST:** Use the preventable onInteractOutside contract instead of document listeners so only completed top-layer activations dismiss the correct submenu or complete tree.
- **MUST:** With an Arrow mounted, positioning gutter/sideOffset measures the gap to the arrow tip; without an Arrow the gap is to content. Explicit positioning.offset remains a raw offset. Arrow layout-size changes are observed in the owner document when positioning listeners are enabled. Do not compensate for Arrow depth with an additional caller gutter.

## Common mistakes

- **Avoid:** Using Menu for form selection or site navigation, manually roving aria-activedescendant, removing disabled items from keyboard movement, or treating a submenu as responsive drill-in navigation. **Instead:** Choose the semantic owner first and preserve Menu's real-focus item registry, selection roles, and explicit cascade; build a separate application-level drill-in flow when required.

## Validation checklist

- Verify accessible naming, controlled and uncontrolled open state, modal and non-modal focus behavior, Arrow keys, Home/End, typeahead, Enter/Space, disabled items, Tab exit, Escape, selection close policy, outside activation, and focus restoration.
- Verify checkbox mixed state, radio-group scoping, group labels, indicators, nested submenu pointer and keyboard behavior, whole-tree dismissal, LTR and RTL, collision placement, long-content scrolling, portals, and parent-modal ownership.

## Related guidance

- `dropdown-menu`
- `context-menu`
- `menubar`
- `select`
- `listbox`
- `navigation-menu`

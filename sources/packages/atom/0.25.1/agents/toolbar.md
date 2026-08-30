# Toolbar agent guide

## Purpose

Group related commands in one ARIA toolbar with orientation-aware roving keyboard focus.

## Use when

- A compact row or column of related application controls should behave as one keyboard group.

## Choose something else when

- The items navigate among pages or are unrelated standalone actions. Use NavigationMenu, NavList, or separate Buttons.

## Required composition

- Compose Button, Link, Separator, and ToggleGroup/ToggleItem parts inside a named Root; keep all toolbar items in logical DOM order.

## Rules

- **MUST:** Give the toolbar and icon-only controls useful accessible names.
- **MUST:** Let Toolbar own item registration and arrow-key focus rather than adding competing tabIndex or key handlers.

## Common mistakes

- **Avoid:** Using AppBar.Toolbar as an ARIA toolbar or nesting a second roving-focus implementation. **Instead:** Compose Toolbar.Root inside AppBar when grouped controls need toolbar behavior.

## Validation checklist

- Test orientation, arrows, Home/End if supported, disabled items, toggle state, links, Tab entry/exit, and RTL.
- Confirm separators and controls expose correct semantics.

## Related guidance

- `app-bar`
- `button`
- `link`
- `toggle-group`

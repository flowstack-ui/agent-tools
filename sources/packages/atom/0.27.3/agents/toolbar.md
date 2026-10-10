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

- **MUST:** Use Group for named subgroups without a second roving scope. Input participates in the same toolbar; keep one input last in horizontal toolbars so native editing arrows remain available and Tab exits. Root disabled overrides descendants; focusableWhenDisabled on Button preserves discovery without activation.
- **MUST:** Give the toolbar and icon-only controls useful accessible names.
- **MUST:** Let Toolbar own item registration and arrow-key focus rather than adding competing tabIndex or key handlers.

## Common mistakes

- **Avoid:** Using AppBar.Toolbar as an ARIA toolbar or nesting a second roving-focus implementation. **Instead:** Compose Toolbar.Root inside AppBar when grouped controls need toolbar behavior.

## Validation checklist

- Test orientation, arrows, Home/End, root disabled, focusableWhenDisabled buttons, toggle state, links, native input editing, Tab entry/exit, cancellation, iframe ownership and RTL.
- Confirm Group naming and separator orientation/decorative semantics and forwarded refs.

## Related guidance

- `app-bar`
- `button`
- `link`
- `toggle-group`

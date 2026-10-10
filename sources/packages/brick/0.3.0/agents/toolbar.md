# Toolbar agent guide

## Purpose

Style one logical group of related commands with Atom toolbar semantics and roving keyboard focus.

## Use when

- Related editor or application controls should behave as one horizontal or vertical keyboard group.

## Choose something else when

- The items are navigation destinations or unrelated standalone actions. Use NavigationMenu/NavList or separate Button and IconButton controls.

## Required composition

- Compose Button, Link, Group, Input, Separator and ToggleGroup/ToggleItem inside a named Root. Share Button/Toggle/Input presentation; keep one roving scope.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use Toolbar rather than adding manual arrow-key handlers or role=toolbar to an AppBar row.
- **MUST:** Load styles.css or core.css plus toolbar.css and any composed Icon stylesheet.
- **MUST:** Use Button recipes for commands and Toggle recipes for selection. Root size supplies responsive defaults; item props override. Composed asChild/render hosts own presentation, so give IconButton its size and inside focus ring explicitly.
- **MUST:** Keep a horizontal Input last so native editing keys remain available and Tab exits; do not add another roving scope. Root disabled dominates descendants; focusableWhenDisabled never permits activation.
- **MUST:** Toolbar does not wrap. Bound its container for native main-axis overflow; do not hide controls or invent an overflow menu.

## Common mistakes

- **Avoid:** Using AppBar.Toolbar as the behavior owner or placing unrelated page actions in one roving group. **Instead:** Compose a named Toolbar only around logically related controls.

## Validation checklist

- Test orientation, arrows, disabled items, links, toggles, separators, Tab entry/exit, focus rings, touch targets, overflow, themes, zoom, and RTL.
- Confirm names and CSS delivery.

## Related guidance

- `app-bar`
- `button`
- `icon-button`
- `toggle-group`
- `divider`

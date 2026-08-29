# BottomNavigation agent guide

## Purpose

Style a short, stable set of primary compact-application destinations with active state and label-visibility recipes.

## Use when

- A compact application needs a small fixed set of primary destinations at the bottom edge.

## Choose something else when

- Navigation is longer, grouped, top-level disclosure navigation, or local panel switching. Use NavList, NavigationMenu, or Tabs.

## Required composition

- Place named Items with unique values inside Root; provide href for destinations and include text labels even when the selected visual recipe hides them.

## Rules

- **MUST:** Keep every icon destination's text accessible in every label-visibility mode.
- **MUST:** When fixed or sticky, coordinate application content and safe-area spacing outside the component.
- **MUST:** Load styles.css or core.css plus bottom-navigation.css.

## Common mistakes

- **Avoid:** Using BottomNavigation as a generic mobile menu or removing labels from the DOM. **Instead:** Use Drawer/NavList for a menu and preserve each Item label.

## Validation checklist

- Check active, disabled, label visibility, safe areas, narrow widths, touch targets, focus, and RTL.
- Confirm URL destinations render links and CSS is loaded.

## Related guidance

- `nav-list`
- `tabs`
- `icon-button`
- `show`
- `hide`

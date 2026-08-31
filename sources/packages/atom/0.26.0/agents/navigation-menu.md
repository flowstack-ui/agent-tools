# NavigationMenu agent guide

## Purpose

Provide disclosure navigation with coordinated triggers, links, content, viewport geometry, focus, keyboard, pointer, and dismissal behavior.

## Use when

- Site or product navigation contains top-level links and disclosure panels of related destinations.

## Choose something else when

- The interface is an action menu, persistent route list, or tab panel switcher. Use Menu, NavList, or Tabs.

## Required composition

- Compose Root > List > Item containing Link or Trigger plus Content; use one Viewport for shared positioned content and Indicator when the styled layer needs trigger geometry.

## Rules

- **MUST:** Use NavigationMenu for destinations, not commands, selections, or arbitrary popover content.
- **MUST:** Use the primitive's trigger, content, viewport, arrow, offset, focus, and dismissal contracts instead of manually positioning a competing overlay.
- **MUST:** Let Viewport's active-trigger and collision geometry position a horizontal panel; customize collisionPadding only when the surrounding layout needs a different visible-edge inset.

## Common mistakes

- **Avoid:** Positioning content against the page or logo rather than its owning trigger/viewport, or using menuitem semantics. **Instead:** Keep the documented List/Item/Trigger/Content/Viewport composition and native link semantics.

## Validation checklist

- Test pointer hover, click, keyboard opening, arrow navigation, focus transfer, outside dismissal, Escape, RTL geometry, narrow panels, and first/last-trigger viewport collisions.
- Confirm links navigate normally and action-menu roles are absent.

## Related guidance

- `nav-list`
- `menubar`
- `dropdown-menu`
- `app-bar`

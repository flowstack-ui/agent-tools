# NavigationMenu agent guide

## Purpose

Provide disclosure navigation with coordinated triggers, links, content, viewport geometry, focus, keyboard, pointer, and dismissal behavior.

## Use when

- Site or product navigation contains top-level links and disclosure panels of related destinations.

## Choose something else when

- The interface is an action menu, persistent route list, or tab panel switcher. Use Menu, NavList, or Tabs.

## Required composition

- Compose Root > List > Item containing Link or Trigger plus Content; use one Viewport for shared positioned content and Indicator when the styled layer needs trigger geometry.
- Set Root viewport=false for inline content without Viewport. Use useNavigationMenu with RootProvider for external state; Context and useNavigationMenuContext expose public state/actions. ItemIndicator is a headless decorative per-item state slot.
- Explicit lazyMount/unmountOnExit overrides the Viewport forceMount compatibility option. The public context hook returns NavigationMenuApi, not internal registries.

## Rules

- **MUST:** Use NavigationMenu for destinations, not commands, selections, or arbitrary popover content.
- **MUST:** Use the primitive's trigger, content, viewport, arrow, offset, focus, and dismissal contracts instead of manually positioning a competing overlay.
- **MUST:** Let Viewport own collision-aware placement. Use anchor=trigger (default) or anchor=navigation to select the alignment rectangle; the indicator continues to follow the active trigger. Content exposes from-start/from-end and to-start/to-end for layered exchanges; the styled layer owns animation, not application state.

## Common mistakes

- **Avoid:** Positioning content against the page or logo rather than its owning trigger/viewport, or using menuitem semantics. **Instead:** Keep the documented List/Item/Trigger/Content/Viewport composition and native link semantics.

## Validation checklist

- Dwell over inline destinations past closeDelay, then leave the panel; check canceled handlers and leave policy. Scroll an open panel near browser boundaries. Inspect arrow geometry throughout exit and interrupted reopen, not only settled screenshots.
- Switch from pointer departure to keyboard entry before closeDelay expires; the old pointer timer must not dismiss keyboard-focused content.
- Test pointer hover, click, keyboard opening, arrow navigation, focus transfer, outside dismissal, Escape, RTL geometry, narrow panels, and first/last-trigger viewport collisions.
- Confirm links navigate normally and action-menu roles are absent.
- Preserve native field and nested-widget Home/End/arrow-key behavior inside both panel modes; Escape still dismisses the navigation layer.
- Verify openDelay and closeDelay precedence over legacy delayDuration, pointer-only policy flags, keyboard access, canceled selection/dismissal, persistent hidden content, ref cleanup, inline/shared host identity, controller state and logical viewport alignment. Activity requires React 19.2+.

## Related guidance

- `nav-list`
- `menubar`
- `dropdown-menu`
- `app-bar`

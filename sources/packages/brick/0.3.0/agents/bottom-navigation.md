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
- **MUST:** Use surface for opaque positioned navigation and outline for a transparent boundary. Use responsive size/arrangement, radius, selectionRadius, selectionVariant and elevation before custom CSS. Keep URL selection controlled from the actual route.
- **MUST:** Use treatment translucent for an opt-in preset; backgroundOpacity, backdropBlur, backdropSaturate, borderColor and borderOpacity independently tune the painted root. Exact px/rem/em blur values need no token. Preserve semantic foregrounds, native overflow and portalled popup ownership; backdrop filtering contains positioned descendants. Instance effect inputs do not inherit into nested owners. Theme defaults tune opted-in presets only.

## Common mistakes

- **Avoid:** Using BottomNavigation as a generic mobile menu or removing labels from the DOM. **Instead:** Use Drawer/NavList for a menu and preserve each Item label.
- **Avoid:** Anchoring a notification to the whole selection pill or shrinking targets to fit a long menu. **Instead:** Put NotificationBadge around the glyph inside Icon; keep three to five destinations and use NavList for larger navigation.

## Validation checklist

- Check active, disabled, label visibility, safe areas, narrow widths, touch targets, focus, and RTL.
- Confirm URL destinations render links and CSS is loaded.
- Verify unchanged default and legacy blurred paint, independent effect inputs, nested instances, transparent levels, unsupported filters, reduced transparency and forced colors. Do not claim opaque Theme contrast validation proves contrast over arbitrary backdrops.

## Related guidance

- `nav-list`
- `tabs`
- `icon-button`
- `show`
- `hide`

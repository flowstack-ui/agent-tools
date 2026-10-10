# Breadcrumb agent guide

## Purpose

Present page ancestry as a finished named navigation trail while preserving Atom breadcrumb semantics.

## Use when

- Users need to see the current page's place in a hierarchy and navigate to ancestors.

## Choose something else when

- The relationship is result pagination, local panels, or general navigation. Use Pagination, Tabs, or NavList.

## Required composition

- Compose Root > List > Item with ancestor Link, current Page, or a named Trigger; keep decorative Separator between Items and Ellipsis inside Item.

## Rules

- **MUST:** Use one current Page; it may compose a real destination anchor. Keep inert current text free of link roles.
- **MUST:** Load styles.css or core.css plus breadcrumb.css, including the styles for any composed menu.
- **MUST:** Choose responsive sm/md/lg size, plain/underline/subtle decoration and neutral/accent/inherit tone. Plain has no underline except inherit interaction feedback; subtle underlines on interaction. Keep status in separately composed content.
- **MUST:** Use Trigger as the real button under DropdownMenu.Trigger asChild; the menu owns focus and dismissal. Label icon-only triggers and keep the trigger mounted.
- **MUST:** Use documented local variables for icon gap, geometry and decoration; no playground-only spacing repairs or literal brand colors.

## Common mistakes

- **Avoid:** Nesting a button in a link, making Ellipsis a direct child of ol, or replacing the menu trigger on open. **Instead:** Keep Item wrappers, native Link destinations and a stable named Trigger with menu-owned lifecycle.

## Validation checklist

- Verify native/composed landmark names, current anchors, all responsive recipes and semantic tones.
- Check icon spacing with package CSS alone, custom/default separators, RTL mirroring, touch targets, wrapping, focus, forced colors and appearance re-entry.
- Exercise ancestor/ellipsis menu links, Escape and focus return; keep manual device and screen-reader evidence separate.

## Related guidance

- `@flowstack-ui/atom/agents/breadcrumb`
- `@flowstack-ui/atom/agents/button`
- `dropdown-menu`
- `icon`
- `link`
- `pagination`
- `nav-list`

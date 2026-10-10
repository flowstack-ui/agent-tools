# Sidebar agent guide

## Purpose

Coordinate expanded, rail, and offcanvas sidebar state across a trigger, complementary panel, and associated main region.

## Use when

- An application shell has a persistent side region that can collapse to a rail or leave the layout offcanvas.

## Choose something else when

- The side panel is a temporary modal overlay or ordinary static aside. Use Drawer or a native aside.

## Required composition

- Compose Trigger, Panel, and Main inside Root; place persistent navigation such as NavList inside Panel.

## Rules

- **MUST:** Use Sidebar.Main only when it is the page's single main landmark, or custom-render it without creating duplicate main landmarks.
- **MUST:** Keep offcanvas Panel content inert and outside the accessibility tree through the primitive contract.

## Common mistakes

- **Avoid:** Using Sidebar as a modal drawer or placing another main landmark inside Sidebar.Main. **Instead:** Use Drawer for modal panels and preserve one main landmark.

## Validation checklist

- Test controlled and uncontrolled expanded, rail, and offcanvas states and trigger announcements.
- Confirm offcanvas controls cannot receive focus and landmark names are unique.

## Related guidance

- `nav-list`
- `drawer`
- `app-bar`

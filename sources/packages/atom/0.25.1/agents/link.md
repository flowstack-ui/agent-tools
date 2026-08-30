# Link agent guide

## Purpose

Provide native destination navigation with composition support for router-owned anchors.

## Use when

- The user moves to a URL, route, document, download, email address, or telephone destination.

## Choose something else when

- The interaction changes current application state without navigating. Use Button.

## Required composition

- Render an anchor with a real href, or compose a router link that preserves anchor semantics and href output.

## Rules

- **MUST:** Provide a real navigable destination.
- **MUST:** Make the accessible name describe the destination or result.

## Common mistakes

- **Avoid:** Using a click handler on a non-link element for navigation. **Instead:** Render Link or a router anchor through the public composition API.

## Validation checklist

- Inspect the rendered href.
- Confirm Enter activates navigation and the link appears in the accessibility tree.

## Related guidance

- `button`
- `pressable`
- `breadcrumb`
- `nav-list`
- `navigation-menu`

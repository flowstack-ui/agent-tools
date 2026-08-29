# Pagination agent guide

## Purpose

Represent movement through ordered result pages with named navigation, current-page state, and link or controlled activation semantics.

## Use when

- A collection or result set is divided into ordered pages.

## Choose something else when

- The relationship is page ancestry, local panels, or sequential article navigation. Use Breadcrumb, Tabs, or ordinary links.

## Required composition

- Compose Root and List with Page items plus Previous, Next, and Ellipsis as needed.
- For URL-backed results, provide Root getPageHref so Item, Previous, and Next render native anchors; derive controlled Root page from the current route.

## Rules

- **MUST:** Expose exactly one current page and keep page labels meaningful to assistive technology.
- **MUST:** Use Root getPageHref when pages have URLs so native navigation, sharing, reload, and modified-click behavior continue to work.
- **MUST:** In link mode, let the browser or router own navigation; do not depend on onPageChange or replace native anchor behavior with button activation.

## Common mistakes

- **Avoid:** Rendering URL-backed pages as buttons or composing an anchor while Root remains in button mode. **Instead:** Provide Root getPageHref; optionally enhance its generated anchors through onClick without breaking modified clicks.
- **Avoid:** Rendering disabled previous or next controls as active links, or using pagination for ancestry. **Instead:** Boundary controls must expose disabled semantics without an href; use Breadcrumb for hierarchy.

## Validation checklist

- Confirm current, first, last, previous, next, disabled, and ellipsis states.
- Confirm each control has a unique accessible name and URL-backed pages expose real destinations.
- In link mode, verify reload, copy/share URL, Back/Forward, Cmd/Ctrl-click, and disabled boundary controls without href.

## Related guidance

- `breadcrumb`
- `link`
- `button`

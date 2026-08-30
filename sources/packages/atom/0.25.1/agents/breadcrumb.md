# Breadcrumb agent guide

## Purpose

Represent the current page's ancestry as a named navigation landmark and ordered hierarchy.

## Use when

- The current page belongs to a hierarchy and users may navigate to ancestor pages.

## Choose something else when

- The choices are result pages or a general destination list. Use Pagination or NavList.

## Required composition

- Compose Root > List > Item containing ancestor Link or the single current Page, with decorative Separator parts between items.

## Rules

- **MUST:** Render one non-link Page for the current location and use links only for ancestors.
- **MUST:** When Ellipsis opens hidden pages, compose it with a real named button.

## Common mistakes

- **Avoid:** Making the current page another link or placing separators outside the ordered list. **Instead:** Use Page once and keep Item and Separator parts inside List.

## Validation checklist

- Confirm the nav has a useful accessible name and one aria-current page.
- Confirm separators are absent from the accessibility tree.

## Related guidance

- `link`
- `pagination`
- `nav-list`

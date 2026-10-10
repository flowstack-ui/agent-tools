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

- **MUST:** Render one current Page, optionally composed with a real destination anchor; keep ancestor destinations as Links.
- **MUST:** When Ellipsis opens hidden pages, compose it with a real named button.
- **MUST:** Name Root with native aria-label, aria-labelledby or the legacy ariaLabel alias; native aria-label wins over the alias and the default label applies only to an otherwise unnamed host.

## Common mistakes

- **Avoid:** Adding a link role to inert current text or placing separators outside the ordered list. **Instead:** Use Page once, optionally composed with a real anchor, and keep Item and Separator parts inside List.

## Validation checklist

- Confirm the nav has a useful accessible name and one aria-current page.
- Confirm separators are absent from the accessibility tree.

## Related guidance

- `link`
- `pagination`
- `nav-list`

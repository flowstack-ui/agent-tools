# SkipLink agent guide

## Purpose

Let keyboard and assistive-technology users bypass repeated page navigation and move focus to main content.

## Use when

- A page repeats navigation or controls before its main content.

## Choose something else when

- There is no repeated content before the primary content target. Use the normal document focus order.

## Required composition

- Place Root near the beginning of the page and provide one matching Target id at main content.

## Rules

- **MUST:** Keep Root href and Target id identical and unique.
- **MUST:** Make Root the first useful focus target when it bypasses repeated navigation.

## Common mistakes

- **Avoid:** Linking to a missing id or adding a second main landmark around Target. **Instead:** Use one matching Target as the page's main landmark.

## Validation checklist

- Tab from the browser chrome, activate Root, and confirm Target receives visible focus and scrolls into view.
- Confirm the document contains one main landmark.

## Related guidance

- `app-bar`
- `sidebar`
- `link`

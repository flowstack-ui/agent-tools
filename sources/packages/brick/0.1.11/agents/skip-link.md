# SkipLink agent guide

## Purpose

Provide a visibly focused skip-navigation control and matching main-content target using Atom focus behavior.

## Use when

- A page repeats header or navigation content before main content.

## Choose something else when

- No repeated content precedes the primary content. Use normal document focus order.

## Required composition

- Place Root as the first useful focus target and one matching Target at main content; let Target own the main landmark unless custom-rendered.

## Rules

- **MUST:** Keep Root visible and readable when focused in every theme and viewport.
- **MUST:** Do not create duplicate main landmarks around Target.
- **MUST:** Load styles.css or core.css plus skip-link.css.

## Common mistakes

- **Avoid:** Hiding the link permanently, clipping its focus ring, or targeting a missing id. **Instead:** Use the matching Root/Target pair and test from the browser chrome.

## Validation checklist

- Tab to Root, activate it, and confirm Target receives visible focus and scrolls into view.
- Check themes, zoom, sticky headers, one main landmark, and CSS delivery.

## Related guidance

- `app-bar`
- `sidebar`
- `link`

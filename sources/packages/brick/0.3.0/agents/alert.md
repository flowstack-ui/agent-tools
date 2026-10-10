# Alert agent guide

## Purpose

Present persistent inline feedback with status indicators and semantic visual recipes.

## Use when

- A page needs durable informative, success, warning or error feedback.

## Choose something else when

- A blocking decision needs focus management. Use AlertDialog.
- A transient notification needs managed lifetime. Use Toast.

## Required composition

- Compose Root, optional Indicator, Content, Title and Description; use CloseButton with application state for dismissal.

## Rules

- **MUST:** Choose role=status or role=alert explicitly for dynamic announcements; status and tone never select announcement priority.
- **MUST:** Load styles.css or core.css plus alert.css; load additional composed component CSS separately.
- **MUST:** Use responsive size, variant, inline and align for visual changes; status and tone remain scalar. Sparse recipes retain md, soft, false and start defaults.
- **MUST:** Use Icon or Spinner size=inherit for slot-sized artwork. Use shared radius and accentStart before custom CSS; Content tone=primary is for suitable soft backgrounds, not a substitute for solid contrast pairs.

## Common mistakes

- **Avoid:** Using error status as an automatic assertive announcement. **Instead:** Select the live role from urgency and avoid duplicate announcements.

## Validation checklist

- Check all status/variant pairs, sizes, long content, indicator containment, light/dark, RTL and accessible actions.
- Verify compact line heights, invariant variant geometry, responsive resets, inherited artwork dimensions, logical accent stripe, shared radius and all five part refs.

## Related guidance

- `toast`
- `alert-dialog`
- `spinner`
- `close-button`
- `field`

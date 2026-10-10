# Locale Provider agent guide

## Purpose

Supply an inherited locale, logical direction, and overridable Brick-authored interface text without becoming the application translation runtime.

## Use when

- A Brick subtree needs shared number formatting, logical direction, or localized component-owned labels.

## Choose something else when

- Product copy, pluralization, routing, or message loading needs translation. Use The application's i18n system.

## Required composition

- Mount once near the application or route root and keep translated Block content in application-owned data.

## Rules

- **MUST:** Translate showPassword, hidePassword, chooseDate, clearDate, invalidDate, startDate and endDate through localeText when needed; setting locale alone does not translate generic accessibility copy. Explicit component label props take precedence.
- **MUST:** Mount LocaleProvider at an application boundary rather than inside each Block.
- **MUST:** Use localeText only for generic Brick-authored accessibility labels; keep product copy in the application message catalog.
- **MUST:** Load styles.css or core.css plus locale-provider.css.
- **MUST:** useFilter inherits locale unless explicitly overridden and forwards Intl.CollatorOptions to Atom. It returns contains, startsWith and endsWith, not application ranking or translation. Set native lang/dir on an existing host; the provider renders no DOM.

## Common mistakes

- **Avoid:** Shipping translations inside a reusable Block. **Instead:** Expose replaceable content and let the application select translated messages.

## Validation checklist

- Verify locale inheritance, RTL direction, explicit component-label precedence, nested providers, and deterministic server output.

## Related guidance

- `format-number`
- `format-byte`
- `text`
- `progress`
- `toast`
- `calendar`
- `date-input`
- `date-picker`
- `password-toggle-field`

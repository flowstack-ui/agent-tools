# Format Number agent guide

## Purpose

Render or return locale-aware numeric text through one cached platform formatter path.

## Use when

- A number, price, percentage, compact count, or measurement must follow an inherited or explicit locale.

## Choose something else when

- The value is a date, product message, or pluralized sentence. Use The application's date or message formatter.

## Required composition

- Place FormatNumber inside Text or a semantic content owner when typography or surrounding meaning is required.

## Rules

- **MUST:** Prefer LocaleProvider inheritance and pass locale only for an intentional local override.
- **MUST:** Use formatOptions rather than manually concatenating symbols or suffixes.
- **MUST:** Load styles.css or core.css plus format-number.css.
- **MUST:** Native Intl handles NaN, infinities and option errors. The shared formatter cache is bounded at 100 entries. The pure helper defaults to en-US rather than reading React context.

## Common mistakes

- **Avoid:** Formatting module-level strings before the user's locale is known. **Instead:** Keep numeric data numeric and format at the rendering boundary.

## Validation checklist

- Verify currency, percent, unit, compact notation, locale override, provider inheritance, native props, and SSR output.

## Related guidance

- `locale-provider`
- `format-byte`
- `text`

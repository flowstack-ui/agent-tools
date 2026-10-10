# Calendar agent guide

## Purpose

Inline date selection with independent focus and shared date constraints.

## Use when

- Inline date selection with independent focus and shared date constraints.

## Choose something else when

- An event scheduler or business availability workflow is required. Use Application-owned composition.

## Required composition

- Standalone Calendar has no named native form input or automatic form reset. Applications own serialization and controlled reset; use DatePicker for integrated entry and form participation.
- Root and RootProvider accept asChild for one noninteractive host; their internal content region remains. PrevTrigger, NextTrigger, ViewTrigger and TableCellTrigger accept asChild for one native button or a component forwarding button props/ref. Do not replace a button with an anchor or nest interactive controls.
- Grid shares Table, TableHead, TableBody, TableRow, TableHeader, TableCell and TableCellTrigger. Supply DateValue day cells or numeric month/year cells; triggers inherit the cell. Fixed DayTable/MonthTable/YearTable compositions belong in matching View parts. RangeText and ViewControl compose headers without changing selection.
- useCalendar and RootProvider share inline state. minView/maxView bound terminal selection; month/year values represent period starts, not implicit end-of-period timestamps. Keep popup behavior with Popover.
- Use Calendar.Root and its named parts. Supply a stable referenceDate, accessible names and a typed selectionMode value.
- Use date-value helpers for date-only, local datetime and zoned datetime values; never parse localized strings with Date.parse.
- Grid and MonthTable default to localized short month names; monthFormat="long" requests full names. RangeText and ViewTrigger describe the complete visible month window independently of selection mode.

## Rules

- **MUST:** Keep editing, selection, validation and overlay state with the owning components; do not nest independent popup engines.
- **MUST:** Supply referenceDate consistently on server and client; locale and timeZone must agree.

## Common mistakes

- **Avoid:** Converting a date-only value to UTC midnight. **Instead:** Preserve the civil date and serialize explicitly.

## Validation checklist

- Verify selection modes, keyboard, date constraints, locale/RTL, controlled values and public imports. Verify application-owned serialization/reset separately; Calendar alone does not supply a form proxy.

## Related guidance

- `field`
- `popover`

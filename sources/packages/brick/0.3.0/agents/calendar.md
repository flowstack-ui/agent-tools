# Calendar agent guide

## Purpose

Inline single, range, or multiple date selection.

## Use when

- Inline single, range, or multiple date selection.

## Choose something else when

- Scheduling, recurrence or remote business availability is required. Use Application composition.

## Required composition

- Today is underlined, separate from selection. Whole-calendar disabled presentation fades once. Calendar shares these recipes with DatePicker.Calendar. Booking time slots are application state composed from Calendar, layout, ScrollArea and Button; changing date should clear the selected time.
- useCalendar and RootProvider expose state and navigation without a popup. minView/maxView bound period selection; month/year selections represent period starts. Selection tone is neutral, accent or contrast, independent of popup surfaces.
- Grid uses the public Table, TableHead, TableBody, TableRow, TableHeader, TableCell and TableCellTrigger anatomy. Use Context.getWeeks(offset) and weekDays for custom day tables. Day cells take DateValue; month/year cells take numbers. Place DayTable/MonthTable/YearTable inside matching View parts. Hidden outside-day artwork retains its cell footprint.
- Calendar.Root size accepts 2xs, xs, sm, md, lg, xl or 2xl. Explicit size wins over the compatibility density prop: compact defaults to sm, comfortable to md. Cells remain square and shrink within narrow hosts; size does not change selection behavior.
- Use Calendar.Root with a stable referenceDate and an accessible name. Root (div), Header (div), PrevTrigger/NextTrigger/ViewTrigger (buttons), Grid (table), MonthSelect/YearSelect (select), Context (render function). Default children provide navigation and all requested month grids. Day buttons remain native buttons within the grid.
- Use date-value helpers without converting date-only values to UTC midnight.
- Grid and MonthTable default to localized short month names; monthFormat="long" requests full names. RangeText and ViewTrigger describe the complete visible month window independently of selection mode.

## Rules

- **MUST:** Disabled controls preserve their recipe and use one 50% fade with a not-allowed cursor. Forced colors restores full opacity and uses system disabled colors.
- **MUST:** Keep date behavior in Atom and presentation in Brick. Do not duplicate popup engines or replace semantic segments with text inputs.
- **MUST:** Load styles.css or core.css plus styles/calendar.css. Use documented visual props and locale overrides.

## Common mistakes

- **Avoid:** Inventing current dates during hydration or submitting localized strings. **Instead:** Supply stable referenceDate and typed values; preserve canonical form mirrors.

## Validation checklist

- Verify keyboard, locale/RTL, constraints, reset, narrow width, appearance and forced colors.

## Related guidance

- `locale-provider`
- `field`
- `popover`

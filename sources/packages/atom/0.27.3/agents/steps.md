# Steps agent guide

## Purpose

Track a known ordered workflow with native list semantics, controlled progression, validation and optional navigation.

## Use when

- A workflow has a known sequence and one current stage.

## Choose something else when

- All numbered instructions are always visible without progression. Use List.
- Independent related panels switch without progression. Use Tabs.

## Required composition

- Compose List with unique zero-based Item indexes below Root count; include a Title for each automatically labelled Content. Trigger is optional. Keep NextTrigger and PrevTrigger outside switching panels when possible.
- Use useSteps with one RootProvider for external controls, or Root for local state. Context/hooks expose percent, item state and navigation. Coordinate IDs through id/ids; preserve native button semantics.

## Rules

- **MUST:** Treat step=count as positional completion, not proof of saved data or successful submission. Applications own persistence, branching, asynchronous validation and completion meaning.
- **MUST:** Supplied synchronous isStepValid guards forward navigation; linear additionally checks all crossed nonoptional stages. isStepSkippable bypasses optional stages in Next/Previous while direct selection remains available. Controlled external step changes remain authoritative; async validation belongs in the application.
- **MUST:** Preserve ol/li, aria-current and native button semantics. Do not add tab roles, arrow navigation, or nested interactive descendants to Trigger.
- **MUST:** Keep matching Titles for automatically labelled Content or provide aria-label/aria-labelledby. Inactive content stays mounted and hidden by default; keepMounted=false discards local state.

## Common mistakes

- **Avoid:** Using Steps for static numbered documentation or submitting a form from NextTrigger. **Instead:** Use static List for instructions; navigation buttons are type=button and the application owns submission.

## Validation checklist

- Test controlled/uncontrolled progression, no-op and disabled navigation, forward guards, completion, reset, count changes and preserved input state.
- Test native keyboard activation, preventDefault, refs, asChild/render, hidden panel focus recovery, SSR, unique labels and RTL.

## Related guidance

- `tabs`
- `list`
- `button`
- `progress`
- `direction`

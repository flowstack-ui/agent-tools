# Splitter agent guide

## Purpose

Resize adjacent panels with constraints, pointer and keyboard input, controlled state and optional collapse.

## Use when

- Neighboring application regions share a resizable area.

## Choose something else when

- The user edits a numeric value rather than panel geometry. Use Slider.
- The boundary is decorative only. Use Divider.

## Required composition

- Declare ordered unique panel IDs on Root. Compose matching Panel and ResizeTrigger siblings in that order. Name every trigger; before and after identify adjacent panels. Provide a definite outer dimension for vertical layouts.
- Use useSplitter with one mounted RootProvider for external commands, or useSplitterContext within Root. Keep stable descriptors and boundaries synchronized; one panel is valid, none is not.

## Rules

- **MUST:** Numbers mean percentages; px/em/rem/vw/vh require measurement. Keep minima feasible or provide application overflow/reflow; do not treat Splitter as a ScrollArea.
- **MUST:** Controlled sizes remain authoritative. Persist on settled resize events in the application; provide non-drag size or collapse controls.
- **MUST:** Use Brick for finished paint and handles. Do not reuse this multi-panel primitive by inventing empty panels for single-element resizing.

## Common mistakes

- **Avoid:** Using array indexes as identity or putting buttons inside the separator. **Instead:** Use stable IDs and keep actions outside the separator.

## Validation checklist

- Test both orientations, RTL, constraints, cancellation, collapse focus, controlled rejection, nested roots and disabled handles.
- Test SSR, dynamic panel IDs, pixel host resize and focusable separator names/ranges.
- Verify shared registry intersection cancellation, single-panel focus recovery and keyboard transitions across collapsed intervals. Applications own layout redistribution and persistence.

## Related guidance

- `slider`
- `divider`
- `direction`
- `scroll-area`

# Divider agent guide

## Purpose

Separate nearby content decoratively or with static separator semantics.

## Use when

- Two nearby content groups need a visual or meaningful static boundary.

## Choose something else when

- The boundary is draggable or changes a value. Use an interactive splitter with value and keyboard behavior.

## Required composition

- Use Divider.Root and keep decorative=true unless assistive technology must perceive the separation.

## Rules

- **MUST:** Choose decorative or semantic behavior from meaning, not from the desired line style.
- **MUST:** Do not make Divider focusable or use it as a resize handle.

## Common mistakes

- **Avoid:** Exposing every visual line as a separator. **Instead:** Keep purely visual boundaries decorative.

## Validation checklist

- Confirm decorative dividers are absent from the accessibility tree.
- Confirm semantic vertical dividers expose the correct orientation.

## Related guidance

- `toolbar`
- `app-bar`

# Code agent guide

## Purpose

Present a short inline technical literal with native code semantics and a finished Brick technical-text recipe.

## Use when

- A short identifier, attribute, command, filename, value, or API name belongs inside prose or a compact label.

## Choose something else when

- The source is multi-line, preserves whitespace, needs language metadata, or may scroll. Use Code Block.
- The content represents keyboard input, computer output, a variable, editable source, or executable source. Use the correct native semantic element or an application-owned editor, terminal, or sandbox.

## Required composition

- Keep Code inside the surrounding Text or component content owner when the literal completes that sentence or label.
- Choose subtle for an independently visible inline token and plain with tone inherit when the surrounding component already owns paint and foreground.

## Rules

- **MUST:** Use Code only for a short computer-code fragment and preserve its one native code host; do not select it merely to obtain monospace typography.
- **MUST:** Keep Code inline with the prose or compact label it completes and use Code Block for multi-line or overflow-owned technical source.
- **MUST:** Choose variant, tone, and size through the closed Code recipes before overriding public variables; use tone inherit when a parent intentionally owns foreground contrast.
- **MUST:** Load styles.css or core.css plus code.css.

## Common mistakes

- **Avoid:** Using generic Text or a native span with monospace CSS for a real technical literal. **Instead:** Use Code so the literal keeps native code semantics and the shared Brick technical recipe.
- **Avoid:** Putting a complete diff, command transcript, or configuration example inside Code. **Instead:** Use Code Block so preserved whitespace, naming, focus, and overflow have one explicit owner.

## Validation checklist

- Confirm one native code element, correct surrounding sentence flow, safe wrapping of long tokens, and no unintended block or scroll behavior.
- Check inherited typography, subtle and plain recipes, light and dark appearances, forced colors, zoom, localization, RTL/bidi content, and CSS delivery.

## Related guidance

- `code-block`
- `text`
- `interface-composition`

# Code Block agent guide

## Purpose

Present preserved multi-line technical source with native scrolling, explicit metadata, optional copy behavior, and consumer-owned syntax highlighting.

## Use when

- Source examples, configuration, commands, generated markup, or other preserved multi-line technical content need a finished readable surface.

## Choose something else when

- A short technical literal belongs inside prose. Use Code.
- The source must be edited, executed, or behave like a terminal. Use an application-owned editor, sandbox, or terminal.

## Required composition

- Use CopyTrigger asChild with a named Brick IconButton for icon-only copying. The child owns recipes; Root already owns Clipboard behavior. Do not add a second Clipboard Root. Reserve space when positioning the action over Content with ZStack.
- Pass the exact plain-text source to Root value, then place Content inside Root and give focusable Content a specific accessible label.
- Author Header, Title, Language, Actions, CopyTrigger, CopyStatus, and CopyIndicator only when the interface needs those optional parts.
- For syntax highlighting, pass a synchronous adapter or trusted React token nodes to Content while keeping Root value identical to the plain text that must be copied.
- Use Root meta for automatic line presentation or manual Line parts. Preserve source and explain diffs accessibly; visual signs and numbers are not copied.
- Use Content maxLines for a bounded scroll region. For expansion, put bounded Content in CollapsePreview, unbounded Content in CollapseContent, and author CollapseTrigger so Brick Collapsible owns the real disclosure relationship and lifecycle.

## Rules

- **MUST:** Keep Root value authoritative and exactly aligned with rendered highlighted content so copy behavior never depends on rendered textContent.
- **MUST:** Initialize optional createShikiAdapter once outside rendering, or supply a pure synchronous React adapter. Keep loading/retry/disposal application-owned; Brick never bundles Shiki or accepts highlighted HTML.
- **MUST:** Let Content own canonical pre, code, focus, and horizontal scrolling instead of rebuilding them with a separate ScrollArea or native pre element.
- **MUST:** Give every focusable Content region a specific aria-label or aria-labelledby, especially when several examples share one page.
- **MUST:** Author Line metadata from the authoritative source or trusted adapter output; do not infer diffs, focus, or highlighting from visual tokens.
- **MUST:** Keep standalone maxLines content reachable through its focusable viewport; for expansion, pair CollapsePreview and CollapseContent with an accessible CollapseTrigger so only the current source view is exposed.
- **MUST:** Inherit Brick's shared selection background and foreground by default; when a syntax palette needs local selection paint, override both public Code Block selection variables together and verify their text contrast.
- **MUST:** Load styles.css or core.css plus code-block.css and its documented component dependencies.
- **MUST:** The flush collapse action paints focus inside its clipped boundary; copy success remains icon-only with an accessible announcement.

## Common mistakes

- **Avoid:** Rendering highlighted HTML with dangerouslySetInnerHTML, copying from token text, or nesting another pre and ScrollArea inside Content. **Instead:** Render trusted React token spans, preserve the original string in Root value, and let Content own the canonical code viewport.
- **Avoid:** Adding a header, language label, copy action, or status region merely because those parts exist. **Instead:** Author only the optional anatomy required by the surrounding interface.
- **Avoid:** Clipping a long code block with application CSS and no reachable overflow or expansion control. **Instead:** Use Content maxLines for bounded scrolling or compose CollapsePreview, CollapseContent, and CollapseTrigger for an accessible full-source path.

## Validation checklist

- Confirm the rendered tokens and copied plain text match exactly, unsafe HTML is absent, and copy success, failure, concurrency, and status wording remain truthful when copy anatomy is present.
- Check keyboard focus, uniquely named overflow landmarks, line metadata, bounded scrolling or collapse expansion, long-line scrolling or wrapping, mobile text sizing, zoom, selection, RTL/LTR, light and dark syntax contrast, and CSS delivery.

## Related guidance

- `code`
- `scroll-area`
- `button`
- `collapsible`
- `tabs`
- `interface-composition`

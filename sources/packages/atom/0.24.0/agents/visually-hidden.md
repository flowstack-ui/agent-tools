# VisuallyHidden agent guide

## Purpose

Keep authored text or semantic content available to assistive technology while removing it from visual layout through an authoritative hiding contract.

## Use when

- Assistive technology needs words that sighted users already infer from visible context, such as the name of an icon-only control or extra link context.

## Choose something else when

- The explanation benefits everyone, content is decorative and should be hidden from assistive technology, or interactive content would become invisible to sighted keyboard users. Use visible text, aria-hidden, or a visibly focusable interaction.

## Required composition

- Place concise meaningful content inside Root within the element whose accessible name or reading context it should extend. Hide decorative visual siblings with aria-hidden when needed, and keep any focusable control itself visible rather than wrapping it in VisuallyHidden.

## Rules

- **MUST:** Use Root only for content that should remain in the accessibility tree while being visually absent; it does not hide content from assistive technology.
- **MUST:** Prefer visible text whenever the name, instruction, status, or explanation also benefits sighted users.
- **MUST:** Do not visually hide an interactive element that can receive keyboard focus unless it has a deliberate visible-on-focus pattern owned elsewhere.
- **MUST:** Author concise text in the correct naming or reading-order context and verify it does not duplicate an existing accessible name.
- **MUST:** Do not override Atom's hiding geometry; consumer styles merge first and the exported visuallyHiddenStyle contract remains authoritative.

## Common mistakes

- **Avoid:** Using VisuallyHidden to hide a decorative icon from screen readers or to conceal required instructions from sighted users. **Instead:** Use aria-hidden for decoration and keep broadly useful instructions visible.
- **Avoid:** Wrapping an icon-only Button itself in VisuallyHidden, creating an invisible focus target. **Instead:** Keep the Button visible and place VisuallyHidden text inside it as its accessible label.

## Validation checklist

- Inspect the accessibility tree and computed accessible name or description to confirm hidden text is present once, in the intended reading order, without duplicate wording.
- Verify no focusable element becomes visually absent, visible text remains available where broadly useful, and decorative content uses aria-hidden instead.
- Verify authoritative hiding styles survive consumer style, asChild, and render composition and that the final element adds no unintended role or ARIA attributes.

## Related guidance

- `label`
- `button`

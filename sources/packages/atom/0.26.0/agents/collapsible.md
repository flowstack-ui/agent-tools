# Collapsible agent guide

## Purpose

Show or hide one related block with disclosure-button semantics, linked region state, optional retained presence, orientation metadata, and measured intrinsic size.

## Use when

- One clearly named control reveals one related inline block such as advanced settings, details, or filters.

## Choose something else when

- Several named disclosure sections form one set or the content must interrupt the page in a modal layer. Use Accordion or Dialog.

## Required composition

- Compose Root with one clearly named Trigger and its related Content. Use keepMounted only when retained closed DOM is required for state or exit animation, and choose orientation to describe the intended expansion axis to the styled layer.

## Rules

- **MUST:** Use one Root for one Trigger and related Content; use Accordion when several named sections need shared coordination.
- **MUST:** Give Trigger clear text or an accessible name describing the content it reveals and preserve its button, aria-expanded, aria-controls, disabled, Enter, and Space behavior.
- **MUST:** Preserve Content's region role, Trigger label relationship, open/closed visibility, and generated IDs rather than recreating disclosure ARIA.
- **MUST:** Leave keepMounted false unless retained DOM or exit animation is required; when true, preserve the closed hidden state and do not expose its descendants to interaction.
- **SHOULD:** Use orientation, data-initial-open, and live content size variables for styled motion while keeping visual animation policy outside Atom.

## Common mistakes

- **Avoid:** Using Collapsible for a coordinated accordion or modal, omitting a meaningful Trigger name, leaving closed retained content interactive, or hard-coding stale content height. **Instead:** Choose the correct owner, preserve the disclosure relationship and hidden state, and consume Atom's live measured size for optional styling.

## Validation checklist

- Verify controlled/uncontrolled open state, native and custom Trigger pointer/Enter/Space activation, accessible name, expanded and controls relationships, disabled behavior, Content region label, default unmount, keepMounted hidden state, and asChild/render composition.
- Verify vertical and horizontal metadata across all parts, initial-open state, measurement before entry paint, live width and height updates after responsive reflow and intrinsic content changes, exit presence, and no unintended page-load entrance motion.

## Related guidance

- `accordion`
- `dialog`

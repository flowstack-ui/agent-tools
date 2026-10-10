# Collapsible agent guide

## Purpose

Show or hide one related block with disclosure-button semantics, linked region state, optional retained presence, orientation metadata, and measured intrinsic size.

## Use when

- One clearly named control reveals one related inline block such as advanced settings, details, or filters.

## Choose something else when

- Several named disclosure sections form one set or the content must interrupt the page in a modal layer. Use Accordion or Dialog.

## Required composition

- Compose Root or RootProvider with one clearly named Trigger and related Content. Use Root lazyMount/unmountOnExit for mounting policy and keep Trigger outside Content, including partial previews. Legacy Content keepMounted is retained only for migration. Indicator reads its own nearest disclosure state.

## Rules

- **MUST:** Use one Root for one Trigger and related Content; use Accordion when several named sections need shared coordination.
- **MUST:** Give Trigger clear text or an accessible name describing the content it reveals and preserve its button, aria-expanded, aria-controls, disabled, Enter, and Space behavior.
- **MUST:** Preserve Content's region role, Trigger label relationship, open/closed visibility, and generated IDs rather than recreating disclosure ARIA.
- **MUST:** Choose Root lazyMount and unmountOnExit independently; both default true. Do not combine legacy Content keepMounted with Root policies. Closed and partial Content stays inert and aria-hidden. Nonzero collapsed dimensions retain the preview; keep Trigger outside Content. Activity pauses effects on React 19.2+ and falls back to ordinary hidden content on older React.
- **MUST:** Use useCollapsible with RootProvider or Root's built-in controller, never duplicated state. Context exposes open, visible, setOpen and measureSize. IDs and Indicator state belong to the nearest owner; preserve merged events and refs.
- **SHOULD:** Use orientation, data-initial-open, and live content size variables for styled motion while keeping visual animation policy outside Atom.

## Common mistakes

- **Avoid:** Using Collapsible for a coordinated accordion or modal, omitting a meaningful Trigger name, leaving closed retained content interactive, or hard-coding stale content height. **Instead:** Choose the correct owner, preserve the disclosure relationship and hidden state, and consume Atom's live measured size for optional styling.

## Validation checklist

- Verify controlled/uncontrolled open state, native and custom Trigger pointer/Enter/Space activation, accessible name, expanded and controls relationships, disabled behavior, Content region label, default unmount, keepMounted hidden state, and asChild/render composition.
- Verify vertical and horizontal metadata across all parts, initial-open state, measurement before entry paint, live width and height updates after responsive reflow and intrinsic content changes, exit presence, and no unintended page-load entrance motion.
- Initial measurement is synchronous; observer-driven size updates commit on the next animation frame. Allow that frame before checking settled geometry. Verify partial preview animation, responsive reflow and removal/remount without ResizeObserver errors or stale writes.

## Related guidance

- `accordion`
- `dialog`

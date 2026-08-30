# Clipboard agent guide

## Purpose

Copy a known text value through an explicit user action while coordinating editable or displayed value, truthful asynchronous status, latest-operation ownership, and authored accessible feedback.

## Use when

- A user needs to copy a known command, URL, token, or code sample and the interface must report actual clipboard success or failure.

## Choose something else when

- The task reads, pastes, cuts, or copies files or binary data, or a normal Button without copy status is sufficient. Use an application-owned Clipboard API workflow or Button.

## Required composition

- Compose Root around a stably named Trigger and authored Status feedback. Add Label with Input when the value is editable or exposed as a field, Control for structure, ValueText for read-only display, and state-specific Indicator parts inside Status as needed.

## Rules

- **MUST:** Start copying only from an intentional Trigger activation and preserve consumer preventDefault cancellation, secure-context, permission, and browser Clipboard API requirements.
- **MUST:** Report copying, copied, and error only from the authoritative write result; never imply success when the API is unavailable or rejects.
- **MUST:** Keep the newest copy attempt authoritative when earlier asynchronous writes settle later and reset copied or error state only after the configured timeout.
- **MUST:** Give Trigger a stable accessible action name and put short authored success and failure wording in Status; Atom intentionally supplies no product strings.
- **MUST:** Use Clipboard for text writes only and do not add deprecated execCommand fallbacks that can misreport behavior.

## Common mistakes

- **Avoid:** Showing Copied immediately on click, swallowing permission errors, changing Trigger's accessible name unpredictably, or using Clipboard to read or transfer binary data. **Instead:** Wait for the write result, expose error feedback, keep a stable action name, and use an application-owned workflow for unsupported clipboard operations.

## Validation checklist

- Verify controlled/uncontrolled value editing, Label/Input association, ValueText, disabled behavior, pointer and keyboard Trigger activation, consumer cancellation, custom writeValue adapter, secure-context or unavailable API error, success, rejection, and focus remaining on Trigger.
- Verify idle/copying/copied/error Indicators, polite atomic Status announcements, timeout reset and cleanup, overlapping writes resolving and rejecting out of order, no stale status changes, native props, refs, and asChild/render semantics.

## Related guidance

- `button`
- `input`

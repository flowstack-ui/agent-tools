# DownloadTrigger agent guide

## Purpose

Initiate a generated-file download after explicit user activation with lazy preparation and cleanup.

## Use when

- The application supplies downloadable string, Blob or File data.

## Choose something else when

- A file already has a server URL. Use Link with native download.

## Required composition

- Render DownloadTrigger.Root with data, fileName and a visible name. Supply mimeType for strings. Lazy producers receive AbortSignal. Use render only with an action host that forwards all props/ref.
- useDownload shares the lifecycle and returns state, loading, download(ownerDocument?) and cancel. Call download from user activation, pass the owner document for iframes, bind loading to the action, and handle errors.

## Rules

- **MUST:** Keep fetching, serialization, authentication and user messages in the application; data strings are literal contents, not URLs.
- **MUST:** onDownloadInitiated reports browser handoff, never saved-file completion. Handle onDownloadError; browser policy can still prevent saving.
- **MUST:** Use a server link for large streamed exports. Do not invent forced navigation or automatic retry.

## Common mistakes

- **Avoid:** Starting asynchronous work at render or passing an eager Promise. **Instead:** Pass a lazy data producer and respect its cancellation signal.

## Validation checklist

- Verify bytes, filename, synchronous and delayed data, cancellation, duplicate activation, errors, cleanup, form safety and iframe ownership.

## Related guidance

- `button`
- `link`
- `file-upload`

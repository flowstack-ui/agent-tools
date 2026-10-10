# DownloadTrigger agent guide

## Purpose

Present an Atom-backed generated-file download as a finished Button.

## Use when

- A user downloads application-generated text or binary data.

## Choose something else when

- A downloadable resource already has a URL. Use Link with native download.

## Required composition

- Supply data, fileName, mimeType for string data and visible children. Lazy producers receive AbortSignal. Use normal Button size, tone, variant and startIcon/endIcon props. FormatByte can describe a known file size separately.
- DownloadTrigger renders the real Button or, with iconOnly and required aria-label, IconButton. Shared loading presentation uses automatic preparation state. ButtonGroup defaults apply; explicit props win. Do not nest interactive controls.
- useDownload returns state, loading, download(ownerDocument?) and cancel for custom actions. Call only from activation; pass the activated control's ownerDocument for iframes and bind loading to the action.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Keep transport, serializers, authentication and translated error messages in the application. A data string is literal file content, never a URL.
- **MUST:** Handle onDownloadError. onDownloadInitiated means browser handoff, not a completed save.
- **MUST:** Load styles.css or core.css plus download-trigger.css, which includes Button styles. Do not duplicate Button geometry.
- **MUST:** Support scalar focusRing="outside" | "inside"; omission stays outside. Inside uses paired foreground and canonical negative-width offset without changing Atom behavior.

## Common mistakes

- **Avoid:** Replacing every existing download link with generated-file JavaScript. **Instead:** Use this owner only for generated data; keep native links and server streaming for existing/large files.

## Validation checklist

- Verify exact bytes and filename, asynchronous pending/error recovery, cancellation, labels, icon/size parity, loading, keyboard and browser restrictions.

## Related guidance

- `button`
- `link`
- `format-byte`

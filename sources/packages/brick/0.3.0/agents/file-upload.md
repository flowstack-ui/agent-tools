# FileUpload agent guide

## Purpose

Present a finished local-file picker, optional drop target, and removable selected-file list while Atom owns native picking, file state, client acceptance, Field validation, reset, and multipart form participation.

## Use when

- A form needs one or more local files selected through the native picker, optional drag and drop, review, removal, or visible client-side rejection feedback before application processing.

## Choose something else when

- A native file input is sufficient, the value is a textual path or URL, the asset is already remote, or the job is transfer progress, retry, persistence, preview editing, or server policy. Use a native input type=file, Input, Progress, Toast, Image, or an application-owned upload workflow.

## Required composition

- Compose one Field with FileUpload.Root, exactly one HiddenInput, and an accessible Trigger. Add Dropzone only as an enhancement; use ItemGroup with one Item per accepted file and optional ItemName, ItemSize, and file-specific ItemDeleteTrigger.
- State both browse and drop paths plus material constraints in visible copy. Use Root's outline or soft recipe, size, shape, and width while keeping upload transport, progress, rejection copy, and server policy outside FileUpload.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Use outline for a transparent resting dropzone, surface for a neutral raised fill and soft for subdued paint. Dropzones show hover/drop feedback; actions independently use shared Button/CloseButton recipes. Preserve disabled, read-only, invalid and forced-colors states.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use Dropzone disableClick when only the nested Trigger should open the picker. Non-clickable dropzones retain file-drag feedback but not clickable hover paint. In filename/action rows, use Stack.Item flex={1} for the filename control and flex="fixed" for Clear; do not let a fullWidth trigger squeeze its sibling.
- **MUST:** Render exactly one HiddenInput whenever picker, Trigger, required validity, name, form, accept, or multiple semantics are needed and keep it aligned with the visible control.
- **MUST:** Provide HiddenInput and a named Trigger for keyboard, touch and pointer access. Trigger/ClearTrigger share Button props and ItemDeleteTrigger shares CloseButton props. Use asChild to compose Button/IconButton on one host, never nested buttons; supplied hosts own their presentation.
- **MUST:** Use useFileUpload and RootProvider value for coordinated selection; Context exposes capacity, transforms/errors, paste intake and clear/removal. Keep network upload, retry and server validation application-owned. Use ItemPreviewImage for automatically revoked owner-window URLs.
- **MUST:** Use accept, maxFiles, maxSize, and validateFile only for immediate client feedback, show authored localized rejection reasons, and validate type, size, content, authorization, and storage policy again on the server.
- **MUST:** Use files with onFilesChange or defaultFiles, choose appendFiles deliberately for multiple selection, and distinguish rejected candidates from the validity of the currently selected files.
- **MUST:** Preserve file-only drag state, nested drag handling, document-drop protection, disabled/read-only behavior, native FileList synchronization, required focus, Field relationships, external form, same-file reselection after deletion, and uncontrolled reset.
- **MUST:** Use FileUpload.List for accepted-file rows or ItemGroup/Item with ItemContent, previews and named removal. ItemGroup type=rejected renders rejected candidates. Do not add nested list or button elements; IconButton composition requires asChild. Root density does not change action size.
- **MUST:** Keep drop copy and selected-file metadata contained under long filenames, localization, narrow widths, zoom, and RTL while retaining visible focus, non-color accept/reject cues, and effective action targets.
- **MUST:** Load styles.css or core.css plus file-upload.css and Field CSS when composed.

## Common mistakes

- **Avoid:** Using Dropzone as the only picker, treating accept as security, hiding rejection reasons, wrapping Trigger in Button, or forgetting same-file reselection after removal. **Instead:** Include HiddenInput and Trigger, validate again on the server, present rejection feedback, preserve the owning interactive parts, and let Atom synchronize native selection.
- **Avoid:** Turning local file selection into an upload transport with progress, retry, storage, or malware claims. **Instead:** Keep FileUpload responsible for local selection and compose application-owned transfer status and durable results beside it.

## Validation checklist

- Verify picker opening by pointer, touch, Enter, and Space; controlled/uncontrolled files; single replacement and multiple append/replace policy; accept rules; maximum count and size; custom rejection; visible rejection feedback; disabled/read-only state; and same-file reselection.
- Verify accepted/rejected and nested drag behavior, non-file drags, document-drop protection, HiddenInput name/form/required/multiple/FileList behavior, Field labels/errors, inline/native focus, reset, ItemGroup metadata, delete labels, native props, refs, and composition.
- Verify both recipes, all sizes/shapes/widths, long filenames and localized copy, narrow width, zoom, RTL, touch targets, light/dark appearance, forced colors, focus, invalid, disabled, read-only, accept, and reject paint.

## Related guidance

- `@flowstack-ui/atom/agents/file-upload`
- `input`
- `field`
- `form`
- `progress`
- `toast`
- `image`

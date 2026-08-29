# FileUpload agent guide

## Purpose

Coordinate native file picking, optional drag and drop, client-side acceptance feedback, selected-file state, removal, Field validation, and multipart form participation.

## Use when

- Users choose local files and the experience needs a custom picker action, drop target, selected-file list, removal, or client-side rejection feedback.

## Choose something else when

- The browser's native file input is sufficient or the task only receives an already-hosted URL or remote asset reference. Use a native input type=file or the application-owned remote-source workflow.

## Required composition

- Compose Root with HiddenInput and an accessible Trigger for keyboard, touch, and pointer picker access. Add Dropzone as an enhancement, and use ItemGroup with Item, optional ItemName and ItemSize, and ItemDeleteTrigger when selected files must be reviewed or removed.

## Rules

- **MUST:** Render HiddenInput when Trigger, native picker, required validity, name, form, accept, or multiple file semantics are needed; keep it aligned with the visible Trigger.
- **MUST:** Always provide a visible accessible Trigger for keyboard, touch, and single-pointer selection; Dropzone alone is not an equivalent accessible picker.
- **MUST:** Use accept, maxFiles, maxSize, and validateFile only for immediate client feedback and validate file type, size, content, authorization, and storage policy again on the server.
- **MUST:** Use files with onFilesChange for controlled state or defaultFiles for uncontrolled state, choose appendFiles intentionally in multiple mode, and expose rejected files as visible authored feedback.
- **MUST:** Preserve file-only drag acceptance, accept/reject preview, nested enter/leave handling, disabled/read-only behavior, and document-drop protection unless the application intentionally owns outside drops.
- **MUST:** Preserve HiddenInput name, form, multiple, selected FileList synchronization where supported, required validity, validation focus, Field relationships, deletion reset for same-file reselection, and uncontrolled form reset.

## Common mistakes

- **Avoid:** Using Dropzone as the only picker, treating accept or client validation as a security boundary, hiding rejection reasons, or forgetting that selecting the same removed file requires native input reset. **Instead:** Include HiddenInput and Trigger, validate again on the server, present rejection feedback, and use ItemDeleteTrigger or Root behavior to keep native selection synchronized.

## Validation checklist

- Verify picker opening by pointer, touch, Enter, and Space; controlled/uncontrolled files; single replace and multiple append/replace policy; accept extension/MIME/wildcard rules; max count and size; custom rejection; visible rejection feedback; disabled/read-only behavior; and same-file reselection after removal.
- Verify drag enter/over/leave/drop accept and reject state, non-file drags, nested targets, outside document file-drop protection, HiddenInput name/form/required/multiple/FileList behavior, Field labels and errors, native/inline validation focus, reset, ItemGroup rendering, metadata, delete labels, refs, and asChild/render composition.

## Related guidance

- `input`
- `field`
- `form`

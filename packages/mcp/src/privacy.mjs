import { PRIVATE_MARKERS } from "./constants.mjs";

const PRIVATE_PATH = /(?:^|\/)(?:private|research-memory|creative-intelligence|blueprints?|customer|analytics|prompts?|ranking)(?:\/|$)/iu;
const PATH_CHARACTERS = `[^\\s"'<>)}\\],;]`;
const MACHINE_PATH_PATTERN = `(?:/(?:Users|home)/${PATH_CHARACTERS}+(?:/${PATH_CHARACTERS}*)?|/(?:private|tmp)(?:/${PATH_CHARACTERS}*)?|/var/folders(?:/${PATH_CHARACTERS}*)?|[A-Za-z]:(?:\\\\)+Users(?:\\\\)+${PATH_CHARACTERS}+(?:(?:\\\\)+${PATH_CHARACTERS}*)?)`;
const SECRET_PATH = /(?:^|\/)(?:\.env(?:\.[^/]*)?|secrets?|private[-_.]?key|api[-_.]?key|access[-_.]?token|client[-_.]?secret)(?:\/|$)/iu;
const SECRET = /(?:api[_-]?key|access[_-]?token|client[_-]?secret|private[_-]?key)\s*[:=]\s*["']?[A-Za-z0-9_./+-]{12,}/iu;

function containsMachinePath(value) {
  return new RegExp(MACHINE_PATH_PATTERN, "iu").test(value);
}

function redactMachinePaths(value) {
  return value.replaceAll(new RegExp(MACHINE_PATH_PATTERN, "giu"), "<local-path>");
}

export function assertPublicRequest(value) {
  const text = JSON.stringify(value);
  const normalized = text.toLowerCase();
  if (PRIVATE_MARKERS.some((marker) => normalized.includes(marker))) throw new Error("private-content marker rejected");
  if (containsMachinePath(text)) throw new Error("machine-specific path rejected");
  if (SECRET.test(text)) throw new Error("secret-like content rejected");
}

export function assertPublicArtifact(path) {
  const normalized = path.replaceAll("\\", "/");
  if (PRIVATE_PATH.test(normalized)) throw new Error(`private artifact path rejected: ${path}`);
  if (containsMachinePath(path)) throw new Error(`machine-specific artifact path rejected: ${path}`);
  if (SECRET_PATH.test(normalized)) throw new Error(`secret-like artifact path rejected: ${path}`);
}

export function assertPublicResponse(value) {
  const text = JSON.stringify(value);
  if (containsMachinePath(text)) throw new Error("response would expose a machine-specific path");
}

export function publicErrorMessage(error) {
  const message = error instanceof Error ? error.message : String(error);
  return redactMachinePaths(message);
}

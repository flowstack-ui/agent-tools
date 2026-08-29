import assert from "node:assert/strict";

const prohibitedArchiveSegment = /(?:^|\/)(?:private|research-memory|creative-intelligence|blueprints?|customer-data)(?:\/|$)/iu;
const prohibitedMachinePath = /(?:\/Users\/|\/home\/|\/private\/|\/var\/folders\/|[A-Z]:\\)/u;
const prohibitedContentMarker = /(?:BEGIN PRIVATE|END PRIVATE|\.env\b|api[_-]?key\b)/iu;

export function assertPublicArchivePath(path) {
  assert.doesNotMatch(path, prohibitedArchiveSegment, `archive path crosses the public boundary: ${path}`);
}

export function assertPublicContent(content, label = "content") {
  assert.doesNotMatch(content, prohibitedMachinePath, `${label} contains a private or machine-specific marker`);
  assert.doesNotMatch(content, prohibitedContentMarker, `${label} contains a private or machine-specific marker`);
}

export const publicBoundaryPatterns = {
  prohibitedArchiveSegment,
  prohibitedMachinePath,
  prohibitedContentMarker,
};

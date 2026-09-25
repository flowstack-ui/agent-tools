import assert from "node:assert/strict";

// Alternatives describe an explicit catalog migration, never a synthetic alias.
// The selected route retains the owner ID and version supplied by its archive.
export function selectCuratedRoutes(routes, ids, context) {
  assert.ok(Array.isArray(ids) && ids.length > 0, `${context} must list exact route IDs`);
  const selected = ids.map((entry) => {
    const alternatives = typeof entry === "string" ? [entry] : entry?.oneOf;
    assert.ok(Array.isArray(alternatives) && alternatives.length > 0
      && alternatives.every((id) => typeof id === "string" && id.length > 0)
      && new Set(alternatives).size === alternatives.length, `${context} has invalid route alternatives`);
    const matches = routes.filter(({ id }) => alternatives.includes(id));
    assert.equal(matches.length, 1, `${context} must resolve exactly one curated route for ${alternatives.join(" | ")}`);
    return matches[0];
  });
  assert.equal(new Set(selected.map(({ path }) => path)).size, selected.length, `${context} selects a duplicate curated route`);
  return selected;
}

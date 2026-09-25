import assert from "node:assert/strict";
import test from "node:test";
import { selectCuratedRoutes } from "../scripts/lib/curated-routes.mjs";

const route = (id) => ({ id, path: `/components/${id}.txt` });
const ids = ["input", { oneOf: ["otp-field", "pin-input"] }];

test("catalog migrations retain the exact old or new archive owner", () => {
  for (const id of ["otp-field", "pin-input"]) {
    const routes = [route(id), route("input"), route("unrelated")];
    assert.deepEqual(selectCuratedRoutes(routes, ids, "forms"), [routes[1], routes[0]]);
  }
});

test("catalog migrations fail closed for missing, ambiguous, or duplicate routes", () => {
  assert.throws(() => selectCuratedRoutes([route("input")], ids, "forms"), /exactly one/);
  assert.throws(() => selectCuratedRoutes([route("input"), route("otp-field"), route("pin-input")], ids, "forms"), /exactly one/);
  assert.throws(() => selectCuratedRoutes([route("input")], ["input", "input"], "forms"), /duplicate/);
  assert.throws(() => selectCuratedRoutes([], [{ oneOf: [] }], "forms"), /invalid/);
  assert.throws(() => selectCuratedRoutes([], ["input"], "forms"), /exactly one/);
});

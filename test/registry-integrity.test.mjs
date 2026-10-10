import assert from "node:assert/strict";
import test from "node:test";
import { waitForRegistryIntegrity } from "../scripts/registry-integrity.mjs";

const identity = { spec: "@flowstack-ui/agent-tools@0.1.7", expectedIntegrity: "sha512-exact" };

test("an immediately available exact archive does not wait", async () => {
  await waitForRegistryIntegrity({ ...identity, readIntegrity: () => identity.expectedIntegrity,
    sleep: () => assert.fail("no sleep expected") });
});

test("accepted publication may take more than the former six checks", async () => {
  let checks = 0;
  const waits = [];
  await waitForRegistryIntegrity({ ...identity,
    readIntegrity: () => ++checks === 8 ? identity.expectedIntegrity : null,
    sleep: async (milliseconds) => waits.push(milliseconds) });
  assert.equal(checks, 8);
  assert.deepEqual(waits, Array(7).fill(10_000));
});

test("different published bytes fail immediately without further polling", async () => {
  await assert.rejects(waitForRegistryIntegrity({ ...identity,
    readIntegrity: () => "sha512-other",
    sleep: () => assert.fail("integrity mismatch must not wait") }), /different archive integrity/u);
});

test("registry processing has a bounded sixty-check deadline", async () => {
  let checks = 0;
  let waits = 0;
  await assert.rejects(waitForRegistryIntegrity({ ...identity,
    readIntegrity: () => { checks += 1; return null; },
    sleep: async () => { waits += 1; } }), /after 60 checks; do not republish/u);
  assert.equal(checks, 60);
  assert.equal(waits, 59);
});

test("unexpected verification errors propagate rather than being suppressed", async () => {
  await assert.rejects(waitForRegistryIntegrity({ ...identity,
    readIntegrity: () => { throw new Error("invalid registry response"); },
    sleep: () => assert.fail("invalid data must not wait") }), /invalid registry response/u);
});

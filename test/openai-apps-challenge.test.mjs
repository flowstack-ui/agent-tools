import assert from "node:assert/strict";
import test from "node:test";
import openaiAppsChallenge, { OPENAI_APPS_CHALLENGE } from "../api/openai-apps-challenge.mjs";

function invoke(method) {
  const headers = new Map();
  const response = {
    body: undefined,
    statusCode: undefined,
    setHeader(name, value) { headers.set(name.toLowerCase(), value); },
    end(body) { this.body = body; }
  };
  openaiAppsChallenge({ method }, response);
  return { ...response, headers };
}

test("serves the exact OpenAI domain challenge as plain text without caching", () => {
  const response = invoke("GET");
  assert.equal(response.statusCode, 200);
  assert.equal(response.body, OPENAI_APPS_CHALLENGE);
  assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("supports verification probes without exposing a body on HEAD", () => {
  const response = invoke("HEAD");
  assert.equal(response.statusCode, 200);
  assert.equal(response.body, undefined);
});

test("rejects methods other than GET and HEAD", () => {
  const response = invoke("POST");
  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.get("allow"), "GET, HEAD");
});

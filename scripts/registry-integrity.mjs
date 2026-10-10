export async function waitForRegistryIntegrity({
  spec,
  expectedIntegrity,
  readIntegrity,
  sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
  onPending = () => {},
  attempts = 60,
}) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const integrity = await readIntegrity();
    if (integrity !== null) {
      if (integrity !== expectedIntegrity) {
        throw new Error(`${spec} exists with different archive integrity`);
      }
      return;
    }
    onPending(attempt);
    if (attempt < attempts) await sleep(10_000);
  }
  throw new Error(`${spec} registry integrity did not converge after ${attempts} checks; do not republish without verifying registry state`);
}

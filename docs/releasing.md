# Releasing

Agent Tools uses lockstep versions for `@flowstack-ui/agent-tools` and
`@flowstack-ui/mcp`. A release tag is exactly `v<version>` and must point to a
commit contained in protected `main`.

1. Refresh all four public source archives together when package guidance has
   changed, then update the changelogs and both package versions.
2. Run `npm run check:release` from a clean checkout with both lockfiles
   installed.
3. Merge the green pull request. Create the exact `v<version>` tag from that
   `main` commit and push it.
4. The protected release environment rebuilds and verifies both archives once,
   then publishes those exact `.tgz` files using npm trusted publishing and
   provenance. Each package is checked first so an interrupted two-package
   release can safely resume without republishing an existing version.
5. Verify both registry records and provenance before creating the GitHub
   release or promoting the matching Vercel production deployment.
6. Run static and MCP hosted verification against
   `https://agents.brick-ui.com` and retain the deployment commit plus index
   digest as release evidence.

Trusted publishers must be configured separately on npm for both packages,
restricted to this repository and the release workflow. Do not use a local npm
token, a mutable dependency range, an unverified archive, or a tag that is not
contained in `main`.

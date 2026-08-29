# Releasing

Colors publishes only from a version tag on protected repository history. A
maintainer does not run `npm publish` from a working tree.

## Release contract

1. Set the package, lockfile, exported producer, changelog, and documentation
   to the same version.
2. Run `npm run check:release` and review the exact archive inspected by the
   clean-consumer gate.
3. Merge the release commit into `main` through required CI.
4. Create and push the matching `v<version>` tag on that merged commit.
5. The tag workflow confirms that the tag matches `package.json`, belongs to
   `main`, and is not already published.
6. CI rebuilds and rechecks the repository, creates one archive, uploads it,
   and publishes that same archive through the protected `npm` environment
   using trusted publishing and provenance.
7. Verify the registry metadata and install the exact public version into a
   fresh consumer before declaring the release complete.

The workflow is idempotent for an already-published version and creates the
matching GitHub release. Tags must never be moved or reused.

## Requalification triggers

Repeat the Theme and complete rendered Brick qualification before releasing a
change to candidate roles, generation algorithms, exact palette relationships,
contrast rules, semantic interchange requirements, or the color engine. Pure
documentation corrections still run repository and exact-archive gates.

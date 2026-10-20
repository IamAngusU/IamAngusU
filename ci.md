# Build provenance

The public repositories under **IamAngusU** are the canonical product sources.
Some builds run under **angusu-de**, a separate account operated by the same
maintainer. GitHub currently blocks Actions execution on IamAngusU because of
an account billing restriction. Resolving it requires the account owner's
billing settings; moving a workflow does not resolve the restriction itself.

## Verify a build

1. Open the linked run and check that every required job completed successfully.
2. Compare its full source commit with the release tag or commit you intend to use.
3. For a source-fetching harness such as MagicLink, inspect the `source_sha`
   input and checkout-verification step, rather than the harness repository SHA.
4. Verify downloaded release checksums separately. CI success and an unsigned
   checksum inventory are different forms of evidence; neither is an independent audit.

Public runners: [HoverBridge](https://github.com/angusu-de/HoverBridge-CI/actions),
[ShapeDiff](https://github.com/angusu-de/shapediff-ci/actions),
[MagicLink](https://github.com/angusu-de/MagicLink-CI/actions),
[ReTrace](https://github.com/angusu-de/ReTrace/actions),
[Icon Marquee](https://github.com/angusu-de/icon-marquee-ci/actions).

Badges show the linked workflow's latest result, which may be newer or older
than the release you download. Local test evidence is labelled with its
environment and scope in each project's documentation.

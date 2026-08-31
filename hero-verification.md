# Hero verification findings

The live preview loaded successfully on the managed Manus hostname. The hero image requests for the existing before/after roof pair both completed with naturalWidth 2304, and the mascot loaded with naturalWidth 606 from the managed storage proxy.

At the post-intro check, `.hero-clean.is-fading`, `.hero-lockup.is-in`, and `.hero-cta.is-in` were applied with computed opacity `1`; the header had computed opacity `1` and pointer events enabled. The page still exposed the existing navigation, quote form, and lower sections in the browser content extraction. Reduced-motion was not active in this check.

The automated scroll cycle verified replay: when the hero left the viewport, the clean, lockup, CTA, and header classes reset; after returning and waiting through the sequence, `.hero-clean.is-fading`, `.hero-lockup.is-in`, `.hero-cta.is-in`, and visible header state were restored. A full-page mobile capture completed successfully, and the existing lower sections remained present.

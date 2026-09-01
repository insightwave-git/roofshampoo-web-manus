# Hero verification findings

The live preview loaded successfully on the managed Manus hostname. The hero image requests for the existing before/after roof pair both completed with naturalWidth 2304, and the mascot loaded with naturalWidth 606 from the managed storage proxy.

At the post-intro check, `.hero-clean.is-fading`, `.hero-lockup.is-in`, and `.hero-cta.is-in` were applied with computed opacity `1`; the header had computed opacity `1` and pointer events enabled. The page still exposed the existing navigation, quote form, and lower sections in the browser content extraction. Reduced-motion was not active in this check.

The automated scroll cycle verified replay: when the hero left the viewport, the clean, lockup, CTA, and header classes reset; after returning and waiting through the sequence, `.hero-clean.is-fading`, `.hero-lockup.is-in`, `.hero-cta.is-in`, and visible header state were restored. A full-page mobile capture completed successfully, and the existing lower sections remained present.

Header/footer mascot logo update verification: after waiting for the hero intro, both `header img` and `footer img` resolved to `/manus-storage/saveyourroof-mascot_cef3713f.jpg`, loaded successfully, and the header computed opacity was `1`. The hero lockup remained in its completed state. The page content extraction still showed the existing quote form and lower sections.

Final PNG logo verification: the header, footer, and hero mascot all resolved to `/manus-storage/SaveYourRoof_Final09Artboard7_dd964ce4.png` and loaded successfully. After the intro, the header opacity was `1`, the clean roof opacity was `1`, and the hero mascot rendered at exactly `320px` wide on desktop. The existing page content remained present.

Contrast revision verification: the hero tagline `CLEAN · RESTORE · SAVE $` computed to `rgb(255, 255, 255)` with opacity `1`; the animated PNG loaded at a rendered width of `320px`. Header and footer images both resolved to `/manus-storage/saveyourroof-mascot_cef3713f.jpg` and loaded successfully, confirming their previous treatment was restored. The header was visible after the intro.

Transparent chrome revision verification: computed header and footer backgrounds were both `rgba(0, 0, 0, 0)`. The header remained visible after the intro and both chrome logos still resolved to the previous mascot JPG. The hero frame rendered at 320px wide; the white `CLEAN · RESTORE · SAVE $` tagline rendered at the same width and was confirmed centered beneath the logo.

White-header visibility verification: after the hero intro, the header computed to `rgb(255, 255, 255)` with opacity `1`; its logo, desktop navigation, phone link, and `Get a Quote` CTA were all visible and the logo loaded successfully. The footer remained transparent, and the hero tagline remained white.

Shared-logo correction verification: after the hero intro, the header, footer, and `.hero-mascot` all resolved to `/manus-storage/SaveYourRoof_Final09Artboard7_dd964ce4.png`, confirming an exact asset match. The header background computed to white, the footer remained transparent, and the hero `Get a Quote` CTA was visible.

Original-logo restoration verification: after the hero intro, header and footer both resolved to `/manus-storage/saveyourroof-logo_0a1f1d4c.png`, while `.hero-mascot` resolved to `/manus-storage/SaveYourRoof_Final09Artboard7_dd964ce4.png`. The header computed to white and the footer to transparent, confirming the requested separation and preserved surfaces.

Mascot JPG correction verification: after the hero intro, header and footer both resolved to `/manus-storage/saveyourroof-mascot_cef3713f.jpg`, while the hero resolved to `/manus-storage/SaveYourRoof_Final09Artboard7_dd964ce4.png`. The header remained white and the footer transparent, confirming the requested logo assignments and preserved surfaces.

Shared hero PNG verification: after the hero intro, header, footer, and `.hero-mascot` all resolved to `/manus-storage/SaveYourRoof_Final09Artboard7_dd964ce4.png`. Computed header background remained white and footer background remained transparent, confirming the exact requested assignment and preserved chrome surfaces.

Four-part revision verification: desktop header logo measured 96px high and footer logo 112px high; both resolved to `/manus-storage/SaveYourRoof_Final09Artboard7_dd964ce4.png`. The hero `.COM` overlay rendered in `rgb(41, 171, 226)` with vertical writing mode. The Roof Shampoo / What We Do card was the center card (index 1) and included the compact logo badge. The Math captions read `LOSE 10 YEARS` and `GAIN 10 YEARS`.

Approved logo-readability verification: header logo rendered at 176x176px and footer logo at 224x224px, both using `/manus-storage/SaveYourRoof_Final09Artboard7_dd964ce4.png`. Hero uses the same PNG in a 320px frame; the replacement `.COM` rendered vertically in cyan at 40px high, matching the wordmark scale. The What We Do card is center index 1 with a logo badge. Math labels read `LOSE 10 YEARS` and `GAIN 10 YEARS`.

Exact wordmark correction verification: after tightening the crop to 20% and moving the replacement to the wordmark edge, desktop and mobile renders show no separate outside `.COM` on the right. The visible hero reads as a single ROOFSHAMPOO.COM composition with the vertical cyan `.COM` directly beside the wordmark. The hero CTA and background remain unchanged.

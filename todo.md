# SaveYourRoof implementation checklist

## Final `.COM` spacing correction

- [x] Inspect the current `.COM` horizontal offset.
- [x] Move only `.COM` right so it clears the final O.
- [x] Preserve its color, size, orientation, and wordmark-matching height.
- [x] Render desktop and mobile previews and verify the spacing.
- [x] Run checks, save a checkpoint, and deliver the focused revision.

## Follow-up alignment correction

- [x] Inspect the current vertical `.COM` offset.
- [x] Move only `.COM` slightly downward to align with the final O.
- [x] Preserve the existing color, size, orientation, and height.
- [x] Verify desktop and mobile previews.
- [x] Save a new checkpoint and deliver the correction.

## Live phone-number update

- [x] Locate every displayed and linked fictional phone number.
- [x] Replace it with `724 201 6907` and `tel:+17242016907`.
- [x] Verify the header, footer, and mobile call action.
- [x] Save a new checkpoint and deliver the update.

## How It Works supplied-video replacement

- [x] Confirm the approved supplied MP4 and its 1920×1080 native dimensions.
- [x] Verify the supplied video visibly presents APPLY at ~00:19, BREAK DOWN at ~00:26, RINSE at ~00:31, RESTORE at ~00:36, with burned-in captions such as `ROOF-SAFE FOAM`, `DEEP INTO MOSS & ALGAE`, `SOFT RINSE`, and `CLEAN, PROTECTED ROOF`.
- [x] Replace the former illustrated GSAP scene stack with the supplied MP4.
- [x] Preserve 50% viewport triggering, reset/replay behavior, sound unlock, playback controls, and the HTML quote CTA.
- [x] Remove the obsolete transcript/text fallback at the user’s request.
- [x] Use a compact responsive native 16:9 presentation instead of the oversized minimum-height frame.
- [x] Validate the interactive preview on desktop and mobile.
- [x] Run the focused regression test, TypeScript check, and production build.
- [x] Save the verified project checkpoint before handoff.

## Explainer stale-render correction

- [x] Trace the home page and confirm the current `#how-it-works` anchor section renders the supplied video.
- [x] Fix the stale static/illustrated presentation by replacing the player component and hosted media reference.
- [x] Verify the live section and video source on desktop and mobile.
- [x] Complete the approved supplied-video integration without rendering a new MP4.

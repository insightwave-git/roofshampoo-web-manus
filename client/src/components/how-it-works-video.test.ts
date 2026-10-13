import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const component = readFileSync(resolve(process.cwd(), "client/src/components/HowItWorksExplainer.tsx"), "utf8");
const landingPage = readFileSync(resolve(process.cwd(), "client/src/pages/SaveYourRoof.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/styles.css"), "utf8");

describe("How It Works supplied video player", () => {
  it("uses the approved hosted MP4 and keeps the interactive playback contract", () => {
    expect(component).toContain("/assets/RoofShampoo_Femaleversion.mp4");
    expect(component).toContain("playsInline");
    expect(component).toContain("muted");
    expect(component).toContain("preload=\"metadata\"");
    expect(component).toContain("IntersectionObserver");
    expect(component).toContain("intersectionRatio >= 0.5");
    expect(component).toContain("void video.play().catch");
    expect(component).toContain("pointerdown");
    expect(component).toContain("video.muted = false");
    expect(component).toContain("video.currentTime = 0");
  });

  it("renders a bare embedded video without the former player chrome", () => {
    expect(component).not.toContain("TRANSCRIPT");
    expect(component).not.toContain("how-video-transcript");
    expect(component).not.toContain("how-video-scene");
    expect(component).not.toContain("gsap");
    expect(component).not.toContain("how-video-toolbar");
    expect(component).not.toContain("how-video-scrubber");
    expect(component).not.toContain("how-video-quote-button");
  });

  it("adds a subtle accessible hover play indicator", () => {
    expect(component).toContain("const [isPlaying, setIsPlaying] = useState(false);");
    expect(component).toContain("how-video-play-indicator");
    expect(component).toContain("togglePlayback");
    expect(component).toContain("aria-label={isPlaying ? \"Pause roof cleaning explainer\" : \"Play roof cleaning explainer\"}");
    expect(styles).toContain(".how-video-player-bare:hover .how-video-play-indicator");
    expect(styles).toContain(".how-video-play-indicator:focus-visible");
    expect(styles).toContain(".how-video-play-icon.is-pause");
  });

  it("uses a high-quality poster frame before playback and while buffering", () => {
    expect(component).toContain('poster="/assets/frame-28s.jpg"');
    expect(component).toContain('preload="metadata"');
  });

  it("crossfades from the poster to the ready video", () => {
    expect(component).toContain("const [isVideoReady, setIsVideoReady] = useState(false);");
    expect(component).toContain("onCanPlay={() => setIsVideoReady(true)}");
    expect(component).toContain("how-video-poster");
    expect(component).toContain("is-hidden");
    expect(styles).toContain(".how-video-media.is-ready");
    expect(styles).toContain(".how-video-poster.is-hidden");
    expect(styles).toContain("transition: opacity 520ms");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("keeps the media at the compact native 16:9 presentation", () => {
    expect(styles).toContain(".how-video-stage{position:relative;aspect-ratio:16/9;overflow:hidden");
    expect(styles).toContain(".how-video-player{width:min(100%,820px);margin:3.5rem auto 0");
    expect(styles).toContain(".how-video-media{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:contain");
    expect(styles).toContain(".problem-section,\n.how-it-works-section");
    expect(styles).toContain(".how-it-works-grid");
    expect(styles).not.toContain("min-height:460px");
  });

  it("adds subtle comparison-card interaction with a reduced-motion fallback", () => {
    expect(landingPage).toContain("difference-card");
    expect(landingPage).toContain("difference-card-featured");
    expect(styles).toContain(".difference-card:hover");
    expect(styles).toContain(".difference-card:focus-within");
    expect(styles).toContain(".difference-card-featured:hover");
    expect(styles).toContain(".difference-card {\n    transition: none;");
  });

  it("adds matching service-card interaction with a reduced-motion fallback", () => {
    expect(landingPage).toContain("service-card service-card-featured");
    expect(landingPage).toContain('className="service-card reveal');
    expect(styles).toContain(".service-card {\n  transition:");
    expect(styles).toContain(".service-card:hover");
    expect(styles).toContain(".service-card:focus-within");
    expect(styles).toContain(".service-card-featured:hover");
    expect(styles).toContain(".service-card {\n    transition: none;");
  });

  it("adds the approved supporting card interactions and Restore details control", () => {
    expect(landingPage).toContain("restore-learn-more");
    expect(landingPage).toContain("Learn more");
    expect(landingPage).toContain("Restore is an optional plant-based oil treatment");
    expect(landingPage).toContain("lifespan-card");
    expect(landingPage).toContain("safety-card");
    expect(landingPage).toContain("safety-card-icon");
    expect(landingPage).toContain("problem-card reveal");
    expect(styles).toContain(".lifespan-card:hover");
    expect(styles).toContain(".lifespan-card:focus-within");
    expect(styles).toContain(".safety-card,\n.problem-card {\n  border: 1px solid transparent;");
    expect(styles).toContain(".safety-card:hover,");
    expect(styles).toContain(".safety-card:focus-within");
    expect(styles).toContain(".problem-card:hover");
    expect(styles).toContain(".problem-card:focus-within");
    expect(styles).toContain(".safety-card:hover .safety-card-icon");
    expect(styles).toContain(".safety-card:focus-within .safety-card-icon");
    expect(styles).toContain(".lifespan-card,\n  .safety-card,\n  .problem-card,\n  .safety-card-icon,\n  .restore-learn-more {\n    transition: none;");
  });

  it("enhances primary CTA hover, focus, press, and reduced-motion feedback", () => {
    expect(styles).toContain(".btn-green:hover");
    expect(styles).toContain("scale(1.015)");
    expect(styles).toContain(".btn-green:focus-visible");
    expect(styles).toContain(".btn-green:active");
    expect(styles).toContain("scale(0.97)");
    expect(styles).toContain(".btn-green {\n    transition: none;");
  });

  it("adds an accessible quote submission loading state", () => {
    expect(landingPage).toContain("const [submitting, setSubmitting] = useState(false);");
    expect(landingPage).toContain("if (submitting) return;");
    expect(landingPage).toContain("quote-submit-spinner");
    expect(landingPage).toContain('aria-busy={submitting}');
    expect(landingPage).toContain('disabled={submitting}');
    expect(styles).toContain(".quote-submit-spinner");
    expect(styles).toContain("@keyframes quote-submit-spin");
    expect(styles).toContain(".btn-green:disabled");
  });

  it("requires and limits the roof description with a clear submission error state", () => {
    expect(landingPage).toContain('id="details"');
    expect(landingPage).toContain("required");
    expect(landingPage).toContain("maxLength={300}");
    expect(landingPage).toContain("detailsLength");
    expect(landingPage).toContain('role="alert"');
    expect(landingPage).toContain("We couldn't send your request.");
    expect(landingPage).toContain("call 724 201 6907");
    expect(styles).toContain(".quote-details-meta");
    expect(styles).toContain(".quote-form-error");
  });

  it("adds field-level validation messages and invalid styling", () => {
    expect(landingPage).toContain("const quoteFields: QuoteField[]");
    expect(landingPage).toContain("input.validity.valueMissing");
    expect(landingPage).toContain("input.validity.typeMismatch");
    expect(landingPage).toContain("quote-field-invalid");
    expect(landingPage).toContain("aria-invalid={Boolean(fieldErrors.name)}");
    expect(landingPage).toContain("firstInvalid");
    expect(styles).toContain(".quote-field-invalid");
    expect(styles).toContain(".quote-field-error");
  });

  it("validates phone numbers with at least 10 digits", () => {
    expect(landingPage).toContain('type="tel"');
    expect(landingPage).toContain('inputMode="tel"');
    expect(landingPage).toContain('pattern="(?=(?:.*[0-9]){10,})[0-9 ()+.-]+"');
    expect(landingPage).toContain("input.validity.patternMismatch");
    expect(landingPage).toContain("Enter a valid phone number with at least 10 digits.");
  });
});

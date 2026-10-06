import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const component = readFileSync(resolve(process.cwd(), "client/src/components/HowItWorksExplainer.tsx"), "utf8");
const landingPage = readFileSync(resolve(process.cwd(), "client/src/pages/SaveYourRoof.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/styles.css"), "utf8");

describe("How It Works supplied video player", () => {
  it("uses the approved hosted MP4 and keeps the interactive playback contract", () => {
    expect(component).toContain("/manus-storage/RoofShampoo_femaleversion2_6651c096.mp4");
    expect(component).toContain("playsInline");
    expect(component).toContain("muted");
    expect(component).toContain("preload=\"metadata\"");
    expect(component).toContain("IntersectionObserver");
    expect(component).toContain("intersectionRatio >= 0.5");
    expect(component).toContain("Play with sound");
    expect(component).toContain("GET QUOTE NOW");
  });

  it("does not render the former illustrated scenes or transcript fallback", () => {
    expect(component).not.toContain("TRANSCRIPT");
    expect(component).not.toContain("how-video-transcript");
    expect(component).not.toContain("how-video-scene");
    expect(component).not.toContain("gsap");
  });

  it("keeps the media at the compact native 16:9 presentation", () => {
    expect(styles).toContain(".how-video-stage{position:relative;aspect-ratio:16/9;overflow:hidden");
    expect(styles).toContain(".how-video-media{display:block;width:100%;height:auto;aspect-ratio:16/9");
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
    expect(styles).toContain(".lifespan-card:hover");
    expect(styles).toContain(".lifespan-card:focus-within");
    expect(styles).toContain(".safety-card:hover .safety-card-icon");
    expect(styles).toContain(".safety-card:focus-within .safety-card-icon");
    expect(styles).toContain(".lifespan-card,\n  .safety-card-icon,\n  .restore-learn-more {\n    transition: none;");
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
});

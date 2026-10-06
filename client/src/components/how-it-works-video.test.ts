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
});

/* SaveYourRoof design reminder: calm instructional motion, navy/cyan/green brand palette, large readable type, and a protective home-services tone. The player is intentionally editorial rather than a generic rounded card. */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NARRATION_URL = "/manus-storage/saveyourroof-how-it-works-narration_55a0297e.wav";

const STEPS = [
  {
    number: "01",
    label: "APPLY",
    kicker: "START LOW. COVER EVENLY.",
    text: "Eco-friendly solution at low pressure, designed to be safe for shingles and everything below the roofline.",
    accent: "cyan",
  },
  {
    number: "02",
    label: "BREAK DOWN",
    kicker: "LET THE SOLUTION DO THE WORK.",
    text: "Streaks, moss, algae, and lichen lift away without scrubbing or damaging the shingle surface.",
    accent: "green",
  },
  {
    number: "03",
    label: "RINSE",
    kicker: "A GENTLE FINISH, NOT A BLAST.",
    text: "Clear the residue without pressure-washer damage and without leaving runoff behind.",
    accent: "cyan",
  },
  {
    number: "04",
    label: "RESTORE",
    kicker: "THE ADD-ON: OPTIONAL PROTECTION.",
    text: "An optional plant-based oil treatment resoaks the shingle, helps rebuild flexibility, and helps seal out water.",
    accent: "green",
  },
];

const TRANSCRIPT = [
  "A roof does not need a pressure washer to look new again. SaveYourRoof uses a careful four-step process that cleans the roof while protecting the home and everything around it.",
  "First, we apply an eco-friendly cleaning solution at low pressure. It is designed to be safe for shingles and for everything below the roofline.",
  "Next, the solution breaks down the organic growth. Streaks, moss, algae, and lichen lift away without scrubbing or damaging the shingle surface.",
  "Then we rinse gently. The rinse clears away the residue without pressure-washer damage, and without leaving runoff behind.",
  "Finally, homeowners can add Restore. This optional plant-based oil treatment resoaks the shingle, helps rebuild flexibility, and helps seal out water.",
  "No bleach. No phosphates. No harsh scrubbing. Just a measured process built to clean what belongs on the roof, and leave everything else alone.",
  "The result is a cleaner roof, a protected home, and one more way to save your roof, save your money, and save ten years.",
];

function RoofVisual({ index }: { index: number }) {
  return (
    <div className={`how-video-visual how-video-visual-${index + 1}`} aria-hidden="true">
      <div className="how-video-roof-plane" />
      <div className="how-video-roof-edge" />
      {index === 0 && (
        <>
          <div className="how-video-wand" />
          <div className="how-video-spray how-video-spray-a" />
          <div className="how-video-spray how-video-spray-b" />
          <div className="how-video-badge">LOW<br />PRESSURE</div>
        </>
      )}
      {index === 1 && (
        <>
          <div className="how-video-growth growth-one" />
          <div className="how-video-growth growth-two" />
          <div className="how-video-growth growth-three" />
          <div className="how-video-particles" />
          <div className="how-video-badge green">NO<br />SCRUBBING</div>
        </>
      )}
      {index === 2 && (
        <>
          <div className="how-video-residue residue-one" />
          <div className="how-video-residue residue-two" />
          <div className="how-video-water" />
          <div className="how-video-runoff" />
          <div className="how-video-badge">GENTLE<br />RINSE</div>
        </>
      )}
      {index === 3 && (
        <>
          <div className="how-video-film" />
          <div className="how-video-droplet">+</div>
          <div className="how-video-badge green">RESOAK<br />&amp; PROTECT</div>
        </>
      )}
    </div>
  );
}

export default function HowItWorksExplainer({ onQuote }: { onQuote: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const soundUnlockedRef = useRef(false);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const scenes = Array.from(root.querySelectorAll<HTMLElement>(".how-video-scene"));
    const sceneObjects = scenes.map((scene) => ({
      scene,
      title: scene.querySelector<HTMLElement>(".how-video-scene-title"),
      visual: scene.querySelector<HTMLElement>(".how-video-visual"),
      caption: scene.querySelector<HTMLElement>(".how-video-caption"),
    }));
    const endFrame = root.querySelector<HTMLElement>(".how-video-end-frame");
    const endLogo = root.querySelector<HTMLElement>(".how-video-end-logo");
    const endLine = root.querySelector<HTMLElement>(".how-video-end-line");

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.out" },
      onUpdate: () => setProgress(tl.progress()),
      onComplete: () => setIsPlaying(false),
    });
    timelineRef.current = tl;

    const sceneStarts = [0, 8.4, 22.9, 37.8, 48.5];
    sceneObjects.forEach((item, index) => {
      const start = sceneStarts[index];
      const nextStart = sceneStarts[index + 1];
      tl.fromTo(item.scene, { autoAlpha: index === 0 ? 1 : 0 }, { autoAlpha: 1, duration: 0.22 }, start)
        .fromTo(item.title, { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, duration: 0.42 }, start + 0.25)
        .fromTo(item.visual, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.55 }, start + 0.55)
        .fromTo(item.caption, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.38 }, start + 0.9);
      if (nextStart) tl.to(item.scene, { autoAlpha: 0, duration: 0.32 }, nextStart - 0.32);
    });
    tl.fromTo(endFrame, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 61.4)
      .fromTo(endLogo, { autoAlpha: 0, scale: 0.9, rotation: -4 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.6 }, 61.75)
      .fromTo(endLine, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.42 }, 63.1)
      .to({}, { duration: 6.9 }, 63.86);

    const reset = () => {
      tl.pause(0);
      setProgress(0);
      setIsPlaying(false);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        setIsInView(visible);
        if (visible) {
          reset();
          tl.play(0);
          setIsPlaying(true);
          if (soundUnlockedRef.current) {
            const audio = audioRef.current;
            if (audio) {
              audio.currentTime = 0;
              void audio.play().catch(() => undefined);
            }
          }
        } else {
          reset();
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(root);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      tl.progress(1).pause();
      setProgress(1);
    }

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, []);

  const unlockSound = () => {
    soundUnlockedRef.current = true;
    setSoundUnlocked(true);
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime, 0.01);
    void audio.play().catch(() => undefined);
    if (!timelineRef.current?.isActive()) {
      timelineRef.current?.restart();
      setIsPlaying(true);
    }
  };

  const togglePlayback = () => {
    const tl = timelineRef.current;
    const audio = audioRef.current;
    if (!tl) return;
    if (tl.isActive()) {
      tl.pause();
      audio?.pause();
      setIsPlaying(false);
    } else {
      tl.play();
      if (soundUnlockedRef.current) void audio?.play().catch(() => undefined);
      setIsPlaying(true);
    }
  };

  const restart = () => {
    const tl = timelineRef.current;
    const audio = audioRef.current;
    tl?.restart();
    if (soundUnlockedRef.current) {
      if (audio) audio.currentTime = 0;
      void audio?.play().catch(() => undefined);
    }
    setIsPlaying(true);
  };

  return (
    <div ref={sectionRef} className="how-video-player" aria-label="SaveYourRoof four-step roof cleaning explainer">
      <audio ref={audioRef} src={NARRATION_URL} preload="metadata" aria-label="Narration for the SaveYourRoof roof cleaning explainer" />
      <div className="how-video-toolbar">
        <span className="how-video-status"><span className={`how-video-status-dot ${isInView ? "is-live" : ""}`} /> {isInView ? "EXPLAINER READY" : "SCROLL TO START"}</span>
        <div className="how-video-controls">
          <button type="button" className="how-video-control how-video-sound" onClick={unlockSound} aria-label={soundUnlocked ? "Narration enabled" : "Play explainer with sound"}>
            <span aria-hidden="true">{soundUnlocked ? "◉" : "◖"}</span> {soundUnlocked ? "Sound on" : "Play with sound"}
          </button>
          <button type="button" className="how-video-control" onClick={togglePlayback} aria-label={isPlaying ? "Pause explainer" : "Play explainer"}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" className="how-video-control" onClick={restart}>Replay</button>
        </div>
      </div>

      <div className="how-video-stage" role="img" aria-label="Animated illustration of the four roof cleaning steps">
        <div className="how-video-intro how-video-scene">
          <div className="how-video-intro-copy"><p className="how-video-eyebrow">THE GENTLE METHOD</p><h3>A GENTLER WAY<br />TO CLEAN A ROOF</h3><p>No pressure washer. No harsh scrubbing. A measured four-step process.</p></div>
          <div className="how-video-intro-roof"><div className="how-video-roof-plane" /><div className="how-video-roof-edge" /></div>
        </div>
        {STEPS.map((step, index) => (
          <article key={step.number} className="how-video-scene" aria-label={`${step.number} ${step.label}`}>
            <div className={`how-video-scene-number ${step.accent}`}>{step.number}</div>
            <div className="how-video-scene-title"><span>{step.label}</span>{index === 3 && <small> — THE ADD-ON</small>}<em>{step.kicker}</em></div>
            <RoofVisual index={index} />
            <div className="how-video-caption"><strong>{step.label}{index === 3 ? " — THE ADD-ON" : ""}</strong><span>{step.text}</span></div>
            <div className="how-video-progress-label">{step.number} / 04</div>
          </article>
        ))}
        <div className="how-video-end-frame" aria-hidden="true">
          <div className="how-video-end-halo" />
          <img className="how-video-end-logo" src="/manus-storage/saveyourroof-logo_0a1f1d4c.png" alt="" />
          <div className="how-video-end-line">Clean · Restore · Save $</div>
        </div>
        <div className="how-video-scrubber" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(progress, 0.01)})` }} /></div>
      </div>

      <div className="how-video-cta-row"><button type="button" className="btn-green how-video-quote-button" onClick={onQuote}>GET QUOTE NOW <span aria-hidden="true">↘</span></button></div>

      <details className="how-video-transcript">
        <summary>Accessible transcript and text fallback</summary>
        <div className="how-video-transcript-copy">
          {TRANSCRIPT.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </details>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

const VIDEO_URL = "/manus-storage/RoofShampoo_femaleversion2_6651c096.mp4";

export default function HowItWorksExplainer({ onQuote }: { onQuote: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const soundUnlockedRef = useRef(false);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = sectionRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const reset = () => {
      video.pause();
      video.currentTime = 0;
      video.muted = !soundUnlockedRef.current;
      setProgress(0);
      setIsPlaying(false);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        setIsInView(visible);
        if (visible) {
          reset();
          void video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
          reset();
        }
      },
      { threshold: [0, 0.15, 0.5, 1] },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      reset();
    };
  }, []);

  const unlockSound = () => {
    const video = videoRef.current;
    if (!video) return;
    soundUnlockedRef.current = true;
    setSoundUnlocked(true);
    video.muted = false;
    void video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  return (
    <div ref={sectionRef} className="how-video-player" aria-label="SaveYourRoof four-step roof cleaning explainer">
      <video
        ref={videoRef}
        className="how-video-media"
        src={VIDEO_URL}
        playsInline
        muted
        preload="metadata"
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          setProgress(video.duration ? video.currentTime / video.duration : 0);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        aria-label="SaveYourRoof roof cleaning explainer video with embedded captions"
      />

      <div className="how-video-toolbar">
        <span className="how-video-status"><span className={`how-video-status-dot ${isInView ? "is-live" : ""}`} /> {isInView ? "EXPLAINER READY" : "SCROLL TO START"}</span>
        <div className="how-video-controls">
          <button type="button" className="how-video-control how-video-sound" onClick={unlockSound} aria-label={soundUnlocked ? "Sound enabled" : "Play explainer with sound"}>
            <span aria-hidden="true">{soundUnlocked ? "◉" : "◖"}</span> {soundUnlocked ? "Sound on" : "Play with sound"}
          </button>
          <button type="button" className="how-video-control" onClick={togglePlayback} aria-label={isPlaying ? "Pause explainer" : "Play explainer"}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" className="how-video-control" onClick={restart}>Replay</button>
        </div>
      </div>

      <div className="how-video-scrubber" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(progress, 0.01)})` }} /></div>

      <div className="how-video-cta-row"><button type="button" className="btn-green how-video-quote-button" onClick={onQuote}>GET QUOTE NOW <span aria-hidden="true">↘</span></button></div>
    </div>
  );
}

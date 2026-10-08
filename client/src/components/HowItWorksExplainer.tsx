import { useEffect, useRef } from "react";

const VIDEO_URL = "/manus-storage/RoofShampoo_femaleversion2_6651c096.mp4";

export default function HowItWorksExplainer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const soundUnlockedRef = useRef(false);

  useEffect(() => {
    const root = sectionRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const reset = () => {
      video.pause();
      video.currentTime = 0;
      video.muted = !soundUnlockedRef.current;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        if (visible) {
          reset();
          void video.play().catch(() => undefined);
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

  useEffect(() => {
    const unlockSound = () => {
      const video = videoRef.current;
      if (!video || soundUnlockedRef.current) return;
      soundUnlockedRef.current = true;
      video.muted = false;
      if (!video.paused) return;
      const root = sectionRef.current;
      const bounds = root?.getBoundingClientRect();
      const visible = bounds && bounds.top < window.innerHeight * 0.5 && bounds.bottom > window.innerHeight * 0.5;
      if (visible) void video.play().catch(() => undefined);
    };

    window.addEventListener("pointerdown", unlockSound, { passive: true });
    window.addEventListener("click", unlockSound, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("click", unlockSound);
    };
  }, []);

  return (
    <div ref={sectionRef} className="how-video-player how-video-player-bare" aria-label="SaveYourRoof four-step roof cleaning explainer">
      <video
        ref={videoRef}
        className="how-video-media"
        src={VIDEO_URL}
        playsInline
        muted
        preload="metadata"
        onEnded={() => {
          if (videoRef.current) videoRef.current.currentTime = 0;
        }}
        aria-label="SaveYourRoof roof cleaning explainer video with embedded captions"
      >
        Your browser does not support embedded video.
      </video>
    </div>
  );
}

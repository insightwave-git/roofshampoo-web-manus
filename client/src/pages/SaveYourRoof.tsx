import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import HowItWorksExplainer from "@/components/HowItWorksExplainer";

/* ========================================================================
   SAVEYOURROOF.COM — Roof Shampoo landing page
   Single-file React component. Requires Tailwind CSS.
   Paste the accompanying styles into your global stylesheet.
   ======================================================================== */

/* ------------------------------------------------------------------ */
/*  CONFIG — edit these                                                */
/* ------------------------------------------------------------------ */

const PHONE = "724 201 6907";
const TEL = "tel:+17242016907";

/**
 * Replace each value with an imported asset or a hosted URL.
 * e.g.  import beforeRoof from "./assets/before-roof.jpg";
 *       then set  beforeRoof: beforeRoof
 *
 * beforeRoof / afterRoof MUST be real photographs of the SAME roof.
 * Everything else may be stock or generated imagery.
 */
const IMG = {
  beforeRoof: "/assets/before-roof.jpg",
  afterRoof: "/assets/after-roof.jpg",
  /** Hero "before" image: the before-roof photo with moss, algae and streaks intensified, aligned to afterRoof. */
  dirtyRoof: "/images/hero-dirty-roof.jpg",
  shingleTexture: "/assets/shingle-texture.jpg",
  softWashTech: "/assets/soft-wash-tech.jpg",
  roofNeglected: "/assets/roof-neglected.jpg",
  roofMaintained: "/assets/roof-maintained.jpg",
  blackStreaks: "/assets/roof-black-streaks.jpg",
  moss: "/assets/roof-moss.jpg",
  algae: "/assets/roof-algae.jpg",
  lichen: "/assets/roof-lichen.jpg",
  dirt: "/assets/roof-dirt.jpg",
  logo: "/assets/saveyourroof-logo.png",
  siteLogo: "/assets/SaveYourRoof_Final09Artboard7.png",
  /** Mascot lockup for the hero spin-in. Prefer a PNG with transparency in Manus. */
  mascot: "/assets/SaveYourRoof_Final09Artboard7.png",
};

const NAV = [
  { label: "Why Roof Shampoo", id: "why" },
  { label: "The Difference", id: "difference" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Services", id: "services" },
  { label: "About", id: "safety" },
];

/* ------------------------------------------------------------------ */
/*  SCROLL REVEAL HOOK                                                 */
/* ------------------------------------------------------------------ */

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          window.setTimeout(() => el.classList.add("is-visible"), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/*  SHARED BITS                                                        */
/* ------------------------------------------------------------------ */

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-green" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="m4 12.5 5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="m7 7 10 10M17 7 7 17" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon({ className = "h-4 w-4 text-cyan" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path
        d="M4 5c0-.6.4-1 1-1h2.3c.5 0 .9.3 1 .8l.8 3c.1.4-.1.8-.4 1l-1.5 1a11 11 0 0 0 5 5l1-1.5c.2-.3.6-.5 1-.4l3 .8c.5.1.8.5.8 1V18c0 .6-.4 1-1 1h-1A13 13 0 0 1 4 6V5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  HEADER                                                             */
/* ------------------------------------------------------------------ */

function Header({ revealed }: { revealed: boolean }) {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white shadow-[0_2px_16px_-6px_rgba(18,58,92,0.35)] transition-opacity duration-500 ${
        revealed ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="shell relative flex flex-col items-center gap-2 py-3 md:gap-3 md:py-4">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={IMG.siteLogo} alt="SaveYourRoof.com" className="h-auto w-[144px] object-contain md:w-[176px]" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-5 lg:flex">
          {NAV.map((item) => (
            <button key={item.id} onClick={() => go(item.id)} className="text-[15px] font-semibold text-navy transition-opacity hover:opacity-70">
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-5 md:flex">
          <a href={TEL} className="flex items-center gap-2 text-[15px] font-semibold text-navy">
            <PhoneIcon />
            {PHONE}
          </a>
          <button className="btn-green text-sm" onClick={() => go("quote")}>
            Get a Quote
          </button>
        </div>

        <button
          aria-label="Open menu"
          aria-expanded={open}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-navy/10 bg-white md:hidden">
          <div className="shell flex flex-col py-3">
            {NAV.map((item) => (
              <button key={item.id} onClick={() => go(item.id)} className="py-2.5 text-left font-medium text-navy">
                {item.label}
              </button>
            ))}
            <a href={TEL} className="flex items-center gap-2 py-2.5 font-semibold text-navy">
              <PhoneIcon />
              {PHONE}
            </a>
            <div className="py-2">
              <button className="btn-green w-full text-sm" onClick={() => go("quote")}>
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  1. HERO — "Clean Sweep": dirty roof wipes clean, left to right     */
/* ------------------------------------------------------------------ */

/** Timing for the hero wipe (ms). */
const HERO_SWEEP = { hold: 1100, sweep: 2800 } as const;

/** Problem markers on the dirty roof, as % of the photo (x from left, y from top). */
const HERO_MARKERS = [
  { label: "Moss", x: 31, y: 33 },
  { label: "Black streaks", x: 50, y: 27 },
  { label: "Algae", x: 63, y: 37 },
] as const;

/** Before/after photos are 3:2. FOCUS_X keeps the roof centred when the photo is cropped. */
const HERO_PHOTO_RATIO = 3 / 2;
const HERO_FOCUS_X = 0.42;

function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dirtyRef = useRef<HTMLImageElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const box = useRef({ left: 0, w: 0, vw: 0 });
  const raf = useRef(0);
  const timers = useRef<number[]>([]);
  const started = useRef(false);
  const [done, setDone] = useState(false);

  /** Size the photo "stage" like object-fit: cover, so markers stay pinned to the roof. */
  const layout = useCallback(() => {
    const media = mediaRef.current;
    const stage = stageRef.current;
    if (!media || !stage) return;
    const vw = media.clientWidth;
    const vh = media.clientHeight;
    let w = vw;
    let h = vw / HERO_PHOTO_RATIO;
    if (h < vh) {
      h = vh;
      w = vh * HERO_PHOTO_RATIO;
    }
    const left = (vw - w) * HERO_FOCUS_X;
    const top = (vh - h) * 0.35;
    Object.assign(stage.style, { width: `${w}px`, height: `${h}px`, left: `${left}px`, top: `${top}px` });
    box.current = { left, w, vw };
  }, []);

  /** Move the wipe edge to x px from the left of the visible hero image. */
  const setWipe = useCallback((x: number) => {
    const { left, w } = box.current;
    const pct = Math.min(100, (Math.max(0, x - left) / w) * 100);
    if (dirtyRef.current) dirtyRef.current.style.clipPath = `inset(0 0 0 ${pct}%)`;
    if (edgeRef.current) edgeRef.current.style.left = `${x}px`;
    HERO_MARKERS.forEach((m, i) => {
      const el = markerRefs.current[i];
      if (!el) return;
      const mx = left + w * (m.x / 100);
      el.classList.toggle("is-gone", x > mx - 10);
    });
  }, []);

  const play = useCallback(() => {
    cancelAnimationFrame(raf.current);
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    layout();
    setDone(false);

    const before = beforeRef.current;
    const after = afterRef.current;
    const edge = edgeRef.current;
    after?.classList.remove("is-in");
    edge?.classList.remove("is-on");
    markerRefs.current.forEach((el) => el?.classList.remove("is-in", "is-gone"));
    setWipe(0);
    before?.classList.add("is-in");
    markerRefs.current.forEach((el, i) => {
      timers.current.push(window.setTimeout(() => el?.classList.add("is-in"), 200 + i * 220));
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No motion: show a still 50/50 split with both labels.
      markerRefs.current.forEach((el) => el?.classList.add("is-in"));
      setWipe(box.current.vw * 0.5);
      after?.classList.add("is-in");
      return;
    }

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    timers.current.push(
      window.setTimeout(() => {
        edge?.classList.add("is-on");
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / HERO_SWEEP.sweep);
          const x = ease(p) * (box.current.vw + 4);
          setWipe(x);
          if (p > 0.28) after?.classList.add("is-in");
          if (before && x > before.offsetLeft - 8) before.classList.remove("is-in");
          if (p < 1) {
            raf.current = requestAnimationFrame(step);
          } else {
            edge?.classList.remove("is-on");
            timers.current.push(window.setTimeout(() => setDone(true), 500));
          }
        };
        raf.current = requestAnimationFrame(step);
      }, HERO_SWEEP.hold),
    );
  }, [layout, setWipe]);

  useEffect(() => {
    layout();
    setWipe(0);
    const media = mediaRef.current;
    if (!media) return;

    const ro = new ResizeObserver(() => layout());
    ro.observe(media);

    // Start the sweep the first time the hero is properly on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4 && !started.current) {
          started.current = true;
          play();
        }
      },
      { threshold: [0, 0.4] },
    );
    io.observe(media);

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf.current);
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, [layout, setWipe, play]);

  return (
    <section id="top" className="hero-sweep">
      <div ref={mediaRef} className="hero-sweep-media">
        <div ref={stageRef} className="hero-sweep-stage">
          <img src={IMG.afterRoof} alt="The same roof after a Roof Shampoo treatment: clean, even dark shingles" />
          <img
            ref={dirtyRef}
            src={IMG.dirtyRoof}
            alt="Roof covered in moss, green algae and black streaks before cleaning"
            className="hero-sweep-dirty"
          />
          {HERO_MARKERS.map((m, i) => (
            <div
              key={m.label}
              ref={(el) => {
                markerRefs.current[i] = el;
              }}
              className="hero-sweep-marker"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              aria-hidden="true"
            >
              <span className="hero-sweep-marker-ring" />
              <span className="hero-sweep-marker-tag">{m.label}</span>
            </div>
          ))}
        </div>

        <div ref={edgeRef} className="hero-sweep-edge" aria-hidden="true">
          <span className="hero-sweep-nozzle">
            <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
              <path d="M12 2.5c-.3 0-.6.2-.8.4C9.6 5 6 9.8 6 14a6 6 0 0 0 12 0c0-4.2-3.6-9-5.2-11.1-.2-.2-.5-.4-.8-.4z" fill="currentColor" />
              <path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              className="hero-sweep-drop"
              style={
                {
                  top: `${8 + ((i * 37) % 84)}%`,
                  "--dx": `${-30 - ((i * 23) % 60)}px`,
                  "--dy": `${((i * 13) % 40) - 20}px`,
                  animationDelay: `${(i % 7) * 0.1}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div ref={beforeRef} className="hero-sweep-label hero-sweep-label-before">
          <span className="hero-sweep-dot" />
          <strong>BEFORE</strong>
          <span className="hero-sweep-label-text">Moss · algae · black streaks</span>
        </div>
        <div ref={afterRef} className="hero-sweep-label hero-sweep-label-after">
          <span className="hero-sweep-dot" />
          <strong>AFTER</strong>
          <span className="hero-sweep-label-text">One Roof Shampoo treatment</span>
        </div>

        <button type="button" className={`hero-sweep-replay ${done ? "is-in" : ""}`} onClick={play} aria-label="Watch the roof cleaning again">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Watch again
        </button>
      </div>

      <div className="hero-sweep-shade" aria-hidden="true" />

      <div className="hero-sweep-copy">
        <div className="hero-sweep-copy-main">
          <p className="eyebrow hero-sweep-eyebrow">Western PA · Non-bleach roof cleaning</p>
          <h1 className="hero-sweep-title">
            MOSS, ALGAE &amp; STREAKS GONE. <span className="text-green">NO BLEACH. EVER.</span>
          </h1>
          <p className="hero-sweep-sub">
            A soft, low-pressure wash that takes your roof from stained to like-new in one visit, and is safe for pets, plants and your shingles.
          </p>
          <div className="hero-sweep-ctas">
            <button type="button" className="btn-green px-6 py-3.5 text-[16px]" onClick={() => scrollToId("quote")}>
              Get a Free Quote
            </button>
            <a href={TEL} className="hero-sweep-call">
              <PhoneIcon className="h-4 w-4 text-white" />
              Call {PHONE}
            </a>
          </div>
        </div>
        <ul className="hero-sweep-trust">
          <li>
            <Check />
            No bleach, no phosphates
          </li>
          <li>
            <Check />
            Pet, plant &amp; people safe
          </li>
          <li>
            <Check />
            No pressure damage to shingles
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. WHY BAND                                                        */
/* ------------------------------------------------------------------ */

const WHY = [
  { t: "No bleach. Ever.", d: "Chlorine strips shingles and kills what it runs off onto. We don't use it." },
  { t: "No pressure damage.", d: "A soft, low-pressure wash. No blasting granules off a roof you're trying to save." },
  { t: "Clean the same day.", d: "Streaks, moss, algae and lichen gone. Your roof looks the way it should." },
];

function WhyBand() {
  return (
    <section id="why" className="bg-navy py-16 md:py-20">
      <div className="shell">
        <h2 className="max-w-4xl text-3xl text-white md:text-4xl">THE BEST NON-BLEACH ROOF CLEANING IN WESTERN PA.</h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {WHY.map((w, i) => (
            <li key={w.t} className="reveal" data-reveal-delay={i * 110}>
              <div className="h-1 w-12 rounded-full bg-green" />
              <h3 className="mt-5 font-display text-xl font-extrabold text-white">{w.t}</h3>
              <p className="mt-2 text-[16px] text-[#B9CBDB]">{w.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. THE PROBLEM                                                     */
/* ------------------------------------------------------------------ */

const PROBLEMS = [
  { n: "01", label: "BLACK STREAKS", img: IMG.blackStreaks, alt: "Asphalt shingles with dark black algae streaks running down the roof" },
  { n: "02", label: "MOSS", img: IMG.moss, alt: "Thick green moss growing between asphalt shingles" },
  { n: "03", label: "ALGAE", img: IMG.algae, alt: "Green and black algae discoloration on roof shingles" },
  { n: "04", label: "LICHEN", img: IMG.lichen, alt: "Gray-green lichen patches crusted on asphalt shingles" },
  { n: "05", label: "DIRT", img: IMG.dirt, alt: "Brown dirt and sediment coating a residential roof" },
];

function Problem() {
  return (
    <section id="problem" className="problem-section relative overflow-hidden bg-navy-deep py-24 md:py-32">
      <img
        src={IMG.shingleTexture}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
        aria-hidden="true"
      />
      <div className="shell relative">
        <p className="eyebrow">THE PROBLEM</p>
        <h2 className="mt-4 max-w-3xl text-4xl text-white md:text-5xl">EVERY ROOF TELLS TWO STORIES.</h2>
        <p className="mt-6 max-w-2xl text-[#B9CBDB]">
          One where dirt, moss, and algae quietly cut its life short. One where it's cleaned properly and lives out every year it was built for.
        </p>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {PROBLEMS.map((p, i) => (
            <li key={p.n} className="reveal overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-sm" data-reveal-delay={i * 90}>
              <div className="aspect-square overflow-hidden">
                <img src={p.img} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <p className="font-display text-sm font-extrabold text-cyan">{p.n}</p>
                <p className="mt-1 font-display text-lg font-extrabold text-white">{p.label}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-14 max-w-[800px] text-center text-[#B9CBDB]">
          Left alone, these accelerate granule loss, UV degradation, and shingle curling and cracking, cutting years off a roof that should have lasted
          decades.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. THE DIFFERENCE                                                  */
/* ------------------------------------------------------------------ */

const METHODS = [
  {
    name: "Pressure Washing",
    tag: "What most crews do",
    good: false,
    points: [
      "High-pressure water blasts granules off the shingle surface",
      "Granules are the roof's UV protection. Losing them shortens its life",
      "Can void a manufacturer's shingle warranty",
      "Forces water under shingles and into the roof deck",
    ],
  },
  {
    name: "Roof Shampoo",
    tag: "What we do",
    good: true,
    points: [
      "Low-pressure application. Nothing is blasted, scrubbed, or stripped",
      "No bleach, no phosphates, no harsh chemicals of any kind",
      "Breaks down organic growth, then breaks down itself",
      "Safe for pets, plants, people and the shingles underneath",
    ],
  },
  {
    name: "Bleach & Chlorine",
    tag: "The cheap shortcut",
    good: false,
    points: [
      "Kills growth on contact, but keeps working after it leaves the roof",
      "Runs into gutters, garden beds, grass and downspouts",
      "Corrodes metal flashing, fasteners and gutter hardware",
      "Fumes and residue around the house while it dries",
    ],
  },
];

function Difference() {
  return (
    <section id="difference" className="bg-white py-24 md:py-32">
      <div className="shell">
        <p className="eyebrow">THE DIFFERENCE</p>
        <h2 className="mt-4 max-w-4xl text-4xl text-navy md:text-5xl">THERE ARE THREE WAYS TO CLEAN A ROOF. ONLY ONE OF THEM SAVES IT.</h2>
        <p className="mt-6 max-w-[820px] text-navy/80">
          Most roof cleaning either damages the shingle or damages everything around it. Roof Shampoo was built to do neither. It is tough on algae, moss, and lichen,
          and nothing else.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {METHODS.map((m, i) => (
            <article
              key={m.name}
              className={`difference-card reveal rounded-2xl p-8 ${
                m.good
                  ? "difference-card-featured border-t-4 border-green bg-offwhite shadow-[0_28px_60px_-28px_rgba(18,58,92,0.6)] lg:z-10 lg:-mt-4 lg:scale-[1.02]"
                  : "border-t-4 border-navy/15 bg-white ring-1 ring-navy/10"
              }`}
              data-reveal-delay={i * 120}
            >
              {m.good && (
                <img src={IMG.mascot} alt="" aria-hidden="true" className="difference-card-logo mx-auto mb-6 h-auto w-[112px] object-contain md:w-[136px]" />
              )}
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                  m.good ? "bg-green/12 text-green" : "bg-navy/8 text-navy/55"
                }`}
              >
                {m.tag}
              </span>
              <h3 className={`mt-5 text-2xl ${m.good ? "text-navy" : "text-navy/70"}`}>{m.name}</h3>
              <ul className="mt-6 space-y-4">
                {m.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[16px]">
                    {m.good ? <Check /> : <Cross />}
                    <span className={m.good ? "text-navy/85" : "text-navy/60"}>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. HOW IT WORKS                                                    */
/* ------------------------------------------------------------------ */

const STEPS = [
  { n: "01", t: "APPLY", d: "Eco-friendly cleaning solution applied at low pressure, safe for shingles and everything below the roofline." },
  { n: "02", t: "BREAK DOWN", d: "Solution lifts streaks, moss, algae, and lichen without scrubbing or damaging the shingle surface." },
  { n: "03", t: "RINSE", d: "Gentle rinse clears residue without pressure-washer damage or runoff." },
  { n: "04", t: "RESTORE: THE ADD-ON", d: "An optional plant-based oil treatment resoaks the shingle, rebuilding flexibility and sealing out water." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works-section bg-offwhite py-24 md:py-32">
      <div className="shell">
        <div className="how-it-works-grid">
          <div className="how-it-works-copy text-center lg:text-left">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 className="mx-auto mt-4 max-w-[900px] text-4xl text-navy md:text-5xl lg:mx-0">GENTLE ON YOUR ROOF. SAFE FOR EVERYTHING AROUND IT.</h2>
          <div className="mx-auto mt-7 max-w-[820px] space-y-5 text-navy/80 lg:mx-0">
            <p>
              Our wash is a soft, low-pressure application with no scrubbing, brushing, or harsh chemicals that strip your shingles or run off into your yard.
              It's built to be tough on algae, moss, and lichen, and nothing else.
            </p>
            <p>
              No bleach. No phosphates. Once it's done its job breaking down organic growth, the solution breaks down itself, so it does not linger in your gutters,
              your soil, or your grass.
            </p>
          </div>
          </div>

          <HowItWorksExplainer />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. SAFETY                                                          */
/* ------------------------------------------------------------------ */

const SAFETY = [
  {
    t: "PET SAFE",
    d: "Nothing left on the lawn or in the yard that's harmful to dogs, cats, or anything else that walks through it.",
    icon: "M5 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-3 4c3 0 5 2.5 5 5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2c0-2.5 2-5 5-5Z",
  },
  { t: "PLANT SAFE", d: "No bleach or phosphates, so landscaping, grass, and garden beds around the house aren't damaged in the process.", icon: "M12 21V9m0 0c0-3 2-5 5-5 0 3-2 5-5 5Zm0 0C12 6 10 4 7 4c0 3 2 5 5 5Z" },
  { t: "PEOPLE SAFE", d: "No harsh fumes, no toxic residue on siding, walkways, or anywhere near the people living in the house.", icon: "M12 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-6 13c0-3.5 2.7-6 6-6s6 2.5 6 6" },
  {
    t: "SHINGLE SAFE",
    d: "Low pressure and no scrubbing means no granule loss from the cleaning itself. Granule loss comes only from what it removes.",
    icon: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z",
  },
];

function Safety() {
  return (
    <section id="safety" className="bg-palecyan py-24 md:py-32">
      <div className="shell">
        <div className="mb-12 text-center">
          <p className="eyebrow">SAFE AROUND YOUR HOME</p>
          <h2 className="mx-auto mt-4 max-w-[900px] text-4xl text-navy md:text-5xl">FOUR REASONS HOMEOWNERS CHOOSE US.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY.map((s, i) => (
            <article key={s.t} className="safety-card reveal rounded-2xl bg-white p-7" data-reveal-delay={i * 90}>
              <svg viewBox="0 0 24 24" className="safety-card-icon h-9 w-9 text-green" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d={s.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="mt-5 text-lg text-navy">{s.t}</h3>
              <p className="mt-2 text-[16px] text-navy/70">{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. THE MATH                                                        */
/* ------------------------------------------------------------------ */

function Lifespan() {
  return (
    <section id="math" className="bg-white py-24 md:py-32">
      <div className="shell">
        <p className="eyebrow">THE MATH</p>
        <h2 className="mt-4 text-4xl text-navy md:text-5xl">SHINGLE LIFESPAN COMPARISON</h2>
        <p className="mt-3 text-navy/55">Based on a 20-year rated shingle</p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <figure className="lifespan-card reveal overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-navy/10">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img src={IMG.roofNeglected} alt="Roof covered in moss and black algae streaks" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-navy/80 to-transparent p-5 pb-10">
                <p className="font-display text-lg font-extrabold text-white md:text-xl">Neglected: moss and black streaks left untreated</p>
              </div>
            </div>
            <figcaption className="border-t-4 border-clay bg-navy p-5 text-center">
              <p className="font-display text-3xl font-extrabold text-white md:text-4xl">LOSE 10 YEARS</p>
            </figcaption>
          </figure>

          <figure className="lifespan-card reveal overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-navy/10" data-reveal-delay={120}>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img src={IMG.roofMaintained} alt="Professionally cleaned roof in like-new condition" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-navy/80 to-transparent p-5 pb-10">
                <p className="font-display text-lg font-extrabold text-white md:text-xl">Cleaned properly: full rated life reached</p>
              </div>
            </div>
            <figcaption className="border-t-4 border-green bg-navy p-5 text-center">
              <p className="font-display text-3xl font-extrabold text-white md:text-4xl">GAIN 10 YEARS</p>
            </figcaption>
          </figure>
        </div>

        <p className="mt-6 text-sm italic text-navy/50">Illustrative comparison. Not photographs of the same roof.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. OFFER                                                           */
/* ------------------------------------------------------------------ */

const CLEAN = [
  "Environmentally safe, low-pressure wash",
  "Removes streaks, moss, algae, lichen & dirt",
  "Restores your roof's original look, same day",
  "No bleach, no phosphates, no pressure damage",
  "Safe for pets, plants, people and shingles",
];

function Offer() {
  const [showRestoreDetails, setShowRestoreDetails] = useState(false);

  return (
    <section id="services" className="bg-navy py-24 md:py-32">
      <div className="shell">
        <article className="service-card service-card-featured reveal mx-auto max-w-3xl rounded-2xl border-t-4 border-green bg-white p-8 shadow-[0_28px_60px_-24px_rgba(18,58,92,0.7)] md:p-12">
          <span className="inline-block rounded-full bg-green/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-green">Our core service</span>
          <h3 className="mt-5 text-4xl text-navy md:text-5xl">Roof Shampoo</h3>
          <p className="mt-4 text-lg text-navy/75">A full non-bleach clean, included in every job.</p>
          <ul className="mt-8 space-y-4">
            {CLEAN.map((t) => (
              <li key={t} className="flex gap-3 text-navy/85">
                <Check />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <button className="btn-green mt-9 px-8 py-4 tracking-wide" onClick={() => scrollToId("quote")}>
            GET A QUOTE NOW
          </button>
        </article>

        <div className="service-card reveal mx-auto mt-8 max-w-3xl rounded-xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm" data-reveal-delay={140}>
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.15em] text-cyan">Ask about the add-on</p>
          <p className="mt-2 text-[#D7E2EC]">
            <strong className="text-white">Restore</strong> is an optional plant-based treatment that resoaks the shingle in the oils sun and weather dry out,
            rebuilding flexibility and sealing the surface so your clean lasts longer. Worth asking your technician about while we're on site.
          </p>
          <button
            type="button"
            className="restore-learn-more mt-4"
            aria-expanded={showRestoreDetails}
            onClick={() => setShowRestoreDetails((visible) => !visible)}
          >
            {showRestoreDetails ? "Hide details" : "Learn more"}
          </button>
          {showRestoreDetails && (
            <p className="restore-details mt-3 text-sm text-[#D7E2EC]">
              Restore is an optional plant-based oil treatment that helps recondition shingles, improve flexibility, and extend the life of a clean roof.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  9. GUARANTEE                                                       */
/* ------------------------------------------------------------------ */

function Guarantee() {
  return (
    <section className="bg-palecyan py-20 text-center md:py-28">
      <div className="shell">
        <p className="font-display text-[clamp(3.5rem,12vw,8rem)] font-extrabold leading-none text-navy">10 Years</p>
        <h3 className="mt-4 text-2xl text-navy md:text-3xl">Guaranteed Results.</h3>
        <button className="btn-green mt-9 px-8 py-4 tracking-wide" onClick={() => scrollToId("quote")}>
          GET A QUOTE NOW
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  10. QUOTE FORM                                                     */
/* ------------------------------------------------------------------ */

function QuoteForm() {
  type QuoteField = "name" | "phone" | "email" | "address" | "details";
  const quoteFields: QuoteField[] = ["name", "phone", "email", "address", "details"];
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [detailsLength, setDetailsLength] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<QuoteField, string>>>({});

  const clearFieldError = (field: QuoteField) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      const nextErrors: Partial<Record<QuoteField, string>> = {};
      quoteFields.forEach((field) => {
        const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement | null;
        if (!input || input.validity.valid) return;
        if (input.validity.valueMissing) {
          nextErrors[field] = "This field is required.";
        } else if (input.validity.typeMismatch) {
          nextErrors[field] = "Enter a valid email address.";
        } else if (field === "phone" && input.validity.patternMismatch) {
          nextErrors[field] = "Enter a valid phone number with at least 10 digits.";
        } else if (input.validity.tooLong) {
          nextErrors[field] = "Keep this response to 300 characters or fewer.";
        } else {
          nextErrors[field] = "Please check this field and try again.";
        }
      });
      setFieldErrors(nextErrors);
      const firstInvalid = quoteFields.find((field) => nextErrors[field]);
      if (firstInvalid) {
        (form.elements.namedItem(firstInvalid) as HTMLInputElement | HTMLTextAreaElement | null)?.focus();
      }
      return;
    }
    if ((new FormData(form).get("company") as string)?.length) return; // honeypot
    // TODO: POST to your webhook / CRM endpoint here.
    setSubmitError("");
    setSubmitting(true);
    try {
      await new Promise<void>((resolve) => window.setTimeout(resolve, 600));
      setSent(true);
    } catch {
      setSubmitError("Please check your connection and try again. If the problem continues, call 724 201 6907.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-palecyan p-10 text-center md:p-14">
        <svg viewBox="0 0 24 24" className="mx-auto h-16 w-16 text-green" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
          <path d="m7 12.5 3.2 3.2L17 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="mt-6 text-2xl text-navy">Thanks. We've got it.</h3>
        <p className="mt-3 text-navy/75">We'll be in touch within one business day with your free quote.</p>
      </div>
    );
  }

  const field = "mt-2 w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-navy outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/25";
  const label = "block text-sm font-semibold text-navy";

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-palecyan p-7 md:p-10">
      <div className="space-y-5">
        <div>
          <label className={label} htmlFor="name">Full Name</label>
          <input id="name" name="name" required autoComplete="name" className={`${field} ${fieldErrors.name ? "quote-field-invalid" : ""}`} aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "name-error" : undefined} onChange={() => clearFieldError("name")} />
          {fieldErrors.name && <p id="name-error" className="quote-field-error">{fieldErrors.name}</p>}
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel" pattern="(?=(?:.*[0-9]){10,})[0-9 ()+.-]+" title="Enter a phone number with at least 10 digits" className={`${field} ${fieldErrors.phone ? "quote-field-invalid" : ""}`} aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? "phone-error" : undefined} onChange={() => clearFieldError("phone")} />
          {fieldErrors.phone && <p id="phone-error" className="quote-field-error">{fieldErrors.phone}</p>}
        </div>
        <div>
          <label className={label} htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={`${field} ${fieldErrors.email ? "quote-field-invalid" : ""}`} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "email-error" : undefined} onChange={() => clearFieldError("email")} />
          {fieldErrors.email && <p id="email-error" className="quote-field-error">{fieldErrors.email}</p>}
        </div>
        <div>
          <label className={label} htmlFor="address">Property Address</label>
          <input id="address" name="address" required autoComplete="street-address" className={`${field} ${fieldErrors.address ? "quote-field-invalid" : ""}`} aria-invalid={Boolean(fieldErrors.address)} aria-describedby={fieldErrors.address ? "address-error" : undefined} onChange={() => clearFieldError("address")} />
          {fieldErrors.address && <p id="address-error" className="quote-field-error">{fieldErrors.address}</p>}
        </div>
        <div>
          <label className={label} htmlFor="details">What's going on with your roof?</label>
          <textarea
            id="details"
            name="details"
            rows={4}
            required
            maxLength={300}
            onChange={(event) => {
              setDetailsLength(event.currentTarget.value.length);
              clearFieldError("details");
            }}
            aria-invalid={Boolean(fieldErrors.details)}
            aria-describedby={`details-help details-count${fieldErrors.details ? " details-error" : ""}`}
            placeholder="Black streaks, moss, general cleaning, or whatever you've noticed"
            className={`${field} ${fieldErrors.details ? "quote-field-invalid" : ""}`}
          />
          <div className="quote-details-meta mt-2">
            <span id="details-help">Please tell us what you have noticed about your roof.</span>
            <span id="details-count" aria-live="polite">{detailsLength}/300</span>
          </div>
          {fieldErrors.details && <p id="details-error" className="quote-field-error">{fieldErrors.details}</p>}
        </div>

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        {submitError && (
          <div className="quote-form-error" role="alert">
            <strong>We couldn't send your request.</strong>
            <span>{submitError}</span>
          </div>
        )}

        <button
          type="submit"
          className="btn-green quote-submit-button w-full py-4 text-base tracking-wide"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? (
            <>
              <span className="quote-submit-spinner" aria-hidden="true" />
              Submitting...
            </>
          ) : (
            "GET MY FREE QUOTE"
          )}
        </button>
        <p className="text-center text-sm text-navy/55">We'll never share your details.</p>
      </div>
    </form>
  );
}

function Quote() {
  return (
    <section id="quote" className="bg-white py-24 pb-32 md:py-32">
      <div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-4xl text-navy md:text-5xl">SAVE YOUR ROOF. SAVE YOUR MONEY.</h2>
          <p className="mt-5 text-navy/80">Free quote, no obligation. Guaranteed results.</p>
          <ul className="mt-8 space-y-4">
            {["No obligation, no pressure", "Serving Greensburg and surrounding areas", "Response within one business day"].map((t) => (
              <li key={t} className="flex gap-3 text-navy/85">
                <Check />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-9 text-navy">
            Prefer to talk?{" "}
            <a href={TEL} className="inline-flex items-center gap-2 font-semibold text-cyan">
              <PhoneIcon />
              {PHONE}
            </a>
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  11. CLOSING CTA + FOOTER + MOBILE BAR                              */
/* ------------------------------------------------------------------ */

function ClosingCta() {
  return (
    <section className="bg-navy py-24 text-center md:py-28">
      <div className="shell">
        <h2 className="mx-auto max-w-2xl text-3xl text-white md:text-4xl">Ready for a roof that looks new again?</h2>
        <p className="mt-4 text-[#B9CBDB]">Free quote, no obligation. Guaranteed results.</p>
        <div className="mt-8">
          <button className="btn-green px-8 py-4 tracking-wide" onClick={() => scrollToId("quote")}>GET A QUOTE NOW</button>
        </div>
        <p className="mt-5 text-sm text-white/80">
          Or call{" "}
          <a href={TEL} className="font-semibold underline underline-offset-4">{PHONE}</a>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-transparent py-14 text-navy">
      <div className="shell flex flex-col items-center gap-6 text-center">
        <img src={IMG.siteLogo} alt="SaveYourRoof.com" className="h-auto w-[184px] object-contain md:w-[224px]" />
        <p className="font-display text-lg font-extrabold text-navy">Clean · Restore · Save $</p>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV.map((item) => (
            <button key={item.id} onClick={() => scrollToId(item.id)} className="text-sm text-navy/70 hover:text-navy">
              {item.label}
            </button>
          ))}
        </nav>
        <a href={TEL} className="flex items-center gap-2 font-semibold text-navy">
          <PhoneIcon className="h-4 w-4 text-navy" />
          {PHONE}
        </a>
        <p className="text-xs text-navy/60">© 2026 Save Your Roof. All Rights Reserved</p>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-white/10 bg-navy/95 p-3 backdrop-blur md:hidden">
      <button className="btn-green flex-1 py-3" onClick={() => scrollToId("quote")}>Get a Quote</button>
      <a href={TEL} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/70 py-3 font-semibold text-white">
        <PhoneIcon className="h-4 w-4 text-white" />
        Call Now
      </a>
    </div>
  );
}

/** Publishes the fixed header's height as --header-h so the hero starts below it. */
function useHeaderOffset() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("header");
    if (!header) return;
    const update = () => document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function SaveYourRoof() {
  useReveal();
  useHeaderOffset();

  return (
    <div className="min-h-screen bg-white pb-[72px] md:pb-0">
      <Header revealed />
      <main>
        <Hero />
        <WhyBand />
        <Problem />
        <Difference />
        <HowItWorks />
        <Safety />
        <Lifespan />
        <Offer />
        <Guarantee />
        <Quote />
        <ClosingCta />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}

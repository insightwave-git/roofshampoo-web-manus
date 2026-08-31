import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

/* ========================================================================
   SAVEYOURROOF.COM — Roof Shampoo landing page
   Single-file React component. Requires Tailwind CSS.
   Paste the accompanying styles into your global stylesheet.
   ======================================================================== */

/* ------------------------------------------------------------------ */
/*  CONFIG — edit these                                                */
/* ------------------------------------------------------------------ */

const PHONE = "(724) 555-0143";
const TEL = "tel:+17245550143";

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

const HERO_MS = {
  dirtyHold: 1200,
  fade: 1800,
  cleanHold: 400,
  logoSpin: 1000,
} as const;

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
          <img src={IMG.siteLogo} alt="SaveYourRoof.com" className="h-12 w-auto md:h-14 object-contain" />
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
/*  1. HERO — dirty roof fades to clean, then Roof Shampoo lockup      */
/* ------------------------------------------------------------------ */

function Hero({ onIntroChange }: { onIntroChange: (done: boolean) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const timers = useRef<number[]>([]);
  const inViewRef = useRef(false);
  const [playId, setPlayId] = useState(0);
  const [fading, setFading] = useState(false);
  const [logoIn, setLogoIn] = useState(false);
  const [ctaIn, setCtaIn] = useState(false);
  const [skipMotion, setSkipMotion] = useState(false);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const snapDone = useCallback(() => {
    clearTimers();
    setFading(true);
    setLogoIn(true);
    setCtaIn(true);
    onIntroChange(true);
  }, [onIntroChange]);

  const resetIntro = useCallback(() => {
    clearTimers();
    setFading(false);
    setLogoIn(false);
    setCtaIn(false);
    onIntroChange(false);
  }, [onIntroChange]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSkipMotion(reduce);

    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const enough = entry.isIntersecting && entry.intersectionRatio >= 0.4;
        const gone = !entry.isIntersecting || entry.intersectionRatio < 0.15;

        if (enough && !inViewRef.current) {
          inViewRef.current = true;
          if (reduce) {
            snapDone();
            return;
          }
          setPlayId((n) => n + 1);
        } else if (gone && inViewRef.current) {
          inViewRef.current = false;
          resetIntro();
        }
      },
      { threshold: [0, 0.15, 0.4, 0.6] },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      clearTimers();
    };
  }, [resetIntro, snapDone]);

  useEffect(() => {
    if (playId === 0 || skipMotion) return;

    resetIntro();

    const tFade = window.setTimeout(() => setFading(true), HERO_MS.dirtyHold);
    const tLogo = window.setTimeout(() => setLogoIn(true), HERO_MS.dirtyHold + HERO_MS.fade + HERO_MS.cleanHold);
    const tDone = window.setTimeout(
      () => {
        setCtaIn(true);
        onIntroChange(true);
      },
      HERO_MS.dirtyHold + HERO_MS.fade + HERO_MS.cleanHold + HERO_MS.logoSpin,
    );

    timers.current = [tFade, tLogo, tDone];
    return () => clearTimers();
  }, [playId, skipMotion, resetIntro, onIntroChange]);

  return (
    <section ref={sectionRef} id="top" className="hero-cinematic relative min-h-[100svh] overflow-hidden bg-navy-deep">
      <div className="absolute inset-0">
        <img
          src={IMG.beforeRoof}
          alt="Asphalt shingle roof heavily stained with black algae streaks before cleaning"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={IMG.afterRoof}
          alt="The same roof clean and streak-free after a Roof Shampoo treatment"
          className={`hero-clean absolute inset-0 h-full w-full object-cover ${fading ? "is-fading" : ""}`}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/15 to-transparent" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
        <div className={`hero-lockup text-center ${logoIn ? "is-in" : ""}`}>
          <div className="hero-mascot-frame">
            <img
              src={IMG.mascot}
              alt="SaveYourRoof.com"
              className="hero-mascot mx-auto h-auto w-full"
            />
          </div>
          <p className="hero-mascot-tagline">CLEAN · RESTORE · SAVE $</p>
        </div>

        <div className={`hero-cta mt-8 ${ctaIn ? "is-in" : ""}`}>
          <button
            type="button"
            className="btn-green px-6 py-3 text-sm tracking-wide md:text-[15px]"
            onClick={() => scrollToId("quote")}
          >
            Get a Quote
          </button>
        </div>
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
  { t: "Clean the same day.", d: "Streaks, moss, algae and lichen gone — and your roof looks the way it should." },
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
    <section id="problem" className="relative overflow-hidden bg-navy-deep py-24 md:py-32">
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
          One where dirt, moss, and algae quietly cut its life short. One where it's cleaned properly — and lives out every year it was built for.
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
          Left alone, these accelerate granule loss, UV degradation, and shingle curling &amp; cracking — cutting years off a roof that should have lasted
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
      "Granules are the roof's UV protection — losing them shortens its life",
      "Can void a manufacturer's shingle warranty",
      "Forces water under shingles and into the roof deck",
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
  {
    name: "Roof Shampoo",
    tag: "What we do",
    good: true,
    points: [
      "Low-pressure application — nothing is blasted, scrubbed or stripped",
      "No bleach, no phosphates, no harsh chemicals of any kind",
      "Breaks down organic growth, then breaks down itself",
      "Safe for pets, plants, people and the shingles underneath",
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
          Most roof cleaning either damages the shingle or damages everything around it. Roof Shampoo was built to do neither — tough on algae, moss and lichen,
          and nothing else.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {METHODS.map((m, i) => (
            <article
              key={m.name}
              className={`reveal rounded-2xl p-8 ${
                m.good
                  ? "border-t-4 border-green bg-offwhite shadow-[0_28px_60px_-28px_rgba(18,58,92,0.6)] lg:-mt-4"
                  : "border-t-4 border-navy/15 bg-white ring-1 ring-navy/10"
              }`}
              data-reveal-delay={i * 120}
            >
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
  { n: "03", t: "RINSE", d: "Gentle rinse clears residue — no pressure-washer damage, no runoff left behind." },
  { n: "04", t: "RESTORE — THE ADD-ON", d: "An optional plant-based oil treatment resoaks the shingle, rebuilding flexibility and sealing out water." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-offwhite py-24 md:py-32">
      <div className="shell">
        <div className="text-center">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 className="mx-auto mt-4 max-w-[900px] text-4xl text-navy md:text-5xl">GENTLE ON YOUR ROOF. SAFE FOR EVERYTHING AROUND IT.</h2>
          <div className="mx-auto mt-7 max-w-[820px] space-y-5 text-navy/80">
            <p>
              Our wash is a soft, low-pressure application — no scrubbing, no brushing, no harsh chemicals that strip your shingles or run off into your yard.
              It's built to be tough on algae, moss, and lichen, and nothing else.
            </p>
            <p>
              No bleach. No phosphates. Once it's done its job breaking down organic growth, the solution breaks down itself — it doesn't linger in your gutters,
              your soil, or your grass.
            </p>
          </div>
        </div>

        <img
          src={IMG.softWashTech}
          alt="Technician on a residential shingle roof applying a low-pressure soft wash with a wand"
          loading="lazy"
          className="mt-14 h-[300px] w-full rounded-2xl object-cover md:h-[440px]"
        />

        <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.n} className="reveal" data-reveal-delay={i * 120}>
              <span
                className={`font-display text-5xl font-extrabold md:text-6xl ${i === 3 ? "text-green" : "text-cyan"}`}
                style={{ WebkitTextStroke: "1.5px currentColor", color: "transparent" }}
                aria-hidden="true"
              >
                {s.n}
              </span>
              <h3 className="mt-4 text-lg text-navy">{s.t}</h3>
              <p className="mt-2 text-[16px] text-navy/70">{s.d}</p>
            </li>
          ))}
        </ol>
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
    d: "Low pressure and no scrubbing means no granule loss from the cleaning itself — only from what it removes.",
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
            <article key={s.t} className="reveal rounded-2xl bg-white p-7" data-reveal-delay={i * 90}>
              <svg viewBox="0 0 24 24" className="h-9 w-9 text-green" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
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
          <figure className="reveal overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-navy/10">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img src={IMG.roofNeglected} alt="Roof covered in moss and black algae streaks" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-navy/80 to-transparent p-5 pb-10">
                <p className="font-display text-lg font-extrabold text-white md:text-xl">Neglected — moss &amp; black streaks left untreated</p>
              </div>
            </div>
            <figcaption className="border-t-4 border-clay bg-navy p-5 text-center">
              <p className="font-display text-3xl font-extrabold text-white md:text-4xl">−10 Years</p>
            </figcaption>
          </figure>

          <figure className="reveal overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-navy/10" data-reveal-delay={120}>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img src={IMG.roofMaintained} alt="Professionally cleaned roof in like-new condition" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-navy/80 to-transparent p-5 pb-10">
                <p className="font-display text-lg font-extrabold text-white md:text-xl">Cleaned properly — full rated life reached</p>
              </div>
            </div>
            <figcaption className="border-t-4 border-green bg-navy p-5 text-center">
              <p className="font-display text-3xl font-extrabold text-white md:text-4xl">Full Term Reached</p>
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
  return (
    <section id="services" className="bg-navy py-24 md:py-32">
      <div className="shell">
        <article className="reveal mx-auto max-w-3xl rounded-2xl border-t-4 border-green bg-white p-8 shadow-[0_28px_60px_-24px_rgba(18,58,92,0.7)] md:p-12">
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

        <div className="reveal mx-auto mt-8 max-w-3xl rounded-xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm" data-reveal-delay={140}>
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.15em] text-cyan">Ask about the add-on</p>
          <p className="mt-2 text-[#D7E2EC]">
            <strong className="text-white">Restore</strong> — an optional plant-based treatment that resoaks the shingle in the oils sun and weather dry out,
            rebuilding flexibility and sealing the surface so your clean lasts longer. Worth asking your technician about while we're on site.
          </p>
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
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if ((new FormData(form).get("company") as string)?.length) return; // honeypot
    // TODO: POST to your webhook / CRM endpoint here.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-palecyan p-10 text-center md:p-14">
        <svg viewBox="0 0 24 24" className="mx-auto h-16 w-16 text-green" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
          <path d="m7 12.5 3.2 3.2L17 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="mt-6 text-2xl text-navy">Thanks — we've got it.</h3>
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
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="address">Property Address</label>
          <input id="address" name="address" required autoComplete="street-address" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="details">What's going on with your roof?</label>
          <textarea id="details" name="details" rows={4} placeholder="Black streaks, moss, general cleaning — whatever you've noticed" className={field} />
        </div>

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <button type="submit" className="btn-green w-full py-4 text-base tracking-wide">GET MY FREE QUOTE</button>
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
        <img src={IMG.siteLogo} alt="SaveYourRoof.com" className="h-14 w-auto object-contain" />
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

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function SaveYourRoof() {
  useReveal();
  const [headerIn, setHeaderIn] = useState(false);
  const onIntroChange = useCallback((done: boolean) => setHeaderIn(done), []);

  return (
    <div className="min-h-screen bg-white pb-[72px] md:pb-0">
      <Header revealed={headerIn} />
      <main>
        <Hero onIntroChange={onIntroChange} />
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

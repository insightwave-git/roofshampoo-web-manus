# SaveYourRoof.com — Design Direction

## Three stylistic approaches

### Approach 1 — Industrial Eco-Utility

A confident home-services identity that pairs deep roof-slate navy with fresh green action cues, cyan technical accents, and documentary photography. It should feel practical, trustworthy, and environmentally responsible rather than ornamental.

**Probability:** 0.07

### Approach 2 — Quiet Craftsman Ledger

A warmer, editorial direction built from mineral neutrals, paper-like surfaces, restrained serif typography, and detailed before/after storytelling. It would feel like a trusted local craft studio with a premium print sensibility.

**Probability:** 0.03

### Approach 3 — Cleanline Field Manual

A bright, highly legible service brand with off-white panels, structured diagrams, field-note labels, and precise utility typography. It would prioritize clarity and process education with a slightly technical inspection-report tone.

**Probability:** 0.08

## Chosen approach: Industrial Eco-Utility

### Design Movement

Contemporary utility branding with a restrained industrial editorial sensibility: field documentation, material close-ups, strong typographic hierarchy, and purposeful color coding.

### Core Principles

1. **Trust is visible.** Use real-feeling roof photography, clear comparisons, and direct copy instead of decorative claims.
2. **Care over force.** Pair deep structural navy with calm spacing and soft transitions to communicate controlled, non-destructive treatment.
3. **Color has a job.** Green signals action and healthy restoration; cyan marks technical guidance; navy anchors confidence and expertise.
4. **Every section earns its place.** Favor clear narrative progression—problem, difference, process, safety, result, quote—over generic card grids.

### Color Philosophy

Deep navy is the roofline and the promise of competence. Cyan functions like a measurement mark or technician’s annotation, guiding attention without competing with the message. Fresh green represents living landscapes and renewal, making it the natural CTA color. White and pale cyan create breathing room between evidence-heavy sections, while clay is reserved for contrast when the copy describes what should be avoided.

### Layout Paradigm

Use a vertical service narrative with wide, image-led bands and asymmetric content blocks. The hero is a split-screen before/after diptych; subsequent sections alternate full-bleed navy fields, narrow reading columns, comparison panels, process rails, and a focused quote form. Avoid a repeated centered card wall by letting imagery, labels, and section edges create rhythm.

### Signature Elements

- A before/after split with a crisp vertical divider as the opening visual proof.
- Eyebrow labels and numbered condition cards styled like field annotations.
- Green action bars and cyan technical highlights against roof-slate navy surfaces.

### Interaction Philosophy

Interactions should feel deliberate and reassuring: buttons lift slightly on hover, navigation scrolls to the relevant evidence, and the quote form confirms completion with an in-place state rather than a disruptive route change. Motion is restrained and physical, never flashy.

### Animation

Use short ease-out transitions for buttons and navigation, with the existing scroll-reveal treatment for evidence sections. Stagger related items by roughly 80–110ms so the page reads as a sequence of observations. Respect reduced-motion preferences and keep all UI transitions under 300ms except the existing content reveal.

### Typography System

Use Manrope 800 for headings, labels, and decisive service language. Use Inter 400–600 for body copy, controls, phone numbers, and supporting explanations. Headlines are uppercase with tight tracking and short line lengths; body copy stays conversational and readable with a generous line height.

### Brand Essence

**Positioning:** A non-bleach roof-cleaning service for homeowners in Western Pennsylvania who want to extend the life of their roof without sacrificing their landscaping or shingles.

**Personality:** grounded, protective, exacting.

### Brand Voice

Headlines are direct, proof-oriented, and lightly declarative. CTAs remove hesitation and state the next useful action. Microcopy is candid about safety, process, and obligation—never inflated or vague.

Example headline: **"Clean it properly. Keep it longer."**

Example CTA: **"Get a clear quote for your roof."**

### Wordmark & Logo

Use a bold geometric roofline-and-leaf symbol with no text embedded in the mark. The roofline communicates protection and structure; the leaf is integrated into the silhouette rather than placed beside it, making the mark feel like one purposeful system.

### Signature Brand Color

**Roofline Green — `#3AB54A`.** It is vivid enough to own the CTA moment, but natural enough to connect roof care with healthy landscaping and long-term preservation.

## Integration decisions

- `SaveYourRoof.tsx` is copied into the project byte-for-byte and remains the main page component.
- `styles.css` is copied into the project byte-for-byte and remains the global stylesheet.
- Generated image assets stay in the managed web asset location and are referenced through stable storage URLs. A build-time bridge maps the component’s unchanged `/assets/...` paths to those managed URLs so the component contract and deployment asset policy can both be preserved.
- A project-level `assets/` directory is included for the requested asset manifest and future source handoff; the rendered files themselves are managed outside the project directory to avoid bundling/deployment timeouts.

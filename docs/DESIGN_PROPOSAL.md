# Bake and Brew — UI Design & Tech Stack Proposal

**Version:** 1.0 · **Date:** July 6, 2026 · **Scope:** Frontend/UI only (backend integration deferred)

Bake and Brew is a bakery + dine-in cafe website serving two audiences at once: customers ordering cakes and food online, and guests booking a table for the cafe experience. This document defines the visual design system, the UI concept and user flow for each of the five core features, the recommended tech stack, and the GitHub workflow.

Design decisions below were generated with the **ui-ux-pro-max** design-intelligence skill (the full machine-readable design system is persisted at `design-system/bake-and-brew/MASTER.md`) and animation specs follow the **framer-motion** skill's production patterns.

---

## 1. Design System

### 1.1 Visual Direction — "Warm Artisan"

Style: **Nature Distilled / Artisan Warmth** — muted earthy browns, handmade warmth, organic shapes, generous whitespace, high-quality food photography as the hero of every screen. This style scores best for artisan/organic food brands, is WCAG AA-friendly, and has excellent rendering performance (no heavy glass/blur effects).

What this looks like in practice:

- Light cream canvas, never pure white — feels like parchment/paper.
- Brown is the *brand* color (buttons, headings, accents); photography provides the appetite appeal.
- Soft, organic border radii (`rounded-2xl` on cards, `rounded-full` on pills/CTAs).
- Subtle grain/texture overlay (~8% opacity) on hero sections for a handmade feel.
- Soft, warm shadows (`shadow-[0_4px_20px_rgba(120,53,15,0.08)]`) — never harsh gray shadows.

### 1.2 Color Palette (Light Theme, Brown Primary)

Base palette from the skill's Bakery/Cafe entry (`#92400E` warm brown + cream), extended into a full token scale:

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#92400E` | Primary buttons, links, active states, brand accents |
| `--color-primary-hover` | `#7C3608` | Button hover (darken, don't scale) |
| `--color-secondary` | `#B45309` | Secondary accents, tags, highlights |
| `--color-caramel` | `#C67B5C` | Illustration accents, cake simulator UI |
| `--color-background` | `#FDF6EC` | Page background (warm cream) |
| `--color-surface` | `#FFFBF5` | Cards, modals, elevated surfaces |
| `--color-sand` | `#F0E2CE` | Section alternation bands, input backgrounds |
| `--color-border` | `#E7D5BF` | Card borders, dividers (visible on cream, unlike gray-100) |
| `--color-text` | `#3D2314` | Headings & body (espresso — 12.9:1 contrast on cream) |
| `--color-text-muted` | `#78350F` | Secondary text, captions (5.9:1 — passes AA) |
| `--color-cta-text` | `#FFFBF5` | Text on primary buttons |
| `--color-success` | `#4D7C4A` | Order confirmed, table booked (muted sage, stays in the earthy family) |
| `--color-error` | `#B3402A` | Validation errors (terracotta red, not neon) |

Contrast rules: body text always `#3D2314` or `#78350F` — never lighter browns on cream. Primary button `#92400E` with cream text = 8.1:1. All pairings pass WCAG AA.

### 1.3 Typography

Recommended pairing — **Lora + Raleway** (the skill's "Wellness Calm" pairing; its organic serif curves fit artisan food far better than a playful display font):

| Role | Font | Weights | Usage |
|---|---|---|---|
| Headings | **Lora** (serif) | 500–700 | Page titles, section headings, cake names, prices |
| Body/UI | **Raleway** (sans) | 400–600 | Body text, buttons, forms, navigation |

- Body: 16px minimum, `line-height: 1.6`, max 70ch line length.
- Display sizes: hero `clamp(2.5rem, 6vw, 4.5rem)`; section headings 32–40px.
- Tailwind config: `fontFamily: { serif: ['Lora', 'serif'], sans: ['Raleway', 'sans-serif'] }`.

*Alternative (more playful/indie):* Amatic SC + Cabin — the skill's top match for "handmade craft," but it reads more farmers-market than premium cafe. Lora/Raleway is the safer, more portfolio-polished choice.

### 1.4 Motion Language (Framer Motion)

Global rules, per the framer-motion skill:

- **Micro-interactions:** 150–300ms. Springs for interactive elements (`stiffness: 400, damping: 17`), tweens with `ease: [0.16, 1, 0.3, 1]` for scroll entrances.
- **Scroll reveals:** `whileInView` + `viewport={{ once: true, amount: 0.1 }}` — every section fades up 24px as it enters.
- **Staggered grids:** parent/child `variants` with `staggerChildren: 0.08` — cards cascade in, never pop in all at once.
- **Shared-element transitions:** `layoutId` to morph a cake card image into its detail view.
- **Exit animations:** `AnimatePresence` for modals, drawers, and step transitions (`mode="wait"` for wizard steps).
- **Performance:** animate only `transform`/`opacity`; `useMotionValue` for anything frame-by-frame (drag, scroll-linked); never animate `width/height/box-shadow`.
- **Accessibility:** every animated component checks `useReducedMotion()` and degrades to opacity-only. No infinite decorative animations.

### 1.5 Global Layout

- **Navbar:** floating pill navbar (`top-4`, inset from edges, `bg-surface/90 backdrop-blur`), logo left, links center (Cakes · Menu · Custom Cake · Book a Table), cart button right with an animated item-count badge (spring scale on add). Collapses to a hamburger + slide-in drawer (`AnimatePresence`) on mobile.
- **Hero:** full-bleed bakery photography with cream gradient overlay, Lora headline ("Baked with love, brewed with care"), two CTAs — *Order Cakes* (solid brown) and *Book a Table* (outlined). Headline words stagger in on load; a subtle `useScroll` parallax drifts the image.
- **Section rhythm:** cream → sand → cream alternating bands, 96px+ vertical gaps, scroll progress bar (`scaleX: scrollYProgress`) in brown at the very top.
- **Footer:** dark espresso (`#3D2314`) with cream text — hours, location map embed, socials. (The skill flags "hidden hours" as the #1 cafe-site anti-pattern — hours live in the footer of every page *and* the booking page.)
- **Cart:** slide-in drawer from the right (spring), shared across cake orders and food delivery; line items animate in/out with `AnimatePresence mode="popLayout"`.

---

## 2. Feature UI Concepts

### 2.1 Cake Cards (Browse → Order/Book)

**Route:** `/cakes` · **Flow:** browse grid → filter → card → detail → order (delivery/pickup) or book (date for occasion)

- **Grid:** responsive 1/2/3-column card grid. Each card: 4:3 photo, Lora cake name, one-line description, price, and two actions — **Order Now** (solid) and **Book for a Date** (outline). Category filter pills above (Birthday · Wedding · Cheesecakes · Vegan…) — active pill slides between options via a `layoutId` underline.
- **Hover** (desktop): image scales to 1.05 *inside* its overflow-hidden frame (no layout shift), card lifts via `y: -6`, and a quick-add button fades in over the photo. Cursor: pointer on the whole card.
- **Entrance:** cards stagger in (`staggerChildren: 0.08`) as the grid scrolls into view; filtering re-triggers a soft crossfade re-stagger with `AnimatePresence mode="popLayout"` so removed cards animate out and the grid reflows smoothly (`layout` prop).
- **Detail:** clicking a card opens a detail view where the card photo morphs into the hero image via `layoutId="cake-{id}"` — the signature transition of the site. Detail shows a gallery, full description, allergens, size/serving selector, and quantity stepper.
- **Order vs Book:** *Order Now* adds to cart (button briefly shows a spring checkmark; navbar badge pulses). *Book for a Date* opens a small `AnimatePresence` modal with a date picker + occasion note, for advance-ordering occasion cakes.
- **Loading:** skeleton cards (cream shimmer) reserve space — no content jumping.

### 2.2 Custom Photo Print Cake

**Route:** `/photo-cake` · **Flow:** upload → position/preview → choose base → details → add to cart

- **Step 1 — Upload:** large dashed drop zone (sand background, upload icon from Lucide). Drag-over state tints it caramel and scales 1.02. On file drop, an upload progress bar fills (`scaleX` origin-left), then the zone collapses and the preview stage expands in its place.
- **Step 2 — Live preview:** the photo is rendered *on a cake mock* — a top-down round/rectangular cake frame (SVG/CSS) with the image clipped inside and a soft radial highlight so it reads as "printed on frosting," not a plain `<img>`. The user can **drag to reposition** (`drag` + `dragConstraints` on a `useMotionValue`-driven layer — zero re-renders) and pinch/slider to zoom. Shape toggle (round ⟷ rectangle) morphs the clip mask with a `layout` animation.
- **Step 3 — Base options:** compact selector row beneath the preview — size (6"/8"/10"), flavor, border frosting color (brown/cream/pink swatches). Each change nudges the preview with a tiny spring scale (0.98 → 1) as feedback.
- **Step 4 — Details & order:** message-on-cake text input (rendered live on the preview in a script font), date needed, quantity → price updates with an animated counter → **Add to Cart**.
- **Guidance & safety:** accepted formats/size stated up front; low-resolution images trigger an inline terracotta warning ("This photo may print blurry — we recommend at least 1000×1000px") near the problem, not a toast.

### 2.3 Food Delivery (Menu → Cart → Checkout)

**Route:** `/menu` · **Flow:** browse categories → add to cart → review drawer → delivery details → order placed

- **Layout:** sticky horizontal category bar (Breakfast · Sandwiches · Pastries · Coffee & Brews · Desserts) with a `layoutId` active-pill; clicking smooth-scrolls to the section. Two-column list per section: item rows with a square photo thumbnail, name, description, price, dietary tags (veg/vegan/nuts as small SVG-icon chips), and a **+ Add** button.
- **Add-to-cart micro-interaction:** the + button springs to a checkmark, a quantity stepper (− 1 +) expands in place (`layout` animation), and the navbar cart badge increments with a spring pop. Items with options (e.g., coffee size, milk) open a bottom-sheet on mobile / popover on desktop via `AnimatePresence`.
- **Cart drawer:** slide-in panel listing items with quantity steppers, per-line subtotals animating via animated counters, delivery-fee and total rows, and a persistent **Checkout** button. Removing an item animates it out with `mode="popLayout"` so the list closes rank smoothly.
- **Checkout (UI-only for now):** single page — address form, delivery time picker (ASAP or scheduled slots), order summary. Form built with clear labels, inline validation messages next to fields. On "Place Order," a full-screen success state: a circular checkmark draws itself (SVG `pathLength` 0 → 1), followed by order summary and a "track" placeholder for the future backend.
- **Empty/edge states designed up front:** empty cart illustration, item-unavailable badge, min-order notice pinned above the checkout button.

### 2.4 Table Booking

**Route:** `/book-a-table` · **Flow:** party size → date → time slot → details → confirmed

A calm, single-page vertical stepper (all steps visible, future steps de-emphasized until reached — less claustrophobic than a wizard for a 4-field task):

- **Step 1 — Party size:** row of pill buttons (1–8, "9+ call us"). Selected pill fills brown with a spring.
- **Step 2 — Date:** inline calendar (cream card), unavailable days dimmed, today outlined; month transitions slide horizontally with `AnimatePresence mode="wait"`.
- **Step 3 — Time:** grid of time-slot chips for the chosen date (12:00 · 12:30 · …), staggering in when the date changes; sold-out slots struck through and non-interactive. Lunch/dinner service groups labeled.
- **Step 4 — Details & confirm:** name, phone, email, occasion dropdown (birthday/anniversary adds a "we'll add a little treat" note), special requests textarea. Sticky summary card on desktop (right rail) updates live: "Table for 2 · Fri, Jul 10 · 7:30 PM."
- **Confirmation:** card flips/scales into a "You're booked!" state with the self-drawing checkmark, booking summary, add-to-calendar buttons, and cafe hours + map. (Hours visible here again — anti-pattern avoided.)
- Each completed step's header gains a small brown check; scrolling is assisted (auto-scroll to next step, respecting reduced motion).

### 2.5 Customize Cake Simulator (Signature Feature)

**Route:** `/cake-studio` · **Flow:** size & shape → layers & flavors → frosting → topper/finish → review → order

This is the portfolio centerpiece — an interactive configurator following the skill's "Interactive 3D Configurator" landing pattern (real-time preview center-stage, minimal UI overlay, sticky price bar).

- **Layout (desktop):** three zones — left: step navigation rail; center: the live cake preview on a soft studio backdrop; right: option panel for the current step. **Mobile:** preview pinned top (~45vh), options as swipeable bottom panel, sticky price bar above it.
- **The preview** is a layered 2.5D illustration (stacked SVG layers, not WebGL — fast, crisp, fully brand-styled):
  - Each cake tier is an SVG group; adding a layer drops it in with a spring (`y: -40 → 0`, slight squash-and-stretch on landing). Removing one animates it out via `AnimatePresence`.
  - Flavor changes crossfade the sponge fill color per tier (chocolate/vanilla/red velvet — a cutaway wedge shows inside layers).
  - Frosting choice (buttercream vs ganache) morphs the outer coat: buttercream = matte swirled texture, ganache = glossy drip edge that "pours" in with an animated SVG `pathLength` drip.
  - Size/shape (6"/8"/10", round/square) animates scale and border-radius with `layout`-style springs.
  - Toppers (berries, chocolate curls, candles, custom message, or a photo-print top — reusing the 2.2 upload component) pop on with a spring; message text renders live in script font.
- **Steps** transition in the option panel with `AnimatePresence mode="wait"` (slide + fade). Option choices are visual, never plain radio buttons: flavor swatches with color dots, frosting shown as texture thumbnails, shapes as outline icons.
- **Sticky order summary:** always-visible bar (bottom on mobile, right-rail card on desktop) with the running configuration ("8" round · 3 layers · chocolate · ganache · berries") and price that ticks via an animated counter on every change.
- **Finish:** review screen with the final preview centered (subtle celebratory scale-up), full spec list, date-needed picker → **Add to Cart**. Configuration state serializes to JSON — ready to POST to the future backend, and shareable as a URL param string.
- **Reduced motion:** all preview changes fall back to simple crossfades.

---

## 3. Tech Stack Proposal

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19** | The industry-standard React framework and the highest-signal frontend keyword on a resume. App Router file-based routing maps cleanly to our five feature routes; `next/image` handles the photography-heavy design (WebP, lazy loading, `priority` on hero); `loading.tsx` gives free skeleton states; and when the backend arrives, Server Actions/route handlers slot in without re-architecting. |
| Language | **TypeScript** | Effectively mandatory in 2026 job postings. The cake configurator's state (tiers, flavors, frosting, toppers) is exactly where a typed model prevents bugs — and a well-typed `CakeConfig` interface doubles as the future API contract. |
| Styling | **Tailwind CSS v4** | Design tokens from §1.2 become CSS theme variables consumed as utilities (`bg-primary`, `text-muted`). Fastest path to a consistent custom theme, and the most-asked-for styling skill alongside React. No fighting a component library's look — this design is too brand-specific for Material/Ant. |
| Components | **shadcn/ui (Radix primitives)** | Copy-in, fully themeable components for the hard accessibility problems — dialog, drawer, calendar, select, form fields — restyled to the brown/cream theme. Shows employers you build accessible UI without shipping a heavy UI-kit dependency. The ui-ux-pro-max skill has a dedicated shadcn stack profile for implementation guidance. |
| Animation | **Framer Motion (`motion` v12)** | Required by the brief and the right tool: `layoutId` shared-element transitions (cake card → detail), `AnimatePresence` exits, `whileInView` scroll reveals, drag gestures for the photo positioner, and MotionValues for 60fps preview updates. The installed framer-motion skill encodes the exact patterns from §1.4. |
| State | **Zustand** | One small store for the cart (shared by cakes + food delivery, persisted to `localStorage`) and one for the cake configurator. Simpler than Redux, more scalable than context-prop-drilling, and a recognizable modern choice in interviews. |
| Forms & validation | **React Hook Form + Zod** | Booking, checkout, and photo-cake forms with performant uncontrolled inputs and schema validation. Zod schemas later reuse as backend validation — a talking point for the "backend later" plan. |
| Icons | **Lucide React** | Consistent 24px SVG icon set (skill rule: never emoji icons). |
| Fonts | **next/font (Lora + Raleway)** | Self-hosted Google Fonts, zero layout shift. |
| Data (interim) | **Typed mock layer** (`/lib/data/*.ts` behind async functions) | Cakes, menu, and time slots served from typed mock modules with realistic latency — the UI is built against the same async interface the real API will implement, so backend swap-in is a one-file change. |
| Quality & deploy | **ESLint + Prettier, Vercel** | CI-linted commits; every push gets a live preview URL — ideal for a portfolio (recruiters click a link, not a repo). |

**Why this stack for the resume, in one line:** *Next.js + TypeScript + Tailwind + Framer Motion + shadcn/ui* is the exact stack of modern product frontends in 2026 — every item is a screening keyword, and the cake simulator gives you a differentiated, demo-able artifact most portfolios lack.

---

## 4. GitHub Contribution Strategy

Goal: a green contribution graph that reflects *real, reviewable* increments — not bulk dumps.

1. **Initialize immediately:** `git init` → first commit is the scaffold (Next.js + Tailwind + tokens) → push to a public `bake-and-brew` repo with a README containing screenshots/GIFs and the live Vercel link.
2. **One feature = one branch = one PR:** `feat/cake-cards`, `feat/cake-studio`, `feat/table-booking`… Merge via PR (even solo — self-reviewed PRs with descriptions read very well to recruiters browsing the repo).
3. **Commit small and often:** each commit is one working slice (a component, an animation, a fix) with **Conventional Commits** messages — `feat(menu): add category pill navigation with layoutId indicator`, `fix(cart): prevent layout shift on item removal`. Aim for a handful of commits per session rather than one end-of-day squash.
4. **Suggested milestone order** (each milestone = several PRs across days): ① scaffold + design tokens + navbar/footer/hero → ② cake cards + detail transition → ③ food menu + cart drawer → ④ table booking → ⑤ photo-print cake → ⑥ cake studio (largest — split into preview, steps, summary PRs) → ⑦ polish pass (reduced-motion audit, responsive QA at 375/768/1024/1440, Lighthouse).
5. **Make the graph honest:** push work-in-progress branches daily; use draft PRs. Tag releases (`v0.1-cards`, `v0.2-menu`) so progress is visible in the repo timeline, and keep the README's feature checklist updated per merge.

---

## 5. Pre-Delivery Quality Checklist (applies to every PR)

From the ui-ux-pro-max skill's checklist, adopted as our definition of done:

- [ ] No emojis as icons — Lucide SVGs only
- [ ] `cursor-pointer` + visible hover feedback on all interactive elements
- [ ] Transitions 150–300ms; hover states cause no layout shift
- [ ] Text contrast ≥ 4.5:1 (tokens in §1.2 guarantee this — don't invent lighter browns)
- [ ] Visible focus rings; keyboard-navigable modals/drawers (Radix gives this free)
- [ ] `useReducedMotion` respected in every animated component
- [ ] Images: `next/image` with alt text; `priority` only on the hero
- [ ] Responsive at 375 / 768 / 1024 / 1440 px; no horizontal scroll
- [ ] Skeletons/space reserved for async content — no jumping
- [ ] Cafe hours visible (footer + booking page) — never hidden

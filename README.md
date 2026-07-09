# Bake and Brew 🥐

An artisan bakery & cafe website — hand-crafted cakes, custom photo-print cakes, cafe food delivery, table booking, and an interactive cake design studio.

**🔗 Live demo: [bake-and-brew-jade.vercel.app](https://bake-and-brew-jade.vercel.app)**

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-v12-FF4D8D?logo=framer&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-live-000000?logo=vercel&logoColor=white)

**Design language:** light "Warm Artisan" theme — warm browns on cream, Lora + Raleway typography, and Framer Motion throughout. Full design rationale in [docs/DESIGN_PROPOSAL.md](docs/DESIGN_PROPOSAL.md).

## Features

- [x] Design system, layout shell, navbar, footer, animated hero *(milestone ①)*
- [x] Signature cake cards with shared-element detail transitions *(milestone ②)*
- [x] Cafe menu with cart & delivery checkout flow *(milestone ③)*
- [x] Table booking with calendar & time slots *(milestone ④)*
- [x] Custom photo-print cake with live draggable preview *(milestone ⑤)*
- [x] Cake Studio — interactive layer-by-layer cake configurator *(milestone ⑥)*

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (custom design tokens) |
| Animation | Motion (Framer Motion) v12 |
| State | Zustand (persisted cart + configurator) |
| Icons | Lucide React |
| Fonts | Lora + Raleway via `next/font` |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Accessibility & Quality

Every page targets WCAG AA contrast, visible focus states, keyboard navigation, and respects `prefers-reduced-motion`. The pre-delivery checklist lives in the [design proposal](docs/DESIGN_PROPOSAL.md#5-pre-delivery-quality-checklist).

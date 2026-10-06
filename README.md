# Hare Krishna — Janmashtami Wishes 🦚

A cinematic, interactive Krishna Janmashtami website: a moonlit Three.js sky,
a glowing Radha–Krishna hero illustration, floating petals and fireflies,
an interactive peacock feather, diyas you can light, a "Makhan Chor" matki,
a midnight countdown, a wishing form, and a story timeline of Krishna's life.

## Tech stack

React 18 + Vite, Three.js + React Three Fiber + Drei, Framer Motion, GSAP-ready,
Lucide icons. Plain CSS with design tokens (no CSS framework).

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/       All UI + 3D + interactive pieces
├── assets/
│   ├── images/        Optional real photos for the Gallery (see its README)
│   ├── models/         Optional GLB/GLTF 3D characters (see its README)
│   ├── audio/          Optional flute-loop.mp3 (see its README)
│   └── textures/        Optional extra Three.js textures
├── styles/            global.css (tokens), animations.css, responsive.css
├── App.jsx
└── main.jsx
```

## Notes on assets

The site is fully functional with **zero external assets**:

- The hero character art is a hand-drawn SVG (`DivineArt.jsx`), not a GLB
  model — see `src/assets/models/README.md` for how to swap in real 3D
  models later without touching anything else.
- The Gallery uses themed gradient placeholder tiles — see
  `src/assets/images/README.md` to swap in real photos.
- "Play Krishna's Flute" uses a browser-synthesized tone if no audio file
  is present — see `src/assets/audio/README.md` to add a real recording.

## Performance & accessibility

- The Three.js background is lazy-loaded and reduces particle/star counts
  automatically on small screens.
- `prefers-reduced-motion` is respected globally (see `global.css`).
- The custom cursor auto-disables on touch devices.
- Countdown defaults to tonight's Nishita Kaal (11:57 PM); pass a
  `target` Date prop to `<Countdown target={...} />` to point it at a
  specific year's muhurat.

## Customizing colors & type

All design tokens live at the top of `src/styles/global.css`
(`--midnight`, `--gold`, `--peacock`, `--pink`, `--purple`, `--diya-orange`,
font families, etc.) — change them there to re-theme the whole site.

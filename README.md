# Portfolio · Tomás Acosta

Personal portfolio of Tomás Acosta, full stack developer. Single-page, static site built to be fast and accessible.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4

## Features

- Instant first paint: no loading screen. The hero terminal is pure CSS animation, plays once per session, can be skipped with a click and is disabled with `prefers-reduced-motion`.
- Light and dark themes (follows the system, with a manual toggle and no flash on load).
- Fully static page, no runtime dependencies beyond React and Next.js, no video or heavy animation libraries.
- Responsive from small phones up.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing the content

Everything shown on the page (bio, links, projects and stack) lives in [`src/data/site.ts`](src/data/site.ts). To add a project screenshot or a live demo, set `image` (a file under `public/`) and `demo` on the project.

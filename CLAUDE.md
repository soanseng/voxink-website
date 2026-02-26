# VoxPen Website

## Project Overview

Landing page for VoxPen (語墨) — AI voice keyboard/dictation app.
Bilingual: Traditional Chinese (primary) + English.
Target market: Taiwan.

## Tech Stack

- **Build**: Vite 6
- **Language**: TypeScript 5 (strict mode)
- **UI**: React 19
- **Routing**: React Router v7
- **i18n**: react-i18next (route-based `/:lang/` + language switcher)
- **Styling**: Tailwind CSS v4
- **SSG**: vite-ssg (prerender all routes for SEO)
- **Lint**: ESLint + Prettier

## Architecture

- Static site, no server runtime
- Pages: Home (long scroll), Guide, Privacy, Download
- Routes: `/:lang/`, `/:lang/guide`, `/:lang/privacy`, `/:lang/download`
- `/` redirects to `/zh-tw/` or `/en/` based on browser language
- Platform detection via `navigator.userAgent` for smart download CTAs

## Key Directories

- `src/components/` — React components organized by feature (layout/, home/, ui/)
- `src/pages/` — Page-level components (Home, Guide, Privacy, Download)
- `src/i18n/` — Translation files (zh-tw.json, en.json)
- `src/hooks/` — Custom hooks (usePlatformDetect)
- `public/screenshots/` — Product screenshots for guide and marketing

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build (with SSG prerender)
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm format       # Run Prettier
```

## Design Decisions

- See `docs/plans/2026-02-25-landing-page-design.md` for full design document
- Tech stack chosen for consistency with voxpen-desktop (same Vite + React + Tailwind + react-i18next)
- Brand voice: Taiwanese local flavor (台語口語詞 in taglines)
- Privacy-first messaging: BYOK, zero collection, no VoxPen server

## Related Projects

- `~/projects/voxpen-android` — Android app (Kotlin, Jetpack Compose)
- `~/projects/voxpen-desktop` — Desktop app (Tauri v2, Rust + React)

## Conventions

- All UI text in translation files (zh-tw.json / en.json), never hardcoded
- Component files use PascalCase
- One component per file
- Tailwind classes only, no custom CSS unless absolutely necessary

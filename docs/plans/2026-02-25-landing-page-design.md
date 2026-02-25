# VoxInk Landing Page Design

Date: 2026-02-25

## Overview

VoxInk (語墨) landing page — a bilingual (繁中 + English) product website for the VoxInk AI voice keyboard/dictation app. Taiwan market first.

## Goals

1. **Conversion** — Drive downloads across Android, Windows, Linux
2. **Education** — Step-by-step Groq API setup guide
3. **Trust** — Highlight privacy-first BYOK architecture vs subscription services

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Build | Vite 6 | Consistent with voxink-desktop, fast HMR |
| Language | TypeScript 5 (strict) | Type safety, consistent with desktop |
| UI | React 19 | Consistent with desktop |
| Routing | React Router v7 | `/:lang/page` dynamic i18n routes |
| i18n | react-i18next | Consistent with desktop, same translation pattern |
| Styling | Tailwind CSS v4 | Consistent with desktop, utility-first |
| SSG | vite-ssg | Prerender all routes to static HTML for SEO |
| Lint | ESLint + Prettier | Standard frontend tooling |

**Why Vite + React (not Astro/Next.js):**
- voxink-desktop already uses Vite + React + Tailwind + react-i18next — zero learning cost
- Landing page doesn't need SSR; vite-ssg prerender covers SEO
- Simplest deployment: pure static files to Cloudflare Pages / GitHub Pages
- Fastest development speed with familiar toolchain

## Site Architecture

### Routes

```
/:lang/              → Homepage (long scroll)
/:lang/guide         → Groq API step-by-step tutorial
/:lang/privacy       → Privacy architecture + comparison
/:lang/download      → Full download page (all platforms)
```

- `/` root detects browser language, redirects to `/zh-tw/` or `/en/`
- Default fallback: `zh-tw` (Taiwan primary market)
- Language switcher on every page (繁中 ↔ English)
- `<link rel="alternate" hreflang="...">` for SEO cross-linking

### Visual Style

- **Clean & bright** — white background, soft colors, approachable
- Similar to Notion / Raycast aesthetic
- Taiwanese local flavor in copywriting

## Page Designs

### Homepage (long scroll)

**1. Navbar (sticky)**
- Logo (語墨 VoxInk) + nav links: 功能、教學、隱私、下載
- Language switcher (繁中 / EN)
- Scroll shadow + semi-transparent background

**2. Hero**
- Headline: **「出一支嘴，剩下交給語墨」**
- Subtitle: AI 語音輸入，支援 Android / Windows / Linux，用你自己的 API key
- Primary CTA: Platform-detected download button (e.g. "下載 Windows 版")
- Secondary CTA: "查看所有平台 →" → /download
- Product screenshot or illustration

**3. Features (3-4 cards)**
- 極速轉錄 — Groq Whisper, ~0.5s results
- 智慧潤飾 — AI removes filler words, auto-punctuates, fixes grammar
- 多語混打 — 繁中、English、日本語、mixed-language
- 檔案轉錄 — Audio/video → text, SRT subtitle export

**4. Privacy Highlight**
- Headline: **「你的聲音，只屬於你」**
- Three pillars with icons:
  - BYOK — Your own API key, no subscription
  - Zero data collection — No account, no tracking, no telemetry
  - Direct API connection — Voice goes straight to your provider
- CTA: "了解更多 →" → /privacy

**5. How It Works (5 steps)**
1. Get free API key at groq.com
2. Install VoxInk, paste API key
3. Enable VoxInk keyboard (Android) / press hotkey (Desktop)
4. Speak
5. Polished text output automatically
- CTA: "詳細教學 →" → /guide

**6. Platform Support**
- Three columns: Android / Windows / Linux
- Platform icon, brief description, download button each
- macOS marked "即將推出"

**7. Footer**
- Logo + one-line product description
- Links: GitHub, Privacy, Guide
- **「做佇台灣」** (tsò tī Tâi-oân)

### /guide — Groq API Tutorial

**1. Header**
- Title: 「五分鐘上手語墨」
- Subtitle: 從註冊 Groq 到開始語音輸入，完整圖文教學

**2. Step-by-step (with screenshots)**
- Step 1: Register Groq account (groq.com screenshots)
- Step 2: Get API key (console page walkthrough)
- Step 3: Install VoxInk (tabbed by platform: Android / Windows / Linux)
- Step 4: Configure API key (settings → paste → test connection)
- Step 5: Start using (platform-specific instructions)

**3. Cost Explanation**
- Groq free tier limits (daily quota, rate limits)
- Estimated monthly cost for typical usage (most users: free)

**4. FAQ**
- Forgot API key?
- Inaccurate recognition?
- Can I use OpenAI instead?
- What if network is down?

### /privacy — Privacy Architecture

**1. Header**
- Title: 「家己的聲音家己顧」
- Subtitle: VoxInk 的隱私架構，為什麼你的資料只屬於你

**2. VoxInk Privacy Architecture (diagram)**
- Data flow: Device → Direct API provider → Text response → Local storage
- Emphasis: No VoxInk server in the middle
- Three pillars detailed:
  - BYOK model
  - Zero collection
  - Local encrypted storage (Android Keystore / Tauri encrypted store)

**3. "Some voice input services" concerns (unnamed)**
- Generic description of subscription service data flow risks
- Common risks: voice routed through third-party servers, account binding, usage tracking
- External links to relevant discussions (Reddit, forums, news)

**4. Comparison Table**
- Columns: Data flow, Account required, Pricing model, Open source, Server intermediary
- Rows: VoxInk vs "Subscription voice services" vs "Offline solutions"
- VoxInk: green checkmarks across the board

### /download — Full Download Page

**1. Smart Detection Area**
- Detected platform shown first with large button + version number

**2. All Platforms**
- Android: Play Store + APK direct download + requirements (Android 8.0+)
- Windows: Installer download + requirements + install steps
- Linux: AppImage download + requirements + execution instructions
- macOS: "Coming soon"

**3. Version History**
- Current version + update date
- Link to GitHub Releases for full changelog

## Platform Detection Logic

```
navigator.userAgent →
├── Android → CTA: "下載 Android 版"
├── Windows → CTA: "下載 Windows 版"
├── Linux   → CTA: "下載 Linux 版"
└── macOS   → CTA: "下載桌面版" (→ /download)
```

## Project Structure

```
voxink-website/
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   └── screenshots/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Privacy.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── Platforms.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── LangSwitcher.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Guide.tsx
│   │   ├── Privacy.tsx
│   │   └── Download.tsx
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── zh-tw.json
│   │   └── en.json
│   ├── hooks/
│   │   └── usePlatformDetect.ts
│   └── utils/
│       └── seo.ts
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

## Deployment

- Static hosting: Cloudflare Pages or GitHub Pages (free)
- vite-ssg outputs pure HTML + JS + CSS
- No server runtime needed

## i18n Strategy

- First: Traditional Chinese (zh-tw) — primary market
- Second: English (en) — follow-up
- react-i18next with JSON translation files
- Route-based (`/:lang/`) + language switcher button
- `<html lang>` and `<link hreflang>` tags per page

## Brand Voice

- Taiwanese local flavor: 台語口語詞融入標語
- Hero: 「出一支嘴，剩下交給語墨」
- Privacy: 「家己的聲音家己顧」
- Footer: 「做佇台灣」
- Overall: 親切、幽默、有記憶點

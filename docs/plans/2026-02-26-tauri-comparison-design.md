# Tauri Comparison Page Design

Date: 2026-02-26

## Overview

Unified comparison page (`/:lang/compare`) combining Tauri lightweight tech advantages with privacy architecture comparison. Replaces the standalone Privacy page. Tells one complete story: "Why VoxInk?"

## Decisions

- **Placement**: Homepage LightweightBanner section + dedicated `/compare` page
- **Competitors**: Three-camp comparison (VoxInk Tauri vs Wispr Flow Electron vs Superwhisper Native Swift)
- **Visual style**: Homepage uses bar chart + 3 stat highlights; compare page uses three-column cards
- **Tone**: Homepage friendly/台語 flavor; compare page data-driven/technical
- **Android**: Section 1 (tech) is desktop-only; Section 2 (privacy) covers both platforms
- **Privacy merge**: Existing `/privacy` content moves into compare page Section 2; route redirects to `/compare`

## Homepage: LightweightBanner Component

**Position**: After Platforms section in Home.tsx

**Structure**:
- bg-gray-50 section, py-20 px-6
- Title: 「輕量到你毋敢相信」/ "Lightweight. Seriously."
- Subtitle: 「專業工具不需要是另一個瀏覽器」/ "Pro tools don't need to be browsers"
- Horizontal bar chart: VoxInk 10MB (emerald) vs Wispr Flow 350MB (gray)
- Three stat cards in grid-cols-3: ~10MB install / ~20MB RAM / <1s startup
- CTA link to /compare

## Compare Page: `/:lang/compare`

### Hero
- Title: 「為什麼選 VoxInk？」/ "Why VoxInk?"
- Subtitle: 「隱私、效能、價格——全面比較」/ "Privacy, performance, price — a full comparison"

### Section 1: Tech Lightweight (Desktop)

**Three-camp cards** (grid-cols-1 → lg:grid-cols-3):

| Dimension | Native Swift (Superwhisper) | Electron (Wispr Flow) | Tauri/Rust (VoxInk) |
|-----------|---------------------------|----------------------|---------------------|
| Install   | ~30MB                     | ~350MB               | ~10MB               |
| RAM idle  | ~100MB                    | ~800MB               | ~20MB               |
| Startup   | ~2s                       | 8-10s                | <1s                 |
| Platforms | macOS only                | Mac + Windows        | Mac + Win + Linux   |
| Security  | Swift                     | Node.js              | Rust                |

- VoxInk card: emerald border-2 + recommended badge
- Electron card: subtle red-50 background
- Native Swift card: neutral white

**Why the difference** (two-column explainer):
- Electron: bundles Chromium (~100MB) + Node.js (~30MB) = each app is a Chrome
- Tauri: uses system WebView (0MB extra) + Rust binary (~5MB) = native performance

**User quotes** (2-3 real Reddit/community complaints about Electron apps):
- "800MB RAM idle, drags down VS Code"
- "8-10s startup, fans spinning"
- "Why does every app need a built-in Chrome?"
- Conclusion: "This is why we chose Tauri."

### Section 2: Privacy Architecture (All Platforms)

Emphasizes "consistent privacy across Android + Desktop".

**Data flow diagram**:
- Your Device → Direct to AI Provider → Text Response → Local Storage
- "No VoxInk server ever touches your data"

**Three pillars** (from existing privacyPage content):
- BYOK (Bring Your Own Key)
- Zero Collection Policy
- Local Encrypted Storage (Android Keystore + Tauri encrypted store)

**Competitor privacy concerns** (from existing privacyPage.concerns):
- Voice routed through service provider servers
- Account + payment info required
- Usage tracking for "improvement"
- Potential server-side caching

**Privacy comparison table** (from existing privacyPage.comparison, enhanced):

| Feature             | VoxInk                        | Subscription Services    | Offline Solutions |
|---------------------|-------------------------------|--------------------------|-------------------|
| Data Flow           | Device → AI (direct)          | Device → Server → AI     | All on device     |
| Account Required    | No                            | Yes                      | No                |
| Pricing             | BYOK (free tier available)    | $10-30/month             | One-time purchase |
| Open Source         | Desktop: yes                  | No                       | Partial           |
| Server Intermediary | No                            | Yes                      | No                |
| Recognition Quality | Cloud AI (high quality)       | Cloud AI (high quality)  | Local (limited)   |
| Platforms           | Android + Desktop (3 OS)      | macOS / Mac+Win          | Varies            |

### Section 3: CTA
- "Experience the difference"
- [Download VoxInk] [See Pricing]

## Navigation Changes

- Before: Features → Guide → Privacy → Pricing → Download
- After: Features → Guide → **Compare** → Pricing → Download
- `/:lang/privacy` redirects to `/:lang/compare` (preserve external links)
- `/:lang/privacy-policy` (legal doc) unchanged

## i18n Structure

```
compare: {
  meta: { title, description }
  hero: { title, subtitle }
  tech: {
    title, subtitle,
    camps: { native: {...}, electron: {...}, tauri: {...} }
    dimensions: { installSize, ram, startup, platforms, security }
    why: { title, electron: {...}, tauri: {...} }
    quotes: { title, items[], conclusion }
  }
  privacy: {
    // migrated from existing privacyPage keys
    title,
    architecture: { title, flow, noServer, byok, zeroCollection, encryption }
    concerns: { title, intro, risks[] }
    comparison: { title, headers, rows }
  }
  cta: { title, download, pricing }
}
lightweight: {
  title, subtitle,
  bar: { voxink, wispr }
  stats: { size, ram, startup }
  cta
}
```

## New Files

- `src/pages/Compare.tsx` — unified comparison page
- `src/components/home/LightweightBanner.tsx` — homepage bar chart section

## Modified Files

- `src/App.tsx` — add /compare route, redirect /privacy → /compare
- `src/components/layout/Navbar.tsx` — replace Privacy nav link with Compare
- `src/i18n/en.json` — add compare + lightweight keys, keep privacyPage for migration
- `src/i18n/zh-tw.json` — same
- `src/pages/Home.tsx` — import LightweightBanner after Platforms

## Deleted Files

- `src/pages/Privacy.tsx` — content migrated to Compare.tsx (route redirects)

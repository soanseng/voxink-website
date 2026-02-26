# Freemium Pricing Model Design

Date: 2026-02-26

## Business Model

VoxPen switches to a freemium model with one-time purchases via Lemon Squeezy.

- **Free tier**: 15 uses/day, BYOK, no ads, all platforms
- **Android**: $5.99 one-time, unlimited uses
- **Desktop**: $19.99 one-time, unlimited uses
- **Bundle**: $23.99 one-time, both platforms (save $1.99)
- **BYOK**: Users bring their own Groq API key (unchanged)
- **Desktop**: No longer open source

## Key Messaging Changes

- **Open source removed**: Desktop is no longer open source. All references across footer, privacy policy, compare page, and pricing page must be updated.
- **Privacy angle**: Shift from "open source = transparent" to "BYOK + zero-collection + no VoxPen server"
- **Competitive angle**: "One-time purchase vs never-ending subscription" ($19.99 once vs $120+/year)

## Changes by Page

### 1. Pricing Page (major restructure)

**New layout top-to-bottom:**

1. **Hero** — "One price. Yours forever." messaging
2. **Tier Cards** (new `TierCards.tsx` component) — 4 cards:
   - Free: 15/day, $0
   - Android: $5.99 one-time
   - Desktop: $19.99 one-time (highlighted "popular")
   - Bundle: $23.99 (highlighted "best value", save badge)
3. **Feature matrix** — what each tier includes
4. **Groq Calculator** — existing sliders, demoted to secondary section with "What does API usage cost?" framing
5. **Why so cheap** — keep existing 3 reasons
6. **CTA** — download links

### 2. Compare Page (content updates)

- Remove `openSource` row from both comparison tables (tech + privacy)
- Update privacy architecture: remove "open source = transparent" argument, replace with BYOK trust messaging
- Update pricing row: "Free (15/day) or one-time purchase"

### 3. Homepage PricingBanner (content update)

- Change from yearly API cost to one-time vs subscription comparison
- "$19.99 once" vs "$120+/year"

### 4. Global Changes

- **Footer**: "desktop open source, privacy first" → "privacy first, BYOK"
- **Privacy Policy**: Remove "desktop version is open source" from overview paragraph

## Files Affected

| File | Type | Description |
|------|------|-------------|
| `src/i18n/en.json` | Edit | All English content updates |
| `src/i18n/zh-tw.json` | Edit | All Chinese content updates |
| `src/pages/Pricing.tsx` | Edit | Restructure layout, integrate TierCards |
| `src/pages/Compare.tsx` | Edit | Remove openSource rows |
| `src/components/home/PricingBanner.tsx` | Edit | Update amounts/messaging |
| `src/components/pricing/TierCards.tsx` | New | Tier cards component |

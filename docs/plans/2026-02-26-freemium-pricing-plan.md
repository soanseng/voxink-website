# Freemium Pricing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update website to reflect new freemium pricing model (15/day free, Android $5.99, Desktop $19.99, Bundle $23.99), remove open-source claims, and restructure Pricing page with tier cards.

**Architecture:** Content-heavy update across i18n files, one new component (TierCards), restructured Pricing page layout. All changes are in the existing React + Tailwind + react-i18next stack.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, react-i18next

---

## Task 1: Update English i18n — Global & Footer

**Files:**
- Modify: `src/i18n/en.json:103-104` (footer)
- Modify: `src/i18n/en.json:264-266` (privacy policy overview)

**Step 1: Update footer description**

Change line 104:
```json
"description": "AI voice input — privacy first, BYOK"
```

**Step 2: Update privacy policy overview**

Change line 266:
```json
"content": "VoxPen (語墨) is an AI voice keyboard that operates on a BYOK (Bring Your Own Key) model. We do not collect, store, or transmit any user data to our servers."
```

**Step 3: Verify dev server**

Run: `pnpm dev` — check footer and privacy policy page render correctly in browser.

**Step 4: Commit**

```bash
git add src/i18n/en.json
git commit -m "feat: remove open-source claims from English footer and privacy policy"
```

---

## Task 2: Update Chinese i18n — Global & Footer

**Files:**
- Modify: `src/i18n/zh-tw.json:103-104` (footer)
- Modify: `src/i18n/zh-tw.json:264-266` (privacy policy overview)

**Step 1: Update footer description**

Change line 104:
```json
"description": "AI 語音輸入，隱私優先、BYOK"
```

**Step 2: Update privacy policy overview**

Change line 266:
```json
"content": "VoxPen（語墨）是一款 AI 語音鍵盤，採用 BYOK（自帶金鑰）模式運作。我們不會收集、儲存或傳輸任何使用者資料到我們的伺服器。"
```

**Step 3: Commit**

```bash
git add src/i18n/zh-tw.json
git commit -m "feat: remove open-source claims from Chinese footer and privacy policy"
```

---

## Task 3: Update English i18n — Pricing section

**Files:**
- Modify: `src/i18n/en.json:543-723` (pricing section)

**Step 1: Update pricing hero, homeBanner, and calculator**

Replace `pricing.hero`:
```json
"hero": {
  "title": "One price. Yours forever.",
  "subtitle": "No subscriptions. No recurring fees. Pay once, use forever."
}
```

Replace `pricing.homeBanner`:
```json
"homeBanner": {
  "title": "Pay once. Not every month.",
  "onetime": "One-time purchase",
  "amount": "$19.99",
  "versus": "vs subscription",
  "subscriptionAmount": "$120+/year",
  "cta": "See full comparison"
}
```

Replace `pricing.calculator` appPrice:
```json
"appPrice": "App: one-time purchase (see tiers above)"
```

Remove `APP_PRICE_USD` constant from Pricing.tsx later (Task 6).

**Step 2: Add new `pricing.tiers` section** (insert after `pricing.hero`)

```json
"tiers": {
  "title": "Simple pricing",
  "subtitle": "Free forever for light users. One-time purchase for unlimited.",
  "free": {
    "name": "Free",
    "price": "$0",
    "period": "forever",
    "description": "Perfect for trying it out",
    "features": [
      "15 voice inputs per day",
      "AI refinement included",
      "BYOK — bring your own Groq key",
      "All platforms"
    ],
    "cta": "Get started"
  },
  "android": {
    "name": "Android",
    "price": "$5.99",
    "period": "one-time",
    "description": "Unlimited on Android",
    "features": [
      "Unlimited voice inputs",
      "Unlimited AI refinement",
      "Unlimited file transcription",
      "No ads, no limits"
    ],
    "cta": "Get Android"
  },
  "desktop": {
    "name": "Desktop",
    "price": "$19.99",
    "period": "one-time",
    "badge": "Popular",
    "description": "Unlimited on Windows, macOS & Linux",
    "features": [
      "Unlimited voice inputs",
      "Unlimited AI refinement",
      "Works in any app",
      "Windows, macOS & Linux"
    ],
    "cta": "Get Desktop"
  },
  "bundle": {
    "name": "Bundle",
    "price": "$23.99",
    "period": "one-time",
    "badge": "Best Value",
    "savings": "Save $1.99",
    "description": "Unlimited on all platforms",
    "features": [
      "Everything in Android + Desktop",
      "All platforms, one purchase",
      "Best price per platform"
    ],
    "cta": "Get Bundle"
  }
}
```

**Step 3: Update comparison table rows**

Replace the `pricing.comparison.rows` section. Remove `appCost`, `proCost`, `openSource`. Update remaining rows:

```json
"rows": {
  "appPrice": {
    "label": "App price",
    "voxink": "Free (15/day) or $5.99–23.99 one-time",
    "serviceA": "$0 (requires subscription)",
    "serviceB": "$0 (requires subscription)"
  },
  "monthlyCost": {
    "label": "Monthly fee",
    "voxink": "$0",
    "serviceA": "$30/mo (or $12/mo yearly)",
    "serviceB": "$15/mo (or $12/mo yearly)"
  },
  "yearlyCost": {
    "label": "Total cost / year",
    "voxink": "$0–23.99 (one-time)",
    "serviceA": "$144 (yearly plan)",
    "serviceB": "$144 (yearly plan)"
  },
  "twoYearCost": {
    "label": "Total cost / 2 years",
    "voxink": "$0–23.99 (same price)",
    "serviceA": "$288",
    "serviceB": "$288"
  },
  "freeLimit": {
    "label": "Free tier",
    "voxink": "15 inputs/day",
    "serviceA": "4,000 words/week",
    "serviceB": "2,000 words/week"
  },
  "dataFlow": {
    "label": "Where your voice goes",
    "voxink": "Direct to AI, no middleman",
    "serviceA": "To service provider first",
    "serviceB": "To service provider first"
  },
  "account": {
    "label": "Account required",
    "voxink": "No",
    "serviceA": "Yes, with payment info",
    "serviceB": "Yes, with payment info"
  }
}
```

**Step 4: Update androidPricing section**

Replace the entire `pricing.androidPricing` section to remove ads references:

```json
"androidPricing": {
  "title": "Android Pricing",
  "subtitle": "Free to start, one-time purchase for unlimited",
  "free": {
    "title": "Free",
    "features": [
      "15 voice inputs per day",
      "AI refinement included",
      "BYOK — your own Groq key",
      "No ads"
    ]
  },
  "pro": {
    "title": "Unlimited ($5.99 one-time)",
    "features": [
      "Unlimited voice inputs",
      "Unlimited AI refinement",
      "Unlimited file transcription",
      "Pay once, use forever"
    ]
  }
}
```

**Step 5: Update scenarios**

Update VoxPen costs in scenarios to reflect new model:

```json
"scenarios": {
  "title": "Cost by Usage",
  "light": {
    "title": "Light use",
    "usage": "≤15 inputs/day",
    "voxink": "$0 forever (free tier)",
    "subscription": "$12–30/mo"
  },
  "normal": {
    "title": "Normal use",
    "usage": "50 inputs/day",
    "voxink": "$5.99–19.99 once + API",
    "subscription": "$12–30/mo"
  },
  "heavy": {
    "title": "Heavy use",
    "usage": "200 inputs/day",
    "voxink": "$5.99–19.99 once + ~$0.60/mo API",
    "subscription": "$12–30/mo"
  },
  "writer": {
    "title": "Writer / Power user",
    "usage": "500 inputs/day",
    "voxink": "$5.99–19.99 once + ~$1.90/mo API",
    "subscription": "$12–30/mo"
  }
}
```

**Step 6: Update whyFree third reason and disclaimer**

Replace whyFree reasons[2]:
```json
{
  "title": "Transparent pricing, no surprises",
  "description": "One-time purchase, BYOK API costs you control. No hidden fees, no auto-renewals, no price increases. You own it forever."
}
```

Update disclaimer:
```json
"disclaimer": "API costs based on Groq's February 2026 rates. Exchange rate: 1 USD ≈ 32 TWD. Subscription service prices sourced from their public pricing pages (annual plans). App purchases are one-time via Lemon Squeezy."
```

**Step 7: Commit**

```bash
git add src/i18n/en.json
git commit -m "feat: update English pricing content for freemium model"
```

---

## Task 4: Update Chinese i18n — Pricing section

**Files:**
- Modify: `src/i18n/zh-tw.json:543-723` (pricing section)

Mirror all changes from Task 3 in Traditional Chinese. Key translations:

- "One price. Yours forever." → "一次購買，永久使用"
- "No subscriptions" → "不用訂閱，不用月繳"
- Tier prices: NT$0 / NT$189 / NT$639 / NT$769 (using 32 TWD rate)
- "Popular" → "最受歡迎"
- "Best Value" → "最划算"
- "Save $1.99" → "省 NT$59"
- Free tier: "每日 15 次語音輸入"
- Update all comparison rows, scenarios, androidPricing, whyFree, disclaimer to match English

**Step 1: Apply all pricing content changes (mirror Task 3)**

**Step 2: Commit**

```bash
git add src/i18n/zh-tw.json
git commit -m "feat: update Chinese pricing content for freemium model"
```

---

## Task 5: Update i18n — Compare page sections

**Files:**
- Modify: `src/i18n/en.json:519-535` (compare privacy comparison rows)
- Modify: `src/i18n/en.json:699-713` (whyFree — already done in Task 3)
- Modify: `src/i18n/zh-tw.json:519-535` (same in Chinese)

**Step 1: English — Update compare privacy table**

In `compare.privacy.comparison.rows`, update pricing row:
```json
"pricing": { "label": "Pricing", "voxink": "Free (15/day) or one-time purchase", "subscription": "$10-30/month", "offline": "One-time purchase" }
```

Remove the `openSource` row entirely from compare privacy comparison.

**Step 2: Chinese — Same changes**

```json
"pricing": { "label": "費用", "voxink": "免費（15次/天）或一次買斷", "subscription": "US$10-30/月", "offline": "一次性購買" }
```

Remove `openSource` row.

**Step 3: Commit**

```bash
git add src/i18n/en.json src/i18n/zh-tw.json
git commit -m "feat: update compare page i18n — remove open-source, update pricing row"
```

---

## Task 6: Create TierCards component

**Files:**
- Create: `src/components/pricing/TierCards.tsx`

**Step 1: Create directory**

```bash
mkdir -p src/components/pricing
```

**Step 2: Create TierCards.tsx**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const tierKeys = ["free", "android", "desktop", "bundle"] as const;

const tierStyles: Record<string, string> = {
  free: "border-gray-200 bg-white",
  android: "border-gray-200 bg-white",
  desktop: "border-emerald-500 border-2 bg-white",
  bundle: "border-emerald-500 border-2 bg-emerald-50/30",
};

export default function TierCards() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {t("pricing.tiers.title")}
      </h2>
      <p className="text-gray-500 mb-8">{t("pricing.tiers.subtitle")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tierKeys.map((key) => {
          const badge = t(`pricing.tiers.${key}.badge`, { defaultValue: "" });
          const savings = t(`pricing.tiers.${key}.savings`, { defaultValue: "" });
          const features = t(`pricing.tiers.${key}.features`, {
            returnObjects: true,
          }) as string[];

          return (
            <div
              key={key}
              className={`rounded-xl p-6 border ${tierStyles[key]} relative flex flex-col`}
            >
              {badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {badge}
                </span>
              )}

              <h3 className="text-lg font-bold text-gray-900">
                {t(`pricing.tiers.${key}.name`)}
              </h3>
              <div className="mt-2 mb-1">
                <span className="text-3xl font-bold text-gray-900">
                  {t(`pricing.tiers.${key}.price`)}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {t(`pricing.tiers.${key}.period`)}
                </span>
              </div>
              {savings && (
                <span className="text-sm text-emerald-600 font-medium">
                  {savings}
                </span>
              )}
              <p className="text-sm text-gray-500 mt-1 mb-4">
                {t(`pricing.tiers.${key}.description`)}
              </p>

              <ul className="space-y-2 flex-1">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={`/${lang}/download`}
                className={`mt-6 block text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  key === "desktop" || key === "bundle"
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {t(`pricing.tiers.${key}.cta`)}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

**Step 3: Verify it compiles**

Run: `pnpm dev` — no errors in console.

**Step 4: Commit**

```bash
git add src/components/pricing/TierCards.tsx
git commit -m "feat: create TierCards pricing component"
```

---

## Task 7: Restructure Pricing page

**Files:**
- Modify: `src/pages/Pricing.tsx`

**Step 1: Update imports and layout**

- Add `import TierCards from "../components/pricing/TierCards";`
- Remove `APP_PRICE_USD` constant (no longer needed for yearly calc)
- Update `yearlyCostUsd` calculation to remove app price addition
- Reorder sections: Hero → TierCards → Calculator → Comparison → Scenarios → Why cheap → CTA
- Remove the `androidPricing` section from the page (tier cards cover it now)
- Update `comparisonRows` array to match new keys: remove `appCost`, `proCost`, `openSource`, add `appPrice`

Updated `comparisonRows`:
```ts
const comparisonRows = [
  "appPrice",
  "monthlyCost",
  "yearlyCost",
  "twoYearCost",
  "freeLimit",
  "dataFlow",
  "account",
] as const;
```

**Step 2: Verify page renders correctly**

Run: `pnpm dev` — check pricing page layout, tier cards visible, calculator works, table renders.

**Step 3: Commit**

```bash
git add src/pages/Pricing.tsx
git commit -m "feat: restructure Pricing page with tier cards and updated content"
```

---

## Task 8: Update Compare page

**Files:**
- Modify: `src/pages/Compare.tsx:14-22` (comparisonRows array)

**Step 1: Remove openSource from comparisonRows**

Change the `comparisonRows` array to remove `"openSource"`:

```ts
const comparisonRows = [
  "dataFlow",
  "account",
  "pricing",
  "serverIntermediary",
  "quality",
  "platforms",
] as const;
```

**Step 2: Verify page renders**

Run: `pnpm dev` — check compare page, table should no longer show open source row.

**Step 3: Commit**

```bash
git add src/pages/Compare.tsx
git commit -m "feat: remove open-source row from Compare page"
```

---

## Task 9: Update Homepage PricingBanner

**Files:**
- Modify: `src/components/home/PricingBanner.tsx`

**Step 1: Update to use new i18n keys**

The component references `pricing.homeBanner.*`. The i18n keys changed:
- `yearly` → `onetime`  (label above the price)
- `amount` → `$19.99` / `NT$639`

Update the JSX to use `onetime` instead of `yearly`:
```tsx
<p className="text-sm text-gray-400 mb-1">{t("pricing.homeBanner.onetime")}</p>
```

**Step 2: Verify homepage renders**

Run: `pnpm dev` — check homepage PricingBanner shows "$19.99 once vs $120+/year".

**Step 3: Commit**

```bash
git add src/components/home/PricingBanner.tsx
git commit -m "feat: update PricingBanner to one-time vs subscription messaging"
```

---

## Task 10: Build verification and final commit

**Step 1: Run production build**

```bash
pnpm build
```

Expected: Build succeeds with no errors.

**Step 2: Preview and spot check**

```bash
pnpm preview
```

Check all pages in both languages:
- Home: PricingBanner shows one-time pricing, LightweightBanner unchanged
- Pricing: Tier cards visible, calculator works, comparison table correct, no open-source refs
- Compare: No open-source row in privacy table, pricing row updated
- Privacy Policy: No open-source mention
- Footer: No open-source mention

**Step 3: Commit any remaining fixes**

```bash
git add -A
git commit -m "fix: address any remaining build or content issues"
```

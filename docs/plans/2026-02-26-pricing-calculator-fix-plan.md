# Pricing Calculator Free Tier Fix — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the pricing calculator to only apply free tier to Groq models, show accurate pricing for OpenAI/OpenRouter, and add visual differentiation in the UI.

**Architecture:** The pricing calculator in `src/pages/Pricing.tsx` uses a `LLM_MODELS` array with provider info. The fix adds provider-aware free tier logic and UI badges/notices. All user-facing text goes through react-i18next (`src/i18n/en.json` and `src/i18n/zh-tw.json`).

**Tech Stack:** React 19, TypeScript, Tailwind CSS v3, react-i18next

**Design doc:** `docs/plans/2026-02-26-pricing-calculator-fix-design.md`

---

### Task 1: Research and verify OpenAI + OpenRouter pricing

**Purpose:** Ensure model prices in the calculator are accurate before changing logic.

**Step 1: Research OpenAI pricing**

Fetch current pricing from OpenAI's official pricing page for these models:
- GPT-5-nano (currently $0.05 / $0.40 per M tokens)
- GPT-5-mini (currently $0.25 / $2.00 per M tokens)
- GPT-4.1-mini (currently $0.40 / $1.60 per M tokens)

Also verify Whisper Turbo rate (currently $0.04/hr).

Run: Web search for "OpenAI API pricing" → check `https://openai.com/api/pricing/`

**Step 2: Research OpenRouter pricing**

Fetch current pricing for these models on OpenRouter:
- Gemini 3 Flash (`google/gemini-3-flash-preview`) — currently $0.50 / $3.00
- Claude Haiku 4.5 (`anthropic/claude-haiku-4-5`) — currently $0.80 / $4.00
- DeepSeek Chat (`deepseek/deepseek-chat`) — currently $0.14 / $0.28

Run: Web search for "OpenRouter pricing" → check `https://openrouter.ai/models`

**Step 3: Update prices if changed**

If any prices differ from current values in `LLM_MODELS` (lines 7-20 of `src/pages/Pricing.tsx`), update them.

**Files:**
- Modify: `src/pages/Pricing.tsx:7-20` (model pricing data, only if prices changed)

**Step 4: Commit (only if prices changed)**

```bash
git add src/pages/Pricing.tsx
git commit -m "fix: update LLM model prices to current rates"
```

---

### Task 2: Add i18n translation keys

**Purpose:** Add all new translation keys needed for free tier badge, BYOK notice, and scenario footnote.

**Files:**
- Modify: `src/i18n/en.json:634-640` (inside `pricing.calculator.tags`)
- Modify: `src/i18n/en.json:641` (after closing `tags` block, before closing `calculator`)
- Modify: `src/i18n/en.json:696-722` (inside `pricing.scenarios`)
- Modify: `src/i18n/zh-tw.json` (same locations, Traditional Chinese)

**Step 1: Add English translation keys**

In `src/i18n/en.json`, inside the `pricing.calculator.tags` object (line 634), add:
```json
"freeTier": "free tier"
```

After the `tags` closing brace but still inside `calculator` (around line 641), add:
```json
"byokNotice": "{{provider}} models are BYOK — costs start from first use. Switch to Groq for free tier."
```

Inside `pricing.scenarios` (after `"title": "Cost by Usage"` at line 697), add:
```json
"footnote": "Costs shown assume Groq models with free tier. OpenAI/OpenRouter costs vary by model."
```

**Step 2: Add Traditional Chinese translation keys**

In `src/i18n/zh-tw.json`, same locations:

Inside `pricing.calculator.tags`:
```json
"freeTier": "免費額度"
```

Inside `pricing.calculator`:
```json
"byokNotice": "{{provider}} 模型為 BYOK（自帶金鑰）— 從第一次使用即開始計費。切換至 Groq 可享免費額度。"
```

Inside `pricing.scenarios`:
```json
"footnote": "費用以 Groq 模型（含免費額度）為基準。OpenAI／OpenRouter 費用依模型而異。"
```

**Step 3: Verify JSON validity**

Run: `pnpm build` (or `npx jsonlint src/i18n/en.json`)
Expected: No JSON parse errors

**Step 4: Commit**

```bash
git add src/i18n/en.json src/i18n/zh-tw.json
git commit -m "feat: add i18n keys for pricing calculator free tier differentiation"
```

---

### Task 3: Fix calculation logic — provider-aware free tier

**Purpose:** Only apply free LLM tier when a Groq model is selected.

**Files:**
- Modify: `src/pages/Pricing.tsx:60-62`

**Step 1: Update isFreeLlm calculation**

In `src/pages/Pricing.tsx`, change line 61 from:
```typescript
const isFreeLlm = dailyLlmTokens <= FREE_LLM_TOKENS;
```
to:
```typescript
const isGroq = selectedModel.provider === "Groq";
const isFreeLlm = isGroq && dailyLlmTokens <= FREE_LLM_TOKENS;
```

Line 60 (`isFreeAudio`) stays the same — audio is always Groq.
Line 62 (`isFree`) stays the same — it correctly uses `isFreeAudio && isFreeLlm`.

**Step 2: Verify build**

Run: `pnpm build`
Expected: Successful build, no TypeScript errors

**Step 3: Commit**

```bash
git add src/pages/Pricing.tsx
git commit -m "fix: restrict free LLM tier to Groq models only"
```

---

### Task 4: Add "free tier" badge to Groq models in selector

**Purpose:** Visually differentiate Groq models in the dropdown by appending "free tier" tag.

**Files:**
- Modify: `src/pages/Pricing.tsx:130-134` (model selector `<option>` rendering)

**Step 1: Update option text to include free tier tag for Groq**

In `src/pages/Pricing.tsx`, the `<option>` element (around line 131-133) currently reads:
```tsx
<option key={m.id} value={m.id}>
  {m.name}{m.tag ? ` (${t(`pricing.calculator.tags.${m.tag}`)})` : ""}
</option>
```

Change to:
```tsx
<option key={m.id} value={m.id}>
  {m.name}
  {m.tag ? ` (${t(`pricing.calculator.tags.${m.tag}`)})` : ""}
  {m.provider === "Groq" ? ` ✦ ${t("pricing.calculator.tags.freeTier")}` : ""}
</option>
```

This appends ` ✦ free tier` (or ` ✦ 免費額度`) to all Groq model names in the dropdown.

**Step 2: Verify build**

Run: `pnpm build`
Expected: Successful build

**Step 3: Commit**

```bash
git add src/pages/Pricing.tsx
git commit -m "feat: add free tier badge to Groq models in selector"
```

---

### Task 5: Add BYOK notice for non-Groq models

**Purpose:** When a non-Groq model is selected, show an informational notice near the cost breakdown.

**Files:**
- Modify: `src/pages/Pricing.tsx:233-253` (between results grid and rate footnotes)

**Step 1: Add notice between results and footnotes**

In `src/pages/Pricing.tsx`, after the results grid closing `</div>` (line 233) and before the footnotes `<div>` (line 236), add:

```tsx
{/* BYOK notice for non-Groq models */}
{withLlm && !isGroq && (
  <p className="mt-4 text-sm text-amber-700 bg-amber-50 rounded-lg px-4 py-2">
    {t("pricing.calculator.byokNotice", { provider: selectedModel.provider })}
  </p>
)}
```

Note: `isGroq` was defined in Task 3. The notice uses `amber` colors for a soft, informational tone (not red/error).

**Step 2: Verify build**

Run: `pnpm build`
Expected: Successful build

**Step 3: Commit**

```bash
git add src/pages/Pricing.tsx
git commit -m "feat: add BYOK notice when non-Groq model selected"
```

---

### Task 6: Add scenario footnote

**Purpose:** Clarify that usage scenarios assume Groq pricing with free tier.

**Files:**
- Modify: `src/pages/Pricing.tsx:304-336` (usage scenarios section)

**Step 1: Add footnote after scenarios grid**

In `src/pages/Pricing.tsx`, after the scenarios grid closing `</div>` (line 335) and before the `</section>` (line 336), add:

```tsx
<p className="mt-4 text-xs text-gray-400">
  {t("pricing.scenarios.footnote")}
</p>
```

**Step 2: Verify build**

Run: `pnpm build`
Expected: Successful build

**Step 3: Commit**

```bash
git add src/pages/Pricing.tsx
git commit -m "feat: add Groq assumption footnote to usage scenarios"
```

---

### Task 7: Visual verification

**Purpose:** Confirm the calculator displays correctly in both languages and both states (Groq selected vs non-Groq).

**Step 1: Start dev server and verify**

Run: `pnpm dev`

Check the following scenarios at `http://localhost:5173/en/pricing` and `/zh-tw/pricing`:

1. **Groq model selected** — dropdown shows "✦ free tier" badge, cost shows "$0" / "Within free tier" for typical usage (50 inputs/day)
2. **OpenAI model selected** — no badge, cost shows actual dollar amount from first token, amber BYOK notice appears
3. **OpenRouter model selected** — same as OpenAI behavior
4. **LLM toggle off** — no model selector, no BYOK notice, only audio costs
5. **Scenarios section** — footnote visible below scenario cards

**Step 2: Final commit if any visual tweaks needed**

```bash
git add -A
git commit -m "fix: visual adjustments to pricing calculator"
```

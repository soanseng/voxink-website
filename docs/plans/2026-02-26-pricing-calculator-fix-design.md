# Pricing Calculator: Free Tier & Accuracy Fix

**Date**: 2026-02-26
**Status**: Approved

## Problem

The pricing calculator applies free tier logic (500K tokens/day, 8hrs audio/day) universally to all LLM providers. In reality, the free tier is **Groq-only** — OpenAI and OpenRouter users pay from the first token via BYOK.

## Architecture Context

- **Audio transcription**: Always routed through Groq Whisper Turbo → free tier applies to everyone
- **LLM refinement**: Provider-dependent → only Groq models get free tier
- **OpenAI / OpenRouter**: BYOK only, no free tier, costs from first token

## Changes

### 1. Calculation Logic

Current (buggy):
```
isFreeLlm = dailyLlmTokens ≤ 500,000  // applies to ALL models
```

Fixed:
```
isFreeLlm = (provider === "groq") && (dailyLlmTokens ≤ 500,000)
```

Audio transcription logic unchanged — always Groq, always free within limits.

### 2. Model Selector UI

- **Groq models**: Show a "Free tier" badge alongside existing tags (recommended, fast, chinese)
- **Non-Groq models**: No badge. When selected, show a subtle informational notice near cost breakdown:
  > "OpenAI/OpenRouter models are BYOK — costs start from first use. Switch to Groq for free tier."
- Notice is soft/informational, not a warning
- Translated in both zh-tw and en

### 3. Pricing Research & Updates

Verify current prices from official sources for 6 non-Groq models:

| Provider | Model | Current Input/Output (per M tokens) |
|----------|-------|-------------------------------------|
| OpenAI | GPT-5-nano | $0.05 / $0.40 |
| OpenAI | GPT-5-mini | $0.25 / $2.00 |
| OpenAI | GPT-4.1-mini | $0.40 / $1.60 |
| OpenRouter | Gemini 3 Flash | $0.50 / $3.00 |
| OpenRouter | Claude Haiku 4.5 | $0.80 / $4.00 |
| OpenRouter | DeepSeek Chat | $0.14 / $0.28 |

Also verify Whisper rate ($0.04/hr).

Update any prices that have changed.

### 4. Usage Scenarios

Add footnote to the 4 usage scenarios (Light, Normal, Heavy, Writer):
> "Costs shown assume Groq models with free tier. OpenAI/OpenRouter costs vary by model."

Comparison table (VoxPen vs competitors) remains unchanged.

## Files to Modify

- `src/pages/Pricing.tsx` — calculation logic, model selector UI, scenario footnote
- `src/i18n/en.json` — new translation keys (free tier badge, BYOK notice, scenario footnote)
- `src/i18n/zh-tw.json` — same new keys in Traditional Chinese

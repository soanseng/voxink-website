# Tone Selection Feature — Website Update Design

Date: 2026-02-26

## Feature Summary

VoxPen adds tone/style selection for voice input refinement — 6 presets (Casual, Professional, Email, Note, Social, Custom) that switch the LLM system prompt. This is a key competitor feature (Typeless, Wispr Flow) now matched.

## Website Changes

### 1. Features Section (Homepage)

- Add 5th feature card: `tone` (🎭 icon)
- Grid: keep `lg:grid-cols-4`, 5th card spans 2 columns centered on second row
- Card shows 6 tone presets as compact pill badges
- Title: "Tone Selection" / 「語氣切換」
- Description emphasizes one-tap switching + custom prompt

### 2. Compare Page

- Add `toneSelection` row to comparison table
- VoxPen: "6 presets + custom prompt"
- Subscription services: "Limited presets"
- Offline: "None"

### 3. Files Affected

| File | Change |
|------|--------|
| `src/i18n/en.json` | Add `features.tone`, compare row |
| `src/i18n/zh-tw.json` | Same in Chinese |
| `src/components/home/Features.tsx` | Add tone card with wider layout |
| `src/pages/Compare.tsx` | Add toneSelection row |

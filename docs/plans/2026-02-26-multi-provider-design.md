# Multi-Provider LLM Support — Website Update Design

Date: 2026-02-26

## Summary

Update website to reflect multi-provider LLM support (Groq, OpenAI, OpenRouter, Ollama) with interactive model selector in pricing calculator.

## Changes

### 1. Features Grid (Homepage)
- Add 6th card: "Multi-Provider" with 🔌 icon
- Change grid to `lg:grid-cols-3` (2 rows of 3)
- Tone card becomes regular-width

### 2. Pricing Calculator
- Add model selector dropdown grouped by provider
- Groq: GPT-OSS-120B (default), GPT-OSS-20B, Qwen3-32B
- OpenAI: GPT-5-nano, GPT-5-mini, GPT-4.1-mini
- OpenRouter: Gemini 3 Flash, Claude Haiku 4.5, DeepSeek Chat
- Dynamic rate calculation based on selected model
- "Prices as of February 2026" disclaimer

### 3. Guide Page
- Update steps to mention provider alternatives
- Update cost section and FAQ

### 4. Privacy Mentions
- Add OpenRouter, Ollama to provider lists

### Files
- `src/i18n/en.json` + `src/i18n/zh-tw.json`
- `src/components/home/Features.tsx`
- `src/pages/Pricing.tsx`

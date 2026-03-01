# Fix Typeless Comparison & Add Desktop Features

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Correct the VoxPen vs Typeless comparison to reflect Typeless's actual features, add desktop-sourced features, and document roadmap items for features Typeless has that we don't.

**Architecture:** Data-only changes to i18n JSON files + array reordering in TypelessComparison.tsx + cleanup of privacy comparison rows. No new components needed.

**Tech Stack:** React, i18next, TypeScript, Tailwind CSS

---

## Research Summary

### Typeless Actually Has (we wrongly said "Not available"):
| Feature | Typeless Reality | Source |
|---------|-----------------|--------|
| Translation Mode | Yes, since macOS v0.7.0 | typeless.com/help/release-notes |
| Voice Commands | Punctuation: comma, period, new line, etc. | typeless.com |
| Speak to Edit | Select text → voice edit command | typeless.com/help/release-notes/ios/speak-to-edit |
| Context-Aware Tone | Per-app tone adaptation | typeless.com, moge.ai |
| Personal Dictionary | Custom vocabulary | typeless.com/pricing |

### True VoxPen-Only Advantages (keep in advantages table):
1. BYOK (Bring Your Own Key)
2. Self-Hosted STT endpoint
3. Multi-Provider (Groq, OpenAI, OpenRouter, Ollama, custom)
4. File Transcription + SRT export
5. Traditional Chinese depth (native zh-TW prompts)
6. One-Time Purchase ($4.99 / $14.99 vs $12-30/mo)
7. Pricing Transparency (see exact API costs)
8. Copy to Clipboard (one-tap from candidate bar)
9. Dual Result Display (original + refined side-by-side)
10. Linux Desktop Support (Typeless: Mac/Win/iOS/Android only)
11. Custom System Prompts (fully editable refinement prompts)

### Corrected Parity (both have, with nuances):
1. Whisper STT
2. Filler Word Removal
3. Self-Correction Handling
4. Auto-Format
5. Mixed-Language Support
6. On-Device History
7. Translation Mode (move from advantages → parity)
8. Voice Commands (move from advantages → parity, note: different implementations)
9. Speak to Edit (move from advantages → parity)
10. Context-Aware Tone (move from advantages → parity)
11. Personal Dictionary / Custom Vocabulary (NEW parity row)

### Typeless Leads (roadmap for VoxPen):
1. 100+ languages (VoxPen: 11 desktop, 4 Android)
2. iOS app
3. Personalization (learns writing style over time)
4. Web platform
5. "Ask about selected text" query mode

---

### Task 1: Fix en.json — Typeless Comparison

**Files:**
- Modify: `src/i18n/en.json` — `compare.typeless` block

**Step 1: Restructure advantages rows**

Remove from advantages: `translationMode`, `voiceCommands`, `speakToEdit`, `autoContextTone`
Add to advantages: `linuxSupport`, `customPrompts`

New advantages rows (11 total):
```json
"advantages": {
  "title": "Where VoxPen leads",
  "rows": {
    "byok": { "label": "BYOK (Bring Your Own Key)", "voxpen": "Yes — use your own API key", "typeless": "No — locked to their backend" },
    "selfHosted": { "label": "Self-Hosted STT", "voxpen": "Custom endpoint support", "typeless": "Not available" },
    "multiProvider": { "label": "Multi-Provider", "voxpen": "Groq, OpenAI, OpenRouter, Ollama, custom", "typeless": "Single provider only" },
    "fileTranscription": { "label": "File Transcription", "voxpen": "Audio/video → text + SRT export", "typeless": "Not available" },
    "zhTwDepth": { "label": "Traditional Chinese Depth", "voxpen": "Native zh-TW prompts, mixed-language aware", "typeless": "Basic Chinese support" },
    "onetimePurchase": { "label": "One-Time Purchase", "voxpen": "$4.99 mobile / $14.99 desktop", "typeless": "$12–30/month subscription" },
    "pricingTransparency": { "label": "Pricing Transparency", "voxpen": "See exact API costs, no markup", "typeless": "Flat monthly fee, costs hidden" },
    "copyToClipboard": { "label": "Copy to Clipboard", "voxpen": "One-tap copy from candidate bar", "typeless": "Not available" },
    "dualResult": { "label": "Dual Result Display", "voxpen": "Original + refined side by side, pick either", "typeless": "Refined only" },
    "linuxSupport": { "label": "Linux Desktop", "voxpen": "Full Linux support (AppImage)", "typeless": "Not available" },
    "customPrompts": { "label": "Custom System Prompts", "voxpen": "Fully editable refinement prompts per language", "typeless": "Not available" }
  }
}
```

**Step 2: Restructure parity rows**

New parity rows (11 total):
```json
"parity": {
  "title": "Feature parity",
  "rows": {
    "whisperStt": { "label": "Whisper STT", "voxpen": "Groq / OpenAI Whisper", "typeless": "Whisper-based" },
    "fillerRemoval": { "label": "Filler Word Removal", "voxpen": "AI-powered, per-language", "typeless": "AI-powered" },
    "selfCorrection": { "label": "Self-Correction Handling", "voxpen": "Keeps final version only", "typeless": "Keeps final version only" },
    "autoFormat": { "label": "Auto-Format", "voxpen": "Lists, punctuation, structure", "typeless": "Lists, punctuation, structure" },
    "mixedLanguage": { "label": "Mixed-Language Support", "voxpen": "zh-en, zh-ja code-switching", "typeless": "Multi-language mixing" },
    "onDeviceHistory": { "label": "On-Device History", "voxpen": "Local database, exportable", "typeless": "Local storage" },
    "translationMode": { "label": "Translation Mode", "voxpen": "Speak one language → output another", "typeless": "Speak one language → output another" },
    "voiceCommands": { "label": "Voice Commands", "voxpen": "Punctuation + editing, trilingual, offline", "typeless": "Punctuation + formatting" },
    "speakToEdit": { "label": "Speak to Edit", "voxpen": "Select text → voice-instruct AI rewrite", "typeless": "Select text → voice edit" },
    "contextAwareTone": { "label": "Context-Aware Tone", "voxpen": "22 app rules + custom rules", "typeless": "Per-app tone adaptation" },
    "personalDictionary": { "label": "Personal Dictionary", "voxpen": "Custom vocabulary in STT + LLM prompts", "typeless": "Custom vocabulary" }
  }
}
```

**Step 3: Run build**

Run: `cd /home/scipio/projects/voxpen-website && pnpm build`
Expected: PASS

---

### Task 2: Fix zh-tw.json — Typeless Comparison

**Files:**
- Modify: `src/i18n/zh-tw.json` — `compare.typeless` block

Mirror all Task 1 changes with Traditional Chinese translations.

New advantages rows (11 total):
```json
"advantages": {
  "title": "語墨的優勢",
  "rows": {
    "byok": { "label": "BYOK（自帶 API Key）", "voxpen": "支援——用你自己的 API key", "typeless": "不支援——綁定他們的後端" },
    "selfHosted": { "label": "自架 STT 伺服器", "voxpen": "支援自訂端點", "typeless": "不支援" },
    "multiProvider": { "label": "多供應商", "voxpen": "Groq、OpenAI、OpenRouter、Ollama、自訂", "typeless": "僅單一供應商" },
    "fileTranscription": { "label": "檔案轉錄", "voxpen": "音檔/影片 → 文字 + SRT 匯出", "typeless": "不支援" },
    "zhTwDepth": { "label": "繁體中文深度", "voxpen": "原生 zh-TW prompt，混語感知", "typeless": "基本中文支援" },
    "onetimePurchase": { "label": "一次買斷", "voxpen": "手機 $4.99 / 桌面 $14.99", "typeless": "月費 $12–30" },
    "pricingTransparency": { "label": "價格透明", "voxpen": "看得到 API 費用，零加價", "typeless": "月繳固定費，成本不透明" },
    "copyToClipboard": { "label": "一鍵複製", "voxpen": "候選列一鍵複製到剪貼簿", "typeless": "不支援" },
    "dualResult": { "label": "雙結果顯示", "voxpen": "原文 + 潤飾並排，選你要的", "typeless": "僅顯示潤飾結果" },
    "linuxSupport": { "label": "Linux 桌面版", "voxpen": "完整 Linux 支援（AppImage）", "typeless": "不支援" },
    "customPrompts": { "label": "自訂系統 Prompt", "voxpen": "各語言可完整編輯潤飾 prompt", "typeless": "不支援" }
  }
}
```

New parity rows (11 total):
```json
"parity": {
  "title": "功能持平",
  "rows": {
    "whisperStt": { "label": "Whisper 語音辨識", "voxpen": "Groq / OpenAI Whisper", "typeless": "基於 Whisper" },
    "fillerRemoval": { "label": "去除贅字", "voxpen": "AI 驅動，各語言專屬", "typeless": "AI 驅動" },
    "selfCorrection": { "label": "自我修正處理", "voxpen": "只保留最終版本", "typeless": "只保留最終版本" },
    "autoFormat": { "label": "自動排版", "voxpen": "列表、標點、結構", "typeless": "列表、標點、結構" },
    "mixedLanguage": { "label": "混語支援", "voxpen": "中英、中日混打", "typeless": "多語混合" },
    "onDeviceHistory": { "label": "本地紀錄", "voxpen": "本地資料庫，可匯出", "typeless": "本地儲存" },
    "translationMode": { "label": "翻譯模式", "voxpen": "說 A 語言 → 輸出 B 語言", "typeless": "說 A 語言 → 輸出 B 語言" },
    "voiceCommands": { "label": "語音指令", "voxpen": "標點 + 編輯，三語支援，離線可用", "typeless": "標點 + 排版" },
    "speakToEdit": { "label": "語音編輯", "voxpen": "選取文字 → 語音指示 AI 改寫", "typeless": "選取文字 → 語音編輯" },
    "contextAwareTone": { "label": "情境語氣", "voxpen": "22 款 app 規則 + 自訂規則", "typeless": "依 app 調整語氣" },
    "personalDictionary": { "label": "個人詞典", "voxpen": "自訂詞彙注入 STT + LLM prompt", "typeless": "自訂詞彙" }
  }
}
```

---

### Task 3: Update TypelessComparison.tsx Arrays

**Files:**
- Modify: `src/components/compare/TypelessComparison.tsx`

Update `advantageKeys` (remove 4 moved items, add 2 new → 11 total):
```typescript
const advantageKeys = [
  "byok",
  "selfHosted",
  "multiProvider",
  "fileTranscription",
  "zhTwDepth",
  "onetimePurchase",
  "pricingTransparency",
  "copyToClipboard",
  "dualResult",
  "linuxSupport",
  "customPrompts",
] as const;
```

Update `parityKeys` (add 5 moved items → 11 total):
```typescript
const parityKeys = [
  "whisperStt",
  "fillerRemoval",
  "selfCorrection",
  "autoFormat",
  "mixedLanguage",
  "onDeviceHistory",
  "translationMode",
  "voiceCommands",
  "speakToEdit",
  "contextAwareTone",
  "personalDictionary",
] as const;
```

---

### Task 4: Fix Privacy Comparison Rows

**Files:**
- Modify: `src/i18n/en.json` — `compare.privacy.comparison.rows`
- Modify: `src/i18n/zh-tw.json` — same block
- Modify: `src/pages/Compare.tsx` — `comparisonRows` array

Remove `translationMode`, `voiceCommands`, `speakToEdit` from privacy comparison (they're not privacy-related). Keep `fileTranscription` (it's a valid privacy comparison — subscription services don't offer it).

Update `comparisonRows` in Compare.tsx:
```typescript
const comparisonRows = [
  "dataFlow",
  "account",
  "pricing",
  "serverIntermediary",
  "quality",
  "platforms",
  "toneSelection",
  "fileTranscription",
] as const;
```

Remove 3 rows from `compare.privacy.comparison.rows` in both en.json and zh-tw.json:
- `translationMode`
- `voiceCommands`
- `speakToEdit`

---

### Task 5: Add Desktop Features to Website

**Files:**
- Modify: `src/i18n/en.json` — `features` block
- Modify: `src/i18n/zh-tw.json` — `features` block
- Modify: `src/components/home/Features.tsx` — `featureKeys` and `featureIcons`

Add `personalDictionary` feature card (desktop has it, unique UX angle: injected into both STT and LLM prompts).

Update `features.multilang.description` to mention 11 languages on desktop.

en.json additions:
```json
"personalDictionary": {
  "title": "Personal Dictionary",
  "description": "Add domain terms, names, and jargon — auto-injected into both speech recognition and AI refinement for maximum accuracy"
}
```

zh-tw.json additions:
```json
"personalDictionary": {
  "title": "個人詞典",
  "description": "加入專業術語、人名、行話——自動注入語音辨識和 AI 潤飾，大幅提高準確度"
}
```

But wait — this would make 10 feature cards (not a clean grid). Keep at 9 (3×3). Instead, update the `multilang` description to mention personal dictionary capability:

en.json:
```json
"multilang": {
  "title": "Multilingual",
  "description": "11 languages with auto-detection and mixed-language support. Add custom vocabulary for domain-specific accuracy"
}
```

zh-tw.json:
```json
"multilang": {
  "title": "多語混打",
  "description": "支援 11 種語言，自動偵測加混語輸入。可加入自訂詞彙，提升專業領域準確度"
}
```

---

### Task 6: Update ROADMAP.md with Typeless-Inspired Items

**Files:**
- Modify: `/home/scipio/projects/voxpen-android/ROADMAP.md`

Add a "Competitive Roadmap" section documenting features Typeless has that we plan to develop:
1. **Expanded Language Support** — 100+ Whisper languages (currently 11 desktop, 4 Android)
2. **iOS App** — Native iOS keyboard
3. **Writing Style Personalization** — Learn user's tone and phrasing over time
4. **Web Platform** — Browser-based voice input
5. **Query Mode** — "Ask about selected text" for summaries/explanations

---

### Task 7: Build and Verify

Run: `cd /home/scipio/projects/voxpen-website && pnpm build`
Expected: PASS, no TypeScript errors

---

### Task 8: Commit and Push

```bash
cd /home/scipio/projects/voxpen-website
git add src/i18n/en.json src/i18n/zh-tw.json src/components/compare/TypelessComparison.tsx src/pages/Compare.tsx src/components/home/Features.tsx
git commit -m "fix(compare): correct Typeless comparison with verified features"
git push
```

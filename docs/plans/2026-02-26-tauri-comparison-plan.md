# Tauri Comparison Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a unified "Why VoxInk?" comparison page combining Tauri lightweight tech advantages with privacy architecture, plus a homepage banner with bar chart visualization.

**Architecture:** New `/compare` route replaces the standalone `/privacy` page. Homepage gets a `LightweightBanner` section after Platforms. All content is i18n-driven using react-i18next. The `/privacy` route redirects to `/compare` to preserve external links.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v3, react-i18next, React Router v7

---

### Task 1: Add i18n translation keys (zh-tw)

**Files:**
- Modify: `src/i18n/zh-tw.json`

**Step 1: Add `lightweight` keys for homepage banner**

Add after the last top-level key (before closing `}`):

```json
"lightweight": {
  "title": "輕量到你毋敢相信",
  "subtitle": "專業工具不需要是另一個瀏覽器",
  "bar": {
    "voxink": "語墨 VoxInk（Tauri）",
    "wispr": "Wispr Flow（Electron）"
  },
  "stats": {
    "size": { "value": "~10MB", "label": "安裝大小" },
    "ram": { "value": "~20MB", "label": "RAM 佔用" },
    "startup": { "value": "<1 秒", "label": "啟動速度" }
  },
  "cta": "看完整比較"
}
```

**Step 2: Add `compare` keys for the comparison page**

```json
"compare": {
  "meta": {
    "title": "為什麼選語墨？— 效能與隱私全面比較",
    "description": "Tauri vs Electron 效能比較、隱私架構分析，了解語墨的技術優勢。"
  },
  "hero": {
    "title": "為什麼選語墨？",
    "subtitle": "隱私、效能、價格——全面比較"
  },
  "tech": {
    "title": "桌面版：輕量技術架構",
    "subtitle": "同樣是跨平台 app，差距可以是 30 倍",
    "camps": {
      "native": {
        "name": "Native Swift",
        "representative": "Superwhisper",
        "installSize": "~30MB",
        "ram": "~100MB",
        "startup": "~2 秒",
        "platforms": "僅 macOS",
        "security": "Swift",
        "pros": ["小而快"],
        "cons": ["只有 macOS"]
      },
      "electron": {
        "name": "Electron",
        "representative": "Wispr Flow",
        "installSize": "~350MB",
        "ram": "~800MB",
        "startup": "8-10 秒",
        "platforms": "Mac + Windows",
        "security": "Node.js",
        "pros": ["跨平台"],
        "cons": ["肥大緩慢"]
      },
      "tauri": {
        "name": "Tauri（Rust）",
        "representative": "語墨 VoxInk",
        "badge": "推薦",
        "installSize": "~10MB",
        "ram": "~20MB",
        "startup": "<1 秒",
        "platforms": "Mac + Windows + Linux",
        "security": "Rust",
        "pros": ["小而快", "跨平台"],
        "cons": []
      }
    },
    "dimensions": {
      "installSize": "安裝大小",
      "ram": "RAM 佔用（閒置）",
      "startup": "啟動時間",
      "platforms": "支援平台",
      "security": "安全語言"
    },
    "why": {
      "title": "為什麼差這麼多？",
      "electron": {
        "title": "Electron 的運作方式",
        "items": [
          "打包整個 Chromium 瀏覽器（~100MB）",
          "加上 Node.js runtime（~30MB）",
          "每個 Electron app 都是一個完整的 Chrome"
        ]
      },
      "tauri": {
        "title": "Tauri 的運作方式",
        "items": [
          "使用系統內建 WebView（0MB 額外負擔）",
          "核心是 Rust 編譯的小 binary（~5MB）",
          "原生級效能，最小化資源佔用"
        ]
      }
    },
    "quotes": {
      "title": "使用者怎麼說",
      "items": [
        { "text": "Wispr Flow idle 就吃 800MB RAM，拖垮我的 VS Code", "source": "Reddit" },
        { "text": "8-10 秒啟動，風扇狂轉", "source": "Reddit" },
        { "text": "為什麼每個 app 都要內建一個 Chrome？", "source": "Hacker News" }
      ],
      "conclusion": "這就是我們選擇 Tauri 的原因。"
    }
  },
  "privacy": {
    "title": "全平台一致的隱私架構",
    "subtitle": "Android 和桌面版共用相同的隱私設計",
    "architecture": {
      "title": "隱私設計",
      "flow": "你的裝置 → 直連 AI 供應商 → 回傳文字 → 本地儲存",
      "noServer": "全程沒有語墨伺服器經手你的資料",
      "byok": {
        "title": "BYOK 模式",
        "description": "Bring Your Own Key — 你自己申請 API key，語音資料直接傳送到你選擇的 AI 供應商（Groq、OpenAI 等）。語墨不代管、不轉傳、不儲存。"
      },
      "zeroCollection": {
        "title": "零收集政策",
        "description": "語墨不要求註冊帳號，不追蹤使用行為，不回傳任何遙測資料。你用了什麼、說了什麼，只有你自己知道。"
      },
      "encryption": {
        "title": "本地加密儲存",
        "description": "API key 以 Android Keystore（Android 版）或 Tauri 加密儲存（桌面版）保護。轉錄紀錄儲存在本地資料庫，你隨時可以刪除。"
      }
    },
    "concerns": {
      "title": "語音輸入服務的隱私隱憂",
      "intro": "部分訂閱制語音輸入服務存在以下資料流風險：",
      "risks": [
        "你的語音先傳送到服務商伺服器，再轉傳給 AI 供應商 — 多了一層看不見的經手",
        "需要建立帳號並綁定付款資訊，你的身份與使用紀錄可被完整關聯",
        "使用行為可能被追蹤用於「改善服務」或「個人化推薦」",
        "伺服器端可能暫存或記錄你的語音資料，即使聲稱「不儲存」也難以驗證"
      ]
    },
    "comparison": {
      "title": "隱私比較",
      "headers": {
        "feature": "項目",
        "voxink": "語墨 VoxInk",
        "subscription": "訂閱制語音服務",
        "offline": "離線方案"
      },
      "rows": {
        "dataFlow": { "label": "資料流向", "voxink": "裝置 → AI 供應商（直連）", "subscription": "裝置 → 服務商伺服器 → AI", "offline": "全部在裝置上" },
        "account": { "label": "需要帳號", "voxink": "否", "subscription": "是", "offline": "否" },
        "pricing": { "label": "費用", "voxink": "BYOK（有免費額度）", "subscription": "US$10-30/月", "offline": "一次性購買" },
        "openSource": { "label": "開源", "voxink": "桌面版：是", "subscription": "否", "offline": "部分" },
        "serverIntermediary": { "label": "伺服器經手", "voxink": "否", "subscription": "是", "offline": "否" },
        "quality": { "label": "辨識品質", "voxink": "雲端 AI（高品質）", "subscription": "雲端 AI（高品質）", "offline": "本地模型（有限）" },
        "platforms": { "label": "支援平台", "voxink": "Android + 桌面 3 平台", "subscription": "macOS / Mac+Win", "offline": "不一定" }
      }
    }
  },
  "cta": {
    "title": "體驗輕量的差異",
    "download": "下載語墨",
    "pricing": "看定價"
  }
}
```

**Step 3: Update `nav` key**

Change `"privacy": "隱私"` to `"compare": "比較"` and remove the old `privacy` nav key:

```json
"nav": {
  "features": "功能",
  "guide": "教學",
  "compare": "比較",
  "download": "下載",
  "pricing": "費用比較"
}
```

**Step 4: Add compare meta keys**

In the `meta` section, replace `privacyTitle`/`privacyDescription` with:

```json
"compareTitle": "為什麼選語墨？— 效能與隱私全面比較",
"compareDescription": "Tauri vs Electron 效能比較、隱私架構分析，了解語墨的技術優勢。"
```

**Step 5: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/i18n/zh-tw.json','utf8')); console.log('OK')"`
Expected: `OK`

**Step 6: Commit**

```
git add src/i18n/zh-tw.json
git commit -m "feat: add Traditional Chinese translations for compare page and lightweight banner"
```

---

### Task 2: Add i18n translation keys (en)

**Files:**
- Modify: `src/i18n/en.json`

**Step 1: Add `lightweight` keys**

```json
"lightweight": {
  "title": "Lightweight. Seriously.",
  "subtitle": "Pro tools don't need to be another browser",
  "bar": {
    "voxink": "VoxInk (Tauri)",
    "wispr": "Wispr Flow (Electron)"
  },
  "stats": {
    "size": { "value": "~10MB", "label": "Install size" },
    "ram": { "value": "~20MB", "label": "RAM usage" },
    "startup": { "value": "<1s", "label": "Startup" }
  },
  "cta": "See full comparison"
}
```

**Step 2: Add `compare` keys**

```json
"compare": {
  "meta": {
    "title": "Why VoxInk? — Performance & Privacy Compared",
    "description": "Tauri vs Electron performance comparison and privacy architecture analysis."
  },
  "hero": {
    "title": "Why VoxInk?",
    "subtitle": "Privacy, performance, price — a full comparison"
  },
  "tech": {
    "title": "Desktop: Lightweight Architecture",
    "subtitle": "Same cross-platform goal, 30x difference in size",
    "camps": {
      "native": {
        "name": "Native Swift",
        "representative": "Superwhisper",
        "installSize": "~30MB",
        "ram": "~100MB",
        "startup": "~2s",
        "platforms": "macOS only",
        "security": "Swift",
        "pros": ["Small & fast"],
        "cons": ["macOS only"]
      },
      "electron": {
        "name": "Electron",
        "representative": "Wispr Flow",
        "installSize": "~350MB",
        "ram": "~800MB",
        "startup": "8-10s",
        "platforms": "Mac + Windows",
        "security": "Node.js",
        "pros": ["Cross-platform"],
        "cons": ["Bloated & slow"]
      },
      "tauri": {
        "name": "Tauri (Rust)",
        "representative": "VoxInk",
        "badge": "Recommended",
        "installSize": "~10MB",
        "ram": "~20MB",
        "startup": "<1s",
        "platforms": "Mac + Win + Linux",
        "security": "Rust",
        "pros": ["Small & fast", "Cross-platform"],
        "cons": []
      }
    },
    "dimensions": {
      "installSize": "Install size",
      "ram": "RAM usage (idle)",
      "startup": "Startup time",
      "platforms": "Platforms",
      "security": "Language safety"
    },
    "why": {
      "title": "Why such a big difference?",
      "electron": {
        "title": "How Electron works",
        "items": [
          "Bundles an entire Chromium browser (~100MB)",
          "Plus Node.js runtime (~30MB)",
          "Every Electron app is a full Chrome instance"
        ]
      },
      "tauri": {
        "title": "How Tauri works",
        "items": [
          "Uses the system's built-in WebView (0MB extra)",
          "Core is a compiled Rust binary (~5MB)",
          "Native performance, minimal resource usage"
        ]
      }
    },
    "quotes": {
      "title": "What users are saying",
      "items": [
        { "text": "Wispr Flow idles at 800MB RAM, drags down my VS Code", "source": "Reddit" },
        { "text": "8-10 second startup, fans spinning like crazy", "source": "Reddit" },
        { "text": "Why does every app need a built-in Chrome?", "source": "Hacker News" }
      ],
      "conclusion": "This is why we chose Tauri."
    }
  },
  "privacy": {
    "title": "Consistent Privacy Across All Platforms",
    "subtitle": "Android and Desktop share the same privacy architecture",
    "architecture": {
      "title": "Privacy by Design",
      "flow": "Your Device → Direct to AI Provider → Text Response → Local Storage",
      "noServer": "No VoxInk server ever touches your data",
      "byok": {
        "title": "BYOK Model",
        "description": "Bring Your Own Key — your voice data goes directly to your chosen AI provider (Groq, OpenAI, etc.). VoxInk never proxies, relays, or stores your data."
      },
      "zeroCollection": {
        "title": "Zero Collection Policy",
        "description": "No account required, no usage tracking, no telemetry. What you use and what you say — only you know."
      },
      "encryption": {
        "title": "Local Encrypted Storage",
        "description": "API keys protected by Android Keystore (Android) or Tauri encrypted store (Desktop). Transcription history is local — delete anytime."
      }
    },
    "concerns": {
      "title": "Privacy Concerns with Voice Services",
      "intro": "Some subscription voice services have these data flow risks:",
      "risks": [
        "Your voice is routed through the service provider's server before reaching the AI — an invisible intermediary",
        "Account creation with payment info required — your identity and usage fully correlated",
        "Usage behavior may be tracked for \"service improvement\"",
        "Servers may cache or log your voice data, even when claiming otherwise"
      ]
    },
    "comparison": {
      "title": "Privacy Comparison",
      "headers": {
        "feature": "Feature",
        "voxink": "VoxInk",
        "subscription": "Subscription Services",
        "offline": "Offline Solutions"
      },
      "rows": {
        "dataFlow": { "label": "Data Flow", "voxink": "Device → AI Provider (direct)", "subscription": "Device → Service Server → AI", "offline": "All on device" },
        "account": { "label": "Account Required", "voxink": "No", "subscription": "Yes", "offline": "No" },
        "pricing": { "label": "Pricing", "voxink": "BYOK (free tier available)", "subscription": "$10-30/month", "offline": "One-time purchase" },
        "openSource": { "label": "Open Source", "voxink": "Desktop: yes", "subscription": "No", "offline": "Partial" },
        "serverIntermediary": { "label": "Server Intermediary", "voxink": "No", "subscription": "Yes", "offline": "No" },
        "quality": { "label": "Recognition Quality", "voxink": "Cloud AI (high quality)", "subscription": "Cloud AI (high quality)", "offline": "Local model (limited)" },
        "platforms": { "label": "Platforms", "voxink": "Android + Desktop (3 OS)", "subscription": "macOS / Mac+Win", "offline": "Varies" }
      }
    }
  },
  "cta": {
    "title": "Experience the difference",
    "download": "Download VoxInk",
    "pricing": "See pricing"
  }
}
```

**Step 3: Update `nav` key**

Change `"privacy": "Privacy"` to `"compare": "Compare"`.

**Step 4: Add compare meta keys**

Replace `privacyTitle`/`privacyDescription` with:

```json
"compareTitle": "Why VoxInk? — Performance & Privacy Compared",
"compareDescription": "Tauri vs Electron performance comparison and privacy architecture analysis."
```

**Step 5: Verify JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/i18n/en.json','utf8')); console.log('OK')"`
Expected: `OK`

**Step 6: Commit**

```
git add src/i18n/en.json
git commit -m "feat: add English translations for compare page and lightweight banner"
```

---

### Task 3: Create LightweightBanner homepage component

**Files:**
- Create: `src/components/home/LightweightBanner.tsx`

**Step 1: Create the component**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const stats = ["size", "ram", "startup"] as const;
const statIcons: Record<string, string> = {
  size: "💾",
  ram: "🧠",
  startup: "⚡",
};

export default function LightweightBanner() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
          {t("lightweight.title")}
        </h2>
        <p className="text-center text-gray-500 mb-12">
          {t("lightweight.subtitle")}
        </p>

        {/* Bar chart */}
        <div className="max-w-2xl mx-auto mb-12 space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium text-gray-900">
                {t("lightweight.bar.voxink")}
              </span>
              <span className="text-gray-500">10MB</span>
            </div>
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: "3%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium text-gray-500">
                {t("lightweight.bar.wispr")}
              </span>
              <span className="text-gray-400">350MB</span>
            </div>
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-400 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-10">
          {stats.map((key) => (
            <div key={key} className="text-center">
              <div className="text-2xl mb-2">{statIcons[key]}</div>
              <div className="text-xl font-bold text-gray-900">
                {t(`lightweight.stats.${key}.value`)}
              </div>
              <div className="text-xs text-gray-500">
                {t(`lightweight.stats.${key}.label`)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to={`/${lang}/compare`}
            className="text-gray-900 font-medium hover:underline"
          >
            {t("lightweight.cta")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `cd /home/scipio/projects/voxink-website && npx tsc --noEmit`
Expected: No errors (may have some pre-existing ones; ensure no new ones from this file)

**Step 3: Commit**

```
git add src/components/home/LightweightBanner.tsx
git commit -m "feat: create LightweightBanner homepage component with bar chart"
```

---

### Task 4: Create Compare page

**Files:**
- Create: `src/pages/Compare.tsx`

**Step 1: Create the page component**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDocumentHead } from "../hooks/useDocumentHead";

const campKeys = ["native", "electron", "tauri"] as const;
const dimensionKeys = [
  "installSize",
  "ram",
  "startup",
  "platforms",
  "security",
] as const;
const architectureSections = ["byok", "zeroCollection", "encryption"] as const;
const comparisonRows = [
  "dataFlow",
  "account",
  "pricing",
  "openSource",
  "serverIntermediary",
  "quality",
  "platforms",
] as const;

const campStyles: Record<string, string> = {
  native: "border-gray-200 bg-white",
  electron: "border-red-200 bg-red-50",
  tauri: "border-emerald-500 border-2 bg-white",
};

export default function Compare() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  useDocumentHead(t("compare.meta.title"), t("compare.meta.description"));

  const quotesRaw = t("compare.tech.quotes.items", { returnObjects: true });
  const quotes = Array.isArray(quotesRaw)
    ? (quotesRaw as { text: string; source: string }[])
    : [];

  const risksRaw = t("compare.privacy.concerns.risks", {
    returnObjects: true,
  });
  const risks = Array.isArray(risksRaw) ? (risksRaw as string[]) : [];

  return (
    <div>
      {/* Hero */}
      <section className="py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {t("compare.hero.title")}
        </h1>
        <p className="text-lg text-gray-500">{t("compare.hero.subtitle")}</p>
      </section>

      {/* Section 1: Tech Lightweight */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            {t("compare.tech.title")}
          </h2>
          <p className="text-center text-gray-500 mb-12">
            {t("compare.tech.subtitle")}
          </p>

          {/* Three-camp cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {campKeys.map((camp) => (
              <div
                key={camp}
                className={`rounded-xl p-6 border ${campStyles[camp]} relative`}
              >
                {camp === "tauri" && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {t(`compare.tech.camps.${camp}.badge`)}
                  </span>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {t(`compare.tech.camps.${camp}.name`)}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {t(`compare.tech.camps.${camp}.representative`)}
                </p>
                <dl className="space-y-3">
                  {dimensionKeys.map((dim) => (
                    <div key={dim} className="flex justify-between text-sm">
                      <dt className="text-gray-500">
                        {t(`compare.tech.dimensions.${dim}`)}
                      </dt>
                      <dd className="font-medium text-gray-900">
                        {t(`compare.tech.camps.${camp}.${dim}`)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                  {(
                    t(`compare.tech.camps.${camp}.pros`, {
                      returnObjects: true,
                    }) as string[]
                  ).map((pro, i) => (
                    <p key={i} className="text-sm text-emerald-600">
                      ✓ {pro}
                    </p>
                  ))}
                  {(
                    t(`compare.tech.camps.${camp}.cons`, {
                      returnObjects: true,
                    }) as string[]
                  ).map((con, i) => (
                    <p key={i} className="text-sm text-red-500">
                      ✗ {con}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Why the difference */}
          <h3 className="text-xl font-bold text-center text-gray-900 mb-8">
            {t("compare.tech.why.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {(["electron", "tauri"] as const).map((side) => (
              <div
                key={side}
                className={`rounded-xl p-6 ${side === "electron" ? "bg-red-50 border border-red-200" : "bg-emerald-50 border border-emerald-200"}`}
              >
                <h4 className="font-semibold text-gray-900 mb-3">
                  {t(`compare.tech.why.${side}.title`)}
                </h4>
                <ul className="space-y-2">
                  {(
                    t(`compare.tech.why.${side}.items`, {
                      returnObjects: true,
                    }) as string[]
                  ).map((item, i) => (
                    <li key={i} className="text-sm text-gray-700 flex gap-2">
                      <span className="flex-shrink-0">
                        {side === "electron" ? "→" : "→"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* User quotes */}
          <h3 className="text-xl font-bold text-center text-gray-900 mb-8">
            {t("compare.tech.quotes.title")}
          </h3>
          <div className="max-w-2xl mx-auto space-y-4 mb-6">
            {quotes.map((quote, i) => (
              <blockquote
                key={i}
                className="border-l-4 border-gray-300 pl-4 py-2"
              >
                <p className="text-gray-700 italic">"{quote.text}"</p>
                <cite className="text-xs text-gray-400 not-italic">
                  — {quote.source}
                </cite>
              </blockquote>
            ))}
          </div>
          <p className="text-center text-gray-900 font-medium">
            {t("compare.tech.quotes.conclusion")}
          </p>
        </div>
      </section>

      {/* Section 2: Privacy Architecture */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            {t("compare.privacy.title")}
          </h2>
          <p className="text-center text-gray-500 mb-12">
            {t("compare.privacy.subtitle")}
          </p>

          {/* Data flow */}
          <div className="p-6 bg-gray-50 rounded-xl mb-12 text-center">
            <p className="text-lg font-mono text-gray-700">
              {t("compare.privacy.architecture.flow")}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {t("compare.privacy.architecture.noServer")}
            </p>
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {architectureSections.map((key) => (
              <div key={key}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(`compare.privacy.architecture.${key}.title`)}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(`compare.privacy.architecture.${key}.description`)}
                </p>
              </div>
            ))}
          </div>

          {/* Concerns */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t("compare.privacy.concerns.title")}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("compare.privacy.concerns.intro")}
            </p>
            <ul className="space-y-3">
              {risks.map((risk, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-gray-600 text-sm leading-relaxed"
                >
                  <span className="text-amber-500 flex-shrink-0 mt-0.5">
                    ⚠
                  </span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy comparison table */}
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {t("compare.privacy.comparison.title")}
          </h3>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 pr-4 font-semibold text-gray-900">
                    {t("compare.privacy.comparison.headers.feature")}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    {t("compare.privacy.comparison.headers.voxink")}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500">
                    {t("compare.privacy.comparison.headers.subscription")}
                  </th>
                  <th className="text-left py-3 pl-4 font-semibold text-gray-500">
                    {t("compare.privacy.comparison.headers.offline")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row} className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-gray-700 font-medium">
                      {t(`compare.privacy.comparison.rows.${row}.label`)}
                    </td>
                    <td className="py-3 px-4 text-gray-900 font-medium">
                      {t(`compare.privacy.comparison.rows.${row}.voxink`)}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {t(
                        `compare.privacy.comparison.rows.${row}.subscription`
                      )}
                    </td>
                    <td className="py-3 pl-4 text-gray-500">
                      {t(`compare.privacy.comparison.rows.${row}.offline`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("compare.cta.title")}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={`/${lang}/download`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {t("compare.cta.download")}
          </Link>
          <Link
            to={`/${lang}/pricing`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("compare.cta.pricing")}
          </Link>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `cd /home/scipio/projects/voxink-website && npx tsc --noEmit`

**Step 3: Commit**

```
git add src/pages/Compare.tsx
git commit -m "feat: create unified Compare page with tech and privacy sections"
```

---

### Task 5: Wire up routing and navigation

**Files:**
- Modify: `src/App.tsx:1-65`
- Modify: `src/components/layout/Navbar.tsx:31-37`
- Modify: `src/pages/Home.tsx:1-24`
- Modify: `src/components/home/PrivacyHighlight.tsx:33-34`

**Step 1: Update App.tsx — add Compare route, redirect /privacy**

Add import at top:
```tsx
import Compare from "./pages/Compare";
```

Replace the Privacy route line:
```tsx
<Route path="privacy" element={<Privacy />} />
```
with:
```tsx
<Route path="compare" element={<Compare />} />
<Route path="privacy" element={<Navigate to={`/${lang}/compare`} replace />} />
```

Note: The `/privacy` redirect needs the `lang` param. Wrap it in a small component:

```tsx
function PrivacyRedirect() {
  const { lang } = useParams<{ lang: string }>();
  return <Navigate to={`/${lang}/compare`} replace />;
}
```

Then use:
```tsx
<Route path="compare" element={<Compare />} />
<Route path="privacy" element={<PrivacyRedirect />} />
```

The Privacy import can be removed.

**Step 2: Update Navbar.tsx — replace Privacy link with Compare**

In the `links` array (line 31-37), change:
```tsx
{ href: `${base}/privacy`, label: t("nav.privacy"), isHash: false },
```
to:
```tsx
{ href: `${base}/compare`, label: t("nav.compare"), isHash: false },
```

**Step 3: Update Home.tsx — add LightweightBanner after Platforms**

Add import:
```tsx
import LightweightBanner from "../components/home/LightweightBanner";
```

Add after `<Platforms />`:
```tsx
<LightweightBanner />
```

**Step 4: Update PrivacyHighlight.tsx — change CTA link from /privacy to /compare**

Change line 34:
```tsx
to={`/${lang}/privacy`}
```
to:
```tsx
to={`/${lang}/compare`}
```

**Step 5: Verify dev server runs**

Run: `cd /home/scipio/projects/voxink-website && pnpm dev`
Expected: No errors, dev server starts

**Step 6: Commit**

```
git add src/App.tsx src/components/layout/Navbar.tsx src/pages/Home.tsx src/components/home/PrivacyHighlight.tsx
git commit -m "feat: wire up compare page routing, update navigation and homepage"
```

---

### Task 6: Delete old Privacy page and clean up

**Files:**
- Delete: `src/pages/Privacy.tsx`
- Modify: `src/App.tsx` — remove Privacy import

**Step 1: Remove Privacy import from App.tsx**

Delete this line:
```tsx
import Privacy from "./pages/Privacy";
```

**Step 2: Delete Privacy.tsx**

```bash
rm src/pages/Privacy.tsx
```

**Step 3: Verify build succeeds**

Run: `cd /home/scipio/projects/voxink-website && pnpm build`
Expected: Build succeeds with no errors

**Step 4: Commit**

```
git add -A
git commit -m "refactor: remove standalone Privacy page, content migrated to Compare"
```

---

### Task 7: Visual verification and final build

**Step 1: Run dev server and verify all routes**

Run: `cd /home/scipio/projects/voxink-website && pnpm dev`

Verify these routes work:
- `/zh-tw/` — homepage shows LightweightBanner after Platforms
- `/zh-tw/compare` — full comparison page renders correctly
- `/zh-tw/privacy` — redirects to `/zh-tw/compare`
- `/en/compare` — English version renders correctly
- `/en/privacy` — redirects to `/en/compare`
- Navigation bar shows "比較" / "Compare" instead of "隱私" / "Privacy"
- PrivacyHighlight CTA on homepage links to /compare

**Step 2: Run production build**

Run: `cd /home/scipio/projects/voxink-website && pnpm build`
Expected: Build succeeds

**Step 3: Run lint**

Run: `cd /home/scipio/projects/voxink-website && pnpm lint`
Expected: No new lint errors

**Step 4: Final commit if any fixes needed**

```
git add -A
git commit -m "fix: address lint/build issues from compare page integration"
```

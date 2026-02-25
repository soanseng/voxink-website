# VoxInk Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bilingual (繁中 + English) landing page for VoxInk with product intro, Groq API guide, privacy page, and download page.

**Architecture:** Vite + React SPA with React Router v7 for `/:lang/` route-based i18n. react-i18next for translations. Tailwind CSS for styling. react-helmet-async for SEO meta tags. Pure static deployment (no SSR needed for v1; prerendering can be added later).

**Tech Stack:** Vite 6, React 19, TypeScript 5, React Router v7, react-i18next, Tailwind CSS v3, react-helmet-async

**Design Doc:** `docs/plans/2026-02-25-landing-page-design.md`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `postcss.config.js`
- Create: `tailwind.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/vite-env.d.ts`
- Create: `.gitignore`

**Step 1: Initialize project with pnpm**

```bash
cd /home/scipio/projects/voxink-website
pnpm init
```

**Step 2: Install dependencies**

```bash
pnpm add react@^19 react-dom@^19 react-router-dom@^7 i18next@^25 react-i18next@^16 react-helmet-async
pnpm add -D typescript@^5 vite@^6 @vitejs/plugin-react@^4 tailwindcss@^3 postcss@^8 autoprefixer@^10 @types/react@^19 @types/react-dom@^19
```

**Step 3: Create vite.config.ts**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 3000,
    strictPort: true,
  },
});
```

**Step 4: Create tsconfig.json**

Match desktop pattern:

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "useDefineForClassFields": true,
    "lib": ["ES2021", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src"]
}
```

**Step 5: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

**Step 6: Create tailwind.config.js**

Match desktop pattern:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Step 7: Create postcss.config.js**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**Step 8: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>語墨 VoxInk — AI 語音輸入</title>
    <meta name="description" content="出一支嘴，剩下交給語墨。AI 語音輸入鍵盤，支援 Android、Windows、Linux。" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 9: Create src/vite-env.d.ts**

```typescript
/// <reference types="vite/client" />
```

**Step 10: Create src/main.tsx (minimal)**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <div>VoxInk</div>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Step 11: Create .gitignore**

```
node_modules/
dist/
.env
.env.local
*.local
```

**Step 12: Verify build works**

```bash
pnpm dev &
# Check http://localhost:3000 renders "VoxInk"
# Then kill the dev server
pnpm build
# Verify dist/ directory is created
```

**Step 13: Commit**

```bash
git add package.json pnpm-lock.yaml vite.config.ts tsconfig.json tsconfig.node.json postcss.config.js tailwind.config.js index.html src/main.tsx src/vite-env.d.ts .gitignore
git commit -m "feat: scaffold Vite + React + TypeScript + Tailwind project"
```

---

### Task 2: Tailwind CSS + Global Styles

**Files:**
- Create: `src/index.css`
- Modify: `src/main.tsx` (import CSS)

**Step 1: Create src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-gray-900 antialiased;
  }
}
```

**Step 2: Import CSS in main.tsx**

Add `import "./index.css";` at the top of `src/main.tsx`.

**Step 3: Verify Tailwind works**

Update the App div to use a Tailwind class:

```tsx
return <div className="text-2xl font-bold p-8">VoxInk</div>;
```

```bash
pnpm dev
# Verify text is bold and large at http://localhost:3000
```

**Step 4: Commit**

```bash
git add src/index.css src/main.tsx
git commit -m "feat: add Tailwind CSS global styles"
```

---

### Task 3: i18n Setup + Translation Files

**Files:**
- Create: `src/i18n/index.ts`
- Create: `src/i18n/zh-tw.json`
- Create: `src/i18n/en.json`
- Modify: `src/main.tsx` (import i18n)

**Step 1: Create src/i18n/index.ts**

Match desktop pattern (`src/lib/i18n.ts`):

```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zhTW from "./zh-tw.json";
import en from "./en.json";

i18n.use(initReactI18next).init({
  resources: {
    "zh-tw": { translation: zhTW },
    en: { translation: en },
  },
  lng: "zh-tw",
  fallbackLng: "zh-tw",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

Note: Desktop uses `zh-TW` as locale key. Website uses `zh-tw` for URL-friendly routes. Both reference the same language.

**Step 2: Create src/i18n/zh-tw.json**

```json
{
  "meta": {
    "title": "語墨 VoxInk — AI 語音輸入",
    "description": "出一支嘴，剩下交給語墨。AI 語音輸入鍵盤，支援 Android、Windows、Linux。"
  },
  "nav": {
    "features": "功能",
    "guide": "教學",
    "privacy": "隱私",
    "download": "下載"
  },
  "hero": {
    "headline": "出一支嘴，剩下交給語墨",
    "subtitle": "AI 語音輸入，支援 Android / Windows / Linux，用你自己的 API key，無訂閱費",
    "cta": {
      "download": "下載 {{platform}} 版",
      "allPlatforms": "查看所有平台"
    }
  },
  "features": {
    "title": "功能亮點",
    "speed": {
      "title": "極速轉錄",
      "description": "Groq Whisper 語音辨識，0.5 秒出結果，全球最快推論速度"
    },
    "refine": {
      "title": "智慧潤飾",
      "description": "AI 自動去除贅字、修正文法、加上標點，說話就是完稿"
    },
    "multilang": {
      "title": "多語混打",
      "description": "繁體中文、English、日本語，中英混合也通，自動偵測語言"
    },
    "transcribe": {
      "title": "檔案轉錄",
      "description": "音檔、影片直接轉文字，支援 SRT 字幕格式匯出"
    }
  },
  "privacy": {
    "title": "你的聲音，只屬於你",
    "byok": {
      "title": "自帶 API Key",
      "description": "用你自己的 Groq / OpenAI key，無需訂閱，費用自控"
    },
    "zeroCollection": {
      "title": "零資料收集",
      "description": "無帳號註冊、無使用追蹤、無遙測回傳，完全匿名使用"
    },
    "directApi": {
      "title": "直連 API",
      "description": "語音直接傳送到你選擇的 AI 供應商，不經過語墨伺服器"
    },
    "cta": "了解更多"
  },
  "howItWorks": {
    "title": "怎麼用？",
    "steps": [
      "到 groq.com 免費註冊，取得 API key",
      "安裝語墨，在設定裡貼上 API key",
      "啟用語墨鍵盤（Android）或按下快捷鍵（電腦）",
      "開始說話",
      "潤飾好的文字自動輸入完成"
    ],
    "cta": "詳細教學"
  },
  "platforms": {
    "title": "支援平台",
    "android": {
      "name": "Android",
      "description": "語音鍵盤，在任何 app 中使用",
      "requirement": "Android 8.0 以上",
      "cta": "下載 APK"
    },
    "windows": {
      "name": "Windows",
      "description": "系統匣常駐，快捷鍵一按即錄",
      "requirement": "Windows 10 以上",
      "cta": "下載安裝檔"
    },
    "linux": {
      "name": "Linux",
      "description": "AppImage 免安裝，支援 X11 與 Wayland",
      "requirement": "主流發行版",
      "cta": "下載 AppImage"
    },
    "macos": {
      "name": "macOS",
      "description": "即將推出",
      "cta": "即將推出"
    }
  },
  "footer": {
    "description": "AI 語音輸入，開源、隱私優先",
    "madeIn": "做佇台灣",
    "links": {
      "github": "GitHub",
      "privacy": "隱私權",
      "guide": "使用教學"
    }
  },
  "lang": {
    "zhTw": "繁中",
    "en": "EN"
  },
  "guide": {
    "title": "五分鐘上手語墨",
    "subtitle": "從註冊 Groq 到開始語音輸入，完整圖文教學",
    "step1": {
      "title": "Step 1：註冊 Groq 帳號",
      "description": "前往 groq.com，點擊右上角「Sign Up」，使用 Google 或 Email 註冊。"
    },
    "step2": {
      "title": "Step 2：取得 API Key",
      "description": "登入後進入 Console，點擊左側「API Keys」，再點「Create API Key」。複製產生的 key，妥善保存。"
    },
    "step3": {
      "title": "Step 3：安裝語墨",
      "tabs": {
        "android": "Android",
        "windows": "Windows",
        "linux": "Linux"
      },
      "android": "從 Google Play 或 GitHub Releases 下載 APK，安裝後開啟 app。",
      "windows": "從 GitHub Releases 下載安裝檔（.exe），執行安裝精靈。",
      "linux": "從 GitHub Releases 下載 AppImage，執行 chmod +x 後雙擊開啟。"
    },
    "step4": {
      "title": "Step 4：設定 API Key",
      "description": "打開語墨設定頁面，找到「Speech」或「語音」設定，選擇 Groq 作為供應商，貼上你的 API key，點擊測試確認連線成功。"
    },
    "step5": {
      "title": "Step 5：開始使用",
      "android": "到系統設定 → 語言與輸入 → 啟用「語墨語音鍵盤」，在任何 app 切換到語墨，點麥克風按鈕開始說話。",
      "desktop": "按下快捷鍵（預設 Ctrl+Shift+V），開始說話，放開後文字自動貼上。"
    },
    "cost": {
      "title": "費用說明",
      "description": "Groq 提供免費方案，每日有一定額度的 API 呼叫次數。一般日常使用（每天數十次語音輸入）通常不會超過免費額度。如需更大用量，Groq 也提供付費方案，按用量計費。"
    },
    "faq": {
      "title": "常見問題",
      "q1": {
        "question": "API key 忘記了怎麼辦？",
        "answer": "登入 Groq Console，在 API Keys 頁面可以查看或重新產生新的 key。"
      },
      "q2": {
        "question": "語音辨識不準確？",
        "answer": "確認語言設定正確（中文/英文/自動偵測），在安靜環境下使用效果最佳。也可以開啟「智慧潤飾」讓 AI 自動修正。"
      },
      "q3": {
        "question": "可以用 OpenAI 替代 Groq 嗎？",
        "answer": "可以。在設定中將供應商切換為 OpenAI，貼上你的 OpenAI API key 即可。但 Groq 的推論速度更快且有免費方案。"
      },
      "q4": {
        "question": "沒有網路可以用嗎？",
        "answer": "語墨需要網路連線來呼叫 AI API。離線時無法使用語音辨識和潤飾功能。"
      }
    }
  },
  "privacyPage": {
    "title": "家己的聲音家己顧",
    "subtitle": "VoxInk 的隱私架構，為什麼你的資料只屬於你",
    "architecture": {
      "title": "語墨的隱私設計",
      "flow": "你的裝置 → 直連 AI 供應商 → 回傳文字 → 本地儲存",
      "noServer": "全程沒有語墨伺服器經手你的資料",
      "byok": {
        "title": "BYOK 模式",
        "description": "Bring Your Own Key — 你自己申請 API key，語音資料直接傳送到你選擇的 AI 供應商（Groq、OpenAI 等）。語墨不代管、不轉傳、不儲存。"
      },
      "zeroCollection": {
        "title": "零收集政策",
        "description": "語墨不要求註冊帳號，不追蹤使用行為，不回傳任何遙測資料。App 內沒有分析工具、沒有錯誤回報、沒有「匿名使用統計」。"
      },
      "encryption": {
        "title": "本地加密儲存",
        "description": "API key 在裝置上以 Android Keystore（Android）或 Tauri 加密儲存（Desktop）保護。轉錄紀錄儲存在本地資料庫，你隨時可以刪除。"
      }
    },
    "concerns": {
      "title": "語音輸入服務的隱私隱憂",
      "intro": "部分訂閱制語音輸入服務存在以下資料流風險：",
      "risks": [
        "你的語音先傳送到服務商伺服器，再轉傳給 AI 供應商 — 多了一層經手",
        "需要建立帳號並綁定付款資訊，身份與使用紀錄可被關聯",
        "使用行為可能被追蹤用於「改善服務」或「個人化推薦」",
        "伺服器端可能暫存或記錄語音資料，即使聲稱「不儲存」"
      ],
      "links": "相關討論與報導"
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
        "dataFlow": {
          "label": "資料流向",
          "voxink": "裝置 → AI 供應商（直連）",
          "subscription": "裝置 → 服務商伺服器 → AI 供應商",
          "offline": "全部在裝置上"
        },
        "account": {
          "label": "需要帳號",
          "voxink": "否",
          "subscription": "是",
          "offline": "否"
        },
        "pricing": {
          "label": "收費模式",
          "voxink": "BYOK（免費方案可用）",
          "subscription": "月費 $10-30 USD",
          "offline": "一次買斷"
        },
        "openSource": {
          "label": "開源",
          "voxink": "是",
          "subscription": "否",
          "offline": "部分"
        },
        "serverIntermediary": {
          "label": "伺服器經手",
          "voxink": "否",
          "subscription": "是",
          "offline": "否"
        }
      }
    }
  },
  "download": {
    "title": "下載語墨",
    "subtitle": "選擇你的平台",
    "detected": "偵測到你的系統：{{platform}}",
    "version": "版本 {{version}}",
    "updatedAt": "更新於 {{date}}",
    "changelog": "查看完整更新紀錄",
    "requirements": "系統需求",
    "installSteps": "安裝步驟",
    "android": {
      "playStore": "Google Play 下載",
      "apk": "APK 直接下載",
      "requirement": "Android 8.0（API 26）以上",
      "steps": "從 Play Store 安裝，或下載 APK 後允許安裝未知來源 app。"
    },
    "windows": {
      "installer": "下載安裝檔（.exe）",
      "requirement": "Windows 10 以上，WebView2 Runtime",
      "steps": "執行安裝檔，依照精靈完成安裝。語墨會出現在系統匣。"
    },
    "linux": {
      "appimage": "下載 AppImage",
      "requirement": "主流 Linux 發行版，支援 X11 / Wayland",
      "steps": "下載後執行 chmod +x VoxInk.AppImage，雙擊或從終端執行。"
    },
    "macos": {
      "comingSoon": "macOS 版即將推出"
    }
  }
}
```

**Step 3: Create src/i18n/en.json (placeholder — minimal for now)**

```json
{
  "meta": {
    "title": "VoxInk — AI Voice Input",
    "description": "Just speak, VoxInk writes for you. AI voice keyboard for Android, Windows, and Linux."
  },
  "nav": {
    "features": "Features",
    "guide": "Guide",
    "privacy": "Privacy",
    "download": "Download"
  },
  "lang": {
    "zhTw": "繁中",
    "en": "EN"
  }
}
```

English translations will be completed in a follow-up task. For now, only the keys needed for language switching are included.

**Step 4: Import i18n in src/main.tsx**

Add `import "./i18n";` at the top of main.tsx (before React imports).

**Step 5: Verify i18n works**

Update App component to use `useTranslation`:

```tsx
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return <div className="text-2xl font-bold p-8">{t("hero.headline")}</div>;
}
```

```bash
pnpm dev
# Verify "出一支嘴，剩下交給語墨" renders at http://localhost:3000
```

**Step 6: Commit**

```bash
git add src/i18n/
git commit -m "feat: add i18n setup with zh-tw and en translation files"
```

---

### Task 4: React Router + Language Routing

**Files:**
- Create: `src/App.tsx`
- Create: `src/pages/Home.tsx`
- Create: `src/hooks/usePlatformDetect.ts`
- Modify: `src/main.tsx` (use App with Router)

**Step 1: Create src/hooks/usePlatformDetect.ts**

```typescript
export type Platform = "android" | "windows" | "linux" | "macos" | "unknown";

export function usePlatformDetect(): Platform {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("android")) return "android";
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "macos";
  if (ua.includes("linux")) return "linux";
  return "unknown";
}
```

**Step 2: Create src/App.tsx**

```tsx
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";

const SUPPORTED_LANGS = ["zh-tw", "en"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

function LangProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && SUPPORTED_LANGS.includes(lang as Lang)) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <>{children}</>;
}

function detectLanguage(): Lang {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("zh")) return "zh-tw";
  return "en";
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${detectLanguage()}/`} replace />} />
        <Route
          path="/:lang/*"
          element={
            <LangProvider>
              <Routes>
                <Route index element={<Home />} />
              </Routes>
            </LangProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```

**Step 3: Create src/pages/Home.tsx (placeholder)**

```tsx
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <main>
      <h1 className="text-4xl font-bold p-8">{t("hero.headline")}</h1>
      <p className="px-8 text-lg text-gray-600">{t("hero.subtitle")}</p>
    </main>
  );
}
```

**Step 4: Update src/main.tsx**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Step 5: Verify routing works**

```bash
pnpm dev
# http://localhost:3000 → redirects to /zh-tw/
# http://localhost:3000/zh-tw/ → shows 「出一支嘴，剩下交給語墨」
# http://localhost:3000/en/ → shows English fallback
```

**Step 6: Commit**

```bash
git add src/App.tsx src/pages/Home.tsx src/hooks/usePlatformDetect.ts src/main.tsx
git commit -m "feat: add React Router with language-based routing"
```

---

### Task 5: Layout Components (Navbar + Footer)

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/Layout.tsx`
- Create: `src/components/ui/LangSwitcher.tsx`
- Modify: `src/App.tsx` (wrap routes in Layout)

**Step 1: Create src/components/ui/LangSwitcher.tsx**

```tsx
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LangSwitcher() {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  function switchLang() {
    const newLang = lang === "zh-tw" ? "en" : "zh-tw";
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
    navigate(newPath);
  }

  return (
    <button
      onClick={switchLang}
      className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-1 rounded-md hover:bg-gray-100"
    >
      {lang === "zh-tw" ? t("lang.en") : t("lang.zhTw")}
    </button>
  );
}
```

**Step 2: Create src/components/layout/Navbar.tsx**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangSwitcher from "../ui/LangSwitcher";

export default function Navbar() {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const base = `/${lang}`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={base} className="text-xl font-bold text-gray-900">
          語墨 <span className="text-gray-400 font-normal">VoxInk</span>
        </Link>
        <div className="flex items-center gap-6">
          <a href={`${base}/#features`} className="text-sm text-gray-600 hover:text-gray-900">
            {t("nav.features")}
          </a>
          <Link to={`${base}/guide`} className="text-sm text-gray-600 hover:text-gray-900">
            {t("nav.guide")}
          </Link>
          <Link to={`${base}/privacy`} className="text-sm text-gray-600 hover:text-gray-900">
            {t("nav.privacy")}
          </Link>
          <Link to={`${base}/download`} className="text-sm text-gray-600 hover:text-gray-900">
            {t("nav.download")}
          </Link>
          <LangSwitcher />
        </div>
      </nav>
    </header>
  );
}
```

**Step 3: Create src/components/layout/Footer.tsx**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const base = `/${lang}`;

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="text-lg font-bold text-gray-900">語墨 VoxInk</p>
            <p className="text-sm text-gray-500 mt-1">{t("footer.description")}</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a
              href="https://github.com/soanseng"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              {t("footer.links.github")}
            </a>
            <Link to={`${base}/privacy`} className="hover:text-gray-900">
              {t("footer.links.privacy")}
            </Link>
            <Link to={`${base}/guide`} className="hover:text-gray-900">
              {t("footer.links.guide")}
            </Link>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-8 text-center">{t("footer.madeIn")}</p>
      </div>
    </footer>
  );
}
```

**Step 4: Create src/components/layout/Layout.tsx**

```tsx
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

**Step 5: Update src/App.tsx to use Layout**

Wrap the inner `<Routes>` with `<Layout>`:

```tsx
<LangProvider>
  <Layout>
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  </Layout>
</LangProvider>
```

Import Layout at top: `import Layout from "./components/layout/Layout";`

**Step 6: Verify layout renders**

```bash
pnpm dev
# Verify navbar with logo + links at top
# Verify footer with "做佇台灣" at bottom
# Verify language switcher toggles between /zh-tw/ and /en/
```

**Step 7: Commit**

```bash
git add src/components/ src/App.tsx
git commit -m "feat: add Navbar, Footer, Layout with language switcher"
```

---

### Task 6: Homepage — Hero Section

**Files:**
- Create: `src/components/home/Hero.tsx`
- Modify: `src/pages/Home.tsx` (add Hero)

**Step 1: Create src/components/home/Hero.tsx**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePlatformDetect } from "../../hooks/usePlatformDetect";

const platformNames: Record<string, string> = {
  android: "Android",
  windows: "Windows",
  linux: "Linux",
  macos: "Desktop",
};

export default function Hero() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const platform = usePlatformDetect();

  const ctaLabel =
    platform !== "unknown"
      ? t("hero.cta.download", { platform: platformNames[platform] })
      : t("nav.download");

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 leading-tight">
          {t("hero.headline")}
        </h1>
        <p className="mt-6 text-xl text-gray-500 leading-relaxed">
          {t("hero.subtitle")}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={`/${lang}/download`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {ctaLabel}
          </Link>
          <Link
            to={`/${lang}/download`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {t("hero.cta.allPlatforms")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Update src/pages/Home.tsx**

```tsx
import Hero from "../components/home/Hero";

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
```

**Step 3: Verify hero renders**

```bash
pnpm dev
# Verify headline, subtitle, and two CTA buttons render
# Verify CTA text adapts to detected platform
```

**Step 4: Commit**

```bash
git add src/components/home/Hero.tsx src/pages/Home.tsx
git commit -m "feat: add Hero section with platform-detected CTA"
```

---

### Task 7: Homepage — Features Section

**Files:**
- Create: `src/components/home/Features.tsx`
- Modify: `src/pages/Home.tsx` (add Features)

**Step 1: Create src/components/home/Features.tsx**

```tsx
import { useTranslation } from "react-i18next";

const featureKeys = ["speed", "refine", "multilang", "transcribe"] as const;

const featureIcons: Record<string, string> = {
  speed: "⚡",
  refine: "✨",
  multilang: "🌏",
  transcribe: "📄",
};

export default function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t("features.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureKeys.map((key) => (
            <div key={key} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">{featureIcons[key]}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`features.${key}.title`)}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(`features.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add Features to Home.tsx**

```tsx
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
```

**Step 3: Verify features render**

```bash
pnpm dev
# Verify 4 feature cards render with icons, titles, descriptions
```

**Step 4: Commit**

```bash
git add src/components/home/Features.tsx src/pages/Home.tsx
git commit -m "feat: add Features section with 4 feature cards"
```

---

### Task 8: Homepage — Privacy Highlight + How It Works + Platforms

**Files:**
- Create: `src/components/home/PrivacyHighlight.tsx`
- Create: `src/components/home/HowItWorks.tsx`
- Create: `src/components/home/Platforms.tsx`
- Modify: `src/pages/Home.tsx` (add all three)

**Step 1: Create src/components/home/PrivacyHighlight.tsx**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const pillars = [
  { key: "byok", icon: "🔑" },
  { key: "zeroCollection", icon: "🚫" },
  { key: "directApi", icon: "🔒" },
] as const;

export default function PrivacyHighlight() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          {t("privacy.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {pillars.map(({ key, icon }) => (
            <div key={key}>
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`privacy.${key}.title`)}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(`privacy.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
        <Link
          to={`/${lang}/privacy`}
          className="text-gray-900 font-medium hover:underline"
        >
          {t("privacy.cta")} →
        </Link>
      </div>
    </section>
  );
}
```

**Step 2: Create src/components/home/HowItWorks.tsx**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const steps = t("howItWorks.steps", { returnObjects: true }) as string[];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t("howItWorks.title")}
        </h2>
        <ol className="space-y-6">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <p className="text-gray-700 pt-1">{step}</p>
            </li>
          ))}
        </ol>
        <div className="text-center mt-10">
          <Link
            to={`/${lang}/guide`}
            className="text-gray-900 font-medium hover:underline"
          >
            {t("howItWorks.cta")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Create src/components/home/Platforms.tsx**

```tsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const platforms = [
  { key: "android", icon: "📱" },
  { key: "windows", icon: "🖥️" },
  { key: "linux", icon: "🐧" },
] as const;

export default function Platforms() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t("platforms.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map(({ key, icon }) => (
            <div key={key} className="text-center p-8 rounded-xl border border-gray-200">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(`platforms.${key}.name`)}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {t(`platforms.${key}.description`)}
              </p>
              <p className="text-xs text-gray-400 mb-4">
                {t(`platforms.${key}.requirement`)}
              </p>
              <Link
                to={`/${lang}/download`}
                className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {t(`platforms.${key}.cta`)}
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            macOS — {t("platforms.macos.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
```

**Step 4: Update src/pages/Home.tsx with all sections**

```tsx
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import PrivacyHighlight from "../components/home/PrivacyHighlight";
import HowItWorks from "../components/home/HowItWorks";
import Platforms from "../components/home/Platforms";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <PrivacyHighlight />
      <HowItWorks />
      <Platforms />
    </>
  );
}
```

**Step 5: Verify all homepage sections render**

```bash
pnpm dev
# Scroll through all sections:
# Hero → Features → Privacy → How It Works → Platforms → Footer
```

**Step 6: Commit**

```bash
git add src/components/home/ src/pages/Home.tsx
git commit -m "feat: add Privacy, HowItWorks, Platforms homepage sections"
```

---

### Task 9: Guide Page

**Files:**
- Create: `src/pages/Guide.tsx`
- Modify: `src/App.tsx` (add route)

**Step 1: Create src/pages/Guide.tsx**

```tsx
import { useTranslation } from "react-i18next";
import { useState } from "react";

const tabs = ["android", "windows", "linux"] as const;

export default function Guide() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("android");

  const faqKeys = ["q1", "q2", "q3", "q4"] as const;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("guide.title")}</h1>
      <p className="text-lg text-gray-500 mb-12">{t("guide.subtitle")}</p>

      {/* Steps 1-2 */}
      <section className="space-y-10 mb-12">
        {(["step1", "step2"] as const).map((step) => (
          <div key={step}>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t(`guide.${step}.title`)}
            </h2>
            <p className="text-gray-600">{t(`guide.${step}.description`)}</p>
          </div>
        ))}
      </section>

      {/* Step 3 with tabs */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t("guide.step3.title")}
        </h2>
        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t(`guide.step3.tabs.${tab}`)}
            </button>
          ))}
        </div>
        <p className="text-gray-600">{t(`guide.step3.${activeTab}`)}</p>
      </section>

      {/* Steps 4-5 */}
      <section className="space-y-10 mb-12">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t("guide.step4.title")}
          </h2>
          <p className="text-gray-600">{t("guide.step4.description")}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t("guide.step5.title")}
          </h2>
          <p className="text-gray-600 mb-2">{t("guide.step5.android")}</p>
          <p className="text-gray-600">{t("guide.step5.desktop")}</p>
        </div>
      </section>

      {/* Cost */}
      <section className="mb-12 p-6 bg-gray-50 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {t("guide.cost.title")}
        </h2>
        <p className="text-gray-600">{t("guide.cost.description")}</p>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("guide.faq.title")}</h2>
        <div className="space-y-6">
          {faqKeys.map((key) => (
            <div key={key}>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {t(`guide.faq.${key}.question`)}
              </h3>
              <p className="text-gray-600 text-sm">{t(`guide.faq.${key}.answer`)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Add route in src/App.tsx**

Import Guide: `import Guide from "./pages/Guide";`

Add route inside the inner `<Routes>`:

```tsx
<Route path="guide" element={<Guide />} />
```

**Step 3: Verify guide page**

```bash
pnpm dev
# Navigate to http://localhost:3000/zh-tw/guide
# Verify all steps render, tab switching works
```

**Step 4: Commit**

```bash
git add src/pages/Guide.tsx src/App.tsx
git commit -m "feat: add Guide page with step-by-step Groq API tutorial"
```

---

### Task 10: Privacy Page

**Files:**
- Create: `src/pages/Privacy.tsx`
- Modify: `src/App.tsx` (add route)

**Step 1: Create src/pages/Privacy.tsx**

```tsx
import { useTranslation } from "react-i18next";

const architectureSections = ["byok", "zeroCollection", "encryption"] as const;
const comparisonRows = ["dataFlow", "account", "pricing", "openSource", "serverIntermediary"] as const;

export default function Privacy() {
  const { t } = useTranslation();
  const risks = t("privacyPage.concerns.risks", { returnObjects: true }) as string[];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {t("privacyPage.title")}
      </h1>
      <p className="text-lg text-gray-500 mb-12">{t("privacyPage.subtitle")}</p>

      {/* Architecture */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("privacyPage.architecture.title")}
        </h2>
        <div className="p-6 bg-gray-50 rounded-xl mb-6 text-center">
          <p className="text-lg font-mono text-gray-700">
            {t("privacyPage.architecture.flow")}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t("privacyPage.architecture.noServer")}
          </p>
        </div>
        <div className="space-y-8">
          {architectureSections.map((key) => (
            <div key={key}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`privacyPage.architecture.${key}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`privacyPage.architecture.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Concerns */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("privacyPage.concerns.title")}
        </h2>
        <p className="text-gray-600 mb-4">{t("privacyPage.concerns.intro")}</p>
        <ul className="space-y-3">
          {risks.map((risk, i) => (
            <li key={i} className="flex gap-3 text-gray-600 text-sm">
              <span className="text-red-400 flex-shrink-0">⚠</span>
              {risk}
            </li>
          ))}
        </ul>
      </section>

      {/* Comparison Table */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("privacyPage.comparison.title")}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 pr-4 font-semibold text-gray-900">
                  {t("privacyPage.comparison.headers.feature")}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  {t("privacyPage.comparison.headers.voxink")}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-500">
                  {t("privacyPage.comparison.headers.subscription")}
                </th>
                <th className="text-left py-3 pl-4 font-semibold text-gray-500">
                  {t("privacyPage.comparison.headers.offline")}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row} className="border-b border-gray-100">
                  <td className="py-3 pr-4 text-gray-700">
                    {t(`privacyPage.comparison.rows.${row}.label`)}
                  </td>
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {t(`privacyPage.comparison.rows.${row}.voxink`)}
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {t(`privacyPage.comparison.rows.${row}.subscription`)}
                  </td>
                  <td className="py-3 pl-4 text-gray-500">
                    {t(`privacyPage.comparison.rows.${row}.offline`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Add route in src/App.tsx**

Import: `import Privacy from "./pages/Privacy";`

Add route: `<Route path="privacy" element={<Privacy />} />`

**Step 3: Verify privacy page**

```bash
pnpm dev
# Navigate to http://localhost:3000/zh-tw/privacy
# Verify architecture diagram, concerns list, comparison table render
```

**Step 4: Commit**

```bash
git add src/pages/Privacy.tsx src/App.tsx
git commit -m "feat: add Privacy page with architecture diagram and comparison table"
```

---

### Task 11: Download Page

**Files:**
- Create: `src/pages/Download.tsx`
- Modify: `src/App.tsx` (add route)

**Step 1: Create src/pages/Download.tsx**

```tsx
import { useTranslation } from "react-i18next";
import { usePlatformDetect } from "../hooks/usePlatformDetect";

const platforms = [
  { key: "android", icon: "📱" },
  { key: "windows", icon: "🖥️" },
  { key: "linux", icon: "🐧" },
] as const;

export default function Download() {
  const { t } = useTranslation();
  const detected = usePlatformDetect();

  // Sort: detected platform first
  const sorted = [...platforms].sort((a, b) => {
    if (a.key === detected) return -1;
    if (b.key === detected) return 1;
    return 0;
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {t("download.title")}
      </h1>
      <p className="text-lg text-gray-500 mb-12">{t("download.subtitle")}</p>

      <div className="space-y-8">
        {sorted.map(({ key, icon }) => (
          <div
            key={key}
            className={`p-8 rounded-xl border ${
              key === detected ? "border-gray-900 ring-1 ring-gray-900" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">{icon}</span>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t(`platforms.${key}.name`)}
                </h2>
                {key === detected && (
                  <p className="text-sm text-green-600">
                    {t("download.detected", { platform: t(`platforms.${key}.name`) })}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              <strong>{t("download.requirements")}:</strong> {t(`download.${key}.requirement`)}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <strong>{t("download.installSteps")}:</strong> {t(`download.${key}.steps`)}
            </p>
            {/* Download buttons — placeholder hrefs, replace with real URLs */}
            <div className="flex gap-3">
              <a
                href="#"
                className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {key === "android" ? t("download.android.apk") : key === "windows" ? t("download.windows.installer") : t("download.linux.appimage")}
              </a>
              {key === "android" && (
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t("download.android.playStore")}
                </a>
              )}
            </div>
          </div>
        ))}

        {/* macOS */}
        <div className="p-8 rounded-xl border border-gray-200 bg-gray-50 text-center">
          <span className="text-3xl">🍎</span>
          <p className="text-gray-400 mt-2">{t("download.macos.comingSoon")}</p>
        </div>
      </div>

      {/* Version + Changelog */}
      <div className="mt-12 text-center text-sm text-gray-400">
        <a
          href="https://github.com/soanseng/voxink-desktop/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600"
        >
          {t("download.changelog")}
        </a>
      </div>
    </div>
  );
}
```

**Step 2: Add route in src/App.tsx**

Import: `import Download from "./pages/Download";`

Add route: `<Route path="download" element={<Download />} />`

**Step 3: Verify download page**

```bash
pnpm dev
# Navigate to http://localhost:3000/zh-tw/download
# Verify detected platform is highlighted with ring
# Verify all platform cards render with download buttons
```

**Step 4: Commit**

```bash
git add src/pages/Download.tsx src/App.tsx
git commit -m "feat: add Download page with platform detection"
```

---

### Task 12: SEO Meta Tags

**Files:**
- Create: `src/utils/seo.ts`
- Modify: `src/main.tsx` (add HelmetProvider)
- Modify: `src/pages/Home.tsx` (add Helmet)
- Modify: `src/pages/Guide.tsx` (add Helmet)
- Modify: `src/pages/Privacy.tsx` (add Helmet)
- Modify: `src/pages/Download.tsx` (add Helmet)

**Step 1: Wrap app in HelmetProvider**

In `src/main.tsx`, import and wrap:

```tsx
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
```

**Step 2: Add Helmet to each page**

Each page adds at the top of its JSX:

```tsx
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// Inside the component:
const { t } = useTranslation();
const { lang } = useParams<{ lang: string }>();

<Helmet>
  <html lang={lang === "zh-tw" ? "zh-TW" : "en"} />
  <title>{t("meta.title")}</title>
  <meta name="description" content={t("meta.description")} />
  <link rel="alternate" hreflang="zh-TW" href={`https://voxink.app/zh-tw/${pagePath}`} />
  <link rel="alternate" hreflang="en" href={`https://voxink.app/en/${pagePath}`} />
</Helmet>
```

Add page-specific meta title/description keys to the translation files as needed (e.g. `guideMeta.title`, `privacyMeta.title`).

**Step 3: Verify meta tags**

```bash
pnpm dev
# Inspect <head> in browser DevTools
# Verify <html lang="zh-TW">, <title>, <meta description> update per page
```

**Step 4: Commit**

```bash
git add src/main.tsx src/pages/ src/utils/
git commit -m "feat: add SEO meta tags with react-helmet-async"
```

---

### Task 13: Mobile Responsive Navbar

**Files:**
- Modify: `src/components/layout/Navbar.tsx` (add hamburger menu for mobile)

**Step 1: Add mobile menu state and hamburger button**

Add a `useState` for menu open/close. On mobile (`md:hidden`), show a hamburger button. On desktop (`hidden md:flex`), show the horizontal nav links.

The mobile menu is a slide-down panel below the navbar with nav links stacked vertically.

**Step 2: Verify responsive behavior**

```bash
pnpm dev
# Resize browser to mobile width
# Verify hamburger appears, click toggles nav links
# Verify desktop width shows horizontal links
```

**Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add responsive mobile hamburger menu to Navbar"
```

---

### Task 14: Build Verification + Final Polish

**Files:**
- Modify: `package.json` (add scripts)

**Step 1: Add npm scripts to package.json**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

**Step 2: Run full build**

```bash
pnpm build
# Verify no TypeScript errors
# Verify dist/ directory created
```

**Step 3: Preview production build**

```bash
pnpm preview
# Navigate to http://localhost:4173
# Test all routes: /, /zh-tw/, /zh-tw/guide, /zh-tw/privacy, /zh-tw/download
# Test language switching
# Test mobile responsive
```

**Step 4: Commit**

```bash
git add package.json
git commit -m "chore: add build and preview scripts"
```

---

## Summary

| Task | Description | Est. Steps |
|------|-------------|------------|
| 1 | Project scaffolding | 13 |
| 2 | Tailwind CSS + global styles | 4 |
| 3 | i18n setup + translations (繁中) | 6 |
| 4 | React Router + language routing | 6 |
| 5 | Layout (Navbar + Footer + LangSwitcher) | 7 |
| 6 | Homepage — Hero | 4 |
| 7 | Homepage — Features | 4 |
| 8 | Homepage — Privacy + HowItWorks + Platforms | 6 |
| 9 | Guide page | 4 |
| 10 | Privacy page | 4 |
| 11 | Download page | 4 |
| 12 | SEO meta tags | 4 |
| 13 | Mobile responsive navbar | 3 |
| 14 | Build verification | 4 |

**Total: 14 tasks, ~73 steps**

## Follow-up Tasks (not in this plan)
- Complete English translations (en.json)
- Add product screenshots to public/screenshots/
- Replace placeholder download URLs with real GitHub Release / Play Store URLs
- Add prerendering (vite-ssg) for SEO if needed
- Deploy to Cloudflare Pages / GitHub Pages
- Add Open Graph image (og-image.png)

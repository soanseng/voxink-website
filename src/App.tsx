import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import Privacy from "./pages/Privacy";
import Download from "./pages/Download";

const SUPPORTED_LANGS = ["zh-tw", "en"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

function LangProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && SUPPORTED_LANGS.includes(lang as Lang)) {
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang === "zh-tw" ? "zh-TW" : "en";
    }
  }, [lang, i18n]);

  if (!lang || !SUPPORTED_LANGS.includes(lang as Lang)) {
    return <Navigate to={`/${detectLanguage()}/`} replace />;
  }

  return <>{children}</>;
}

function detectLanguage(): Lang {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("zh")) return "zh-tw";
  return "en";
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Navigate to={`/${detectLanguage()}/`} replace />} />
        <Route
          path="/:lang/*"
          element={
            <LangProvider>
              <Layout>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="guide" element={<Guide />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="download" element={<Download />} />
                </Routes>
              </Layout>
            </LangProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

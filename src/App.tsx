import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import Privacy from "./pages/Privacy";
import Download from "./pages/Download";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const SUPPORTED_LANGS = ["zh-tw", "en"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

function LangLayout() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  // Change language synchronously before render to avoid flash of wrong language
  if (lang && SUPPORTED_LANGS.includes(lang as Lang) && i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    if (lang && SUPPORTED_LANGS.includes(lang as Lang)) {
      document.documentElement.lang = lang === "zh-tw" ? "zh-TW" : "en";
    }
  }, [lang]);

  if (!lang || !SUPPORTED_LANGS.includes(lang as Lang)) {
    return <Navigate to={`/${detectLanguage()}/`} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
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
        <Route path="/:lang" element={<LangLayout />}>
          <Route index element={<Home />} />
          <Route path="guide" element={<Guide />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="download" element={<Download />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

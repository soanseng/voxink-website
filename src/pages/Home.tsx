import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import PrivacyHighlight from "../components/home/PrivacyHighlight";
import HowItWorks from "../components/home/HowItWorks";
import Platforms from "../components/home/Platforms";

export default function Home() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <>
      <Helmet>
        <html lang={lang === "zh-tw" ? "zh-TW" : "en"} />
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <link rel="alternate" hrefLang="zh-TW" href="https://soanseng.github.io/voxink-website/zh-tw/" />
        <link rel="alternate" hrefLang="en" href="https://soanseng.github.io/voxink-website/en/" />
      </Helmet>
      <Hero />
      <Features />
      <PrivacyHighlight />
      <HowItWorks />
      <Platforms />
    </>
  );
}

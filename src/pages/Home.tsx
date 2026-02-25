import { useTranslation } from "react-i18next";
import { useDocumentHead } from "../hooks/useDocumentHead";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import PrivacyHighlight from "../components/home/PrivacyHighlight";
import HowItWorks from "../components/home/HowItWorks";
import Platforms from "../components/home/Platforms";

export default function Home() {
  const { t } = useTranslation();
  useDocumentHead(t("meta.title"), t("meta.description"));

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

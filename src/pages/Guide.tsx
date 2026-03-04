import { useTranslation } from "react-i18next";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { useState } from "react";
import { useParams } from "react-router-dom";

const tabs = ["android", "windows", "linux"] as const;

const tabScreenshots: Record<
  string,
  { en: string; tw: string; alt: string }
> = {
  android: {
    en: "screenshots/android/settings-llm.webp",
    tw: "screenshots/android/settings-llm.webp",
    alt: "VoxPen Android LLM Settings",
  },
  windows: {
    en: "screenshots/desktop/settings-general-en.webp",
    tw: "screenshots/desktop/settings-general-tw.webp",
    alt: "VoxPen Desktop Settings",
  },
  linux: {
    en: "screenshots/desktop/settings-speech-en.webp",
    tw: "screenshots/desktop/settings-speech-tw.webp",
    alt: "VoxPen Desktop Speech Settings",
  },
};

const apiKeySteps = [
  { key: "sub1", img: "screenshots/groq/groq-1.webp" },
  { key: "sub2", img: "screenshots/groq/groq-2.webp" },
  { key: "sub3", img: "screenshots/groq/groq-3.webp" },
  { key: "sub4", img: "screenshots/groq/groq-4.webp" },
  { key: "sub5", img: "screenshots/groq/groq-5.webp" },
  { key: "sub6", img: "screenshots/groq/groq-6.webp" },
] as const;

const faqKeys = ["q1", "q2", "q3", "q4"] as const;

export default function Guide() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  useDocumentHead(t("meta.guideTitle"), t("meta.guideDescription"));
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("android");
  const imgLang = lang === "zh-tw" ? "tw" : "en";

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("guide.title")}</h1>
      <p className="text-lg text-gray-500 mb-12">{t("guide.subtitle")}</p>

      {/* Step 1: API Key Tutorial */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {t("guide.step1.title")}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          {t("guide.step1.description")}
        </p>
        <div className="space-y-8">
          {apiKeySteps.map((step, i) => (
            <div key={step.key}>
              <p className="text-gray-700 font-medium mb-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs mr-2">
                  {i + 1}
                </span>
                {t(`guide.step1.${step.key}`)}
              </p>
              <img
                src={`${import.meta.env.BASE_URL}${step.img}`}
                alt={`Groq API Key step ${i + 1}`}
                className="rounded-xl border border-gray-200 shadow-sm max-w-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <a
          href="https://console.groq.com/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-6 text-sm font-medium text-gray-900 hover:underline"
        >
          Groq Console &rarr;
        </a>
      </section>

      {/* Step 2 with tabs */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t("guide.step2.title")}
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
              {t(`guide.step2.tabs.${tab}`)}
            </button>
          ))}
        </div>
        <p className="text-gray-600 leading-relaxed">{t(`guide.step2.${activeTab}`)}</p>
        {tabScreenshots[activeTab] && (
          <img
            src={`${import.meta.env.BASE_URL}${tabScreenshots[activeTab][imgLang]}`}
            alt={tabScreenshots[activeTab].alt}
            className="mt-6 rounded-xl border border-gray-200 shadow-sm max-w-full"
            loading="lazy"
          />
        )}
      </section>

      {/* Steps 3-4 */}
      <section className="space-y-10 mb-12">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t("guide.step3.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">{t("guide.step3.description")}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t("guide.step4.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">{t("guide.step4.android")}</p>
          <p className="text-gray-600 leading-relaxed">{t("guide.step4.desktop")}</p>
        </div>
      </section>

      {/* Cost */}
      <section className="mb-12 p-6 bg-gray-50 rounded-xl space-y-5">
        <h2 className="text-xl font-semibold text-gray-900">
          {t("guide.cost.title")}
        </h2>
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {t("guide.cost.free.title")}
          </h3>
          <p className="text-gray-600 leading-relaxed">{t("guide.cost.free.description")}</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {t("guide.cost.paid.title")}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-2">{t("guide.cost.paid.description")}</p>
          <div className="bg-white rounded-lg p-3 text-sm text-gray-700 font-mono mb-2">
            {t("guide.cost.paid.breakdown")}
          </div>
          <p className="text-gray-800 font-medium">{t("guide.cost.paid.total")}</p>
        </div>
        <p className="text-xs text-gray-400">{t("guide.cost.note")}</p>
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
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(`guide.faq.${key}.answer`)}
              </p>
              {key === "q1" && (
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-gray-900 hover:underline"
                >
                  Groq Console &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

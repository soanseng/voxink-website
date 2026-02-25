import { useTranslation } from "react-i18next";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { useState } from "react";

const tabs = ["android", "windows", "linux"] as const;
const faqKeys = ["q1", "q2", "q3", "q4"] as const;

export default function Guide() {
  const { t } = useTranslation();
  useDocumentHead(t("meta.guideTitle"), t("meta.guideDescription"));
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("android");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("guide.title")}</h1>
      <p className="text-lg text-gray-500 mb-12">{t("guide.subtitle")}</p>

      {/* Step 1 */}
      <section className="space-y-10 mb-12">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t("guide.step1.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("guide.step1.description")}
          </p>
          <a
            href="https://groq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-gray-900 hover:underline"
          >
            groq.com &rarr;
          </a>
        </div>

        {/* Step 2 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t("guide.step2.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("guide.step2.description")}
          </p>
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-gray-900 hover:underline"
          >
            Groq Console &rarr;
          </a>
        </div>
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
        <p className="text-gray-600 leading-relaxed">{t(`guide.step3.${activeTab}`)}</p>
      </section>

      {/* Steps 4-5 */}
      <section className="space-y-10 mb-12">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t("guide.step4.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">{t("guide.step4.description")}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t("guide.step5.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3">{t("guide.step5.android")}</p>
          <p className="text-gray-600 leading-relaxed">{t("guide.step5.desktop")}</p>
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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

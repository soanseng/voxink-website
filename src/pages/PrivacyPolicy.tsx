import { useTranslation } from "react-i18next";
import { useDocumentHead } from "../hooks/useDocumentHead";

const listSections = [
  "dataCollection",
  "audioData",
  "apiKeys",
  "transcriptionHistory",
  "llmRefinement",
  "permissions",
] as const;

const textSections = ["thirdParty", "children", "changes", "contact"] as const;

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  useDocumentHead(t("meta.policyTitle"), t("meta.policyDescription"));

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        {t("policy.title")}
      </h1>
      <p className="text-sm text-gray-400 mb-12">{t("policy.lastUpdated")}</p>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          {t("policy.overview.title")}
        </h2>
        <p className="text-gray-600 leading-relaxed">{t("policy.overview.content")}</p>
      </section>

      {/* List-based sections */}
      {listSections.map((section) => {
        const itemsRaw = t(`policy.${section}.items`, { returnObjects: true });
        const items = Array.isArray(itemsRaw) ? (itemsRaw as string[]) : [];
        const hasIntro = ["dataCollection", "audioData", "llmRefinement", "permissions"].includes(section);

        return (
          <section key={section} className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t(`policy.${section}.title`)}
            </h2>
            {hasIntro && (
              <p className="text-gray-600 leading-relaxed mb-3">
                {t(`policy.${section}.intro`)}
              </p>
            )}
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex gap-2 text-gray-600 text-sm leading-relaxed">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
            {section === "audioData" && (
              <p className="text-gray-500 text-sm mt-3 italic">
                {t("policy.audioData.providerNote")}
              </p>
            )}
          </section>
        );
      })}

      {/* Text-only sections */}
      {textSections.map((section) => (
        <section key={section} className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {t(`policy.${section}.title`)}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t(`policy.${section}.content`)}
          </p>
        </section>
      ))}
    </div>
  );
}

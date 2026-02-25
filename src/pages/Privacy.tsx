import { useTranslation } from "react-i18next";
import { useDocumentHead } from "../hooks/useDocumentHead";

const architectureSections = ["byok", "zeroCollection", "encryption"] as const;
const comparisonRows = ["dataFlow", "account", "pricing", "openSource", "serverIntermediary", "quality"] as const;

export default function Privacy() {
  const { t } = useTranslation();
  useDocumentHead(t("meta.privacyTitle"), t("meta.privacyDescription"));
  const risksRaw = t("privacyPage.concerns.risks", { returnObjects: true });
  const risks = Array.isArray(risksRaw) ? risksRaw as string[] : [];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        {t("privacyPage.title")}
      </h1>
      <p className="text-lg text-gray-500 mb-12">{t("privacyPage.subtitle")}</p>

      {/* Architecture */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("privacyPage.architecture.title")}
        </h2>
        <div className="p-6 bg-gray-50 rounded-xl mb-8 text-center">
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
              <p className="text-gray-600 leading-relaxed">
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
            <li key={i} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
              <span className="text-amber-500 flex-shrink-0 mt-0.5">{"\u26A0"}</span>
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
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b-2 border-gray-200">
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
                  <td className="py-3 pr-4 text-gray-700 font-medium">
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

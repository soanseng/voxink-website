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
                      <span className="flex-shrink-0">→</span>
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

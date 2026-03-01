import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDocumentHead } from "../hooks/useDocumentHead";

const shippedKeys = [
  "translationMode",
  "contextAwareTone",
  "speakToEdit",
  "voiceCommands",
  "copyToClipboard",
  "translationQuickSwitch",
  "fileTranscription",
  "dualResult",
  "multiProvider",
] as const;

const plannedKeys = [
  "moreLanguages",
  "iosApp",
  "aiQuery",
  "personalization",
  "webPlatform",
] as const;

const shippedIcons: Record<string, string> = {
  translationMode: "\uD83D\uDD04",
  contextAwareTone: "\uD83C\uDFAD",
  speakToEdit: "\u270F\uFE0F",
  voiceCommands: "\uD83C\uDF99\uFE0F",
  copyToClipboard: "\uD83D\uDCCB",
  translationQuickSwitch: "\uD83C\uDF10",
  fileTranscription: "\uD83D\uDCC4",
  dualResult: "\uD83D\uDD00",
  multiProvider: "\uD83D\uDD0C",
};

const plannedIcons: Record<string, string> = {
  moreLanguages: "\uD83C\uDF0D",
  iosApp: "\uD83D\uDCF1",
  aiQuery: "\uD83E\uDDE0",
  personalization: "\uD83C\uDFA8",
  webPlatform: "\uD83C\uDF10",
};

const priorityColors: Record<string, string> = {
  P2: "bg-amber-100 text-amber-800",
  P3: "bg-blue-100 text-blue-800",
  P4: "bg-gray-100 text-gray-600",
};

export default function Roadmap() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  useDocumentHead(t("roadmap.meta.title"), t("roadmap.meta.description"));

  return (
    <div>
      {/* Hero */}
      <section className="py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {t("roadmap.hero.title")}
        </h1>
        <p className="text-lg text-gray-500">
          {t("roadmap.hero.subtitle")}
        </p>
      </section>

      {/* Shipped */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
              ✓ {t("roadmap.shipped.badge")}
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              {t("roadmap.shipped.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shippedKeys.map((key) => (
              <div
                key={key}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{shippedIcons[key]}</span>
                  <span className="text-xs font-mono text-gray-400">
                    {t(`roadmap.shipped.items.${key}.version`)}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {t(`roadmap.shipped.items.${key}.title`)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(`roadmap.shipped.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planned */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            {t("roadmap.planned.title")}
          </h2>
          <div className="space-y-6">
            {plannedKeys.map((key) => {
              const priority = t(`roadmap.planned.items.${key}.priority`);
              return (
                <div
                  key={key}
                  className="flex gap-4 p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5">
                    {plannedIcons[key]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base font-semibold text-gray-900">
                        {t(`roadmap.planned.items.${key}.title`)}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[priority] || "bg-gray-100 text-gray-600"}`}
                      >
                        {t(`roadmap.priorityLabels.${priority}`)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {t(`roadmap.planned.items.${key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("roadmap.cta.title")}
        </h2>
        <p className="text-gray-500 mb-8">
          {t("roadmap.cta.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/soanseng/voxpen-android/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {t("roadmap.cta.github")}
          </a>
          <Link
            to={`/${lang}/download`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("roadmap.cta.download")}
          </Link>
        </div>
      </section>
    </div>
  );
}

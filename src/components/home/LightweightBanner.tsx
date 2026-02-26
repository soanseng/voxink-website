import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const stats = ["size", "ram", "startup"] as const;
const statIcons: Record<string, string> = {
  size: "💾",
  ram: "🧠",
  startup: "⚡",
};

export default function LightweightBanner() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
          {t("lightweight.title")}
        </h2>
        <p className="text-center text-gray-500 mb-12">
          {t("lightweight.subtitle")}
        </p>

        {/* Bar chart */}
        <div className="max-w-2xl mx-auto mb-12 space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium text-gray-900">
                {t("lightweight.bar.voxink")}
              </span>
              <span className="text-gray-500">10MB</span>
            </div>
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: "3%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium text-gray-500">
                {t("lightweight.bar.wispr")}
              </span>
              <span className="text-gray-400">350MB</span>
            </div>
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-400 rounded-full"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-10">
          {stats.map((key) => (
            <div key={key} className="text-center">
              <div className="text-2xl mb-2">{statIcons[key]}</div>
              <div className="text-xl font-bold text-gray-900">
                {t(`lightweight.stats.${key}.value`)}
              </div>
              <div className="text-xs text-gray-500">
                {t(`lightweight.stats.${key}.label`)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to={`/${lang}/compare`}
            className="text-gray-900 font-medium hover:underline"
          >
            {t("lightweight.cta")} →
          </Link>
        </div>
      </div>
    </section>
  );
}

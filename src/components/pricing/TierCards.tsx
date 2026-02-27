import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const tierKeys = ["free", "android", "desktop"] as const;

const tierStyles: Record<string, string> = {
  free: "border-gray-200 bg-white",
  android: "border-gray-200 bg-white",
  desktop: "border-emerald-500 border-2 bg-white",
};

export default function TierCards() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {t("pricing.tiers.title")}
      </h2>
      <p className="text-gray-500 mb-8">{t("pricing.tiers.subtitle")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {tierKeys.map((key) => {
          const badge = t(`pricing.tiers.${key}.badge`, { defaultValue: "" });
          const savings = t(`pricing.tiers.${key}.savings`, {
            defaultValue: "",
          });
          const features = t(`pricing.tiers.${key}.features`, {
            returnObjects: true,
          }) as string[];

          return (
            <div
              key={key}
              className={`rounded-xl p-6 border ${tierStyles[key]} relative flex flex-col`}
            >
              {badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {badge}
                </span>
              )}

              <h3 className="text-lg font-bold text-gray-900">
                {t(`pricing.tiers.${key}.name`)}
              </h3>
              <div className="mt-2 mb-1">
                <span className="text-3xl font-bold text-gray-900">
                  {t(`pricing.tiers.${key}.price`)}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {t(`pricing.tiers.${key}.period`)}
                </span>
              </div>
              {savings && (
                <span className="text-sm text-emerald-600 font-medium">
                  {savings}
                </span>
              )}
              <p className="text-sm text-gray-500 mt-1 mb-4">
                {t(`pricing.tiers.${key}.description`)}
              </p>

              <ul className="space-y-2 flex-1">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={`/${lang}/download`}
                className={`mt-6 block text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  key === "desktop"
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {t(`pricing.tiers.${key}.cta`)}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { useTranslation } from "react-i18next";

const featureKeys = ["speed", "refine", "multilang", "transcribe"] as const;

const featureIcons: Record<string, string> = {
  speed: "\u26A1",
  refine: "\u2728",
  multilang: "\uD83C\uDF0F",
  transcribe: "\uD83D\uDCC4",
};

export default function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t("features.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureKeys.map((key) => (
            <div key={key} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">{featureIcons[key]}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`features.${key}.title`)}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(`features.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

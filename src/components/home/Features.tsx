import { useTranslation } from "react-i18next";

const featureKeys = [
  "speed",
  "refine",
  "multilang",
  "transcribe",
  "tone",
  "provider",
  "translation",
  "voiceCommands",
  "speakToEdit",
] as const;

const featureIcons: Record<string, string> = {
  speed: "\u26A1",
  refine: "\u2728",
  multilang: "\uD83C\uDF0F",
  transcribe: "\uD83D\uDCC4",
  tone: "\uD83C\uDFAD",
  provider: "\uD83D\uDD0C",
  translation: "\uD83D\uDD04",
  voiceCommands: "\uD83C\uDF99\uFE0F",
  speakToEdit: "\u270F\uFE0F",
};

const supportedLanguages = [
  { flag: "\uD83C\uDDF9\uD83C\uDDFC", name: "繁體中文" },
  { flag: "\uD83C\uDDFA\uD83C\uDDF8", name: "English" },
  { flag: "\uD83C\uDDEF\uD83C\uDDF5", name: "日本語" },
  { flag: "\uD83C\uDDF0\uD83C\uDDF7", name: "한국어" },
  { flag: "\uD83C\uDDFB\uD83C\uDDF3", name: "Tiếng Việt" },
  { flag: "\uD83C\uDDF9\uD83C\uDDED", name: "ภาษาไทย" },
  { flag: "\uD83C\uDDEE\uD83C\uDDE9", name: "Indonesia" },
  { flag: "\uD83C\uDDEB\uD83C\uDDF7", name: "Français" },
  { flag: "\uD83C\uDDE9\uD83C\uDDEA", name: "Deutsch" },
  { flag: "\uD83C\uDDEA\uD83C\uDDF8", name: "Español" },
];

export default function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t("features.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureKeys.map((key) => (
            <div key={key} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">{featureIcons[key]}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`features.${key}.title`)}
              </h3>
              {key === "multilang" ? (
                <>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {supportedLanguages.map((lang) => (
                      <span
                        key={lang.name}
                        className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 rounded-full px-2.5 py-1"
                      >
                        {lang.flag} {lang.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {t(`features.${key}.description`)}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(`features.${key}.description`)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

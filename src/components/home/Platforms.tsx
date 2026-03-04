import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const platforms = [
  { key: "android", icon: "\uD83D\uDCF1" },
  { key: "windows", icon: "\uD83D\uDDA5\uFE0F" },
  { key: "linux", icon: "\uD83D\uDC27" },
] as const;

export default function Platforms() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t("platforms.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map(({ key, icon }) => (
            <div key={key} className="text-center p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(`platforms.${key}.name`)}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {t(`platforms.${key}.description`)}
              </p>
              <p className="text-xs text-gray-400 mb-4">
                {t(`platforms.${key}.requirement`)}
              </p>
              <Link
                to={`/${lang}/download`}
                className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {t(`platforms.${key}.cta`)}
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 space-y-1">
          <p className="text-sm text-gray-400">
            macOS — {t("platforms.macos.description")}
          </p>
          <p className="text-xs text-gray-400">
            {t("download.openSource")}{" "}
            <a href="https://github.com/soanseng/voxpen-desktop" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Desktop</a>
            {" · "}
            <a href="https://github.com/soanseng/voxpen-android" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Android</a>
          </p>
        </div>
      </div>
    </section>
  );
}

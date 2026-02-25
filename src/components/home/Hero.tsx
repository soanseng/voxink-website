import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePlatformDetect } from "../../hooks/usePlatformDetect";

const platformNames: Record<string, string> = {
  android: "Android",
  windows: "Windows",
  linux: "Linux",
  macos: "Desktop",
};

export default function Hero() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const platform = usePlatformDetect();

  const ctaLabel =
    platform !== "unknown"
      ? t("hero.cta.download", { platform: platformNames[platform] })
      : t("nav.download");

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <img
          src={`${import.meta.env.BASE_URL}icon-512.png`}
          alt="VoxInk"
          className="w-24 h-24 mx-auto mb-8 rounded-2xl shadow-lg"
        />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
          {t("hero.headline")}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed">
          {t("hero.subtitle")}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={`/${lang}/download`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {ctaLabel}
          </Link>
          <Link
            to={`/${lang}/download`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {t("hero.cta.allPlatforms")} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

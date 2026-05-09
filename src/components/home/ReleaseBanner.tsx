import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const releaseHighlights = ["command", "retry", "linux"] as const;

export default function ReleaseBanner() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
              {t("release.badge")}
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {t("release.title")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              {t("release.description")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/${lang}/blog/voxpen-desktop-0-9-6`}
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                {t("release.readPost")}
              </Link>
              <Link
                to={`/${lang}/download`}
                className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                {t("release.download")}
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {releaseHighlights.map((key) => (
              <div key={key} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  {t(`release.highlights.${key}.title`)}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {t(`release.highlights.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

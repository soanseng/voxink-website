import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const pillars = [
  { key: "byok", icon: "\uD83D\uDD11" },
  { key: "zeroCollection", icon: "\uD83D\uDEAB" },
  { key: "directApi", icon: "\uD83D\uDD12" },
] as const;

export default function PrivacyHighlight() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          {t("privacy.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {pillars.map(({ key, icon }) => (
            <div key={key}>
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`privacy.${key}.title`)}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(`privacy.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
        <Link
          to={`/${lang}/privacy`}
          className="text-gray-900 font-medium hover:underline"
        >
          {t("privacy.cta")} &rarr;
        </Link>
      </div>
    </section>
  );
}

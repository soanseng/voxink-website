import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PricingBanner() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10 sm:p-14">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              {t("pricing.homeBanner.title")}
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 mb-8">
              {/* VoxPen price */}
              <div>
                <p className="text-sm text-gray-400 mb-1">{t("pricing.homeBanner.onetime")}</p>
                <p className="text-5xl sm:text-6xl font-bold tracking-tight text-emerald-400">
                  {t("pricing.homeBanner.amount")}
                </p>
              </div>

              {/* VS */}
              <div className="text-2xl font-light text-gray-500">
                {t("pricing.homeBanner.versus")}
              </div>

              {/* Subscription price */}
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-gray-500 line-through decoration-red-400/60 decoration-4">
                  {t("pricing.homeBanner.subscriptionAmount")}
                </p>
              </div>
            </div>

            <Link
              to={`/${lang}/pricing`}
              className="inline-flex items-center px-8 py-3 text-base font-medium bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t("pricing.homeBanner.cta")} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

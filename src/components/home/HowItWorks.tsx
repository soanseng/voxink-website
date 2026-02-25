import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const stepsRaw = t("howItWorks.steps", { returnObjects: true });
  const steps = Array.isArray(stepsRaw) ? stepsRaw as string[] : [];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t("howItWorks.title")}
        </h2>
        <ol className="space-y-6">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <p className="text-gray-700 pt-1">{step}</p>
            </li>
          ))}
        </ol>
        <div className="text-center mt-10">
          <Link
            to={`/${lang}/guide`}
            className="text-gray-900 font-medium hover:underline"
          >
            {t("howItWorks.cta")} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const base = `/${lang}`;

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}logo.svg`}
                alt="VoxInk"
                className="h-8 w-8"
              />
              <p className="text-lg font-bold text-gray-900">語墨 VoxInk</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">{t("footer.description")}</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a
              href="https://github.com/soanseng"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              {t("footer.links.github")}
            </a>
            <Link to={`${base}/privacy`} className="hover:text-gray-900 transition-colors">
              {t("footer.links.privacy")}
            </Link>
            <Link to={`${base}/privacy-policy`} className="hover:text-gray-900 transition-colors">
              {t("footer.links.privacyPolicy")}
            </Link>
            <Link to={`${base}/guide`} className="hover:text-gray-900 transition-colors">
              {t("footer.links.guide")}
            </Link>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-8 text-center">{t("footer.madeIn")}</p>
      </div>
    </footer>
  );
}

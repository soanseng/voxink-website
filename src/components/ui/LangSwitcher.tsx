import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LangSwitcher() {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  function switchLang() {
    const newLang = lang === "zh-tw" ? "en" : "zh-tw";
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
    navigate(newPath);
  }

  return (
    <button
      onClick={switchLang}
      className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100"
    >
      {lang === "zh-tw" ? t("lang.en") : t("lang.zhTw")}
    </button>
  );
}

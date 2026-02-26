import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import LangSwitcher from "../ui/LangSwitcher";

export default function Navbar() {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const base = `/${lang}`;
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToFeatures = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const isHomePage = location.pathname === `/${lang}` || location.pathname === `/${lang}/`;
      if (isHomePage) {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/${lang}/`);
        // Wait for navigation, then scroll
        setTimeout(() => {
          document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    },
    [lang, location.pathname, navigate]
  );

  const links = [
    { href: `${base}/`, label: t("nav.features"), isHash: true },
    { href: `${base}/guide`, label: t("nav.guide"), isHash: false },
    { href: `${base}/compare`, label: t("nav.compare"), isHash: false },
    { href: `${base}/pricing`, label: t("nav.pricing"), isHash: false },
    { href: `${base}/download`, label: t("nav.download"), isHash: false },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={base} className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="VoxInk"
            className="h-8 w-8"
          />
          語墨 <span className="text-gray-400 font-normal">VoxInk</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) =>
            link.isHash ? (
              <a
                key={link.href}
                href={`${link.href}#features`}
                onClick={scrollToFeatures}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <LangSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          {links.map((link) =>
            link.isHash ? (
              <a
                key={link.href}
                href={`${link.href}#features`}
                onClick={(e) => {
                  scrollToFeatures(e);
                  setMenuOpen(false);
                }}
                className="block text-sm text-gray-600 hover:text-gray-900 py-1"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-600 hover:text-gray-900 py-1"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-2 border-t border-gray-100">
            <LangSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}

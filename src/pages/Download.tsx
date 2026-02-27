import { useTranslation } from "react-i18next";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { usePlatformDetect } from "../hooks/usePlatformDetect";

const platforms = [
  { key: "macos", icon: "🍎" },
  { key: "windows", icon: "🖥️" },
  { key: "linux", icon: "🐧" },
] as const;

export default function Download() {
  const { t } = useTranslation();
  useDocumentHead(t("meta.downloadTitle"), t("meta.downloadDescription"));
  const detected = usePlatformDetect();

  const sorted = [...platforms].sort((a, b) => {
    if (a.key === detected) return -1;
    if (b.key === detected) return 1;
    return 0;
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        {t("download.title")}
      </h1>
      <p className="text-lg text-gray-500 mb-12">{t("download.subtitle")}</p>

      <div className="space-y-6">
        {sorted.map(({ key, icon }) => (
          <div
            key={key}
            className={`p-8 rounded-xl border transition-colors ${
              key === detected
                ? "border-gray-900 ring-1 ring-gray-900"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">{icon}</span>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t(`platforms.${key}.name`)}
                </h2>
                {key === detected && (
                  <p className="text-sm text-green-600 font-medium">
                    {t("download.detected", { platform: t(`platforms.${key}.name`) })}
                  </p>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-medium text-gray-700">{t("download.requirements")}:</span>{" "}
              {t(`download.${key}.requirement`)}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-medium text-gray-700">{t("download.installSteps")}:</span>{" "}
              {t(`download.${key}.steps`)}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={
                  key === "macos"
                    ? "https://github.com/soanseng/voxpen-releases/releases/latest/download/VoxPen.Desktop_aarch64.dmg"
                    : key === "windows"
                    ? "https://github.com/soanseng/voxpen-releases/releases/latest/download/VoxPen.Desktop_x64-setup.exe"
                    : "https://github.com/soanseng/voxpen-releases/releases/latest/download/VoxPen.Desktop_amd64.AppImage"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {key === "macos"
                  ? t("download.macos.dmg")
                  : key === "windows"
                  ? t("download.windows.installer")
                  : t("download.linux.appimage")}
              </a>
            </div>
          </div>
        ))}

        {/* Android — coming soon */}
        <div className="p-8 rounded-xl border border-dashed border-gray-200 bg-gray-50 text-center">
          <span className="text-3xl">📱</span>
          <p className="text-gray-400 mt-2">{t("download.android.comingSoon")}</p>
        </div>
      </div>

      {/* Changelog link */}
      <div className="mt-12 text-center text-sm text-gray-400">
        <a
          href="https://github.com/soanseng/voxpen-releases/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          {t("download.changelog")} &rarr;
        </a>
      </div>
    </div>
  );
}

import { useTranslation } from "react-i18next";

const advantageKeys = [
  "byok",
  "selfHosted",
  "multiProvider",
  "fileTranscription",
  "zhTwDepth",
  "onetimePurchase",
  "pricingTransparency",
  "copyToClipboard",
  "dualResult",
  "linuxSupport",
  "customPrompts",
] as const;

const parityKeys = [
  "whisperStt",
  "fillerRemoval",
  "selfCorrection",
  "autoFormat",
  "mixedLanguage",
  "onDeviceHistory",
  "translationMode",
  "voiceCommands",
  "speakToEdit",
  "contextAwareTone",
  "personalDictionary",
] as const;

export default function TypelessComparison() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {t("compare.typeless.title")}
        </h2>
        <p className="text-center text-gray-500 mb-12">
          {t("compare.typeless.subtitle")}
        </p>

        {/* Advantages table */}
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {t("compare.typeless.advantages.title")}
        </h3>
        <div className="overflow-x-auto -mx-6 px-6 mb-16">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 pr-4 font-semibold text-gray-900">
                  {t("compare.typeless.headers.feature")}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  {t("compare.typeless.headers.voxpen")}
                </th>
                <th className="text-left py-3 pl-4 font-semibold text-gray-500">
                  {t("compare.typeless.headers.typeless")}
                </th>
              </tr>
            </thead>
            <tbody>
              {advantageKeys.map((row) => (
                <tr key={row} className="border-b border-gray-100">
                  <td className="py-3 pr-4 text-gray-700 font-medium">
                    {t(`compare.typeless.advantages.rows.${row}.label`)}
                  </td>
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {t(`compare.typeless.advantages.rows.${row}.voxpen`)}
                  </td>
                  <td className="py-3 pl-4 text-gray-400">
                    {t(`compare.typeless.advantages.rows.${row}.typeless`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Parity table */}
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {t("compare.typeless.parity.title")}
        </h3>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 pr-4 font-semibold text-gray-900">
                  {t("compare.typeless.headers.feature")}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  {t("compare.typeless.headers.voxpen")}
                </th>
                <th className="text-left py-3 pl-4 font-semibold text-gray-900">
                  {t("compare.typeless.headers.typeless")}
                </th>
              </tr>
            </thead>
            <tbody>
              {parityKeys.map((row) => (
                <tr key={row} className="border-b border-gray-100">
                  <td className="py-3 pr-4 text-gray-700 font-medium">
                    {t(`compare.typeless.parity.rows.${row}.label`)}
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {t(`compare.typeless.parity.rows.${row}.voxpen`)}
                  </td>
                  <td className="py-3 pl-4 text-gray-900">
                    {t(`compare.typeless.parity.rows.${row}.typeless`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

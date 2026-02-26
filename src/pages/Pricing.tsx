import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDocumentHead } from "../hooks/useDocumentHead";
import TierCards from "../components/pricing/TierCards";

const LLM_MODELS = [
  // Groq
  { id: "groq-gpt-oss-120b", provider: "Groq", name: "GPT-OSS-120B", inputRate: 0.15, outputRate: 0.60, tag: "recommended" },
  { id: "groq-gpt-oss-20b", provider: "Groq", name: "GPT-OSS-20B", inputRate: 0.075, outputRate: 0.30, tag: "fast" },
  { id: "groq-qwen3-32b", provider: "Groq", name: "Qwen3-32B", inputRate: 0.29, outputRate: 0.59, tag: "chinese" },
  // OpenAI
  { id: "openai-gpt5-nano", provider: "OpenAI", name: "GPT-5-nano", inputRate: 0.05, outputRate: 0.40, tag: "budget" },
  { id: "openai-gpt5-mini", provider: "OpenAI", name: "GPT-5-mini", inputRate: 0.25, outputRate: 2.00, tag: "" },
  { id: "openai-gpt41-mini", provider: "OpenAI", name: "GPT-4.1-mini", inputRate: 0.40, outputRate: 1.60, tag: "" },
  // OpenRouter
  { id: "or-gemini3-flash", provider: "OpenRouter", name: "Gemini 3 Flash", inputRate: 0.50, outputRate: 3.00, tag: "recommended" },
  { id: "or-claude-haiku45", provider: "OpenRouter", name: "Claude Haiku 4.5", inputRate: 0.80, outputRate: 4.00, tag: "quality" },
  { id: "or-deepseek-chat", provider: "OpenRouter", name: "DeepSeek Chat", inputRate: 0.14, outputRate: 0.28, tag: "budget" },
] as const;

const comparisonRows = [
  "appPrice",
  "monthlyCost",
  "yearlyCost",
  "twoYearCost",
  "freeLimit",
  "dataFlow",
  "account",
] as const;

const scenarioKeys = ["light", "normal", "heavy", "writer"] as const;

const WHISPER_RATE = 0.04 / 3600; // $/second
const LLM_TOKENS_PER_INPUT = 400; // ~200 in + ~200 out
const FREE_AUDIO_SECONDS = 28800;
const FREE_LLM_TOKENS = 500_000;
const USD_TO_TWD = 32;

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  useDocumentHead(t("pricing.meta.title"), t("pricing.meta.description"));

  const isTW = i18n.language.startsWith("zh");

  const [inputs, setInputs] = useState(50);
  const [seconds, setSeconds] = useState(15);
  const [withLlm, setWithLlm] = useState(true);
  const [modelId, setModelId] = useState("groq-gpt-oss-120b");

  const selectedModel = LLM_MODELS.find((m) => m.id === modelId) ?? LLM_MODELS[0];
  const llmInputRate = selectedModel.inputRate / 1_000_000;
  const llmOutputRate = selectedModel.outputRate / 1_000_000;

  // Calculate costs
  const dailyAudioSeconds = inputs * seconds;
  const dailyLlmTokens = withLlm ? inputs * LLM_TOKENS_PER_INPUT : 0;

  const isFreeAudio = dailyAudioSeconds <= FREE_AUDIO_SECONDS;
  const isFreeLlm = dailyLlmTokens <= FREE_LLM_TOKENS;
  const isFree = isFreeAudio && isFreeLlm;

  const audioCostUsd = isFreeAudio ? 0 : dailyAudioSeconds * WHISPER_RATE;
  const llmCostUsd = isFreeLlm
    ? 0
    : (inputs * 200 * llmInputRate) + (inputs * 200 * llmOutputRate);
  const dailyCostUsd = audioCostUsd + llmCostUsd;
  const monthlyCostUsd = dailyCostUsd * 30;
  const yearlyCostUsd = monthlyCostUsd * 12;

  function formatCost(usd: number): string {
    if (isTW) {
      const twd = usd * USD_TO_TWD;
      if (twd < 1) return `NT$${twd.toFixed(1)}`;
      return `NT$${Math.round(twd).toLocaleString()}`;
    }
    if (usd < 0.01) return `$${usd.toFixed(3)}`;
    return `$${usd.toFixed(2)}`;
  }

  function formatYearlyCost(): string {
    if (isTW) {
      const twd = yearlyCostUsd * USD_TO_TWD;
      return `NT$${Math.round(twd).toLocaleString()}`;
    }
    return `$${yearlyCostUsd.toFixed(2)}`;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {t("pricing.hero.title")}
        </h1>
        <p className="text-lg text-gray-500">{t("pricing.hero.subtitle")}</p>
      </div>

      <TierCards />

      {/* Interactive calculator */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("pricing.calculator.title")}
        </h2>
        <p className="text-gray-500 mb-8">{t("pricing.calculator.subtitle")}</p>

        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
          {/* Model selector */}
          {withLlm && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("pricing.calculator.modelLabel")}
              </label>
              <select
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {(() => {
                  const groups = new Map<string, typeof LLM_MODELS[number][]>();
                  for (const m of LLM_MODELS) {
                    const list = groups.get(m.provider) ?? [];
                    list.push(m);
                    groups.set(m.provider, list);
                  }
                  return Array.from(groups.entries()).map(([provider, models]) => (
                    <optgroup key={provider} label={provider}>
                      {models.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}{m.tag ? ` (${t(`pricing.calculator.tags.${m.tag}`)})` : ""}
                        </option>
                      ))}
                    </optgroup>
                  ));
                })()}
              </select>
            </div>
          )}

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("pricing.calculator.inputsLabel")}:
                <span className="ml-2 text-gray-900 font-bold">{inputs}</span>
              </label>
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={inputs}
                onChange={(e) => setInputs(Number(e.target.value))}
                className="w-full accent-gray-900"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>10</span>
                <span>500</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("pricing.calculator.avgSecondsLabel")}:
                <span className="ml-2 text-gray-900 font-bold">{seconds}s</span>
              </label>
              <input
                type="range"
                min={5}
                max={60}
                step={5}
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
                className="w-full accent-gray-900"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5s</span>
                <span>60s</span>
              </div>
            </div>
          </div>

          {/* LLM toggle */}
          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={withLlm}
                onChange={(e) => setWithLlm(e.target.checked)}
                className="w-5 h-5 accent-gray-900 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                {t("pricing.calculator.withLlmLabel")}
              </span>
            </label>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 text-center">
              <p className="text-xs text-gray-400 mb-1">
                {t("pricing.calculator.dailyCost")}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {isFree ? (
                  <span className="text-emerald-600">{t("pricing.calculator.freeNote")}</span>
                ) : (
                  formatCost(dailyCostUsd)
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center">
              <p className="text-xs text-gray-400 mb-1">
                {t("pricing.calculator.monthlyCost")}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {isFree ? (
                  <span className="text-emerald-600">{t("pricing.calculator.freeNote")}</span>
                ) : (
                  formatCost(monthlyCostUsd)
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center border-2 border-emerald-200">
              <p className="text-xs text-gray-400 mb-1">
                {t("pricing.calculator.yearlyCost")}
              </p>
              <p className="text-2xl font-bold text-emerald-600">
                {formatYearlyCost()}
              </p>
            </div>
          </div>

          {/* Rate footnotes */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
            <span>{t("pricing.calculator.appPrice")}</span>
            <span>{t("pricing.calculator.whisperRate")}</span>
            {withLlm && (
              <span>
                {selectedModel.name}: ${selectedModel.inputRate}/${selectedModel.outputRate} per 1M tokens
              </span>
            )}
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-500"
            >
              {t("pricing.calculator.groqLink")}
            </a>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("pricing.comparison.title")}
        </h2>
        <p className="text-gray-500 mb-8">{t("pricing.comparison.subtitle")}</p>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 pr-4 font-medium text-gray-500 w-1/4">
                  {t("pricing.comparison.headers.item")}
                </th>
                <th className="text-left py-3 px-4 font-bold text-gray-900 w-1/4 bg-emerald-50 rounded-t-lg">
                  {t("pricing.comparison.headers.voxink")}
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 w-1/4">
                  {t("pricing.comparison.headers.serviceA")}
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 w-1/4">
                  {t("pricing.comparison.headers.serviceB")}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-gray-700">
                    {t(`pricing.comparison.rows.${row}.label`)}
                  </td>
                  <td className="py-3 px-4 text-gray-900 font-medium bg-emerald-50/50">
                    {t(`pricing.comparison.rows.${row}.voxink`)}
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {t(`pricing.comparison.rows.${row}.serviceA`)}
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {t(`pricing.comparison.rows.${row}.serviceB`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage scenarios */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {t("pricing.scenarios.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scenarioKeys.map((key) => (
            <div key={key} className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {t(`pricing.scenarios.${key}.title`)}
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                {t(`pricing.scenarios.${key}.usage`)}
              </p>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">VoxPen</p>
                  <p className="text-lg font-bold text-emerald-600">
                    {t(`pricing.scenarios.${key}.voxink`)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-0.5">
                    {t("pricing.comparison.headers.serviceA")}
                  </p>
                  <p className="text-lg font-bold text-gray-400 line-through">
                    {t(`pricing.scenarios.${key}.subscription`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why so cheap */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {t("pricing.whyFree.title")}
        </h2>
        <div className="space-y-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t(`pricing.whyFree.reasons.${i}.title`)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(`pricing.whyFree.reasons.${i}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 px-6 bg-gray-50 rounded-2xl mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("pricing.cta.title")}
        </h2>
        <p className="text-gray-500 mb-8">{t("pricing.cta.subtitle")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={`/${lang}/download`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {t("pricing.cta.download")}
          </Link>
          <Link
            to={`/${lang}/guide`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
          >
            {t("pricing.cta.guide")}
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        {t("pricing.disclaimer")}{" "}
        <a
          href="https://groq.com/pricing/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-500"
        >
          Groq Pricing &rarr;
        </a>
      </p>
    </div>
  );
}

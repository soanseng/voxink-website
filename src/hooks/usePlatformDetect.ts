export type Platform = "android" | "windows" | "linux" | "macos" | "unknown";

export function usePlatformDetect(): Platform {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("android")) return "android";
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "macos";
  if (ua.includes("linux")) return "linux";
  return "unknown";
}

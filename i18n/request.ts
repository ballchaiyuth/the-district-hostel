import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Immutable deep merge to prevent mutation of the base (fallback) messages.
 */
function deepMerge(target: any, source: any) {
  // Create a new object to avoid mutating the original target
  const output = { ...target };

  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Load default (fallback) and current locale messages
  const baseMessages = (
    await import(`../messages/${routing.defaultLocale}.json`)
  ).default;
  const localeMessages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    // Merge locale messages over base messages
    messages: deepMerge(baseMessages, localeMessages),
  };
});

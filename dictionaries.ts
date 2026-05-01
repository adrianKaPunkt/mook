import "server-only";

const dictionaries = {
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export type GlobalLocale = keyof typeof dictionaries;

export const getGlobalDictionary = async (locale: string) => {
  const key: GlobalLocale = locale === "en" ? "en" : "de";
  return dictionaries[key]();
};

export type GlobalDict = Awaited<ReturnType<typeof getGlobalDictionary>>;

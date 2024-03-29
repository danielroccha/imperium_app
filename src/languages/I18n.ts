import { Platform, NativeModules } from "react-native";
import I18n from "i18n-js";

import en from "./en-US.json";
import pt from "./pt-BR.json";
import es from "./es.json";

// const normalizeTranslate: { [key: string]: string } = {
//   en_US: "en_US",
//   en_BR: "en_US",
//   pt_BR: "pt_BR",
//   en: "en_US",
//   pt_US: "pt_BR",
//   es: "es",
//   es_BR: "es",
// };

const getLanguageByDevice = () => {
  return Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLanguages[0] // get current language from device iOS
    : NativeModules.I18nManager.localeIdentifier; // get current language from device android
};

I18n.translations = {
  en_US: en,
  pt_BR: pt,
  es: es,
};

// Função responsável por verificar se o idioma atual do divice está sendo suportado, caso não ele irá setar como 'pt_BR'
const setLanguageToI18n = () => {
  const language = getLanguageByDevice();
  console.log(language);
  let translateNormalize = "pt_BR";

  if (language.startsWith("en")) {
    translateNormalize = "en_US";
  } else if (language.startsWith("es")) {
    translateNormalize = "es";
  } else {
    translateNormalize = "pt_BR";
  }

  // const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage =
    I18n.translations.hasOwnProperty(translateNormalize);

  if (iHaveThisLanguage) I18n.locale = translateNormalize;
  else I18n.defaultLocale = "pt_BR";
};

setLanguageToI18n();

export default I18n;

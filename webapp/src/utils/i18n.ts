import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import fr from '@/locales/fr.json'
import de from '@/locales/de.json'
import ja from '@/locales/ja.json'
import zh_CN from '@/locales/zh_CN.json'

// Define supported languages
export type SupportedLocale = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh_CN';

const supportedLocales: SupportedLocale[] = ['en', 'es', 'fr', 'de', 'ja', 'zh_CN']

const htmlLangMap: Record<SupportedLocale, string> = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
  ja: 'ja',
  zh_CN: 'zh-CN'
}

const normalizeLocale = (lang: string | null): SupportedLocale | null => {
  if (!lang) return null

  const normalizedLang = lang.replace('-', '_')
  if (supportedLocales.includes(normalizedLang as SupportedLocale)) {
    return normalizedLang as SupportedLocale
  }

  const baseLang = normalizedLang.split('_')[0]
  if (baseLang === 'zh') {
    return 'zh_CN'
  }

  return supportedLocales.includes(baseLang as SupportedLocale) ? baseLang as SupportedLocale : null
}

// Get the browser language or use English as fallback
const getBrowserLanguage = (): SupportedLocale => {
  return normalizeLocale(navigator.language) ?? 'en'
}

// Get the stored language preference or use browser language
const getStoredLanguage = (): SupportedLocale => {
  const storedLang = localStorage.getItem('shiori-language')
  return normalizeLocale(storedLang) ?? getBrowserLanguage()
}

// Create the i18n instance
const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: getStoredLanguage(),
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    fr,
    de,
    ja,
    zh_CN
  }
})

// Function to change the language
export const setLanguage = (lang: SupportedLocale): void => {
  i18n.global.locale.value = lang
  localStorage.setItem('shiori-language', lang)
  document.querySelector('html')?.setAttribute('lang', htmlLangMap[lang])
}

// Initialize HTML lang attribute
document.querySelector('html')?.setAttribute('lang', htmlLangMap[getStoredLanguage()])

export default i18n

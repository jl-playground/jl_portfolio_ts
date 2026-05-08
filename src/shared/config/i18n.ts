import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import it from './locales/it.json'

const supportedLocales = ['en', 'de', 'fr', 'it'] as const
type SupportedLocale = (typeof supportedLocales)[number]

const normalizeLocale = (value: string) => value.toLowerCase().split('-')[0]

const getDefaultLocale = (): SupportedLocale => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'en'
  }

  const stored = window.localStorage.getItem('locale')
  if (stored) {
    const normalizedStored = normalizeLocale(stored)
    if (supportedLocales.includes(normalizedStored as SupportedLocale)) {
      return normalizedStored as SupportedLocale
    }
  }

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const language of languages) {
    const normalized = normalizeLocale(language)
    if (supportedLocales.includes(normalized as SupportedLocale)) {
      return normalized as SupportedLocale
    }
  }

  return 'en'
}

const messages = { en, de, fr, it }

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages
})

export default i18n

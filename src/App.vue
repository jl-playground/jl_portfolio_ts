<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="site-header__inner">
        <a class="brand" href="#top">{{ profile.getName() }}</a>
        <nav class="site-nav">
          <a href="#about">{{ t('nav.about') }}</a>
          <a href="#skills">{{ t('nav.skills') }}</a>
          <a href="#projects">{{ t('nav.projects') }}</a>
          <a href="#languages">{{ t('nav.languages') }}</a>
          <a href="#contact" class="nav-cta">{{ t('nav.contact') }}</a>
          <div class="nav-controls">
            <div class="language-picker" ref="languagePicker">
              <button
                class="language-button"
                type="button"
                :aria-expanded="languageOpen"
                aria-haspopup="listbox"
                aria-labelledby="language-label"
                @click="toggleLanguage"
              >
                <i class="pi pi-globe" aria-hidden="true"></i>
                <span>{{ currentLanguageLabel }}</span>
              </button>
              <div
                v-if="languageOpen"
                class="language-menu"
                role="listbox"
                :aria-label="t('nav.languageLabel')"
              >
                <button
                  v-for="option in languageOptions"
                  :key="option.value"
                  class="language-option"
                  :class="{ 'is-active': locale === option.value }"
                  type="button"
                  role="option"
                  :aria-selected="locale === option.value"
                  @click="setLocale(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
            <button
              class="theme-toggle"
              type="button"
              :aria-label="t('nav.themeToggle')"
              @click="toggleTheme"
            >
              <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" aria-hidden="true"></i>
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main id="top" class="site-main">
      <RouterView />
    </main>

    <footer class="site-footer">
      <span>© 2026 {{ profile.getName() }}</span>
      <span>{{ t('footer.role') }}</span>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Profile } from '@/models/Profile'

const profile = Profile.getInstance()
const { locale, t } = useI18n()
const isDark = ref(false)
const languageOpen = ref(false)
const languagePicker = ref<HTMLElement | null>(null)
const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'fr', label: 'Francais' },
  { value: 'it', label: 'Italiano' }
]

const currentLanguageLabel = computed(() => {
  const match = languageOptions.find((option) => option.value === locale.value)
  return match ? match.label : 'English'
})

const updateLocale = () => {
  localStorage.setItem('locale', locale.value)
}

const setLocale = (value: string) => {
  locale.value = value
  updateLocale()
  languageOpen.value = false
}

const toggleLanguage = () => {
  languageOpen.value = !languageOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (!languagePicker.value) return
  if (!languagePicker.value.contains(event.target as Node)) {
    languageOpen.value = false
  }
}

const applyTheme = (dark: boolean) => {
  const root = document.documentElement
  if (dark) {
    root.classList.add('theme-dark')
  } else {
    root.classList.remove('theme-dark')
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme(isDark.value)
}

onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme) {
    isDark.value = storedTheme === 'dark'
  } else if (window.matchMedia) {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme(isDark.value)
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(12px);
  background: color-mix(in srgb, var(--color-bg) 85%, transparent);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.25rem 6vw;
}

.brand {
  font-family: var(--font-display);
  font-size: 1.25rem;
  letter-spacing: 0.02em;
  color: var(--color-ink);
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.95rem;
}

.site-nav a {
  color: var(--color-muted);
}

.site-nav a:hover {
  color: var(--color-ink);
}

.nav-cta {
  color: var(--color-ink);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.nav-controls {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: 0.5rem;
}

.nav-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--color-muted);
}

.language-picker {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 999px;
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.language-picker:focus-within {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent);
}

.language-button {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: none;
  background: transparent;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-ink);
  cursor: pointer;
}

.language-button i {
  font-size: 0.9rem;
  color: var(--color-muted);
}

.language-button::after {
  content: '';
  width: 0.45rem;
  height: 0.45rem;
  border-right: 1.5px solid var(--color-muted);
  border-bottom: 1.5px solid var(--color-muted);
  transform: rotate(45deg);
  margin-left: 0.2rem;
}

.language-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 160px;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.4rem;
  border-radius: 16px;
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  z-index: 20;
}

.language-option {
  text-align: left;
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  border: none;
  background: transparent;
  font-size: 0.85rem;
  color: var(--color-ink);
  cursor: pointer;
}

.language-option:hover,
.language-option.is-active {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

.theme-toggle {
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  width: 2.2rem;
  height: 2.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  font-size: 0.85rem;
  color: var(--color-ink);
  box-shadow: var(--shadow-soft);
}

.site-main {
  flex: 1;
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem 6vw 2.5rem;
  font-size: 0.9rem;
  color: var(--color-muted);
}

@media (max-width: 900px) {
  .site-header__inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .site-nav {
    flex-wrap: wrap;
  }

  .nav-controls {
    flex-wrap: wrap;
  }

  .site-footer {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .site-header__inner {
    padding: 1rem 1.5rem;
  }

  .site-footer {
    padding: 1.5rem 1.5rem 2rem;
  }
}
</style>

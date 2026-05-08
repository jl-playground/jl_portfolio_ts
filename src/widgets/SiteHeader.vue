<template>
  <header class="site-header" :class="{ 'site-header--scrolled': isScrolled }">
    <div class="site-header__inner">
      <div class="site-header__brand">
        <span class="site-header__logo">JL</span>
        <span class="site-header__role">{{ t('footer.role') }}</span>
      </div>

      <nav class="site-header__nav">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="site-header__link"
          :class="{ 'site-header__link--active': activeSection === link.id }"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="site-header__controls">
        <!-- Desktop language dropdown -->
        <div class="site-header__lang site-header__lang--desktop" ref="langRefDesktop">
          <button
            class="site-header__lang-btn"
            :aria-expanded="langOpen"
            @click="langOpen = !langOpen"
          >
            <span class="site-header__lang-current">{{ currentLocale.toUpperCase() }}</span>
            <i class="pi pi-chevron-down site-header__lang-chevron" :class="{ 'is-open': langOpen }"></i>
          </button>
          <transition name="dropdown">
            <ul v-if="langOpen" class="site-header__lang-menu" role="listbox">
              <li
                v-for="opt in locales"
                :key="opt.value"
                role="option"
                class="site-header__lang-item"
                :class="{ 'is-active': currentLocale === opt.value }"
                @click="selectLocale(opt.value)"
              >
                <span class="site-header__lang-flag">{{ opt.flag }}</span>
                <span class="site-header__lang-label">{{ opt.label }}</span>
                <i v-if="currentLocale === opt.value" class="pi pi-check site-header__lang-check"></i>
              </li>
            </ul>
          </transition>
        </div>

        <button class="site-header__theme" :aria-label="t('nav.themeToggle')" @click="toggleTheme">
          <i class="pi" :class="isDark ? 'pi-sun' : 'pi-moon'"></i>
        </button>
        <button class="site-header__menu-btn" @click="mobileOpen = !mobileOpen">
          <i class="pi" :class="mobileOpen ? 'pi-times' : 'pi-bars'"></i>
        </button>
      </div>
    </div>

    <div class="site-header__progress"><div class="site-header__progress-fill" :style="{ width: scrollProgress + '%' }"></div></div>

    <transition name="drawer">
      <div v-if="mobileOpen" class="site-header__mobile">
        <div class="site-header__mobile-backdrop" @click="mobileOpen = false"></div>
        <div class="site-header__mobile-panel">
          <nav class="site-header__mobile-nav">
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              class="site-header__mobile-link"
              @click.prevent="scrollTo(link.id); mobileOpen = false"
            >
              {{ link.label }}
            </a>
          </nav>
          <div class="site-header__mobile-controls">
            <!-- Mobile language dropdown -->
            <div class="site-header__lang site-header__lang--mobile" ref="langRefMobile">
              <button
                class="site-header__lang-btn"
                :aria-expanded="langOpenMobile"
                @click="langOpenMobile = !langOpenMobile"
              >
                <span class="site-header__lang-current">{{ currentLocale.toUpperCase() }}</span>
                <i class="pi pi-chevron-down site-header__lang-chevron" :class="{ 'is-open': langOpenMobile }"></i>
              </button>
              <transition name="dropdown">
                <ul v-if="langOpenMobile" class="site-header__lang-menu" role="listbox">
                  <li
                    v-for="opt in locales"
                    :key="opt.value"
                    role="option"
                    class="site-header__lang-item"
                    :class="{ 'is-active': currentLocale === opt.value }"
                    @click="selectLocale(opt.value)"
                  >
                    <span class="site-header__lang-flag">{{ opt.flag }}</span>
                    <span class="site-header__lang-label">{{ opt.label }}</span>
                    <i v-if="currentLocale === opt.value" class="pi pi-check site-header__lang-check"></i>
                  </li>
                </ul>
              </transition>
            </div>
            <button class="site-header__theme" @click="toggleTheme">
              <i class="pi" :class="isDark ? 'pi-sun' : 'pi-moon'"></i>
              {{ isDark ? t('theme.light') : t('theme.dark') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const isDark = ref(false)
const isScrolled = ref(false)
const scrollProgress = ref(0)
const mobileOpen = ref(false)
const activeSection = ref('')

const currentLocale = ref(locale.value)
const langOpen = ref(false)
const langOpenMobile = ref(false)

const locales = [
  { label: 'English', value: 'en', flag: '🇬🇧' },
  { label: 'Deutsch', value: 'de', flag: '🇩🇪' },
  { label: 'Francais', value: 'fr', flag: '🇫🇷' },
  { label: 'Italiano', value: 'it', flag: '🇮🇹' }
]

const selectLocale = (val: string) => {
  currentLocale.value = val
  locale.value = val
  window.localStorage.setItem('locale', val)
  langOpen.value = false
  langOpenMobile.value = false
}

watch(currentLocale, (val) => {
  locale.value = val
  window.localStorage.setItem('locale', val)
})

const navLinks = computed(() => [
  { label: t('nav.about'), href: '#about', id: 'about' },
  { label: t('nav.skills'), href: '#skills', id: 'skills' },
  { label: t('nav.projects'), href: '#projects', id: 'projects' },
  { label: t('nav.experience'), href: '#experience', id: 'experience' },
  { label: t('nav.blog'), href: '#blog', id: 'blog' },
  { label: t('nav.contact'), href: '#contact', id: 'contact' }
])

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('theme-dark', isDark.value)
  window.localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

let rafId: number
const onScroll = () => {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    const y = window.scrollY
    isScrolled.value = y > 20
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = max > 0 ? (y / max) * 100 : 0

    for (const link of navLinks.value.slice().reverse()) {
      const el = document.getElementById(link.id)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120) {
          activeSection.value = link.id
          break
        }
      }
    }
  })
}

// Close dropdown on outside click
const onDocumentClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.site-header__lang')) {
    langOpen.value = false
    langOpenMobile.value = false
  }
}

onMounted(() => {
  const savedTheme = window.localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('theme-dark')
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onDocumentClick)
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onDocumentClick)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(var(--color-bg), 0.7);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.site-header--scrolled {
  border-bottom-color: var(--color-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.site-header__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.site-header__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.site-header__logo {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: -0.02em;
}

.site-header__role {
  font-size: 0.8rem;
  color: var(--color-muted);
  display: none;
}

@media (min-width: 640px) {
  .site-header__role {
    display: inline;
  }
}

.site-header__nav {
  display: flex;
  gap: 1.75rem;
  align-items: center;
}

.site-header__link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-muted);
  transition: color 0.2s ease;
  position: relative;
}

.site-header__link:hover {
  color: var(--color-ink);
}

.site-header__link--active {
  color: var(--color-accent);
}

.site-header__controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* ── Language Dropdown ── */
.site-header__lang {
  position: relative;
}

.site-header__lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-ink);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.site-header__lang-btn:hover {
  border-color: var(--color-accent);
  background: var(--color-accent-soft);
}

.site-header__lang-current {
  min-width: 1.5rem;
  text-align: center;
}

.site-header__lang-chevron {
  font-size: 0.65rem;
  transition: transform 0.2s ease;
  color: var(--color-muted);
}

.site-header__lang-chevron.is-open {
  transform: rotate(180deg);
}

.site-header__lang-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 160px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0.4rem;
  list-style: none;
  z-index: 200;
  box-shadow: var(--shadow-card);
}

.site-header__lang-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--color-ink);
  transition: background 0.15s ease;
}

.site-header__lang-item:hover {
  background: var(--color-accent-soft);
}

.site-header__lang-item.is-active {
  color: var(--color-accent);
  font-weight: 600;
}

.site-header__lang-flag {
  font-size: 1rem;
}

.site-header__lang-label {
  flex: 1;
}

.site-header__lang-check {
  font-size: 0.7rem;
  color: var(--color-accent);
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.site-header__theme {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-ink);
  cursor: pointer;
  transition: all 0.2s ease;
}

.site-header__theme:hover {
  border-color: var(--color-accent);
  background: var(--color-accent-soft);
}

.site-header__menu-btn {
  display: none;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-ink);
  cursor: pointer;
}

.site-header__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-surface-raised);
}

.site-header__progress-fill {
  height: 100%;
  background: var(--color-accent);
  transition: width 0.1s linear;
}

@media (max-width: 900px) {
  .site-header__nav {
    display: none;
  }
  .site-header__lang--desktop {
    display: none;
  }
  .site-header__menu-btn {
    display: inline-flex;
  }
}

/* Mobile drawer */
.site-header__mobile {
  position: fixed;
  inset: 0;
  z-index: 101;
}

.site-header__mobile-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}

.site-header__mobile-panel {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  background: var(--color-surface);
  border-left: 1px solid var(--color-border);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.site-header__mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
}

.site-header__mobile-link {
  padding: 0.75rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-ink);
  border-bottom: 1px solid var(--color-border);
}

.site-header__mobile-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
</style>

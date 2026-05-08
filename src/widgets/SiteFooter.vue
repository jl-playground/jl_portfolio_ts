<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__main">
        <div class="site-footer__brand">
          <span class="site-footer__logo">JL</span>
          <span class="site-footer__role">Joel Leimbacher — {{ t('footer.role') }}</span>
        </div>
        <div class="site-footer__links">
          <a href="#about" @click.prevent="scrollTo('about')">{{ t('nav.about') }}</a>
          <a href="#projects" @click.prevent="scrollTo('projects')">{{ t('nav.projects') }}</a>
          <a href="#contact" @click.prevent="scrollTo('contact')">{{ t('nav.contact') }}</a>
        </div>
      </div>
      <div class="site-footer__bottom">
        <p>© {{ new Date().getFullYear() }} Joel Leimbacher. All rights reserved.</p>
        <button class="site-footer__top" @click="scrollTo('hero')">
          {{ t('footer.backToTop') }}
          <i class="pi pi-arrow-up"></i>
        </button>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--color-border);
  margin-top: 4rem;
}

.site-footer__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.site-footer__main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.site-footer__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.site-footer__logo {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-accent);
}

.site-footer__role {
  font-size: 0.9rem;
  color: var(--color-muted);
}

.site-footer__links {
  display: flex;
  gap: 1.5rem;
}

.site-footer__links a {
  font-size: 0.9rem;
  color: var(--color-muted);
  transition: color 0.2s ease;
}

.site-footer__links a:hover {
  color: var(--color-accent);
}

.site-footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.site-footer__bottom p {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.site-footer__top {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--color-muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.site-footer__top:hover {
  color: var(--color-accent);
}

@media (max-width: 640px) {
  .site-footer__main {
    flex-direction: column;
    align-items: flex-start;
  }
  .site-footer__links {
    width: 100%;
    justify-content: flex-start;
    gap: 1rem;
  }
  .site-footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

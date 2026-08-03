<template>
  <section id="hero" class="hero">
    <div class="hero__content">
      <p class="hero__eyebrow">{{ t('hero.eyebrow') }}</p>

      <h1 class="hero__title" :class="{ 'word-reveal': isVisible }">
        <template v-for="(word, wi) in nameWords" :key="wi">
          <span class="hero__word">
            <span class="hero__word-inner" :style="{ '--i': wi }">{{ word }}</span>
          </span>
          <span v-if="wi < nameWords.length - 1" class="hero__word-space"> </span>
        </template>
      </h1>
      <p class="hero__subtitle" :class="{ 'line-visible': isVisible }">{{ profile.getTitle() }}</p>
      <p class="hero__copy">{{ t('hero.description') }}</p>

      <div class="hero__actions">
        <AppButton variant="primary" @click="scrollTo('projects')">
          {{ t('hero.primaryCta') }}
          <span class="hero__arrow">→</span>
        </AppButton>
        <AppButton variant="ghost" @click="scrollTo('contact')">
          {{ t('hero.secondaryCta') }}
        </AppButton>
      </div>

      <div class="hero__band">
        <div class="hero__band-info">
          <p class="hero__band-label">{{ t('hero.availabilityLabel') }}</p>
          <p class="hero__band-title">{{ t('hero.availabilityTitle') }}</p>
          <div class="hero__card-links">
            <a class="hero__link" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
          </div>
        </div>
        <div class="hero__socials">
          <a v-if="contact.github" :href="contact.github" target="_blank" rel="noreferrer" class="hero__social">
            <i class="pi pi-github"></i>
          </a>
          <a v-if="contact.linkedin" :href="contact.linkedin" target="_blank" rel="noreferrer" class="hero__social">
            <i class="pi pi-linkedin"></i>
          </a>
        </div>
      </div>

      <div class="hero__marquee">
        <div class="hero__marquee-track">
          <span class="hero__marquee-item">{{ t('hero.marquee') }}</span>
          <span class="hero__marquee-item">{{ t('hero.marquee') }}</span>
          <span class="hero__marquee-item">{{ t('hero.marquee') }}</span>
        </div>
      </div>

      <div class="hero__scroll"></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Profile } from '@/entities/profile/model/Profile'
import AppButton from '@/shared/ui/AppButton.vue'

const { t } = useI18n()
const profile = Profile.getInstance()
const contact = profile.getContact()

const isVisible = ref(false)

const nameWords = computed(() => profile.getName().split(' '))

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem 1.5rem 4rem;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.4;
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse at center, #000, transparent 70%);
  mask-image: radial-gradient(ellipse at center, #000, transparent 70%);
  pointer-events: none;
}

.hero__content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Eyebrow with pulsing dot */
.hero__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 0.7rem;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
  font-weight: 600;
  position: relative;
  padding-left: 1rem;
}

.hero__eyebrow::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* Title with word-by-word reveal */
.hero__title {
  font-family: var(--font-display);
  font-size: var(--step-6);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin-bottom: 0.5rem;
  color: var(--color-ink);
}

.hero__word {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}

.hero__word-inner {
  display: inline-block;
  transform: translateY(100%);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i) * 0.12s);
}


.hero__title.word-reveal .hero__word-inner {
  transform: translateY(0);
}

.hero__word-space {
  display: inline-block;
  width: 0.3em;
}

/* Subtitle with animated underline */
.hero__subtitle {
  font-size: var(--step-2);
  color: var(--color-muted);
  margin-bottom: 1.5rem;
  position: relative;
}

.hero__subtitle::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 3px;
  background: var(--color-accent-gradient);
  transition: width 0.8s ease 0.4s;
}

.hero__subtitle.line-visible::after {
  width: 4rem;
}

/* Description */
.hero__copy {
  font-size: var(--step-1);
  max-width: var(--measure);
  color: var(--color-muted);
  line-height: 1.7;
}

/* Actions with arrow */
.hero__actions {
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.hero__arrow {
  display: inline-block;
  margin-left: 0.4rem;
  transition: transform 0.2s ease;
  font-size: 1.1em;
}

.hero__actions :deep(.app-button):hover .hero__arrow {
  transform: translateX(2px);
}

/* Band */
.hero__band {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  width: 100%;
}

.hero__band-info {
  flex: 1;
}

.hero__band-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-muted);
  margin: 0;
}

.hero__band-title {
  font-size: 1.1rem;
  margin: 0.4rem 0 0.6rem;
  font-weight: 600;
}

.hero__card-links {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
}

.hero__link {
  color: var(--color-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.hero__link:hover {
  color: var(--color-accent);
}

.hero__socials {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.hero__social {
  color: var(--color-muted);
  font-size: 1rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.hero__social:hover {
  color: var(--color-accent);
}

/* Marquee strip */
.hero__marquee {
  width: 100%;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  margin-top: 1.5rem;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.hero__marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.hero__marquee-item {
  font-family: var(--font-display);
  font-size: var(--step-1);
  font-weight: 500;
  color: var(--color-muted);
  white-space: nowrap;
  padding: 0.75rem 0;
}

.hero__marquee-item:not(:last-child) {
  padding-right: 2rem;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-33.333%); }
}

/* Scroll indicator with pulsing dot */
.hero__scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 32px;
  background: var(--color-border-strong);
}

.hero__scroll::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: scroll-pulse 2s ease-in-out infinite;
}

@keyframes scroll-pulse {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

@media (max-width: 1024px) {
  .hero__band {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 720px) {
  .hero {
    padding: 3rem 1rem 3rem;
    min-height: auto;
  }
  .hero__content {
    align-items: stretch;
  }
  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }
  .hero__actions :deep(.app-button) {
    width: 100%;
  }
  .hero__band {
    flex-direction: column;
    align-items: flex-start;
  }
  .hero__scroll {
    display: none;
  }
}
</style>

<template>
  <section id="hero" class="hero">
    <div class="hero__inner">
      <div class="hero__main">
        <p class="hero__eyebrow">{{ t('hero.eyebrow') }}</p>

        <div class="hero__typewriter">
          <p class="hero__greeting">{{ line1 }}</p>
          <h1 class="hero__title">{{ line2 }}</h1>
          <p class="hero__subtitle">
            <span>{{ line3 }}</span>
            <span v-if="showCursor" class="typing-cursor"></span>
          </p>
          <p class="hero__copy">{{ line4 }}</p>
        </div>

        <div class="hero__actions">
          <AppButton variant="primary" @click="scrollTo('projects')">
            {{ t('hero.primaryCta') }}
          </AppButton>
          <AppButton variant="ghost" @click="scrollTo('contact')">
            {{ t('hero.secondaryCta') }}
          </AppButton>
        </div>
      </div>

      <div class="hero__aside">
        <AppCard class="hero__card" glass hoverable>
          <p class="hero__card-label">{{ t('hero.availabilityLabel') }}</p>
          <p class="hero__card-title">{{ t('hero.availabilityTitle') }}</p>
          <div class="hero__card-links">
            <a class="hero__link" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            <span v-if="contact.phone" class="hero__link">{{ contact.phone }}</span>
          </div>
        </AppCard>
        <div class="hero__socials">
          <a v-if="contact.github" :href="contact.github" target="_blank" rel="noreferrer" class="hero__social">
            <i class="pi pi-github"></i>
          </a>
          <a v-if="contact.linkedin" :href="contact.linkedin" target="_blank" rel="noreferrer" class="hero__social">
            <i class="pi pi-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Profile } from '@/entities/profile/model/Profile'
import AppButton from '@/shared/ui/AppButton.vue'
import AppCard from '@/shared/ui/AppCard.vue'

const { t } = useI18n()
const profile = Profile.getInstance()
const contact = profile.getContact()

const line1 = ref('')
const line2 = ref('')
const line3 = ref('')
const line4 = ref('')
const showCursor = ref(true)

const fullLine1 = t('hero.greeting')
const fullLine2 = profile.getName()
const fullLine3 = profile.getTitle()
const fullLine4 = t('hero.description')

let timeoutId: ReturnType<typeof setTimeout> | null = null
let cursorInterval: ReturnType<typeof setInterval> | null = null

const typeLine = (
  target: typeof line1,
  fullText: string,
  speed: number,
  onDone?: () => void
) => {
  let i = 0
  const step = () => {
    if (i <= fullText.length) {
      target.value = fullText.slice(0, i)
      i++
      timeoutId = setTimeout(step, speed)
    } else if (onDone) {
      onDone()
    }
  }
  step()
}

const startTyping = () => {
  // Speeds vary slightly for natural feel
  typeLine(line1, fullLine1, 55, () => {
    timeoutId = setTimeout(() => {
      typeLine(line2, fullLine2, 75, () => {
        timeoutId = setTimeout(() => {
          typeLine(line3, fullLine3, 65, () => {
            timeoutId = setTimeout(() => {
              typeLine(line4, fullLine4, 18, () => {
                // Done — start blinking cursor
              })
            }, 400)
          })
        }, 350)
      })
    }, 300)
  })
}

onMounted(() => {
  startTyping()
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 530)
})

onBeforeUnmount(() => {
  if (timeoutId) clearTimeout(timeoutId)
  if (cursorInterval) clearInterval(cursorInterval)
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
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem 5rem;
}

.hero__inner {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr minmax(280px, 0.42fr);
  gap: 4rem;
  align-items: center;
}

.hero__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.75rem;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.hero__greeting {
  font-size: 1.15rem;
  color: var(--color-muted);
  margin-bottom: 0.25rem;
  min-height: 1.5rem;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 1.05;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--color-ink) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  min-height: 1.1em;
}

.hero__subtitle {
  font-size: 1.35rem;
  color: var(--color-muted);
  margin-bottom: 1.5rem;
  min-height: 1.8rem;
}

.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background: var(--color-accent);
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.hero__copy {
  font-size: 1.1rem;
  max-width: 520px;
  color: var(--color-ink);
  line-height: 1.7;
  min-height: 3.5rem;
}

.hero__actions {
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
}

.hero__aside {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero__card {
  padding: 1.75rem;
}

.hero__card-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-muted);
}

.hero__card-title {
  font-size: 1.3rem;
  margin: 0.6rem 0 1rem;
  font-weight: 600;
}

.hero__card-links {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.95rem;
}

.hero__link {
  color: var(--color-accent);
  transition: opacity 0.2s;
}

.hero__link:hover {
  opacity: 0.8;
}

.hero__socials {
  display: flex;
  gap: 0.75rem;
}

.hero__social {
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--color-border-strong);
  color: var(--color-ink);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.hero__social:hover {
  background: var(--color-accent);
  color: var(--ctp-crust);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .hero__aside {
    flex-direction: row;
    align-items: flex-start;
  }
}

@media (max-width: 720px) {
  .hero {
    padding: 2rem 1rem 3rem;
    min-height: auto;
  }
  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }
  .hero__actions :deep(.app-button) {
    width: 100%;
  }
  .hero__aside {
    flex-direction: column;
  }
}
</style>

<template>
  <section id="about" class="about section reveal" :ref="setRef">
    <SectionHeader eyebrow="01 — About" :title="t('about.title')" :subtitle="t('about.subtitle')" />

    <div class="about__lead">
      <p class="about__lead-text">{{ profile.getAbout() }}</p>
      <div class="about__monogram">JL</div>
    </div>

    <div class="about__cards">
      <AppCard class="about__card" hoverable>
        <h3 class="about__card-title">{{ t('about.focusTitle') }}</h3>
        <p>{{ t('about.focusBody') }}</p>
      </AppCard>
      <AppCard class="about__card" hoverable>
        <h3 class="about__card-title">{{ t('about.achievementsTitle') }}</h3>
        <p>{{ t('about.achievementsBody') }}</p>
      </AppCard>
      <AppCard class="about__card" hoverable>
        <h3 class="about__card-title">{{ t('about.currentTitle') }}</h3>
        <p>{{ t('about.currentBody') }}</p>
      </AppCard>
    </div>

    <div class="about__action">
      <AppButton variant="outline" @click="scrollToContact">
        <i class="pi pi-send"></i> {{ t('about.getInTouch') }}
      </AppButton>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Profile } from '@/entities/profile/model/Profile'
import SectionHeader from '@/shared/ui/SectionHeader.vue'
import AppCard from '@/shared/ui/AppCard.vue'
import AppButton from '@/shared/ui/AppButton.vue'

const { t } = useI18n()
const profile = Profile.getInstance()

const setRef = (el: unknown) => {
  if (el instanceof HTMLElement) el.classList.add('reveal')
}

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.about__lead {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  margin-bottom: 3rem;
}

.about__lead-text {
  flex: 1 1 min(68ch, 70%);
  font-size: var(--step-1);
  font-family: var(--font-display);
  line-height: 1.6;
  color: var(--color-ink);
  margin: 0;
}

.about__monogram {
  width: 8rem;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: var(--step-6);
  font-weight: 700;
  background: var(--color-accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border: 1px solid var(--color-accent);
  flex-shrink: 0;
}

.about__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.about__card-title {
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
  color: var(--color-ink);
}

.about__card p {
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

.about__action {
  margin-top: 1rem;
}

@media (max-width: 1024px) {
  .about__lead {
    flex-direction: column;
    gap: 2rem;
  }

  .about__lead-text {
    flex: 1 1 auto;
    max-width: 100%;
  }

  .about__monogram {
    max-width: 8rem;
    align-self: center;
  }
}

@media (max-width: 768px) {
  .about__cards {
    grid-template-columns: 1fr;
  }
}
</style>

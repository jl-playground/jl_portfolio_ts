<template>
  <section id="about" class="about section reveal" :ref="setRef">
    <SectionHeader :title="t('about.title')" :subtitle="t('about.subtitle')" />
    <div class="about__grid">
      <div class="about__text">
        <div class="about__cards">
          <AppCard class="about__card" hoverable>
            <h3 class="about__card-title">{{ t('about.focusTitle') }}</h3>
            <p>{{ t('about.focusBody') }}</p>
          </AppCard>
          <AppCard class="about__card" hoverable>
            <h3 class="about__card-title">{{ t('about.approachTitle') }}</h3>
            <p>{{ t('about.approachBody') }}</p>
          </AppCard>
          <AppCard class="about__card" hoverable>
            <h3 class="about__card-title">{{ t('about.currentTitle') }}</h3>
            <p>{{ t('about.currentBody') }}</p>
          </AppCard>
        </div>
        <AppButton variant="outline" class="about__cv" @click="downloadCv">
          <i class="pi pi-download"></i> {{ t('about.downloadCv') }}
        </AppButton>
      </div>
      <div class="about__visual">
        <AppCard class="about__avatar-card" glass>
          <AvatarComponent />
        </AppCard>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/shared/ui/SectionHeader.vue'
import AppCard from '@/shared/ui/AppCard.vue'
import AppButton from '@/shared/ui/AppButton.vue'
import AvatarComponent from '@/components/AvatarComponent.vue'

const { t } = useI18n()

const setRef = (el: unknown) => {
  if (el instanceof HTMLElement) el.classList.add('reveal')
}

const downloadCv = () => {
  // Placeholder - in production, link to actual CV file
  alert('CV download coming soon!')
}
</script>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.6fr);
  gap: 3rem;
  align-items: normal;
}

.about__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.5rem;
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

.about__visual {
  display: flex;
  justify-content: center;
  align-items: normal;
}

.about__avatar-card {
  width: 100%;
  max-width: 320px;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.about__cv {
  margin-top: 0.5rem;
}

@media (max-width: 1024px) {
  .about__grid {
    grid-template-columns: 1fr;
  }
  .about__visual {
    order: -1;
    margin-bottom: 1rem;
  }
  .about__avatar-card {
    max-width: 260px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .about__cards {
    grid-template-columns: 1fr;
  }
}
</style>

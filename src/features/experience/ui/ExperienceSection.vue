<template>
  <section id="experience" class="experience section reveal" :ref="setRef">
    <SectionHeader :title="t('experience.title')" :subtitle="t('experience.subtitle')" />
    <div class="experience__timeline">
      <div v-for="(exp, index) in experiences" :key="index" class="experience__entry" :class="{ 'experience__entry--right': index % 2 !== 0 }">
        <div class="experience__dot"></div>
        <AppCard class="experience__card" hoverable>
          <div class="experience__header">
            <div class="experience__meta">
              <span class="experience__company">{{ exp.getCompany() }}</span>
              <span class="experience__date">
                {{ formatDate(exp.getStartDate(), locale) }} — {{ exp.getEndDate() ? formatDate(exp.getEndDate()!, locale) : t('experience.present') }}
                <span class="experience__duration">({{ exp.getDuration() }})</span>
              </span>
            </div>
            <AppChip variant="accent">{{ exp.getRole() }}</AppChip>
          </div>
          <ul class="experience__description">
            <li v-for="(item, i) in exp.getDescription()" :key="i">{{ item }}</li>
          </ul>
          <div class="experience__tech">
            <AppChip v-for="tech in exp.getTechStack()" :key="tech" variant="default">{{ tech }}</AppChip>
          </div>
        </AppCard>
      </div>
      <div class="experience__line"></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Profile } from '@/entities/profile/model/Profile'
import SectionHeader from '@/shared/ui/SectionHeader.vue'
import AppCard from '@/shared/ui/AppCard.vue'
import AppChip from '@/shared/ui/AppChip.vue'
import { formatMonthYear } from '@/shared/lib/utils'

const { t, locale } = useI18n()
const profile = Profile.getInstance()
const experiences = profile.getExperiences()

const formatDate = formatMonthYear

const setRef = (el: unknown) => {
  if (el instanceof HTMLElement) el.classList.add('reveal')
}
</script>

<style scoped>
.experience__timeline {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 3rem;
  padding: 0 1rem;
}

.experience__entry {
  position: relative;
  grid-column: 1;
}

.experience__entry--right {
  grid-column: 2;
}

.experience__dot {
  position: absolute;
  top: 1.5rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  border: 3px solid var(--color-bg);
  z-index: 2;
}

.experience__entry:not(.experience__entry--right) .experience__dot {
  right: -42px;
}

.experience__entry--right .experience__dot {
  left: -42px;
}

.experience__line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: linear-gradient(to bottom, var(--color-accent), var(--color-accent-soft));
  transform: translateX(-50%);
  border-radius: 2px;
}

.experience__card {
  padding: 1.5rem;
}

.experience__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.experience__meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.experience__company {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--color-ink);
}

.experience__date {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.experience__duration {
  margin-left: 0.5rem;
  color: var(--color-accent);
}

.experience__description {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.experience__description li {
  position: relative;
  padding-left: 1.2rem;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: var(--color-muted);
  line-height: 1.6;
}

.experience__description li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
}

.experience__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .experience__timeline {
    grid-template-columns: 1fr;
    padding-left: 1.5rem;
  }
  .experience__entry,
  .experience__entry--right {
    grid-column: 1;
  }
  .experience__dot {
    left: -26px !important;
    right: auto !important;
  }
  .experience__line {
    left: 0;
  }
}
</style>

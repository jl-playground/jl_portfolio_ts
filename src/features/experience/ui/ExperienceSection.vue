<template>
  <section id="experience" class="experience section reveal" :ref="setRef">
    <SectionHeader :title="t('experience.title')" :subtitle="t('experience.subtitle')" eyebrow="04 — Experience" />
    <div class="experience__timeline">
      <div class="experience__rail"></div>
      <div v-for="(exp, index) in experiences" :key="index" class="experience__entry">
        <div class="experience__dot"></div>
        <div class="experience__content">
          <div class="experience__header">
            <h3 class="experience__company">{{ exp.getCompany() }}</h3>
            <AppChip variant="accent">{{ exp.getRole() }}</AppChip>
          </div>
          <p class="experience__date">
            {{ formatDate(exp.getStartDate(), locale) }} — {{ exp.getEndDate() ? formatDate(exp.getEndDate()!, locale) : t('experience.present') }}
            <span class="experience__duration">({{ exp.getDuration() }})</span>
          </p>
          <ul class="experience__description">
            <li v-for="(item, i) in exp.getDescription()" :key="i">{{ item }}</li>
          </ul>
          <div class="experience__tech">
            <AppChip v-for="tech in exp.getTechStack()" :key="tech" variant="default">{{ tech }}</AppChip>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Profile } from '@/entities/profile/model/Profile'
import SectionHeader from '@/shared/ui/SectionHeader.vue'
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
  max-width: 720px;
  padding-left: 2.5rem;
}

.experience__rail {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.35rem;
  width: 2px;
  background: var(--color-border-strong);
}

.experience__entry {
  position: relative;
  padding-bottom: 3.5rem;
}

.experience__entry:last-child {
  padding-bottom: 0;
}

.experience__dot {
  position: absolute;
  left: -2.5rem;
  top: 0.1rem;
  width: 8px;
  height: 8px;
  border-radius: 0;
  background: var(--color-accent-gradient);
  box-shadow: 0 0 0 4px var(--color-accent-soft);
  z-index: 2;
}

.experience__content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.experience__header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.experience__company {
  font-family: var(--font-display);
  font-size: var(--step-2);
  font-weight: 700;
  color: var(--color-ink);
  margin: 0;
  letter-spacing: -0.02em;
}

.experience__date {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-muted);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.experience__duration {
  color: var(--color-accent);
  margin-left: 0.35rem;
  font-weight: 500;
}

.experience__description {
  list-style: none;
  padding: 0;
  margin: 0;
}

.experience__description li {
  position: relative;
  padding-left: 1.25rem;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: var(--color-muted);
  line-height: 1.65;
}

.experience__description li:last-child {
  margin-bottom: 0;
}

.experience__description li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 5px;
  height: 5px;
  border-radius: 0;
  background: var(--color-accent);
  opacity: 0.7;
}

.experience__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>

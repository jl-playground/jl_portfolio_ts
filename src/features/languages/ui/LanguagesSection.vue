<template>
  <section id="languages" class="languages section reveal" :ref="setRef">
    <SectionHeader :title="t('languages.title')" :subtitle="t('languages.subtitle')" />

    <div class="languages__grid">
      <AppCard class="languages__panel" hoverable>
        <h3 class="languages__panel-title">{{ t('languages.humanTitle') }}</h3>
        <div class="languages__human-list">
          <div v-for="lang in humanLanguages" :key="lang.code" class="languages__human-item">
            <div class="languages__human-header">
              <span class="languages__human-name">{{ lang.name }}</span>
              <span class="languages__human-level">{{ lang.level }}</span>
            </div>
            <div class="languages__human-bar">
              <div class="languages__human-fill" :style="{ width: lang.percent + '%' }"></div>
            </div>
          </div>
        </div>
      </AppCard>

      <AppCard class="languages__panel" hoverable>
        <h3 class="languages__panel-title">{{ t('languages.programmingTitle') }}</h3>
        <div class="languages__prog-list">
          <div v-for="lang in programmingLanguages" :key="lang.getName()" class="languages__prog-item">
            <div class="languages__prog-header">
              <span class="languages__prog-name">{{ lang.getName() }}</span>
              <AppChip :variant="getProficiencyVariant(lang.getProficiency()) as any">
                {{ lang.getProficiency() }}
              </AppChip>
            </div>
            <div class="languages__prog-bar">
              <div class="languages__prog-fill" :style="{ width: lang.getSkillLevel() * 10 + '%' }"></div>
            </div>
            <div class="languages__prog-meta">
              <span>{{ t('languages.experience', { years: lang.getExperienceYears() }) }}</span>
              <span v-if="lang.getRelevantProjects() && lang.getRelevantProjects()!.length > 0">
                {{ t('languages.projects', { projects: lang.getRelevantProjects()!.length }) }}
              </span>
            </div>
          </div>
        </div>
      </AppCard>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Profile } from '@/entities/profile/model/Profile'
import SectionHeader from '@/shared/ui/SectionHeader.vue'
import AppCard from '@/shared/ui/AppCard.vue'
import AppChip from '@/shared/ui/AppChip.vue'

const { t } = useI18n()
const profile = Profile.getInstance()
const programmingLanguages = profile.getLanguages()

const humanLanguages = [
  { code: 'de', name: 'Deutsch', level: 'Muttersprache', percent: 100 },
  { code: 'en', name: 'English', level: 'B2', percent: 80 },
  { code: 'fr', name: 'Français', level: 'B1', percent: 55 }
]

const getProficiencyVariant = (p: string): string => {
  if (p === 'Expert') return 'green'
  if (p === 'Advanced') return 'blue'
  if (p === 'Intermediate') return 'peach'
  return 'default'
}

const setRef = (el: unknown) => {
  if (el instanceof HTMLElement) el.classList.add('reveal')
}
</script>

<style scoped>
.languages__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem;
}

.languages__panel-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.languages__human-list,
.languages__prog-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.languages__human-header,
.languages__prog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.languages__human-name,
.languages__prog-name {
  font-weight: 500;
  font-size: 0.95rem;
}

.languages__human-level {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.languages__human-bar,
.languages__prog-bar {
  height: 6px;
  background: var(--color-surface-raised);
  border-radius: 999px;
  overflow: hidden;
}

.languages__human-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--ctp-teal), var(--ctp-green));
  border-radius: 999px;
  transition: width 1s ease;
}

.languages__prog-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-hover));
  border-radius: 999px;
  transition: width 1s ease;
}

.languages__prog-meta {
  display: flex;
  gap: 1rem;
  margin-top: 0.3rem;
  font-size: 0.8rem;
  color: var(--color-muted);
}

@media (max-width: 768px) {
  .languages__grid {
    grid-template-columns: 1fr;
  }
}
</style>

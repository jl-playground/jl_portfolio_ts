<template>
  <section id="skills" class="skills section reveal" :ref="setRef">
    <SectionHeader :title="t('skills.title')" :subtitle="t('skills.subtitle')" />
    <div class="skills__layout">
      <div class="skills__groups">
        <div v-for="group in skillGroups" :key="group.name" class="skills__group">
          <h3 class="skills__group-title">{{ group.name }}</h3>
          <div class="skills__list">
            <div v-for="skill in group.items" :key="skill.name" class="skills__item">
              <div class="skills__item-header">
                <span class="skills__name">{{ skill.name }}</span>
                <span class="skills__level-text">{{ skill.proficiency }}</span>
              </div>
              <div class="skills__bar">
                <div class="skills__bar-fill" :style="{ width: skill.skillLevel * 10 + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppCard class="skills__radar" hoverable>
        <h3 class="skills__radar-title">{{ t('skills.radarTitle') }}</h3>
        <Chart type="radar" :data="chartData" :options="chartOptions" class="skills__chart" />
      </AppCard>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Chart from 'primevue/chart'
import { Profile } from '@/entities/profile/model/Profile'
import type { ProgrammingLanguage } from '@/entities/profile/model/ProgrammingLanguage'
import SectionHeader from '@/shared/ui/SectionHeader.vue'
import AppCard from '@/shared/ui/AppCard.vue'

interface SkillItem {
  name: string
  proficiency: string
  skillLevel: number
}

const { t } = useI18n()
const profile = Profile.getInstance()
const languages = profile.getLanguages()

const chartData = ref()
const chartOptions = ref()

function toSkillItems(langs: ProgrammingLanguage[]): SkillItem[] {
  return langs.map(l => ({ name: l.getName(), proficiency: l.getProficiency(), skillLevel: l.getSkillLevel() }))
}

const skillGroups: { name: string; items: SkillItem[] }[] = [
  {
    name: 'Languages',
    items: toSkillItems(languages.filter(l => ['JavaScript', 'TypeScript', 'Dart', 'Python', 'Java', 'Kotlin', 'Rust', 'Go', 'C#', 'Lua'].includes(l.getName())))
  },
  {
    name: 'Frameworks & Platforms',
    items: [
      { name: 'Node.js', proficiency: 'Expert', skillLevel: 8 },
      { name: 'Vue.js', proficiency: 'Expert', skillLevel: 8 },
      { name: 'Flutter', proficiency: 'Expert', skillLevel: 7 },
      { name: 'Spring Boot', proficiency: 'Intermediate', skillLevel: 5 },
      { name: 'React', proficiency: 'Intermediate', skillLevel: 5 }
    ]
  },
  {
    name: 'Tools & Infrastructure',
    items: [
      { name: 'Docker', proficiency: 'Advanced', skillLevel: 7 },
      { name: 'PostgreSQL', proficiency: 'Advanced', skillLevel: 6 },
      { name: 'Kubernetes', proficiency: 'Intermediate', skillLevel: 5 },
      { name: 'Git', proficiency: 'Expert', skillLevel: 8 },
      { name: 'SQLite', proficiency: 'Advanced', skillLevel: 6 },
      { name: 'Jira', proficiency: 'Advanced', skillLevel: 6 }
    ]
  }
]

const setChartData = () => {
  const style = getComputedStyle(document.documentElement)
  const accent = style.getPropertyValue('--color-accent').trim()
  const isDark = document.documentElement.classList.contains('theme-dark')
  return {
    labels: languages.map(l => l.getName()),
    datasets: [{
      label: 'Proficiency',
      borderColor: accent,
      pointBackgroundColor: accent,
      pointBorderColor: accent,
      backgroundColor: isDark ? accent + '30' : accent + '25',
      data: languages.map(l => l.getSkillLevel())
    }]
  }
}

const setChartOptions = () => {
  const style = getComputedStyle(document.documentElement)
  const text = style.getPropertyValue('--color-ink').trim()
  const muted = style.getPropertyValue('--color-muted').trim()
  const isDark = document.documentElement.classList.contains('theme-dark')
  return {
    plugins: {
      legend: { display: false }
    },
    scales: {
      r: {
        min: 0,
        max: 8,
        ticks: {
          stepSize: 1,
          color: muted,
          backdropColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)'
        },
        grid: { color: isDark ? muted + '40' : muted + '55' },
        pointLabels: {
          color: text,
          font: { size: 12, weight: '500' }
        }
      }
    },
    maintainAspectRatio: true,
    responsive: true
  }
}

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()

  const observer = new MutationObserver(() => {
    chartData.value = setChartData()
    chartOptions.value = setChartOptions()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

const setRef = (el: unknown) => {
  if (el instanceof HTMLElement) el.classList.add('reveal')
}
</script>

<style scoped>
.skills__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.7fr);
  gap: 2.5rem;
  align-items: start;
}

.skills__groups {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skills__group-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 1rem;
}

.skills__list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.skills__item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.skills__name {
  font-weight: 500;
  font-size: 0.95rem;
}

.skills__level-text {
  font-size: 0.8rem;
  color: var(--color-muted);
}

.skills__bar {
  height: 6px;
  background: var(--color-surface-raised);
  border-radius: 999px;
  overflow: hidden;
}

.skills__bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-hover));
  border-radius: 999px;
  transition: width 1s ease;
}

.skills__radar {
  padding: 1.5rem;
}

.skills__radar-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.skills__chart {
  max-height: 320px;
}

@media (max-width: 1024px) {
  .skills__layout {
    grid-template-columns: 1fr;
  }
  .skills__radar {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>

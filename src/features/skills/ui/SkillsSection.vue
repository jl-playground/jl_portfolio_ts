<template>
  <section id="skills" class="skills section reveal" :ref="setRef">
    <SectionHeader :title="t('skills.title')" :subtitle="t('skills.subtitle')" eyebrow="02 — Skills" />
    <div class="skills__content">
      <div class="skills__groups">
        <div v-for="(group, groupIndex) in skillGroups" :key="group.name" class="skills__group">
          <h3 class="skills__group-heading">
            <span class="skills__group-num">0{{ groupIndex + 1 }}</span>{{ group.name }}
          </h3>
          <div class="skills__list">
            <div v-for="skill in group.items" :key="skill.name" class="skills__row">
              <span class="skills__name">{{ skill.name }}</span>
              <div class="skills__track">
                <div class="skills__bar-fill" :style="{ width: skill.skillLevel * 10 + '%' }"></div>
              </div>
              <span class="skills__level">{{ skill.proficiency }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="skills__radar-wrap">
        <Chart type="radar" :data="chartData" :options="chartOptions" class="skills__chart" />
      </div>
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
    items: toSkillItems(languages.filter(l => ['JavaScript', 'TypeScript', 'Dart', 'Python', 'Java', 'Kotlin', 'Rust', 'Go', 'C#', 'C++', 'Lua'].includes(l.getName())))
  },
  {
    name: 'Frameworks & Platforms',
    items: [
      { name: 'Node.js', proficiency: 'Expert', skillLevel: 8 },
      { name: 'Vue.js', proficiency: 'Expert', skillLevel: 8 },
      { name: 'Flutter', proficiency: 'Expert', skillLevel: 7 },
      { name: 'NestJS', proficiency: 'Expert', skillLevel: 7 },
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
.skills__content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* ── Skill Groups ── */

.skills__groups {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.skills__group-heading {
  font-family: var(--font-display);
  font-size: var(--step-0);
  font-weight: 700;
  color: var(--color-ink);
  letter-spacing: 0.01em;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.skills__group-num {
  color: var(--color-accent);
  font-family: var(--font-display);
  font-weight: 700;
  margin-right: 0.5rem;
}

.skills__list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.skills__row {
  display: grid;
  grid-template-columns: 140px 1fr 80px;
  align-items: center;
  gap: 1rem;
}

.skills__name {
  font-weight: 500;
  font-size: var(--step--1);
  color: var(--color-ink);
}

.skills__track {
  height: 6px;
  background: var(--color-surface-raised);
  border-radius: 0;
  overflow: hidden;
}

.skills__bar-fill {
  height: 100%;
  background: var(--color-accent-gradient);
  border-radius: 0;
  box-shadow: 0 0 8px var(--color-accent-glow);
  transition: width 1s ease;
}

.skills__level {
  font-size: var(--step--2);
  color: var(--color-muted);
  text-transform: capitalize;
  text-align: right;
}

/* ── Radar Chart ── */

.skills__radar-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 0;
  border-top: 1px solid var(--color-border);
}

.skills__chart {
  max-height: 360px;
  width: 100%;
}

/* ── Responsive ── */

@media (max-width: 768px) {
  .skills__row {
    grid-template-columns: 1fr auto;
    gap: 0.4rem 0.75rem;
  }
  .skills__name {
    grid-column: 1;
  }
  .skills__level {
    grid-column: 2;
  }
  .skills__track {
    grid-column: 1 / -1;
  }
}
</style>

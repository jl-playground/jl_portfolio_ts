<template>
  <section id="projects" class="projects section reveal" :ref="setRef">
    <SectionHeader :title="t('projects.title')" :subtitle="t('projects.subtitle')" eyebrow="03 — Projects">
      <template #action>
        <div class="projects__filters">
          <AppTag
            v-for="filter in filters"
            :key="filter"
            :active="activeFilter === filter"
            @click="activeFilter = filter"
          >
            {{ filter === 'All' ? t('projects.filterAll') : filter }}
          </AppTag>
        </div>
      </template>
    </SectionHeader>

    <div v-if="isLoading" class="projects__grid">
      <div v-for="n in 6" :key="n" class="project-skeleton"></div>
    </div>
    <div v-else-if="projectError" class="projects__error">
      {{ projectError }}
    </div>
    <div v-else class="projects__grid">
      <article
        v-for="repo in filteredProjects"
        :key="repo.id"
        class="project-card"
      >
        <div class="project-card__header">
          <h3 class="project-card__name">{{ repo.name }}</h3>
        </div>
        <p v-if="repo.description" class="project-card__description">{{ repo.description }}</p>
        <div class="project-card__footer">
          <div class="project-card__meta">
            <AppChip v-if="repo.language" :variant="getLanguageColor(repo.language) as any">
              {{ repo.language }}
            </AppChip>
            <span v-if="repo.stargazers_count" class="project-card__stars">★ {{ repo.stargazers_count }}</span>
            <span class="project-card__date">
              {{ t('projects.updated', { date: formatDate(repo.updated_at, locale) }) }}
            </span>
          </div>
          <a
            class="project-card__link"
            :href="repo.html_url"
            target="_blank"
            rel="noreferrer"
          >
            {{ t('projects.view') }}
            <i class="pi pi-external-link"></i>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { GitHubRepo } from '@/entities/project/model/types'
import SectionHeader from '@/shared/ui/SectionHeader.vue'
import AppChip from '@/shared/ui/AppChip.vue'
import AppTag from '@/shared/ui/AppTag.vue'
import { formatDate } from '@/shared/lib/utils'

const { t, locale } = useI18n()

const projects = ref<GitHubRepo[]>([])
const isLoading = ref(true)
const projectError = ref<string | null>(null)
const activeFilter = ref('All')

const filters = computed(() => {
  const langs = new Set(projects.value.map(p => p.language).filter((l): l is string => !!l))
  return ['All', ...Array.from(langs).sort()]
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects.value
  return projects.value.filter(p => p.language === activeFilter.value)
})

const getLanguageColor = (lang: string): string => {
  const accentLangs = ['JavaScript', 'TypeScript', 'Dart', 'Python']
  return accentLangs.includes(lang) ? 'accent' : 'default'
}

const loadProjects = async () => {
  try {
    const response = await fetch('https://api.github.com/users/Jl115/repos?per_page=100&sort=updated')
    if (response.ok) {
      const data = await response.json() as GitHubRepo[]
      projects.value = data
        .filter(repo => !repo.fork && !repo.archived)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 12)
    } else {
      projectError.value = t('projects.error')
    }
  } catch (error) {
    projectError.value = t('projects.error')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadProjects()
})

const setRef = (el: unknown) => {
  if (el instanceof HTMLElement) el.classList.add('reveal')
}
</script>

<style scoped>
.projects__filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.project-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: var(--color-accent-glow);
}

.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.project-card__name {
  font-family: var(--font-display);
  font-weight: 700;
  word-break: break-word;
}

.project-card__description {
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  flex: 1;
}

.project-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
}

.project-card__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.project-card__date {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-muted);
}

.project-card__stars {
  color: var(--color-accent);
  font-size: 0.85rem;
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-accent);
  transition: gap 0.2s ease;
}

.project-card__link:hover {
  gap: 0.6rem;
}

.project-skeleton {
  min-height: 220px;
  background: var(--color-surface);
  border-radius: var(--radius);
  position: relative;
  overflow: hidden;
}

.project-skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, var(--color-surface-raised), transparent);
  animation: shimmer 1.6s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.projects__error {
  color: var(--color-muted);
  padding: 2rem;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  text-align: center;
}

@media (max-width: 768px) {
  .projects__filters {
    width: 100%;
  }
}
</style>

<template>
  <section id="projects" class="projects section reveal" :ref="setRef">
    <SectionHeader :title="t('projects.title')" :subtitle="t('projects.subtitle')">
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
        @mouseenter="hoveredProject = repo.id"
        @mouseleave="hoveredProject = null"
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
        <div class="project-card__glow" :class="{ 'project-card__glow--active': hoveredProject === repo.id }"></div>
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
import { Profile } from '@/entities/profile/model/Profile'

const { t, locale } = useI18n()

const projects = ref<GitHubRepo[]>([])
const isLoading = ref(true)
const projectError = ref<string | null>(null)
const hoveredProject = ref<number | null>(null)
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
  const map: Record<string, string> = {
    JavaScript: 'yellow',
    TypeScript: 'blue',
    Dart: 'peach',
    Python: 'green',
    Java: 'accent',
    Kotlin: 'accent',
    Rust: 'peach',
    Go: 'blue',
    'C#': 'green',
    Lua: 'blue'
  }
  return map[lang] || 'default'
}

const loadProjects = async () => {
  try {
    const response = await fetch('https://api.github.com/users/Jl115/repos?per_page=100')
    let curated: GitHubRepo[] = []
    if (response.ok) {
      const data = await response.json() as GitHubRepo[]
      curated = data
        .filter(repo => !repo.fork && !repo.archived)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    }
    const fakeProjects = Profile.getInstance().getProjects()
    const merged = [...curated, ...fakeProjects]
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 12)
    projects.value = merged
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
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.project-card__name {
  font-size: 1.1rem;
  font-weight: 600;
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
  font-size: 0.8rem;
  color: var(--color-muted);
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

.project-card__glow {
  position: absolute;
  inset: -2px;
  border-radius: 22px;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover));
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
  filter: blur(8px);
}

.project-card__glow--active {
  opacity: 0.25;
}

.project-skeleton {
  min-height: 220px;
  background: var(--color-surface);
  border-radius: 20px;
  border: 1px solid var(--color-border);
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
  border-radius: 16px;
  text-align: center;
}

@media (max-width: 768px) {
  .projects__filters {
    width: 100%;
  }
}
</style>

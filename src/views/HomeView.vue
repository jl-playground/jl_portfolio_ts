<template>
  <div class="home">
    <section id="hero" class="hero section reveal" :ref="setSectionRef">
      <div class="hero__content">
        <p class="hero__eyebrow">{{ t('hero.eyebrow') }}</p>
        <h1 class="hero__title">
          {{ profile.getName() }}
        </h1>
        <p class="hero__subtitle">{{ profile.getTitle() }}</p>
        <p class="hero__copy">{{ t('hero.description') }}</p>
        <div class="hero__actions">
          <a class="button button--primary" href="#projects">{{ t('hero.primaryCta') }}</a>
          <a class="button button--ghost" href="#contact">{{ t('hero.secondaryCta') }}</a>
        </div>
      </div>
      <div class="hero__aside">
        <div class="hero__card">
          <p class="card__label">{{ t('hero.availabilityLabel') }}</p>
          <p class="card__title">{{ t('hero.availabilityTitle') }}</p>
          <div class="card__list">
            <a class="text-link" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            <span>{{ contact.phone }}</span>
          </div>
        </div>
        <div class="hero__avatar">
          <AvatarComponent />
        </div>
      </div>
    </section>

    <section id="about" class="section reveal" :ref="setSectionRef">
      <div class="section__header">
        <h2>{{ t('about.title') }}</h2>
        <p>{{ t('about.subtitle') }}</p>
      </div>
      <div class="about-grid">
        <div class="about-card">
          <h3>{{ t('about.focusTitle') }}</h3>
          <p>{{ t('about.focusBody') }}</p>
        </div>
        <div class="about-card">
          <h3>{{ t('about.approachTitle') }}</h3>
          <p>{{ t('about.approachBody') }}</p>
        </div>
        <div class="about-card">
          <h3>{{ t('about.currentTitle') }}</h3>
          <p>{{ t('about.currentBody') }}</p>
        </div>
      </div>
    </section>

    <section id="skills" class="section reveal" :ref="setSectionRef">
      <div class="section__header">
        <h2>{{ t('skills.title') }}</h2>
        <p>{{ t('skills.subtitle') }}</p>
      </div>
      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill" class="skill-card">
          <span>{{ skill }}</span>
        </div>
      </div>
    </section>

    <section id="projects" class="section reveal" :ref="setSectionRef">
      <div class="section__header">
        <h2>{{ t('projects.title') }}</h2>
        <p>{{ t('projects.subtitle') }}</p>
      </div>
      <div v-if="isLoading" class="projects-grid">
        <div v-for="index in 6" :key="index" class="project-card project-card--loading"></div>
      </div>
      <div v-else-if="projectError" class="project-empty">
        {{ projectError }}
      </div>
      <div v-else class="projects-grid">
        <article v-for="repo in projects" :key="repo.id" class="project-card">
          <div class="project-card__header">
            <h3>{{ repo.name }}</h3>
            <span class="chip">★ {{ repo.stargazers_count }}</span>
          </div>
          <p>{{ repo.description || t('projects.noDescription') }}</p>
          <div class="project-card__meta">
            <span v-if="repo.language">{{ repo.language }}</span>
            <span>{{ t('projects.updated', { date: formatDate(repo.updated_at) }) }}</span>
          </div>
          <a class="text-link" :href="repo.html_url" target="_blank" rel="noreferrer">
            {{ t('projects.view') }}
          </a>
        </article>
      </div>
    </section>

    <section id="languages" class="section reveal" :ref="setSectionRef">
      <div class="section__header">
        <h2>{{ t('languages.title') }}</h2>
        <p>{{ t('languages.subtitle') }}</p>
      </div>
      <div class="language-grid">
        <article v-for="language in languages" :key="language.name" class="language-card">
          <div class="language-card__header">
            <h3>{{ language.name }}</h3>
            <span class="chip">{{ language.proficiency }}</span>
          </div>
          <p>{{ t('languages.experience', { years: language.experienceYears }) }}</p>
          <p v-if="language.relevantProjects?.length" class="language-card__projects">
            {{ t('languages.projects', { projects: language.relevantProjects.join(', ') }) }}
          </p>
        </article>
      </div>
    </section>

    <section id="contact" class="section reveal" :ref="setSectionRef">
      <div class="section__header">
        <h2>{{ t('contact.title') }}</h2>
        <p>{{ t('contact.subtitle') }}</p>
      </div>
      <div class="contact-card">
        <div>
          <p class="contact-card__title">{{ t('contact.cardTitle') }}</p>
          <p class="contact-card__text">{{ t('contact.cardBody') }}</p>
        </div>
        <div class="contact-card__links">
          <a class="button button--primary" :href="`mailto:${contact.email}`">
            {{ t('contact.email') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import AvatarComponent from '@/components/AvatarComponent.vue'
import { Profile } from '@/models/Profile'

type GitHubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  fork: boolean
  archived: boolean
}

const profile = Profile.getInstance()
const contact = profile.getContact()
const { t, locale } = useI18n()

const skills = profile.getSkills()
const languages = profile.getLanguages().map((language) => ({
  name: language.getName(),
  proficiency: language.getProficiency(),
  experienceYears: language.getExperienceYears(),
  relevantProjects: language.getRelevantProjects()
}))

const projects = ref<GitHubRepo[]>([])
const isLoading = ref(true)
const projectError = ref<string | null>(null)

const observedSections = ref<HTMLElement[]>([])
const setSectionRef = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLElement && !observedSections.value.includes(el)) {
    observedSections.value.push(el)
  }
}

const formatDate = (value: string) => {
  const date = new Date(value)
  return date.toLocaleDateString(locale.value, { month: 'short', year: 'numeric' })
}

const loadProjects = async () => {
  try {
    const response = await fetch('https://api.github.com/users/jl115/repos?per_page=100')
    if (!response.ok) {
      throw new Error('GitHub request failed')
    }
    const data = (await response.json()) as GitHubRepo[]
    const curated = data
      .filter((repo) => !repo.fork && !repo.archived)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      })
      .slice(0, 6)
    projects.value = curated
  } catch (error) {
    projectError.value = t('projects.error')
  } finally {
    isLoading.value = false
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  loadProjects()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { threshold: 0.2 }
  )

  observedSections.value.forEach((section) => observer?.observe(section))
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style scoped>
.home {
  position: relative;
  padding: 2rem 6vw 6rem;
  overflow: hidden;
}

.home::before,
.home::after {
  content: '';
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(15, 61, 62, 0.14), transparent 60%);
  top: -200px;
  right: -120px;
  z-index: 0;
}

.home::after {
  width: 420px;
  height: 420px;
  top: 35%;
  right: auto;
  left: -180px;
  background: radial-gradient(circle, rgba(15, 61, 62, 0.1), transparent 65%);
}

.section {
  position: relative;
  z-index: 1;
  padding: 5rem 0;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: 120px;
}

.section:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

.section__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.section__header h2 {
  font-family: var(--font-display);
  font-size: 2.2rem;
  letter-spacing: 0.02em;
}

.section__header p {
  color: var(--color-muted);
  max-width: 420px;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.8fr);
  gap: 3rem;
  align-items: center;
  padding-top: 3rem;
}

.hero__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.75rem;
  color: var(--color-muted);
  margin-bottom: 1rem;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 4vw, 4.4rem);
  margin-bottom: 0.5rem;
}

.hero__subtitle {
  font-size: 1.1rem;
  color: var(--color-muted);
  margin-bottom: 1.5rem;
}

.hero__copy {
  font-size: 1.05rem;
  max-width: 520px;
  color: var(--color-ink);
}

.hero__actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.hero__aside {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
}

.hero__card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: var(--shadow-soft);
}

.card__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-muted);
}

.card__title {
  font-size: 1.2rem;
  margin: 0.6rem 0 1rem;
}

.card__list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.95rem;
}

.hero__avatar {
  position: relative;
  min-height: 240px;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.about-card,
.skill-card,
.project-card,
.language-card,
.contact-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: var(--shadow-soft);
}

.about-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.skill-card {
  text-align: center;
  font-weight: 500;
  border-radius: 999px;
  padding: 0.8rem 1rem;
  background: var(--color-accent-soft);
  border-color: transparent;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 220px;
}

.project-card--loading {
  min-height: 220px;
  background: linear-gradient(120deg, #f1ece6, #f7f4f0, #efe8e0);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
}

.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.project-card__meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.project-empty {
  color: var(--color-muted);
  padding: 2rem;
  border: 1px dashed var(--color-border);
  border-radius: 16px;
}

.chip {
  background: rgba(15, 61, 62, 0.12);
  color: var(--color-accent);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
}

.language-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.language-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.language-card__projects {
  color: var(--color-muted);
  font-size: 0.9rem;
  margin-top: 0.6rem;
}

.contact-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.contact-card__title {
  font-size: 1.4rem;
  margin-bottom: 0.4rem;
  font-family: var(--font-display);
}

.contact-card__text {
  color: var(--color-muted);
}

.contact-card__links {
  display: flex;
  gap: 1rem;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  font-weight: 500;
  border: 1px solid transparent;
}

.button--primary {
  background: var(--color-accent);
  color: #fff;
  box-shadow: var(--shadow-card);
}

.button--ghost {
  border-color: var(--color-border-strong);
  color: var(--color-ink);
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes shimmer {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .section__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .about-grid {
    grid-template-columns: 1fr;
  }

  .contact-card {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 720px) {
  .home {
    padding: 2rem 1.5rem 4rem;
  }

  .hero__actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-card__links {
    flex-direction: column;
    width: 100%;
  }

  .button {
    width: 100%;
  }
}
</style>

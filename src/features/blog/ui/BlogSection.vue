<template>
  <section id="blog" class="blog section reveal" :ref="setRef">
    <SectionHeader :title="t('blog.title')" :subtitle="t('blog.subtitle')" eyebrow="06 — Blog" />

    <div v-if="blogPosts.length" class="blog__grid">
      <a
        v-for="post in blogPosts"
        :key="post.slug"
        :href="post.url"
        target="_blank"
        rel="noopener noreferrer"
        class="blog-card"
      >
        <div class="blog-card__cover">
          <img
            v-if="post.featureImage"
            :src="post.featureImage"
            :alt="post.title"
            loading="lazy"
            class="blog-card__cover-image"
          />
          <div v-else class="blog-card__cover-placeholder">{{ post.slug.charAt(0).toUpperCase() }}</div>
        </div>
        <div class="blog-card__content">
          <div class="blog-card__meta">
            <AppChip v-for="tag in post.tags" :key="tag" variant="outline">{{ tag }}</AppChip>
            <span class="blog-card__date">{{ formatDate(post.date, locale) }}</span>
          </div>
          <h3 class="blog-card__title">{{ post.title }}</h3>
          <p class="blog-card__excerpt">{{ post.excerpt }}</p>
        </div>
      </a>
    </div>

    <div v-else class="blog__empty">
      <p>{{ t('blog.empty') }}</p>
    </div>

    <div class="blog__cta">
      <a
        href="https://blog.stacktrace.space"
        target="_blank"
        rel="noopener noreferrer"
        class="blog__cta-button"
      >
        {{ t('blog.visitBlog') }}
      </a>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import posts from '@/assets/blog-posts.json'
import type { BlogPostSummary } from '@/entities/blog/model/types'
import SectionHeader from '@/shared/ui/SectionHeader.vue'
import AppChip from '@/shared/ui/AppChip.vue'
import { formatDate } from '@/shared/lib/utils'

const { t, locale } = useI18n()
const blogPosts = computed<BlogPostSummary[]>(() => posts as BlogPostSummary[])

const setRef = (el: unknown) => {
  if (el instanceof HTMLElement) el.classList.add('reveal')
}
</script>

<style scoped>
.blog__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.blog-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease;
}

.blog-card:hover {
  border-color: var(--color-accent);
}

.blog-card__cover {
  aspect-ratio: 16 / 9;
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.blog-card__cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-card__cover-placeholder {
  font-family: var(--font-display);
  font-size: var(--step-3);
  font-weight: 700;
  color: var(--color-accent);
}

.blog-card__content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.blog-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.blog-card__date {
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-left: auto;
}

.blog-card__title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.35;
  color: var(--color-ink);
}

.blog-card__excerpt {
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: var(--measure);
  flex: 1;
}

.blog__empty {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--color-muted);
}

.blog__cta {
  text-align: center;
  margin-top: 2rem;
}

.blog__cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.2s ease;
  text-decoration: none;
  background: var(--color-accent);
  color: #fff;
}

.blog__cta-button:hover {
  background: var(--color-accent-hover);
}

@media (max-width: 1024px) {
  .blog__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .blog__grid {
    grid-template-columns: 1fr;
  }
}
</style>

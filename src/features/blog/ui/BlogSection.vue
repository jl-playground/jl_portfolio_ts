<template>
  <section id="blog" class="blog section reveal" :ref="setRef">
    <SectionHeader :title="t('blog.title')" :subtitle="t('blog.subtitle')" />
    <div class="blog__grid">
      <article v-for="post in posts" :key="post.getSlug()" class="blog-card">
        <div class="blog-card__cover">
          <div class="blog-card__cover-placeholder">
            <span>{{ post.getTitle().charAt(0) }}</span>
          </div>
        </div>
        <div class="blog-card__content">
          <div class="blog-card__meta">
            <AppChip v-for="tag in post.getTags()" :key="tag" variant="outline">{{ tag }}</AppChip>
            <span class="blog-card__date">{{ post.getDate() }}</span>
          </div>
          <h3 class="blog-card__title">{{ post.getTitle() }}</h3>
          <p class="blog-card__excerpt">{{ post.getExcerpt() }}</p>
          <div class="blog-card__footer">
            <span class="blog-card__read-time">
              {{ t('blog.readTime', { min: post.getReadTime() }) }}
            </span>
            <router-link
              :to="{ name: 'blog-post', params: { slug: post.getSlug() } }"
              class="blog-card__read-link"
            >
              {{ t('blog.readMore') }} <i class="pi pi-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Profile } from '@/entities/profile/model/Profile'
import SectionHeader from '@/shared/ui/SectionHeader.vue'
import AppChip from '@/shared/ui/AppChip.vue'

const { t } = useI18n()
const profile = Profile.getInstance()
const posts = profile.getBlogPosts()

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
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
  border-color: var(--color-accent);
}

.blog-card__cover {
  height: 180px;
  background: linear-gradient(135deg, var(--ctp-mauve) 0%, var(--ctp-blue) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-card__cover-placeholder {
  width: 4rem;
  height: 4rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.15);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  backdrop-filter: blur(4px);
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
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--color-ink);
}

.blog-card__excerpt {
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  flex: 1;
}

.blog-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.85rem;
}

.blog-card__read-time {
  color: var(--color-muted);
}

.blog-card__read-link {
  color: var(--color-accent);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
  text-decoration: none;
  transition: gap 0.2s ease;
}

.blog-card__read-link i {
  font-size: 0.7rem;
  transition: transform 0.2s ease;
}

.blog-card:hover .blog-card__read-link {
  gap: 0.6rem;
}

.blog-card:hover .blog-card__read-link i {
  transform: translateX(3px);
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

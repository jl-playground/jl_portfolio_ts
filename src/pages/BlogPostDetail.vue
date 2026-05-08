<template>
  <div class="post-detail">
    <div class="post-detail__container">
      <AppButton variant="ghost" size="sm" class="post-detail__back" @click="goBack">
        <i class="pi pi-arrow-left"></i> {{ t('blog.backToPosts') }}
      </AppButton>

      <article class="post-detail__article">
        <header class="post-detail__header">
          <div class="post-detail__meta">
            <AppChip v-for="tag in post.tags" :key="tag" variant="outline">{{ tag }}</AppChip>
            <span class="post-detail__date">{{ post.date }}</span>
            <span class="post-detail__dot">•</span>
            <span class="post-detail__read-time">{{ t('blog.readTime', { min: post.readTimeMinutes }) }}</span>
          </div>
          <h1 class="post-detail__title">{{ post.title }}</h1>
          <p class="post-detail__excerpt">{{ post.excerpt }}</p>
        </header>

        <div class="post-detail__cover">
          <div class="post-detail__cover-inner">
            <span class="post-detail__cover-letter">{{ post.title.charAt(0) }}</span>
          </div>
        </div>

        <div class="post-detail__body" v-html="renderedContent"></div>

        <footer class="post-detail__footer">
          <div class="post-detail__tags">
            <span class="post-detail__tags-label">{{ t('blog.tags') }}:</span>
            <AppChip v-for="tag in post.tags" :key="tag" variant="outline">{{ tag }}</AppChip>
          </div>
          <div class="post-detail__nav">
            <AppButton variant="ghost" size="sm" @click="goBack">
              <i class="pi pi-arrow-left"></i> {{ t('blog.backToPosts') }}
            </AppButton>
          </div>
        </footer>
      </article>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import AppButton from '@/shared/ui/AppButton.vue'
import AppChip from '@/shared/ui/AppChip.vue'

interface BlogPostItem {
  slug: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  date: string
  readTimeMinutes: number
}

const props = defineProps<{ slug: string }>()
const { t, tm } = useI18n()
const router = useRouter()

const posts = computed<BlogPostItem[]>(() => tm('blog.posts') as BlogPostItem[])

const post = computed(() => {
  const found = posts.value.find((p) => p.slug === props.slug)
  if (!found) throw new Error(`Blog post not found: ${props.slug}`)
  return found
})

const renderedContent = computed(() => {
  // Simple markdown-to-HTML renderer
  let html = post.value.content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold / Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<em><strong>$1</strong></em>')
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/_(.*?)_/g, '<em>$1</em>')

  // Code inline
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
  html = html.replace(/<\/ul>\s*<ul>/g, '')

  // Numbered lists
  html = html.replace(/^\d+\.\s+(.*$)/gim, '<li>$1</li>')

  // Paragraphs (wrap remaining text)
  const lines = html.split('\n')
  let result = ''
  let inParagraph = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      if (inParagraph) { result += '</p>\n'; inParagraph = false }
      continue
    }
    if (
      trimmed.startsWith('<h') || trimmed.startsWith('<pre') || trimmed.startsWith('<code') ||
      trimmed.startsWith('<ul') || trimmed.startsWith('<li') || trimmed.startsWith('<blockquote') ||
      trimmed.startsWith('</a') || trimmed.startsWith('<strong') || trimmed.startsWith('<em')
    ) {
      if (inParagraph) { result += '</p>\n'; inParagraph = false }
      result += trimmed + '\n'
    } else {
      if (!inParagraph) { result += '<p>'; inParagraph = true }
      result += trimmed + ' '
    }
  }
  if (inParagraph) result += '</p>\n'

  return result
})

const goBack = () => {
  router.push({ name: 'home', hash: '#blog' })
}
</script>

<style scoped>
.post-detail {
  padding: 6rem 1.5rem 4rem;
  min-height: 100vh;
}

.post-detail__container {
  max-width: 800px;
  margin: 0 auto;
}

.post-detail__back {
  margin-bottom: 2rem;
}

.post-detail__article {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-detail__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-detail__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-muted);
}

.post-detail__date {
  margin-left: auto;
}

.post-detail__dot {
  opacity: 0.4;
}

.post-detail__title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.15;
  color: var(--color-ink);
}

.post-detail__excerpt {
  font-size: 1.2rem;
  color: var(--color-muted);
  line-height: 1.6;
  max-width: 640px;
}

.post-detail__cover {
  width: 100%;
  aspect-ratio: 21 / 9;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--ctp-mauve) 0%, var(--ctp-blue) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-detail__cover-inner {
  width: 6rem;
  height: 6rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.post-detail__cover-letter {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
}

.post-detail__body {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-ink);
}

.post-detail__body :deep(h2) {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin: 2.5rem 0 1rem;
  color: var(--color-ink);
}

.post-detail__body :deep(h3) {
  font-size: 1.2rem;
  margin: 2rem 0 0.75rem;
  color: var(--color-ink);
  font-weight: 600;
}

.post-detail__body :deep(p) {
  margin-bottom: 1.25rem;
}

.post-detail__body :deep(a) {
  color: var(--color-accent);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.post-detail__body :deep(a:hover) {
  border-color: var(--color-accent);
}

.post-detail__body :deep(code) {
  background: var(--color-surface-raised);
  padding: 0.15rem 0.4rem;
  border-radius: 6px;
  font-family: 'Fira Code', 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.9em;
  color: var(--color-accent);
}

.post-detail__body :deep(pre) {
  background: var(--color-surface-raised);
  padding: 1.25rem;
  border-radius: 12px;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid var(--color-border);
}

.post-detail__body :deep(pre code) {
  background: none;
  padding: 0;
  color: var(--color-ink);
}

.post-detail__body :deep(blockquote) {
  border-left: 3px solid var(--color-accent);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  color: var(--color-muted);
  font-style: italic;
}

.post-detail__body :deep(ul) {
  margin: 1rem 0 1.5rem 1.25rem;
}

.post-detail__body :deep(li) {
  margin-bottom: 0.5rem;
}

.post-detail__body :deep(strong) {
  color: var(--color-ink);
  font-weight: 600;
}

.post-detail__footer {
  border-top: 1px solid var(--color-border);
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-detail__tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.post-detail__tags-label {
  color: var(--color-muted);
  font-size: 0.9rem;
}

.post-detail__nav {
  display: flex;
}

@media (max-width: 640px) {
  .post-detail {
    padding: 5rem 1rem 3rem;
  }
}
</style>

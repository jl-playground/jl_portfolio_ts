<template>
  <section id="testimonials" class="testimonials section reveal" :ref="setRef">
    <SectionHeader :title="t('testimonials.title')" :subtitle="t('testimonials.subtitle')" />
    <div class="testimonials__grid">
      <AppCard v-for="(item, i) in testimonials" :key="i" class="testimonial-card" hoverable>
        <div class="testimonial-card__quote">
          <i class="pi pi-quote-left testimonial-card__icon"></i>
          <p>{{ item.quote }}</p>
        </div>
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar">
            {{ item.author.charAt(0) }}
          </div>
          <div>
            <p class="testimonial-card__name">{{ item.author }}</p>
            <p class="testimonial-card__role">{{ item.role }}, {{ item.company }}</p>
          </div>
        </div>
      </AppCard>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from '@/shared/ui/SectionHeader.vue'
import AppCard from '@/shared/ui/AppCard.vue'

interface TestimonialItem {
  quote: string
  author: string
  role: string
  company: string
}

const { t, tm } = useI18n()
const testimonials = computed<TestimonialItem[]>(() => tm('testimonials.items') as TestimonialItem[])

const setRef = (el: unknown) => {
  if (el instanceof HTMLElement) el.classList.add('reveal')
}
</script>

<style scoped>
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.testimonial-card__quote {
  position: relative;
  padding-left: 1.5rem;
  color: var(--color-ink);
  font-size: 1rem;
  line-height: 1.7;
  flex: 1;
}

.testimonial-card__icon {
  position: absolute;
  left: 0;
  top: 0;
  color: var(--color-accent);
  font-size: 0.9rem;
  opacity: 0.5;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.testimonial-card__avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--ctp-crust);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  flex-shrink: 0;
}

.testimonial-card__name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-ink);
}

.testimonial-card__role {
  font-size: 0.85rem;
  color: var(--color-muted);
}

@media (max-width: 1024px) {
  .testimonials__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .testimonials__grid {
    grid-template-columns: 1fr;
  }
}
</style>

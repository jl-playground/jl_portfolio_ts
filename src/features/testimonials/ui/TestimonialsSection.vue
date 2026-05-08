<template>
  <section id="testimonials" class="testimonials section reveal" :ref="setRef">
    <SectionHeader :title="t('testimonials.title')" :subtitle="t('testimonials.subtitle')" />
    <div class="testimonials__grid">
      <AppCard v-for="(t, i) in testimonials" :key="i" class="testimonial-card" hoverable>
        <div class="testimonial-card__quote">
          <i class="pi pi-quote-left testimonial-card__icon"></i>
          <p>{{ t.getQuote() }}</p>
        </div>
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar">
            {{ t.getAuthor().charAt(0) }}
          </div>
          <div>
            <p class="testimonial-card__name">{{ t.getAuthor() }}</p>
            <p class="testimonial-card__role">{{ t.getRole() }}, {{ t.getCompany() }}</p>
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

const { t } = useI18n()
const profile = Profile.getInstance()
const testimonials = profile.getTestimonials()

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

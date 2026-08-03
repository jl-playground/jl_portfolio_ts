<template>
  <div class="section-header">
    <div>
      <span v-if="eyebrow" class="section-header__eyebrow">{{ eyebrow }}</span>
      <div class="section-header__rule"></div>
      <h2 class="section-header__title">
        <slot name="title">{{ title }}</slot>
      </h2>
      <p v-if="subtitle" class="section-header__subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.action" class="section-header__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string
  subtitle?: string
  eyebrow?: string
}>()
</script>

.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.5rem;
  transform: translateY(-8px);
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.section-header.is-visible {
  transform: translateY(0);
  opacity: 1;
}

.section-header__eyebrow {
  display: block;
  font-family: var(--font-display);
  font-size: var(--step--1);
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: var(--color-accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.75rem;
}

.section-header__title {
  font-family: var(--font-display);
  font-size: var(--step-4);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

.section-header__subtitle {
  color: var(--color-muted);
  max-width: var(--measure);
  margin-top: 0.5rem;
  font-size: var(--step-0);
}

.section-header__rule {
  width: 48px;
  height: 3px;
  background: var(--color-accent-gradient);
  margin-bottom: 1rem;
}

@media (max-width: 720px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

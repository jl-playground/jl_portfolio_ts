<template>
  <div class="section-header">
    <div>
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
}>()
</script>

<style scoped>
.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.section-header__title {
  font-family: var(--font-display);
  font-size: 2.2rem;
  letter-spacing: 0.02em;
  color: var(--color-ink);
}

.section-header__subtitle {
  color: var(--color-muted);
  max-width: 480px;
  margin-top: 0.3rem;
  font-size: 1rem;
}

@media (max-width: 720px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>

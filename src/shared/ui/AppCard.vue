<template>
  <div class="app-card" :class="{ 'app-card--hoverable': hoverable, 'app-card--glass': glass }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  hoverable?: boolean
  glass?: boolean
}>(), {
  hoverable: false,
  glass: false
})
</script>

<style scoped>
.app-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: var(--shadow-soft);
  transition: all 0.3s ease;
}

.app-card--hoverable:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
  border-color: var(--color-accent);
}

.app-card--glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border-color: rgba(255, 255, 255, 0.1);
}

.theme-dark .app-card--glass {
  background: rgba(30, 30, 46, 0.6);
}
</style>

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

.app-card {
  position: relative;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: 1px solid var(--color-border-strong);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.app-card--hoverable:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: var(--color-accent-glow);
}

.app-card--hoverable::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-accent-gradient);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
  z-index: 1;
}

.app-card--hoverable:hover::before {
  transform: scaleX(1);
}

.app-card--glass {
  background: var(--color-surface);
  border-color: var(--color-border);
}

<template>
  <span class="app-chip" :class="`app-chip--${variant}`">
    <slot />
  </span>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  variant?: 'default' | 'accent' | 'outline' | 'green' | 'blue' | 'peach'
}>(), {
  variant: 'default'
})
</script>

<style scoped>
.app-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
}

.app-chip--default {
  background: var(--color-surface-raised);
  color: var(--color-muted);
  border: 1px solid var(--color-border);
}

.app-chip--accent {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

.app-chip--outline {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}

.app-chip--green {
  background: rgba(166, 209, 137, 0.18);
  color: var(--ctp-green);
}

.app-chip--blue {
  background: rgba(140, 170, 238, 0.18);
  color: var(--ctp-blue);
}

.app-chip--peach {
  background: rgba(239, 159, 118, 0.18);
  color: var(--ctp-peach);
}
</style>

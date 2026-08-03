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
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: var(--step--1);
  font-weight: 500;
  white-space: nowrap;
}

.app-chip--default {
  border: 1px solid var(--color-border);
  color: var(--color-muted);
}

.app-chip--accent {
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
}

.app-chip--outline {
  background: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}

.app-chip--green {
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  background: transparent;
}
.app-chip--blue {
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  background: transparent;
}

.app-chip--peach {
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  background: transparent;
}
</style>

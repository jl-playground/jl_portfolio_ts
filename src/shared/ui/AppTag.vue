<template>
  <span class="app-tag" :class="{ 'app-tag--active': active }" @click="$emit('click')">
    <slot />
  </span>
</template>

<script lang="ts" setup>
defineProps<{
  active?: boolean
}>()
defineEmits<{
  click: []
}>()
</script>

<style scoped>
.app-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-muted);
  transition: all 0.2s ease;
  user-select: none;
}

.app-tag:hover {
  border-color: var(--color-accent);
  color: var(--color-ink);
}

.app-tag--active {
  background: var(--color-accent);
  color: var(--ctp-crust);
  border-color: var(--color-accent);
}
</style>

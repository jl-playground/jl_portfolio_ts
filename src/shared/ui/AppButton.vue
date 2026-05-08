<template>
  <button :class="['app-button', `app-button--${variant}`, { 'app-button--loading': loading }]" :disabled="disabled || loading" :type="type">
    <span v-if="loading" class="app-button__spinner"></span>
    <slot />
  </button>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  variant?: 'primary' | 'ghost' | 'outline'
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
}>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  loading: false
})
</script>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 500;
  font-size: 0.95rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.app-button--primary {
  background: var(--color-accent);
  color: var(--ctp-crust);
  box-shadow: var(--shadow-card);
}

.app-button--primary:hover:not(:disabled) {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-glow);
}

.app-button--ghost {
  border-color: var(--color-border-strong);
  color: var(--color-ink);
  background: transparent;
}

.app-button--ghost:hover:not(:disabled) {
  background: var(--color-surface);
  border-color: var(--color-accent);
}

.app-button--outline {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: transparent;
}

.app-button--outline:hover:not(:disabled) {
  background: var(--color-accent-soft);
}

.app-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.app-button__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

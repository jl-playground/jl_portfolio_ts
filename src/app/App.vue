<script lang="ts" setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import SiteHeader from '@/widgets/SiteHeader.vue'
import SiteFooter from '@/widgets/SiteFooter.vue'
import ParticleCanvas from '@/shared/ui/ParticleCanvas.vue'
import { useScrollReveal } from '@/shared/lib/utils'

onMounted(() => {
  const { init } = useScrollReveal(0.12)
  init()
})
</script>

<template>
  <div class="app-shell">
    <ParticleCanvas />
    <SiteHeader />
    <RouterView v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
    <SiteFooter />
  </div>
</template>

<style>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Reveal animations: visible by default, hidden only when JS is active */
.reveal {
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

html.js .reveal:not(.is-visible) {
  opacity: 0;
  transform: translateY(24px);
}

.section {
  scroll-margin-top: 80px;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

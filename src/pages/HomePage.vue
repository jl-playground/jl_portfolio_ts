<template>
  <main class="home-page">
    <HeroSection />
    <div class="home-page__container">
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <LanguagesSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </div>
  </main>
</template>

<script lang="ts" setup>
import HeroSection from '@/features/hero/ui/HeroSection.vue'
import AboutSection from '@/features/about/ui/AboutSection.vue'
import SkillsSection from '@/features/skills/ui/SkillsSection.vue'
import ProjectsSection from '@/features/projects/ui/ProjectsSection.vue'
import ExperienceSection from '@/features/experience/ui/ExperienceSection.vue'
import LanguagesSection from '@/features/languages/ui/LanguagesSection.vue'
import TestimonialsSection from '@/features/testimonials/ui/TestimonialsSection.vue'
import BlogSection from '@/features/blog/ui/BlogSection.vue'
import ContactSection from '@/features/contact/ui/ContactSection.vue'
</script>

<style scoped>
.home-page {
  position: relative;
  z-index: 1;
}

.home-page__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.home-page__container .section:first-child {
  margin-top: 2rem;
}
</style>

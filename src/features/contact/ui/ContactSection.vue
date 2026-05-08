<template>
  <section id="contact" class="contact section reveal" :ref="setRef">
    <SectionHeader :title="t('contact.title')" :subtitle="t('contact.subtitle')" />
    <div class="contact__layout">
      <AppCard class="contact__card contact__card--main" glass hoverable>
        <h3 class="contact__card-title">{{ t('contact.cardTitle') }}</h3>
        <p class="contact__card-body">{{ t('contact.cardBody') }}</p>
        <div class="contact__actions">
          <AppButton variant="primary" @click="copyEmail">
            <i class="pi pi-copy"></i>
            {{ copied ? t('contact.copied') : t('contact.copyEmail') }}
          </AppButton>
          <AppButton variant="ghost" @click="openEmail">
            <i class="pi pi-envelope"></i>
            {{ t('contact.email') }}
          </AppButton>
        </div>
      </AppCard>

      <div class="contact__side">
        <AppCard class="contact__side-card" hoverable>
          <div class="contact__side-header">
            <i class="pi pi-map-marker"></i>
            <span>Location</span>
          </div>
          <p>Bern, Switzerland</p>
        </AppCard>
        <AppCard class="contact__side-card" hoverable>
          <div class="contact__side-header">
            <i class="pi pi-briefcase"></i>
            <span>Experience</span>
          </div>
          <p>Fullstack Engineer at EvoSys AG</p>
        </AppCard>
        <AppCard class="contact__side-card" hoverable>
          <div class="contact__side-header">
            <i class="pi pi-graduation-cap"></i>
            <span>Education</span>
          </div>
          <p>Computer Schule Bern — EFZ Applikationsentwicklung</p>
        </AppCard>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Profile } from '@/entities/profile/model/Profile'
import SectionHeader from '@/shared/ui/SectionHeader.vue'
import AppCard from '@/shared/ui/AppCard.vue'
import AppButton from '@/shared/ui/AppButton.vue'

const { t } = useI18n()
const profile = Profile.getInstance()
const contact = profile.getContact()
const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(contact.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Fallback
    window.open(`mailto:${contact.email}`, '_self')
  }
}

const openEmail = () => {
  window.open(`mailto:${contact.email}`, '_self')
}

const setRef = (el: unknown) => {
  if (el instanceof HTMLElement) el.classList.add('reveal')
}
</script>

<style scoped>
.contact__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.5fr);
  gap: 2rem;
  align-items: start;
}

.contact__card--main {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact__card-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.contact__card-body {
  color: var(--color-muted);
  line-height: 1.7;
  max-width: 500px;
}

.contact__actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.contact__side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact__side-card {
  padding: 1.25rem;
}

.contact__side-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--color-muted);
}

.contact__side-header i {
  color: var(--color-accent);
}

.contact__side-card p {
  font-size: 0.95rem;
  color: var(--color-ink);
}

@media (max-width: 1024px) {
  .contact__layout {
    grid-template-columns: 1fr;
  }
  .contact__side {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .contact__actions {
    flex-direction: column;
    align-items: flex-start;
  }
  .contact__side {
    grid-template-columns: 1fr;
  }
}
</style>

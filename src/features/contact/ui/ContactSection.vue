<template>
  <section id="contact" class="contact section reveal" :ref="setRef">
    <SectionHeader :title="t('contact.title')" :subtitle="t('contact.subtitle')" eyebrow="07 — Contact" />

    <AppCard class="contact__card">
      <h2 class="contact__heading">{{ t('contact.cardTitle') }}</h2>
      <p class="contact__body">{{ t('contact.cardBody') }}</p>

      <div class="contact__email-group">
        <button class="contact__email-link" @click="copyEmail" type="button">
          <i class="pi pi-copy contact__icon"></i>
          <span class="contact__email-text">{{ contact.email }}</span>
          <span v-if="copied" class="contact__copied">{{ t('contact.copied') }}</span>
        </button>
        <div class="contact__actions">
          <AppButton variant="primary" @click="openEmail">
            <i class="pi pi-envelope"></i>
            {{ t('contact.email') }}
          </AppButton>
        </div>
      </div>

      <div class="contact__info">
        <div class="contact__info-item">
          <i class="pi pi-map-marker"></i>
          <span>Bern, Switzerland</span>
        </div>
        <div class="contact__info-item">
          <i class="pi pi-briefcase"></i>
          <span>Fullstack Engineer at EvoSys AG</span>
        </div>
        <div class="contact__info-item">
          <i class="pi pi-graduation-cap"></i>
          <span>Computer Schule Bern</span>
        </div>
      </div>
    </AppCard>
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
.contact__card {
  max-width: 680px;
  margin: 0 auto;
  padding: 3rem 2.5rem;
  text-align: center;
}

.contact__heading {
  font-family: var(--font-display);
  font-size: var(--step-2);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.contact__body {
  color: var(--color-muted);
  font-size: 1rem;
  line-height: 1.7;
  max-width: var(--measure);
  margin: 0 auto 2rem;
}

.contact__email-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.contact__email-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--step-1);
  font-weight: 500;
  color: var(--color-accent);
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  transition: background-color 0.2s ease;
}

.contact__email-link:hover {
  background-color: var(--color-accent-soft);
}

.contact__icon {
  font-size: 0.9rem;
  opacity: 0.7;
}

.contact__email-text {
  letter-spacing: 0.01em;
}

.contact__copied {
  font-size: 0.8rem;
  color: var(--color-accent);
  font-weight: 600;
  margin-left: 0.25rem;
}

.contact__actions {
  display: flex;
  justify-content: center;
}

.contact__info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.contact__info-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  color: var(--color-muted);
}

.contact__info-item i {
  color: var(--color-accent);
  font-size: 0.85rem;
  opacity: 0.8;
}

@media (max-width: 640px) {
  .contact__card {
    padding: 2rem 1.25rem;
  }

  .contact__heading {
    font-size: var(--step-1);
  }

  .contact__info {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
}
</style>

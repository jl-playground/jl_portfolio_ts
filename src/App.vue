<template>
  <div class="main-content">
    <!-- *HEADER -->
    <header class="header">
      <div class="card">
        <router-link to="/">Joël Leimbacher</router-link>
      </div>
    </header>
    <!-- *SIDEBAR -->
    <div class="sidebar card flex justify-center persistent-drawer">
      <MegaMenu :model="items" orientation="horizontal" breakpoint="700px">
        <template #itemicon="{ item }">
          <i :class="item.icon" style="font-size: 1.5em"></i>
        </template>
      </MegaMenu>
    </div>
    <!-- *MAIN CONTENT -->
    <main class="main-content-area">
      <RouterView />
    </main>
    <!-- *FOOTER -->
    <footer class="footer">
      <Dock :model="dockItems" :position="'bottom'" class="dock">
        <template #itemicon="{ item }">
          <i
            v-tooltip.top="item.label"
            :class="item.icon"
            @click="item.click"
            style="font-size: 2em"
          ></i>
        </template>
      </Dock>
      <AvatarComponent />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { PrimeIcons } from '@primevue/core/api'
import { Profile } from './models/Profile'
import AvatarComponent from '@/components/AvatarComponent.vue'

interface PanelMenuItem {
  label: string
  icon?: string
  items?: PanelMenuItem[]
}

//* LOAD INITIAL
const userProfile = ref<any>(null)
const router = useRouter()
const items = ref<PanelMenuItem[]>([])

const dockItems = ref([
  { label: 'Home' as string, icon: PrimeIcons.HOME, click: () => router.push('/') },
  { label: 'Profile' as string, icon: PrimeIcons.USER, click: () => router.push('/profile') }
])

const setupProfile = () => {
  userProfile.value = Profile.getInstance()
  // Transform user data to MegaMenu items
  items.value = [
    {
      label: 'Personal Info',
      icon: PrimeIcons.USER,
      items: [
        [
          {
            label: `Name: ${userProfile.value.name}`,
            icon: PrimeIcons.ID_CARD
          },
          {
            label: `Title: ${userProfile.value.title}`,
            icon: PrimeIcons.BRIEFCASE
          }
        ]
      ]
    },
    {
      label: 'Skills',
      icon: PrimeIcons.STAR,
      items: [
        userProfile.value.skills.map((skill: string) => ({
          label: skill,
          icon: PrimeIcons.CHECK
        }))
      ]
    },
    {
      label: 'Languages',
      icon: PrimeIcons.GLOBE,
      items: [
        userProfile.value.languages.map((language: any) => ({
          label: language.name,
          icon: PrimeIcons.COG,
          items: [
            [
              {
                label: `Proficiency: ${language.proficiency}`,
                icon: PrimeIcons.COG
              },
              {
                label: `Experience Years: ${language.experienceYears}`,
                icon: PrimeIcons.CALENDAR
              },
              ...language.relevantProjects.map((project: string) => ({
                label: project,
                icon: PrimeIcons.FOLDER
              }))
            ]
          ]
        }))
      ]
    },
    {
      label: 'Hobbies',
      icon: PrimeIcons.HEART,
      items: [
        userProfile.value.hobbies.map((hobby: any) => ({
          label: hobby.name,
          icon: PrimeIcons.IMAGE,
          items: [
            [
              {
                label: `Description: ${hobby.description}`,
                icon: PrimeIcons.INFO
              },
              {
                label: `Years of Experience: ${hobby.yearsOfExperience}`,
                icon: PrimeIcons.CALENDAR
              }
            ]
          ]
        }))
      ]
    }
  ]
}

//* Setup
setupProfile()
</script>

<style scoped>
.main-content {
  display: grid;
  grid-template-rows: 0.5fr 0.5fr 10fr 0.5fr;
  grid-template-columns: 0.5fr 10fr;
  grid-template-areas:
    'header header'
    'sidebar sidebar'
    'main-content-area main-content-area'
    'footer footer';
  height: 100vh;
  width: 100vw;
}

.persistent-drawer {
  position: relative;
  bottom: auto;
}

.persistent-drawer .p-drawer-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.header {
  margin-top: 1rem;
  grid-area: header;
  display: flex;
  justify-content: center;
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.sidebar {
  grid-area: sidebar;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0.5em 0 0 0;
}

.main-content-area {
  grid-area: main-content-area;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: blue; */
  margin: 1rem 1rem 1rem 0;
  border-radius: 1rem;
  overflow-y: auto;
  min-height: 0;
}

.footer {
  grid-area: footer;
  display: flex;
  justify-content: center;
  position: relative;
  /* margin-bottom: 1rem; */
  height: 6rem;

  .dock {
    position: relative;
    height: 100%;
    margin-bottom: 1rem;
  }

  .p-dock-mobile {
    width: fit-content;
    margin-bottom: 1rem;
  }

  :deep(.p-dock-list-container) {
    background-color: rgba(16, 24, 21, 0.5);
  }
}
@media (max-width: 700px) {
  .sidebar {
    justify-content: flex-start; /* Aligns the hamburger button to the left */
    padding-left: 1rem; /* Adds some space from the edge */
  }
  .sidebar :deep(.p-megamenu-root-list) {
    width: 20em;
  }
}
</style>

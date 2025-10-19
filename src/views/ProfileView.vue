<template>
  <div class="card flex justify-center w-full h-full">
    <Chart type="radar" :data="chartData" :options="chartOptions" class="w-full md:w-[35rem]" />
  </div>
</template>

<script lang="ts" setup>
//* VUE
import { ref, onMounted } from 'vue' // Use onMounted for DOM-dependent style access
import Chart from 'primevue/chart'

//* COMPOSABLES

//* GRAPHQL

//* VUELIDATE

//* CUSTOM
// --- ( Adjust this import path to match your project structure ) ---
import { Profile } from '@/models/Profile'

//* COMPONENTS

//* CONTROLLERS

//* LOAD INITIAL
const profile = Profile.getInstance() // Get the singleton instance of your profile

//* VARIABLES
const chartData = ref()
const chartOptions = ref()

//* QUERYS

//* COMPUTED

//* METHODS
const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  // Get data from the Profile model
  const languages = profile.getLanguages()
  const languageNames = languages.map((lang) => lang.getName()) // Assumes getName() getter
  const languageSkills = languages.map((lang) => lang.getSkillLevel()) // Assumes getSkillLevel() getter

  return {
    labels: languageNames, // Use language names for the axes
    datasets: [
      {
        label: 'Programming Language Proficiency', // Updated label
        borderColor: documentStyle.getPropertyValue('--p-green-300'),
        pointBackgroundColor: documentStyle.getPropertyValue('--p-green-300'),
        pointBorderColor: documentStyle.getPropertyValue('--p-green-300'),
        pointHoverBackgroundColor: textColor,
        pointHoverBorderColor: documentStyle.getPropertyValue('--p-green-300'),
        data: languageSkills // Use skill levels for the data
      }
      // Note: Hobbies can't be on the same chart easily
      // as they don't share the same labels (axes)
    ]
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-primary-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor
        },
        position: 'top' as const,
        align: 'start' as const,
        font: {
          size: 16,
          weight: '600' as const
        }
      }
    },
    scales: {
      r: {
        min: 0,
        max: 8,
        ticks: {
          stepSize: 1,
          color: textColorSecondary
        },
        grid: {
          color: textColorSecondary,
          borderColor: textColorSecondary
        },
        pointLabels: {
          // Style the axis labels (e.g., 'Python', 'Java')
          color: textColor
        }
      }
    },
    maintainAspectRatio: true,
    responsive: true
  }
}

//* MOUNTED
// Use onMounted to ensure document.documentElement is available
onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

//* CREATED

//* RETURN
</script>

<style lang="scss" scoped></style>

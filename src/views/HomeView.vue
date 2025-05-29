<template>
  <div class="home-view">
    Hi my name is: {{ userProfile.getName() }} <br />
    and I'm {{ userProfile.getAbout() }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Profile } from '@/models/Profile'

// Load initial profile instance
const userProfile = ref<Profile>(Profile.getInstance())

defineExpose({
  userProfile
})
</script>

<style lang="scss" scoped>
.home-view {
  width: 70%;
  padding: 20px;
  font-size: 1.2em;
}
</style>

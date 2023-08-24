<template>
  <div class="container-xxl bg-white p-0">
    <NavBar />

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<style scoped>

</style>

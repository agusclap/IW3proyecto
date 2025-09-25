<template>
  <v-app>
    <AppToolBar />
    <v-main>
      <v-container class="py-6">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AppToolBar from './components/AppToolBar.vue'  // ← coincide 1:1
</script>

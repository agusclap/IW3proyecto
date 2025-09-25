<template>
  <v-app-bar color="primary" density="comfortable" class="text-white">
    <v-app-bar-title class="font-weight-bold">IW3 Shop</v-app-bar-title>

    <v-spacer />

    <div class="d-flex align-center gap-2">
      <v-btn
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        variant="text"
        :class="['text-white text-capitalize', isActive(link.to) ? 'text-decoration-underline' : '']"
      >
        {{ link.label }}
      </v-btn>
    </div>

    <v-spacer />

    <div class="d-flex align-center gap-3">
      <v-chip
        v-if="loggedIn"
        color="white"
        text-color="primary"
        variant="elevated"
        prepend-icon="mdi-account"
      >
        {{ userEmail }}
      </v-chip>

      <v-btn v-if="loggedIn" variant="outlined" color="white" @click="handleLogout">
        Salir
      </v-btn>

      <template v-else>
        <v-btn to="/login" variant="outlined" color="white">Ingresar</v-btn>
        <v-btn to="/registro" variant="flat" color="white">Registrarse</v-btn>
      </template>
    </div>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { user, loggedIn, logout } = useAuth()
const userEmail = computed(() => user.value?.email ?? '')

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/clientes', label: 'Clientes' },
]

const activePath = computed(() => route.path)

function isActive(path) {
  if (path === '/') return activePath.value === '/'
  return activePath.value.startsWith(path)
}

function handleLogout() {
  logout()
  router.push({ name: 'login' })
}
</script>

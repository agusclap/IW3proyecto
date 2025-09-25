<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" elevation="4" max-width="420">
      <v-card-title class="text-h5 mb-4">Iniciar sesión</v-card-title>
      <v-form @submit.prevent="submit" class="d-flex flex-column gap-4">
        <v-text-field
          v-model="email"
          label="Correo electrónico"
          type="email"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          :error-messages="emailErr"
          autocomplete="username"
          required
        />
        <v-text-field
          v-model="password"
          :type="show ? 'text' : 'password'"
          label="Contraseña"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="show = !show"
          :error-messages="passErr"
          autocomplete="current-password"
          counter
          required
        />
        <v-alert v-if="err" type="error" variant="tonal">{{ err }}</v-alert>
        <v-btn
          type="submit"
          color="primary"
          :loading="loading"
          :disabled="!valid || loading"
        >
          Ingresar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRoute, useRouter } from 'vue-router'

const { login } = useAuth()
const route = useRoute()
const router = useRouter()

const email = ref('')
const password = ref('')
const show = ref(false)
const loading = ref(false)
const err = ref('')

const emailErr = computed(() =>
  email.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value) ? ['Email inválido'] : []
)
const passErr = computed(() => (password.value && password.value.length < 6 ? ['Mínimo 6 caracteres'] : []))

const valid = computed(() => emailErr.value.length === 0 && passErr.value.length === 0 && email.value && password.value)

async function submit() {
  if (!valid.value) return
  loading.value = true
  err.value = ''
  try {
    await login(email.value, password.value)
    const to = route.query.redirect || '/'
    router.replace(to)
  } catch (e) {
    err.value = e.message || 'Error de autenticación'
  } finally {
    loading.value = false
  }
}
</script>

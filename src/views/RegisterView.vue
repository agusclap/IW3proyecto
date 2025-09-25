<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" class="ma-0">
      <v-col cols="12" sm="8" md="5">
        <v-card elevation="8" class="pa-6" rounded="xl">
          <v-card-title class="text-h6 pb-2">Crear cuenta</v-card-title>
          <v-card-subtitle class="text-body-2 pb-4">
            Completá tus datos para registrarte.
          </v-card-subtitle>

          <v-form v-model="isValid" @submit.prevent="onSubmit">
            <v-text-field
              v-model.trim="name"
              label="Nombre"
              :rules="[rules.req, rules.minName]"
              required
            />
            <v-text-field
              v-model.trim="email"
              label="Email"
              type="email"
              autocomplete="username"
              :rules="[rules.req, rules.mail]"
              required
            />
            <v-text-field
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              label="Contraseña"
              autocomplete="new-password"
              :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPass = !showPass"
              :rules="[rules.req, rules.minPass]"
              required
            />
            <v-text-field
              v-model="confirm"
              :type="showConfirm ? 'text' : 'password'"
              label="Confirmar contraseña"
              autocomplete="new-password"
              :append-inner-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showConfirm = !showConfirm"
              :rules="[rules.req, v => v === password || 'Las contraseñas no coinciden']"
              required
            />

            <v-alert v-if="error" type="error" variant="tonal" class="mb-3" :text="error" />
            <v-alert v-if="ok" type="success" variant="tonal" class="mb-3" :text="ok" />

            <v-btn type="submit" color="primary" :loading="loading" :disabled="!isValid || loading" block>
              Registrarme
            </v-btn>

            <div class="text-center mt-3">
              <small>¿Ya tenés cuenta?
                <RouterLink :to="{ name: 'login' }">Ingresá acá</RouterLink>
              </small>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { register } = useAuth()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')

const showPass = ref(false)
const showConfirm = ref(false)
const isValid = ref(false)
const loading = ref(false)
const error = ref('')
const ok = ref('')

const rules = {
  req: v => !!v || 'Requerido',
  mail: v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || 'Email inválido',
  minPass: v => (v?.length ?? 0) >= 6 || 'Mínimo 6 caracteres',
  minName: v => (v?.length ?? 0) >= 3 || 'Mínimo 3 caracteres'
}

async function onSubmit () {
  error.value = ''; ok.value = ''
  loading.value = true
  try {
    await register({ name: name.value, email: email.value, password: password.value, confirm: confirm.value })
    ok.value = 'Usuario creado e iniciado sesión.'
    router.replace({ name: 'home' })
  } catch (e) {
    error.value = e.message || 'No se pudo registrar'
  } finally {
    loading.value = false
  }
}
</script>

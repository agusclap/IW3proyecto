<template>
  <v-row class="justify-center">
    <v-col cols="12" md="6">
      <v-card elevation="2">
        <v-card-title class="text-h5">Registro rápido de clientes</v-card-title>
        <v-card-text>
          <p class="text-body-2 mb-4">Ingresa el nombre del cliente para registrarlo en el sistema.</p>
          <v-form @submit.prevent="onSubmit">
            <v-text-field
              v-model="nombre"
              label="Nombre completo"
              variant="outlined"
              :error-messages="err"
              counter
              maxlength="60"
              required
            />
            <v-btn type="submit" color="primary" :disabled="!canSubmit" class="mt-2">Registrar</v-btn>
          </v-form>
          <v-alert v-if="ok" type="success" variant="tonal" class="mt-4">
            ¡Bienvenido/a, {{ nombre }}! El registro se realizó correctamente.
          </v-alert>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const nombre = ref('')
const ok = ref(false)

const err = computed(() => {
  if (nombre.value.trim().length === 0) return ['El nombre es requerido']
  if (nombre.value.trim().length < 3) return ['Debe tener al menos 3 caracteres']
  return []
})

const canSubmit = computed(() => err.value.length === 0)

function onSubmit() {
  if (!canSubmit.value) return
  console.log('Guardar cliente:', nombre.value)
  ok.value = true
}

watch(nombre, () => {
  if (ok.value) ok.value = false
})
</script>

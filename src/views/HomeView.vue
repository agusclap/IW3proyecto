<template>
  <div class="space-y-4">
    <h1 class="text-h5">Inicio</h1>

    <v-card>
      <v-card-text>
        <div class="mb-2">Este es un inicio de prueba con Vuetify.</div>
        <RouterLink to="/productos">Ver productos</RouterLink>
        ·
        <RouterLink to="/clientes">Clientes (protegido)</RouterLink>
      </v-card-text>
    </v-card>
  </div>
</template>

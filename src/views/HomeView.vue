<template>
  <v-container class="py-8">
    <v-row class="justify-center">
      <v-col cols="12" md="8">
        <v-card elevation="2" class="pa-6 text-center">
          <h1 class="text-h4 mb-4">Bienvenido a IW3 Shop</h1>
          <p class="text-body-1 mb-6">
            Este es un entorno de práctica para integrar directivas de Vue 3, router, composición y un flujo de autenticación con Vuetify.
          </p>
          <div class="d-flex flex-wrap justify-center gap-4">
            <v-btn color="primary" prepend-icon="mdi-store" to="/productos">
              Ver productos
            </v-btn>
            <v-btn color="secondary" variant="outlined" prepend-icon="mdi-account-group" to="/clientes">
              Clientes (protegido)
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

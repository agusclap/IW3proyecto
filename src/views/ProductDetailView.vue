<template>
  <v-row class="justify-center">
    <v-col cols="12" md="8">
      <v-card v-if="product" elevation="2">
        <v-card-title class="text-h5 d-flex justify-space-between align-center">
          <span>{{ product.nombre }}</span>
          <v-chip :color="product.stock === 0 ? 'red-lighten-1' : 'green-darken-1'" variant="tonal">
            {{ product.stock === 0 ? 'Sin stock' : `Stock: ${product.stock}` }}
          </v-chip>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <p class="text-body-1 mb-4">
            Precio: <strong>${{ product.precio.toLocaleString('es-AR') }}</strong>
          </p>
          <p class="text-body-2 text-medium-emphasis">
            Este producto forma parte del catálogo demostrativo del práctico unificado.
          </p>
        </v-card-text>
        <v-card-actions class="justify-space-between">
          <v-btn variant="text" prepend-icon="mdi-arrow-left" @click="goBack">Volver a productos</v-btn>
          <v-btn color="primary" :disabled="product.stock === 0" @click="addToCart(product.id)">
            Agregar al carrito
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-alert v-else type="error" variant="tonal" class="text-center">
        Producto no encontrado.
        <div class="mt-4">
          <v-btn color="primary" prepend-icon="mdi-arrow-left" @click="goBack">Volver al listado</v-btn>
        </div>
      </v-alert>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data/products'
import { useCart } from '../composables/useCart'

const route = useRoute()
const router = useRouter()
const { add } = useCart()

const product = computed(() => {
  const id = Number(route.params.id)
  return products.find((p) => p.id === id) || null
})

function goBack() {
  router.push({ name: 'products' })
}

function addToCart(id) {
  const found = products.find((p) => p.id === id)
  if (found) add(found)
}
</script>

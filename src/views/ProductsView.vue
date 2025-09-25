<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-4">
      <h2 class="mb-0">Productos</h2>
      <v-btn color="secondary" variant="text" @click="goClients">
        Ir a Clientes
      </v-btn>
    </div>

    <ProductList @add-to-cart="handleAddToCart" />

    <CartMini class="mt-6" />

    <v-snackbar v-model="snack.show" :timeout="1800">
      {{ snack.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductList from '@/components/ProductList.vue'
import CartMini from '@/components/CartMini.vue'
import { useCart } from '@/composables/useCart'
import { findProduct } from '@/data/products'

const router = useRouter()
const { add } = useCart()

const snack = ref({ show: false, text: '' })

function handleAddToCart(id) {
  const p = findProduct(id)
  if (!p) return
  if (p.stock <= 0) {
    snack.value = { show: true, text: 'Sin stock disponible' }
    return
  }
  add(id) // esto descuenta stock y agrega al carrito
  snack.value = { show: true, text: `Agregado: ${p.nombre}` }
}

function goClients() {
  router.push({ name: 'clients' })
}
</script>

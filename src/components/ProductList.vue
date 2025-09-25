<template>
  <div class="d-flex flex-column gap-4">
    <v-text-field
      v-model="q"
      label="Buscar productos"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      clearable
    />

    <v-alert v-if="filtered.length === 0" type="info" variant="tonal">
      No se encontraron productos para la búsqueda realizada.
    </v-alert>

    <v-list lines="three" density="comfortable" class="bg-transparent">
      <v-list-item
        v-for="item in filtered"
        :key="item.id"
        class="rounded-lg"
        :class="item.stock === 0 ? 'bg-red-lighten-5' : 'bg-surface'
        "
      >
        <template #prepend>
          <v-avatar color="primary" class="text-white">
            {{ item.nombre.charAt(0).toUpperCase() }}
          </v-avatar>
        </template>

        <v-list-item-title class="text-h6">{{ item.nombre }}</v-list-item-title>
        <v-list-item-subtitle>
          <div class="d-flex align-center flex-wrap gap-2">
            <strong>${{ item.precio.toLocaleString('es-AR') }}</strong>
            <v-chip
              :color="item.stock === 0 ? 'red-lighten-1' : 'green-darken-1'"
              variant="tonal"
              density="comfortable"
              class="text-capitalize"
            >
              {{ item.stock === 0 ? 'Sin stock' : `Stock: ${item.stock}` }}
            </v-chip>
          </div>
        </v-list-item-subtitle>

        <template #append>
          <div class="d-flex flex-column gap-2">
            <v-btn
              color="primary"
              variant="flat"
              :disabled="item.stock === 0"
              @click="addToCart(item.id)"
            >
              Agregar al carrito
            </v-btn>
            <v-btn variant="text" color="secondary" @click="goDetail(item.id)">
              Ver detalle
            </v-btn>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '../data/products'

const emit = defineEmits(['add-to-cart'])

const q = ref('')
const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  if (!term) return products
  return products.filter((p) => p.nombre.toLowerCase().includes(term))
})

const router = useRouter()

function goDetail(id) {
  router.push({ name: 'product-detail', params: { id } })
}

function addToCart(id) {
  emit('add-to-cart', id)
}
</script>

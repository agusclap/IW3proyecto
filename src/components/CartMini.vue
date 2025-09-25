<template>
  <v-card elevation="2">
    <v-card-title class="text-h6">Carrito</v-card-title>
    <v-divider />
    <v-card-text>
      <div v-if="items.length === 0" class="text-medium-emphasis">
        Tu carrito está vacío. Agrega productos para comenzar.
      </div>
      <v-list v-else density="comfortable">
        <v-list-item v-for="item in items" :key="item.id">
          <v-list-item-title class="font-weight-medium">{{ item.nombre }}</v-list-item-title>
          <v-list-item-subtitle>
            ${{ item.precio.toLocaleString('es-AR') }} · Cantidad: {{ item.cantidad }}
          </v-list-item-subtitle>
          <template #append>
            <div class="d-flex align-center gap-2">
              <v-btn icon="mdi-minus" variant="text" @click="$emit('dec', item.id)" />
              <v-chip color="primary" variant="tonal" style="min-width: 42px;" class="justify-center">
                {{ item.cantidad }}
              </v-chip>
              <v-btn icon="mdi-plus" variant="text" @click="$emit('inc', item.id)" />
              <v-btn icon="mdi-delete-outline" variant="text" color="red" @click="$emit('remove', item.id)" />
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-divider />
    <v-card-actions class="justify-space-between">
      <span class="text-subtitle-1 font-weight-medium">Total</span>
      <span class="text-h6">${{ Number(total).toLocaleString('es-AR') }}</span>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  total: { type: [Number, String], default: 0 },
})

defineEmits(['inc', 'dec', 'remove'])
</script>

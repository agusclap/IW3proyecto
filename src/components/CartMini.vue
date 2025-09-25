<template>
  <v-card>
    <v-card-title class="text-subtitle-1">Carrito</v-card-title>
    <v-divider />
    <v-card-text>
      <div v-if="items.length === 0" class="text-medium-emphasis">
        Tu carrito está vacío.
      </div>

      <template v-else>
        <v-list>
          <v-list-item v-for="it in items" :key="it.id">
            <template #title>{{ it.nombre }}</template>
            <template #subtitle>
              $ {{ it.precio.toLocaleString('es-AR') }} × {{ it.cant }}
              = <strong>$ {{ it.subtotal.toLocaleString('es-AR') }}</strong>
              <span class="ml-2 text-medium-emphasis">(Stock disp.: {{ it.stock }})</span>
            </template>

            <template #append>
              <div class="d-flex align-center gap-1">
                <v-btn
                  icon="mdi-minus"
                  density="comfortable"
                  variant="text"
                  @click="dec(it.id)"
                  :aria-label="`Quitar una unidad de ${it.nombre}`"
                />
                <v-btn
                  icon="mdi-plus"
                  density="comfortable"
                  variant="text"
                  @click="inc(it.id)"
                  :disabled="it.stock === 0"
                  :aria-label="`Agregar una unidad de ${it.nombre}`"
                />
                <v-btn
                  icon="mdi-delete"
                  color="error"
                  density="comfortable"
                  variant="text"
                  @click="remove(it.id)"
                  :aria-label="`Eliminar ${it.nombre} del carrito`"
                />
              </div>
            </template>
          </v-list-item>
        </v-list>

        <v-divider class="my-3" />

        <div class="d-flex align-center justify-space-between">
          <div class="text-subtitle-1">
            <strong>Total: $ {{ total.toLocaleString('es-AR') }}</strong>
          </div>
          <v-btn color="error" variant="tonal" @click="clear">
            Vaciar carrito
          </v-btn>
        </div>
      </template>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useCart } from '@/composables/useCart'

const { items, total, inc, dec, remove, clear } = useCart()
</script>

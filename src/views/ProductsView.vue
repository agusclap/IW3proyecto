<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-card>
        <v-card-title class="text-h5">Productos disponibles</v-card-title>
        <v-divider />
        <v-card-text>
          <ProductList @add-to-cart="onAdd" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <CartMini
        :items="items"
        :total="total"
        @inc="inc"
        @dec="dec"
        @remove="remove"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import ProductList from '../components/ProductList.vue'
import CartMini from '../components/CartMini.vue'
import { useCart } from '../composables/useCart'
import { products } from '../data/products'

const { items, add, inc, dec, remove, total } = useCart()

function onAdd(id) {
  const p = products.find((x) => x.id === id)
  if (p) add(p)
}
</script>

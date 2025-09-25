<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../data/products'
const route = useRoute()
const product = computed(() => {
  const id = Number(route.params.id)
  return products.find((p) => p.id === id)
})
</script>

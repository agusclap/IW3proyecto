<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { products } from '../data/products'
const q = ref('')
const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  if (!term) return products
  return products.filter((p) => p.nombre.toLowerCase().includes(term))
})
const router = useRouter()
function goDetail(id) { router.push({ name: 'product-detail', params: { id } }) }
</script>

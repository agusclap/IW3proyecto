<script setup>
import ProductList from '../components/ProductList.vue'
import { useCart } from '../composables/useCart'
import { products } from '../data/products'
const { items, add, inc, dec, remove, total } = useCart()
function onAdd(id) { const p = products.find((x) => x.id === id); if (p) add(p) }
</script>

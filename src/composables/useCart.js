// src/composables/useCart.js
import { ref, computed, watch } from 'vue'
import { products, findProduct, changeStock } from '@/data/products'

const CART_KEY = 'cart:v1'
// [{ id, cant }]
const cart = ref(JSON.parse(localStorage.getItem(CART_KEY) || '[]'))

watch(cart, v => localStorage.setItem(CART_KEY, JSON.stringify(v)), { deep: true })

export function useCart () {
  const items = computed(() =>
    cart.value.map(it => {
      const p = findProduct(it.id)
      return { ...p, cant: it.cant, subtotal: (p?.precio ?? 0) * it.cant }
    })
  )

  const total = computed(() =>
    items.value.reduce((acc, it) => acc + it.subtotal, 0)
  )

  function add (id) {
    const p = findProduct(id)
    if (!p || p.stock <= 0) return
    // reservar 1 unidad
    if (!changeStock(id, -1)) return
    const row = cart.value.find(r => r.id === id)
    if (row) row.cant++
    else cart.value.push({ id, cant: 1 })
  }

  function inc (id) {
    const p = findProduct(id)
    if (!p || p.stock <= 0) return
    if (!changeStock(id, -1)) return
    const row = cart.value.find(r => r.id === id)
    if (row) row.cant++
    else cart.value.push({ id, cant: 1 })
  }

  function dec (id) {
    const row = cart.value.find(r => r.id === id)
    if (!row) return
    // devolver 1 unidad al stock
    changeStock(id, +1)
    row.cant--
    if (row.cant <= 0) {
      cart.value = cart.value.filter(x => x.id !== id)
    }
  }

  function remove (id) {
    const row = cart.value.find(r => r.id === id)
    if (!row) return
    // devolver todas las unidades
    changeStock(id, +row.cant)
    cart.value = cart.value.filter(x => x.id !== id)
  }

  function clear () {
    // devolver stock de todo
    for (const it of cart.value) changeStock(it.id, +it.cant)
    cart.value = []
  }

  return { items, total, add, inc, dec, remove, clear, products }
}

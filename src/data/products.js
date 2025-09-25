// src/data/products.js
import { ref, watch } from 'vue'

const PRODUCTS_KEY = 'iw3_products_v1'

// seed inicial
const seed = [
  { id: 1, nombre: 'Mouse',        precio: 15000,  stock: 8  },
  { id: 2, nombre: 'Teclado',      precio: 28000,  stock: 0  },
  { id: 3, nombre: 'Monitor',      precio: 220000, stock: 5  },
  { id: 4, nombre: 'Auriculares',  precio: 35000,  stock: 12 }
]

// carga o seed
const saved = typeof window !== 'undefined'
  ? window.localStorage.getItem(PRODUCTS_KEY)
  : null

export const products = ref(saved ? JSON.parse(saved) : seed)

// persistencia (profunda)
watch(products, v => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(v))
  }
}, { deep: true })

// helpers
export function findProduct (id) {
  return products.value.find(p => p.id === Number(id))
}
export function changeStock (id, delta) {
  const p = findProduct(id)
  if (!p) return false
  const next = p.stock + delta
  if (next < 0) return false
  p.stock = next
  return true
}

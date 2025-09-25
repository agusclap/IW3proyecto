import { reactive, computed } from 'vue'

const state = reactive({ items: [] })

export function useCart() {
  function add(item) {
    const found = state.items.find((i) => i.id === item.id)
    if (found) found.cantidad++
    else state.items.push({ ...item, cantidad: 1 })
  }
  function inc(id) {
    const it = state.items.find((i) => i.id === id)
    if (it) it.cantidad++
  }
  function dec(id) {
    const it = state.items.find((i) => i.id === id)
    if (it) {
      it.cantidad--
      if (it.cantidad <= 0) remove(id)
    }
  }
  function remove(id) {
    const idx = state.items.findIndex((i) => i.id === id)
    if (idx !== -1) state.items.splice(idx, 1)
  }
  const total = computed(() => state.items.reduce((a, i) => a + i.precio * i.cantidad, 0))
  return { items: state.items, add, inc, dec, remove, total }
}

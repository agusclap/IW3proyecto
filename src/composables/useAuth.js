import { ref, computed } from 'vue'

const key = 'iw3_auth'
const session = ref(null)
const raw = localStorage.getItem(key)
if (raw) session.value = JSON.parse(raw)

export function useAuth() {
  const user = computed(() => session.value)
  const loggedIn = computed(() => !!session.value)

  async function login(email, password) {
    await new Promise((r) => setTimeout(r, 600))
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || password.length < 6) {
      throw new Error('Credenciales inválidas')
    }
    session.value = { email }
    localStorage.setItem(key, JSON.stringify(session.value))
  }

  function logout() {
    session.value = null
    localStorage.removeItem(key)
  }

  return { user, loggedIn, login, logout }
}

export function isAuthenticated() { return !!session.value }

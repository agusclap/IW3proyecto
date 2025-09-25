import { ref, computed, watch } from 'vue'

const SESSION_KEY = 'iw3_auth'   // sesión actual: { email, name? }
const USERS_KEY   = 'iw3_users'  // “BD” local: [{ id, name, email, pass }]

const session = ref(null)
const users   = ref([])

// Cargar de localStorage
if (typeof window !== 'undefined') {
  const rawSess  = window.localStorage.getItem(SESSION_KEY)
  const rawUsers = window.localStorage.getItem(USERS_KEY)
  if (rawSess)  session.value = JSON.parse(rawSess)
  if (rawUsers) users.value   = JSON.parse(rawUsers)
}

// Persistencia
watch(session, v => {
  if (typeof window === 'undefined') return
  if (v) window.localStorage.setItem(SESSION_KEY, JSON.stringify(v))
  else   window.localStorage.removeItem(SESSION_KEY)
}, { deep: true })

watch(users, v => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(USERS_KEY, JSON.stringify(v))
}, { deep: true })

function validateEmail (email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
}

export function useAuth() {
  const user = computed(() => session.value)
  const loggedIn = computed(() => !!session.value)

  // REGISTRO
  async function register({ name, email, password, confirm }) {
    await new Promise(r => setTimeout(r, 400)) // mock delay

    if (!name || name.trim().length < 3)  throw new Error('Nombre mínimo 3 caracteres')
    if (!validateEmail(email))            throw new Error('Email inválido')
    if (!password || password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres')
    if (password !== confirm)             throw new Error('Las contraseñas no coinciden')

    const exists = users.value.some(u => u.email.toLowerCase() === email.toLowerCase())
    if (exists) throw new Error('Ese email ya está registrado')

    const id = (crypto?.randomUUID?.() || String(Date.now()))
    users.value.push({ id, name: name.trim(), email: email.trim(), pass: password })

    // Auto-login tras registro (si no lo querés, comentá la línea siguiente)
    session.value = { email: email.trim(), name: name.trim() }
  }

  // LOGIN
  async function login(email, password) {
    await new Promise((r) => setTimeout(r, 600))

    if (!validateEmail(email) || (password?.length ?? 0) < 6) {
      throw new Error('Credenciales inválidas')
    }

    const found = users.value.find(u =>
      u.email.toLowerCase() === email.toLowerCase() && u.pass === password
    )
    if (!found) throw new Error('Usuario o contraseña incorrectos')

    session.value = { email: found.email, name: found.name }
  }

  function logout() { session.value = null }

  return { user, loggedIn, login, logout, register, users }
}

// Helper para guardas fuera del composable (si lo necesitás)
export function isAuthenticated() { return !!session.value }

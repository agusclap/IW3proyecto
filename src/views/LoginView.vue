<script setup>
import { computed, ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRoute, useRouter } from 'vue-router'
const { login } = useAuth()
const route = useRoute()
const router = useRouter()
const email = ref('')
const password = ref('')
const show = ref(false)
const loading = ref(false)
const err = ref('')
const emailErr = computed(() => (email.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value) ? ['Email inválido'] : []))
const passErr = computed(() => (password.value && password.value.length < 6 ? ['Mínimo 6 caracteres'] : []))
const valid = computed(() => emailErr.value.length === 0 && passErr.value.length === 0 && email.value && password.value)
async function submit() {
  if (!valid.value) return
  loading.value = true
  err.value = ''
  try {
    await login(email.value, password.value)
    const to = route.query.redirect || '/'
    router.replace(to)
  } catch (e) {
    err.value = e.message || 'Error de autenticación'
  } finally {
    loading.value = false
  }
}
</script>

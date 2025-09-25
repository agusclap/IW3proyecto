<script setup>
import { ref, computed } from 'vue'
const nombre = ref('')
const err = computed(() => (nombre.value.length === 0 ? ['Requerido'] : nombre.value.length < 3 ? ['Mínimo 3 caracteres'] : []))
const canSubmit = computed(() => err.value.length === 0)
const ok = ref(false)
function onSubmit() { if (!canSubmit.value) return; console.log('Guardar cliente:', nombre.value); ok.value = true }
</script>

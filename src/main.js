import { createApp } from 'vue'
import App from './App.vue'
import { vuetify } from './plugins/vuetify.js'   // <-- .js (no .ts)
import router from './router'
import '@mdi/font/css/materialdesignicons.css'   // <-- íconos MDI

createApp(App).use(vuetify).use(router).mount('#app')

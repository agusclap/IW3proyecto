import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { vuetify } from './plugins/vuetify.js'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'

createApp(App).use(vuetify).use(router).mount('#app')

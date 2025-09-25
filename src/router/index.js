import { createRouter, createWebHistory } from 'vue-router'

// Vistas
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import ClientsView from '../views/ClientsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

// Helper de auth (lee de localStorage)
import { isAuthenticated } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/productos', name: 'products', component: ProductsView, meta: { requiresAuth: true } },
    { path: '/productos/:id', name: 'product-detail', component: ProductDetailView, props: true, meta: { requiresAuth: true } },
    { path: '/clientes', name: 'clients', component: ClientsView, meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/registro', name: 'register', component: RegisterView }
  ],
  scrollBehavior (to, from, saved) {
    if (saved) return saved
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const authed = isAuthenticated()
  if (to.meta.requiresAuth && !authed) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if ((to.name === 'login' || to.name === 'register') && authed) {
    return { name: 'home' }
  }
})

export default router

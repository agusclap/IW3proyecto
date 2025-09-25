import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import ClientsView from '../views/ClientsView.vue'
import LoginView from '../views/LoginView.vue'
import { isAuthenticated } from '../composables/useAuth'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/productos', name: 'products', component: ProductsView },
    { path: '/productos/:id', name: 'product-detail', component: ProductDetailView, props: true },
    { path: '/clientes', name: 'clients', component: ClientsView, meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() { return { top: 0 } },
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.name === 'login' && isAuthenticated()) return { name: 'home' }
})

export default router

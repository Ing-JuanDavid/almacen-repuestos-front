import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InventoryView from '@/views/InventoryView.vue'
import ConfigView from '@/views/ConfigView.vue'
import LogInView from '@/views/LogInView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LogInView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('../views/SalesView.vue'),
    },
    {
      path: '/inventario',
      name: 'inventario',
      component: InventoryView,
    },
    {
      path: '/config',
      name: 'config',
      component: ConfigView,
    },
  ],
})

export default router

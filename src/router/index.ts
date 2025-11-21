import { createRouter, createWebHistory } from 'vue-router'
import InventoryView from '@/views/InventoryView.vue'
import ConfigView from '@/views/ConfigView.vue'
import LoginView from '@/views/LogInView.vue'
import Dashboard from '@/layouts/Dashboard.vue'
import SalesView from '@/modules/ventas/views/SalesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'inventario',
          name: 'inventario',
          component: InventoryView,
        },
        {
          path: 'ventas',
          name: 'ventas',
          component: SalesView,
        },
        {
          path: 'config',
          name: 'config',
          component: ConfigView,
        },
      ],
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

export default router

<script lang="ts">
export default {
  name: 'PanelBase',
  data() {
    return {
      sidebarOpen: false,
    }
  },
}
</script>

<template>
  <div class="min-h-screen flex bg-gray-100 text-gray-800">
    <!-- ASIDE -->
    <aside
      class="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0 transition-transform duration-200 transform md:translate-x-0"
      :class="{ '-translate-x-full': !sidebarOpen }"
    >
      <!-- Logo -->
      <div
        class="h-16 flex items-center justify-center bg-gray-800 text-xl font-bold border-b border-gray-700"
      >
        <i class="fa-solid fa-screwdriver-wrench mr-2"></i> RepuestosApp
      </div>

      <!-- Menu -->
      <nav class="flex-1 overflow-y-auto py-4">
        <ul class="space-y-2 px-4">
          <li>
            <routerLink
              to="/dashboard"
              class="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition"
            >
              <i class="fa-solid fa-house"></i>
              <span>Inicio</span>
            </routerLink>
          </li>
          <li>
            <router-link
              to="/dashboard/inventario"
              class="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition"
            >
              <i class="fa-solid fa-boxes-stacked"></i>
              <span>Inventario</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/dashboard/ventas"
              class="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition"
            >
              <i class="fa-solid fa-receipt"></i>
              <span>Ventas</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/dashboard/config"
              class="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition"
            >
              <i class="fa-solid fa-gear"></i>
              <span>Configuración</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/login"
              class="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition"
            >
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Salir</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-700 text-sm text-gray-400">
        <p>© 2025 RepuestosApp</p>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <div class="flex-1 flex flex-col md:ml-64">
      <!-- HEADER -->
      <header
        class="h-16 bg-white shadow flex items-center justify-between px-6 fixed top-0 inset-x-0 md:left-64 z-10"
      >
        <div class="flex items-center gap-3">
          <!-- Botón menú (solo móvil) -->
          <button
            class="md:hidden text-gray-600 focus:outline-none"
            @click="sidebarOpen = !sidebarOpen"
          >
            <i class="fa-solid fa-bars text-xl"></i>
          </button>
          <h1 class="font-bold text-xl">Panel de Administración</h1>
        </div>

        <!-- Usuario -->
        <div class="flex items-center gap-3">
          <span class="text-gray-600 font-medium">Juan Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="Avatar"
            class="w-10 h-10 rounded-full border border-gray-300"
          />
        </div>
      </header>

      <!-- CONTENIDO PRINCIPAL -->
      <main class="flex-1 mt-16 p-6">
        <div class="bg-white rounded-xl shadow p-6">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar opcional */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 4px;
}
</style>

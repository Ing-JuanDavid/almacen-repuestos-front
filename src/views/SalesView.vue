<template>
  <section class="p-6 bg-gray-50 min-h-screen">
    <!-- Título -->
    <header class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">
        <i class="fa-solid fa-cash-register mr-2 text-indigo-600"></i>
        Módulo de Ventas
      </h1>
      <button
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
      >
        <i class="fa-solid fa-plus"></i> Nueva Venta
      </button>
    </header>

    <!-- Filtros -->
    <div
      class="bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-4 items-center justify-between mb-6"
    >
      <div class="flex items-center gap-2">
        <label for="buscar" class="text-gray-700 font-medium">Buscar:</label>
        <input
          id="buscar"
          type="text"
          placeholder="Cliente, producto, código..."
          class="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>

      <div class="flex items-center gap-3">
        <select
          class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
        >
          <option value="">Filtrar por estado</option>
          <option>Completada</option>
          <option>Pendiente</option>
          <option>Anulada</option>
        </select>
        <button
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-md flex items-center gap-2"
        >
          <i class="fa-solid fa-rotate-right"></i> Limpiar
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-indigo-600 text-white">
          <tr>
            <th class="py-3 px-4">#</th>
            <th class="py-3 px-4">Cliente</th>
            <th class="py-3 px-4">Fecha</th>
            <th class="py-3 px-4">Total</th>
            <th class="py-3 px-4">Estado</th>
            <th class="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="venta in ventas" :key="venta.id" class="border-b hover:bg-gray-50">
            <td class="py-3 px-4">{{ venta.id }}</td>
            <td class="py-3 px-4">{{ venta.cliente }}</td>
            <td class="py-3 px-4">{{ venta.fecha }}</td>
            <td class="py-3 px-4 font-semibold">${{ venta.total }}</td>
            <td class="py-3 px-4">
              <span
                :class="[
                  'px-2 py-1 text-xs rounded-full font-medium',
                  venta.estado === 'Completada'
                    ? 'bg-green-100 text-green-700'
                    : venta.estado === 'Pendiente'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700',
                ]"
              >
                {{ venta.estado }}
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <button class="text-blue-600 hover:text-blue-800 mx-1">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="text-yellow-600 hover:text-yellow-800 mx-1">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="text-red-600 hover:text-red-800 mx-1">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const ventas = ref([
  { id: 1, cliente: 'Carlos Pérez', fecha: '2025-11-10', total: 350000, estado: 'Completada' },
  { id: 2, cliente: 'Ana Gómez', fecha: '2025-11-11', total: 150000, estado: 'Pendiente' },
  { id: 3, cliente: 'Luis Torres', fecha: '2025-11-11', total: 270000, estado: 'Anulada' },
])
</script>

<style scoped></style>

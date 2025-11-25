<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'

const baseUrl = '/api/ventas'

interface Producto {
  id: number
  cantidad: number
}

interface Venta {
  id: number
  cliente_id: number
  cliente: string
  fecha: string
  productos: Producto[]
  total: number
  estado: string
}

const ventas = ref<Venta[]>([
  {
    id: 1,
    cliente_id: 1,
    cliente: 'Carlos Pérez',
    fecha: '2025-11-10',
    productos: [
      { id: 1, cantidad: 2 },
      { id: 5, cantidad: 1 },
    ],
    total: 350000,
    estado: 'Completada',
  },
  {
    id: 2,
    cliente_id: 2,
    cliente: 'Ana Gómez',
    fecha: '2025-11-11',
    productos: [{ id: 2, cantidad: 1 }],
    total: 150000,
    estado: 'Pendiente',
  },
  {
    id: 3,
    cliente_id: 1,
    cliente: 'Luis Torres',
    fecha: '2025-11-11',
    productos: [
      { id: 8, cantidad: 1 },
      { id: 9, cantidad: 1 },
    ],
    total: 270000,
    estado: 'Anulada',
  },
])

const filtros = ref({
  buscar: '',
  estado: '',
})

const modalEditar = ref(false)
const modalEliminar = ref(false)
const ventaEditar = ref<Venta | null>(null)
const ventaEliminar = ref<Venta | null>(null)
const debugInfo = ref<string>(`{
  mensaje: 'Esperando acción... (Ver detalle, Editar o Eliminar una venta)',
  tipo: 'INFO',
  url: '',
  payload: null,
  timestamp: new Date().toISOString(),
}`)

// Filtrado de ventas
const ventasFiltradas = computed(() => {
  let resultado = ventas.value

  if (filtros.value.buscar) {
    resultado = resultado.filter(
      (v) =>
        v.cliente.toLowerCase().includes(filtros.value.buscar.toLowerCase()) ||
        v.id.toString().includes(filtros.value.buscar),
    )
  }

  if (filtros.value.estado) {
    resultado = resultado.filter((v) => v.estado === filtros.value.estado)
  }

  return resultado
})

const limpiarFiltros = () => {
  filtros.value.buscar = ''
  filtros.value.estado = ''
}

const abrirModalNueva = () => {
  alert('Aquí se abriría el formulario de nueva venta')
}

const verDetalle = (venta: Venta) => {
  alert(`Ver detalle de venta #${venta.id}`)
}

// EDITAR
const abrirModalEditar = (venta: Venta) => {
  ventaEditar.value = { ...venta }
  modalEditar.value = true
}

const cerrarModalEditar = () => {
  modalEditar.value = false
  ventaEditar.value = null
}

const actualizarVenta = async () => {
  if (!ventaEditar.value) return

  try {
    const payload = {
      cliente_id: ventaEditar.value.cliente_id,
      productos: ventaEditar.value.productos,
      total: ventaEditar.value.total,
    }

    debugInfo.value = JSON.stringify(
      {
        tipo: 'PUT',
        url: `${baseUrl}/${ventaEditar.value.id}`,
        payload: payload,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    )

    const response = await axios.put(`${baseUrl}/${ventaEditar.value.id}`, payload)

    // Actualizar en el array local
    const index = ventas.value.findIndex((v) => v.id === ventaEditar.value!.id)
    if (index !== -1) {
      ventas.value[index] = { ...ventaEditar.value }
    }

    debugInfo.value = JSON.stringify(
      {
        tipo: 'PUT - RESPUESTA',
        url: `${baseUrl}/${ventaEditar.value.id}`,
        payload,
        response: response.data,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    )

    alert('Venta actualizada con éxito!')
    cerrarModalEditar()
  } catch (error) {
    console.error('Error al actualizar:', error)
    debugInfo.value = JSON.stringify(
      {
        tipo: 'PUT - ERROR',
        url: `${baseUrl}/${ventaEditar.value.id}`,
        error: error instanceof Error ? error.message : 'Error desconocido',
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    )
    alert('Error al actualizar la venta')
  }
}

// ELIMINAR
const confirmarEliminar = (venta: Venta) => {
  ventaEliminar.value = venta
  modalEliminar.value = true
}

const cerrarModalEliminar = () => {
  modalEliminar.value = false
  ventaEliminar.value = null
}

const eliminarVenta = async () => {
  if (!ventaEliminar.value) return

  try {
    debugInfo.value = JSON.stringify(
      {
        tipo: 'DELETE',
        url: `${baseUrl}/${ventaEliminar.value.id}`,
        venta: ventaEliminar.value,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    )

    const response = await axios.delete(`${baseUrl}/${ventaEliminar.value.id}`)

    // Eliminar del array local
    ventas.value = ventas.value.filter((v) => v.id !== ventaEliminar.value!.id)

    debugInfo.value = JSON.stringify(
      {
        tipo: 'DELETE - RESPUESTA',
        url: `${baseUrl}/${ventaEliminar.value.id}`,
        response: response.data,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    )

    alert('Venta eliminada con éxito!')
    cerrarModalEliminar()
  } catch (error) {
    console.error('Error al eliminar:', error)
    debugInfo.value = JSON.stringify(
      {
        tipo: 'DELETE - ERROR',
        url: `${baseUrl}/${ventaEliminar.value.id}`,
        error: error instanceof Error ? error.message : 'Error desconocido',
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    )
    alert('Error al eliminar la venta')
  }
}
</script>

<style scoped></style>

<template>
  <section class="p-6 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
    <!-- Título -->
    <header class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-3">
        <div
          class="w-12 h-12 linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center"
        >
          <i class="fa-solid fa-cash-register text-white text-xl"></i>
        </div>
        Módulo de Ventas
      </h1>
    </header>

    <!-- Filtros -->
    <div
      class="bg-white rounded-xl shadow-lg p-6 flex flex-wrap gap-4 items-center justify-between mb-6 border border-slate-200"
    >
      <div class="flex items-center gap-3">
        <label for="buscar" class="text-gray-700 font-semibold flex items-center gap-2">
          <i class="fa-solid fa-search text-indigo-600"></i>
          Buscar:
        </label>
        <input
          id="buscar"
          v-model="filtros.buscar"
          type="text"
          placeholder="Cliente, producto, código..."
          class="border-2 border-slate-200 rounded-xl px-4 py-2 w-64 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
        />
      </div>

      <div class="flex items-center gap-3">
        <select
          v-model="filtros.estado"
          class="border-2 border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
        >
          <option value="">Todos los estados</option>
          <option>Completada</option>
          <option>Pendiente</option>
          <option>Anulada</option>
        </select>
        <button
          @click="limpiarFiltros"
          class="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
        >
          <i class="fa-solid fa-rotate-right"></i> Limpiar
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-linear-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th class="py-4 px-6 font-semibold">#</th>
              <th class="py-4 px-6 font-semibold">Cliente</th>
              <th class="py-4 px-6 font-semibold">Fecha</th>
              <th class="py-4 px-6 font-semibold">Total</th>
              <th class="py-4 px-6 font-semibold">Estado</th>
              <th class="py-4 px-6 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="venta in ventasFiltradas"
              :key="venta.id"
              class="border-b border-slate-100 hover:linear-to-r hover:from-indigo-50 hover:to-purple-50 transition-all"
            >
              <td class="py-4 px-6 font-medium text-slate-700">{{ venta.id }}</td>
              <td class="py-4 px-6 text-slate-800">{{ venta.cliente }}</td>
              <td class="py-4 px-6 text-slate-600">{{ venta.fecha }}</td>
              <td class="py-4 px-6 font-bold text-slate-800">
                ${{ venta.total.toLocaleString() }}
              </td>
              <td class="py-4 px-6">
                <span
                  :class="[
                    'px-3 py-1.5 text-xs rounded-full font-semibold',
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
              <td class="py-4 px-6 text-center">
                <button
                  @click="verDetalle(venta)"
                  class="text-blue-600 hover:text-blue-800 mx-1 w-9 h-9 rounded-lg hover:bg-blue-50 transition-all"
                  title="Ver detalle"
                >
                  <i class="fa-solid fa-eye"></i>
                </button>
                <button
                  @click="abrirModalEditar(venta)"
                  class="text-yellow-600 hover:text-yellow-800 mx-1 w-9 h-9 rounded-lg hover:bg-yellow-50 transition-all"
                  title="Editar"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  @click="confirmarEliminar(venta)"
                  class="text-red-600 hover:text-red-800 mx-1 w-9 h-9 rounded-lg hover:bg-red-50 transition-all"
                  title="Eliminar"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Editar -->
    <div
      v-if="modalEditar"
      class="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="cerrarModalEditar"
    >
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 transform transition-all">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div
              class="w-10 h-10 linear-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center"
            >
              <i class="fa-solid fa-pen-to-square text-white"></i>
            </div>
            Editar Venta #{{ ventaEditar?.id }}
          </h2>
          <button
            @click="cerrarModalEditar"
            class="text-gray-400 hover:text-gray-600 w-8 h-8 rounded-lg hover:bg-gray-100 transition-all"
          >
            <i class="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Cliente ID</label>
            <input
              v-model.number="ventaEditar.cliente_id"
              type="number"
              class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 outline-none transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Cliente</label>
            <input
              v-model="ventaEditar.cliente"
              type="text"
              class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 outline-none transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Fecha</label>
            <input
              v-model="ventaEditar.fecha"
              type="date"
              class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 outline-none transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Total</label>
            <input
              v-model.number="ventaEditar.total"
              type="number"
              class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 outline-none transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
            <select
              v-model="ventaEditar.estado"
              class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 outline-none transition-all"
            >
              <option>Completada</option>
              <option>Pendiente</option>
              <option>Anulada</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 justify-end">
          <button
            @click="cerrarModalEditar"
            class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-all font-semibold"
          >
            Cancelar
          </button>
          <button
            @click="actualizarVenta"
            class="px-6 py-3 bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl transition-all font-semibold shadow-lg"
          >
            <i class="fa-solid fa-save mr-2"></i>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Confirmar Eliminar -->
    <div
      v-if="modalEliminar"
      class="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="cerrarModalEliminar"
    >
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <i class="fa-solid fa-trash text-red-600 text-2xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">¿Eliminar venta?</h2>
          <p class="text-gray-600 mb-6">
            ¿Estás seguro de eliminar la venta #{{ ventaEliminar?.id }} de
            <strong>{{ ventaEliminar?.cliente }}</strong
            >? Esta acción no se puede deshacer.
          </p>

          <div class="flex gap-3 w-full">
            <button
              @click="cerrarModalEliminar"
              class="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-all font-semibold"
            >
              Cancelar
            </button>
            <button
              @click="eliminarVenta"
              class="flex-1 px-6 py-3 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all font-semibold shadow-lg"
            >
              <i class="fa-solid fa-trash mr-2"></i>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Debug JSON -->
    <div class="mt-6">
      <details class="bg-slate-900 rounded-xl shadow-lg overflow-hidden">
        <summary
          class="px-4 py-3 cursor-pointer text-green-400 font-mono text-sm hover:bg-slate-800 transition-colors"
        >
          Ver Debug (Última petición)
        </summary>
        <pre class="text-green-400 p-4 text-xs overflow-x-auto">{{ debugInfo }}</pre>
      </details>
    </div>
  </section>
</template>

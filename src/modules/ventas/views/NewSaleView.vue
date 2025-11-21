<script lang="ts" setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const baseUrl = '/api/ventas'

/* --------------------------------------------------------
   TIPOS
-------------------------------------------------------- */
interface Cliente {
  id: number
  nombre: string
}

interface Producto {
  id: number
  nombre: string
  precio: number
  descripcion?: string
  cantidad: number
}

interface ProductoEnVenta {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

/* --------------------------------------------------------
   DATA (simulada por ahora — cambiar por API luego)
-------------------------------------------------------- */
const clientes = ref<Cliente[]>([
  { id: 1, nombre: 'Carlos Pérez' },
  { id: 2, nombre: 'Ana Torres' },
])

const productos = ref<Producto[]>([
  {
    id: 1,
    nombre: 'Pastillas de freno delantera',
    precio: 28000,
    descripcion: 'Pastillas semimetálicas compatibles con motos tipo sport.',
    cantidad: 50,
  },
  {
    id: 2,
    nombre: 'Filtro de aire',
    precio: 18000,
    descripcion: 'Filtro de aire estándar para motores 125-200cc.',
    cantidad: 30,
  },
  {
    id: 3,
    nombre: 'Bujía NGK CR7HSA',
    precio: 16000,
    descripcion: 'Bujía de alto rendimiento para motos 4T.',
    cantidad: 100,
  },
  {
    id: 4,
    nombre: 'Aceite 20W-50 4T',
    precio: 32000,
    descripcion: 'Aceite semisintético para motocicletas 4 tiempos.',
    cantidad: 40,
  },
  {
    id: 5,
    nombre: 'Kit de arrastre',
    precio: 150000,
    descripcion: 'Piñón + catalina + cadena reforzada.',
    cantidad: 15,
  },
  {
    id: 6,
    nombre: 'Manigueta de embrague',
    precio: 12000,
    descripcion: 'Manigueta universal, aluminio resistente.',
    cantidad: 60,
  },
  {
    id: 7,
    nombre: 'Manigueta de freno',
    precio: 12000,
    descripcion: 'Manigueta reforzada compatible con múltiples modelos.',
    cantidad: 55,
  },
  {
    id: 8,
    nombre: 'Llanta 90/90-17',
    precio: 155000,
    descripcion: 'Llanta trasera tipo sport, excelente agarre.',
    cantidad: 10,
  },
  {
    id: 9,
    nombre: 'Llanta 80/90-17',
    precio: 135000,
    descripcion: 'Llanta delantera con labrado resistente.',
    cantidad: 12,
  },
  {
    id: 10,
    nombre: 'Amortiguador trasero',
    precio: 85000,
    descripcion: 'Amortiguador hidráulico ajustable.',
    cantidad: 20,
  },
  {
    id: 11,
    nombre: 'Faro delantero LED',
    precio: 45000,
    descripcion: 'Luz LED blanca de alto alcance y bajo consumo.',
    cantidad: 25,
  },
  {
    id: 12,
    nombre: 'Direccionales universales',
    precio: 22000,
    descripcion: 'Juego de 2 direccionales LED universales.',
    cantidad: 40,
  },
  {
    id: 13,
    nombre: 'Cámara 17 pulgadas',
    precio: 18000,
    descripcion: 'Cámara reforzada para llantas de 17 pulgadas.',
    cantidad: 30,
  },
  {
    id: 14,
    nombre: 'Cerradura de encendido',
    precio: 38000,
    descripcion: 'Switch de encendido con llaves reforzadas.',
    cantidad: 18,
  },
  {
    id: 15,
    nombre: 'Retrovisor universal',
    precio: 25000,
    descripcion: 'Par de retrovisores ajustables, carcasa ABS.',
    cantidad: 35,
  },
])

/* --------------------------------------------------------
   ESTADO DEL FORMULARIO
-------------------------------------------------------- */
const clienteSeleccionado = ref<number | null>(null)
const productoBuscado = ref('')
const productosVenta = ref<ProductoEnVenta[]>([])

/* --------------------------------------------------------
   FILTRO DE PRODUCTOS
-------------------------------------------------------- */
const productosFiltrados = computed(() => {
  if (!productoBuscado.value) return productos.value

  return productos.value.filter((p) =>
    p.nombre.toLowerCase().includes(productoBuscado.value.toLowerCase()),
  )
})

/* --------------------------------------------------------
   AGREGAR PRODUCTO A LA VENTA
-------------------------------------------------------- */
const agregarProducto = (producto: Producto) => {
  const existe = productosVenta.value.find((p) => p.id === producto.id)
  if (existe) {
    existe.cantidad++
  } else {
    productosVenta.value.push({
      ...producto,
      cantidad: 1,
    })
  }
}

/* --------------------------------------------------------
   ELIMINAR PRODUCTO
-------------------------------------------------------- */
const eliminarProducto = (id: number) => {
  productosVenta.value = productosVenta.value.filter((p) => p.id !== id)
}

/* --------------------------------------------------------
   TOTAL
-------------------------------------------------------- */
const totalVenta = computed(() => {
  return productosVenta.value.reduce((acc, p) => acc + p.precio * p.cantidad, 0)
})

/* --------------------------------------------------------
   JSON FINAL PARA EL POST
-------------------------------------------------------- */
const jsonFinal = computed(() => ({
  cliente_id: clienteSeleccionado.value,
  productos: productosVenta.value.map((p) => ({
    id: p.id,
    cantidad: p.cantidad,
  })),
  total: totalVenta.value,
}))

/* --------------------------------------------------------
   ENVIAR VENTA
-------------------------------------------------------- */
const guardarVenta = async () => {
  if (!clienteSeleccionado.value) {
    alert('Por favor selecciona un cliente.')
    return
  }

  if (productosVenta.value.length === 0) {
    alert('Debe agregar al menos 1 producto.')
    return
  }

  try {
    const response = await axios.post(baseUrl, jsonFinal.value)
    console.log('Venta registrada:', response.data)
    alert('Venta guardada con éxito!')
  } catch (error) {
    console.error('Error al guardar la venta:', error)
    alert('Error al guardar la venta.')
  }
}
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- TÍTULO -->
    <h1 class="text-2xl font-bold">Nueva Venta</h1>

    <!-- CLIENTE -->
    <div class="space-y-2">
      <label class="font-semibold">Cliente</label>
      <select v-model="clienteSeleccionado" class="border p-2 rounded w-full">
        <option disabled value="">Seleccione un cliente...</option>
        <option v-for="c in clientes" :key="c.id" :value="c.id">
          {{ c.nombre }}
        </option>
      </select>
    </div>

    <!-- BUSCAR PRODUCTOS -->
    <div class="space-y-2">
      <label class="font-semibold">Buscar producto</label>
      <input
        v-model="productoBuscado"
        type="text"
        placeholder="Ej: bujia, carburador..."
        class="border p-2 rounded w-full"
      />

      <div class="border rounded p-3 space-y-1 max-h-25 overflow-y-auto">
        <div
          v-for="p in productosFiltrados"
          :key="p.id"
          @click="agregarProducto(p)"
          class="p-2 hover:bg-gray-100 rounded cursor-pointer flex justify-between"
        >
          <span>{{ p.nombre }}</span>
          <span class="font-semibold">${{ p.precio }}</span>
        </div>
      </div>
    </div>

    <!-- LISTA DE PRODUCTOS -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Productos agregados</h2>

      <div class="max-h-50 overflow-y-auto">
        <table class="w-full border">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 border">Producto</th>
              <th class="p-2 border">Precio</th>
              <th class="p-2 border">Cantidad</th>
              <th class="p-2 border">Subtotal</th>
              <th class="p-2 border"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="p in productosVenta" :key="p.id">
              <td class="border p-2">{{ p.nombre }}</td>
              <td class="border p-2">${{ p.precio }}</td>
              <td class="border p-2">
                <input
                  type="number"
                  min="1"
                  v-model.number="p.cantidad"
                  class="w-20 border p-1 rounded"
                />
              </td>
              <td class="border p-2">${{ p.precio * p.cantidad }}</td>
              <td class="border p-2 text-center">
                <button
                  @click="eliminarProducto(p.id)"
                  class="text-red-600 font-bold hover:underline"
                >
                  X
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="text-right">
      <div class="text-xl font-bold">Total: ${{ totalVenta }}</div>

      <!-- BOTÓN GUARDAR -->
      <button
        @click="guardarVenta"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar Venta
      </button>
    </div>
    <!-- TOTAL -->

    <!-- JSON Preview (debug bonito) -->
    <pre class="bg-gray-900 text-green-400 p-4 rounded text-sm mt-6"
      >{{ jsonFinal }}
    </pre>
  </div>
</template>

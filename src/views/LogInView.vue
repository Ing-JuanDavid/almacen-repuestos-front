<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600"
  >
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-gray-700">
      <div class="text-center mb-8">
        <i class="fa-solid fa-gear text-4xl text-indigo-600 mb-3"></i>
        <h1 class="text-2xl font-bold">Sistema de Ventas</h1>
        <p class="text-sm text-gray-500">Inicia sesión para continuar</p>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block font-medium mb-1" for="user">Usuario</label>
          <div class="relative">
            <i class="fa-solid fa-user absolute left-3 top-3 text-gray-400"></i>
            <input
              id="user"
              v-model="user"
              type="text"
              placeholder="Ingresa tu usuario"
              class="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
        </div>

        <div class="mb-6">
          <label class="block font-medium mb-1" for="password">Contraseña</label>
          <div class="relative">
            <i class="fa-solid fa-lock absolute left-3 top-3 text-gray-400"></i>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="********"
              class="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 transition"
        >
          <i class="fa-solid fa-right-to-bracket"></i>
          Iniciar sesión
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500">
        © {{ new Date().getFullYear() }} Almacén de Repuestos
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const user = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  // Aquí podrías validar credenciales en el futuro
  if (user.value && password.value) {
    router.push('/dashboard')
  } else {
    alert('Por favor ingresa tus credenciales')
  }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>

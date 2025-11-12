

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import MainLayout from './layouts/MainLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

const router = useRouter()

// Determinar qué layout usar basado en la ruta actual
const currentLayout = computed(() => {
  const routeName = router.currentRoute.value.name
  return routeName === 'login' ? 'auth' : 'main'
})
</script>

<template>
  <component :is="currentLayout === 'main' ? MainLayout : AuthLayout">
    <RouterView></RouterView>
  </component>
</template>

<style scoped>
/* No hay estilos globales necesarios aquí */
</style>

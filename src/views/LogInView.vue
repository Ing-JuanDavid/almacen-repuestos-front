<template>
  <div class="login-page">
    <div class="login-wrapper">
      <div class="login-card">
        <!-- Sección de imagen (lado izquierdo, oculta en móviles) -->
        <div class="image-section">
          <img src="/inventario-1.jpg" alt="Almacén Eléctrico" class="image-content" />
        </div>

        <!-- Sección del formulario (lado derecho) -->
        <div class="form-section">
          <h2 class="title">Iniciar Sesión</h2>

          <form @submit.prevent="handleLogin" class="form">
            <div class="field">
              <label class="label">Usuario</label>
              <input v-model="user" type="text" class="input" placeholder="tu.usuario" required />
            </div>

            <div class="field">
              <label class="label">Contraseña</label>
              <input
                v-model="password"
                type="password"
                class="input"
                placeholder="********"
                required
              />
            </div>

            <div class="field">
              <label class="label">Rol</label>
              <select v-model="role" class="input role-select">
                <option value="admin">Administrador</option>
                <option value="vendedor">Vendedor</option>
                <option value="tecnico">Técnico</option>
              </select>
            </div>

            <button type="submit" class="btn">Ingresar</button>
          </form>

          <p class="help">Prueba con <strong>admin</strong> o <strong>tech</strong>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

defineOptions({ name: 'LoginView' })

const router = useRouter()
const user = ref('')
const password = ref('')
const role = ref('admin')

function handleLogin() {
  if (user.value && password.value) {
    // Simulación simple de autenticación
    if (role.value === 'admin') router.push('/')
    else if (role.value === 'vendedor') router.push('/')
    else if (role.value === 'tecnico') router.push('/')
  }
}
</script>

<style scoped>
/* La página de login ocupa toda la ventana y el formulario está centrado y responsivo */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(180deg, #071024 0%, #0b1220 60%);
}

/* Wrapper del card, centrado y con ancho máximo */
.login-wrapper {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* El card con dos columnas: imagen + formulario */
.login-card {
  width: 100%;
  display: flex;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 0.75rem;
  color: #e6eef8;
  backdrop-filter: blur(6px);
  box-shadow: 0 8px 30px rgba(2, 6, 23, 0.6);
  overflow: hidden;
  min-height: 420px;
}

/* Sección de imagen (lado izquierdo) */
.image-section {
  display: none; /* Oculta por defecto en móviles */
  flex: 0 0 45%;
  min-height: 420px;
  overflow: hidden;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Sección del formulario (lado derecho) */
.form-section {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

/* Contenedor del logo */
.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

/* Título dentro del card */
.title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #e6eef8;
  text-align: center;
}

.form {
  display: grid;
  gap: 0.75rem;
}
.field {
  display: flex;
  flex-direction: column;
}
.label {
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
  color: #c7d2fe;
}
.input {
  padding: 0.6rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  color: #e6eef8;
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.6);
}
.btn {
  margin-top: 0.5rem;
  padding: 0.7rem;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, #4f46e5, #06b6d4);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.btn:hover {
  opacity: 0.95;
}
.help {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: #9ca3af;
  text-align: center;
}

/* Select role color */
.role-select {
  color: #2563eb;
}
.role-select option {
  color: #2563eb;
  background: #ffffff;
}

/* Responsive: mostrar imagen en pantallas medianas y grandes */
@media (min-width: 900px) {
  .image-section {
    display: block;
  }
  .login-card {
    height: 420px;
  }
}

/* Responsive: ajustar en tablets */
@media (max-width: 899px) {
  .login-wrapper {
    max-width: 500px;
  }
  .login-card {
    min-height: auto;
  }
}

/* Responsive: ajustar padding en móviles */
@media (max-width: 480px) {
  .login-wrapper {
    padding: 0 1rem;
    max-width: 100%;
  }
  .form-section {
    padding: 1.5rem;
  }
  .logo {
    width: 48px;
    height: 48px;
  }
  .title {
    font-size: 1.25rem;
  }
}
</style>

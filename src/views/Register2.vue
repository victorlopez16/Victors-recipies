<template>
  <ion-page>
    <ion-content :fullscreen="true" class="login-page">
      <div class="login-container">

        <!-- Flecha atrás -->
        <div class="back-icon">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>

        <!-- LogoCubiertos MÁS PEQUEÑO -->
        <img :src="logoCubiertos" alt="Logo cubiertos" class="logo-img" />

        <!-- Título NEGRO -->
        <h2 class="title">Recuperar Contraseña</h2>

        <!-- Inputs con placeholders en negro -->
        <div class="inputs">
          <ion-input
            class="input"
            type="password"
            placeholder="Contraseña"
            color="dark"
            v-model="email"
          ></ion-input>

          <ion-input
            class="input"
            type="text"
            placeholder="Confirmar Contraseña"
            color="dark"
            v-model="password"
          ></ion-input>
        </div>
        
        <!-- ✅ BOTÓN NEGRO "Registrate" lleva a LoginPage -->
        <ion-button 
          expand="block" 
          class="login-button"
          @click="goToLoginPage"
        >
          Registrate
        </ion-button>

        <!-- BOTÓN "Olvide mi contraseña" que va a /register -->
        <ion-button 
          fill="clear" 
          class="forgot-button"
          size="small"
          @click="goToRegister"
        >
          Olvide mi contraseña
        </ion-button>

        <div class="other-way">
          <img
            :src="opcionesInicioSesion"
            alt="Opciones inicio sesión"
            class="otras-opciones-img"
          />
        </div>

        <div class="social-icons">
          <ion-icon name="logo-google"></ion-icon>
          <ion-icon name="logo-facebook"></ion-icon>
          <ion-icon name="logo-twitter"></ion-icon>
        </div>

        <!-- BOTÓN "Ya tienes cuenta? Ingresa" -->
        <ion-button 
          fill="clear" 
          class="login-toggle-button"
          expand="block"
          @click="goToLogin"
        >
          ¿Ya tienes cuenta? Ingresa
        </ion-button>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonIcon
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import logoCubiertos from '@/assets/LogoCubiertos.png'
import opcionesInicioSesion from '@/assets/OpcionesInicioSesion.png'

// Router para navegación
const router = useRouter()

// Form data
const email = ref('')
const password = ref('')

// ✅ BOTÓN NEGRO lleva a LoginPage
const goToLoginPage = () => {
  router.push('/LoginPage')
}

// Función para "Olvide mi contraseña"
const goToRegister = () => {
  router.push('/Register')
}

// Función para "Ya tienes cuenta? Ingresa"
const goToLogin = () => {
  router.push('/LoginPage')
}
</script>

<!-- Style igual que tenías -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600&display=swap');

/* Todo el CSS igual que el anterior */
.login-page {
  --background: linear-gradient(180deg, #1d22ff 0%, #6f73ff 50%, #ffffff 100%);
}

.login-container {
  padding: 32px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-family: 'Jost', sans-serif;
}


.back-icon {
  align-self: flex-start;
  margin-bottom: 8px;
}

.logo-img {
  width: 90px;
  height: 90px;
  object-fit: contain;
}

.title {
  margin: 8px 0 16px;
  font-size: 20px;
  font-weight: 600;
  color: #000000 !important;
  font-family: 'Jost', sans-serif !important;
}

.inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input {
  --background: #ffffff;
  --border-radius: 10px;
  --padding-start: 16px;
  --padding-end: 16px;
  height: 48px;
  border-radius: 10px;
  --color: #000000;
  --placeholder-color: #000000;
  --placeholder-opacity: 1;
  --placeholder-font-family: 'Jost', sans-serif;
}

.login-button {
  --background: #000000 !important;
  --color: #ffffff !important;
  --border-radius: 10px;
  width: 100%;
  height: 48px;
  font-weight: 600;
  font-family: 'Jost', sans-serif !important;
}

.login-button::part(native) {
  font-family: 'Jost', sans-serif !important;
}

.forgot-button {
  --color: #000000 !important;
  --color-activated: #000000;
  font-size: 13px !important;
  font-family: 'Jost', sans-serif !important;
  margin-top: 4px !important;
  height: 32px !important;
  --border-radius: 0 !important;
}

.forgot-button::part(native) {
  font-family: 'Jost', sans-serif !important;
  font-size: 13px !important;
}

.other-way {
  margin-top: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.otras-opciones-img {
  max-width: 100%;
  height: auto;
}

.social-icons {
  display: flex;
  gap: 24px;
  font-size: 26px;
  margin-bottom: 16px;
}

.login-toggle-button {
  --color: #000000 !important;
  font-size: 14px !important;
  font-family: 'Jost', sans-serif !important;
  --border-radius: 0 !important;
  margin-top: 8px !important;
  height: 44px !important;
}

.login-toggle-button::part(native) {
  font-family: 'Jost', sans-serif !important;
  font-size: 14px !important;
}
</style>

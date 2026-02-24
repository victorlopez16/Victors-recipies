<template>
  <ion-page>
    <ion-content :fullscreen="true" class="please-login-page">
      <!-- Botón atrás arriba izquierda -->
      <div class="back-button-container">
        <ion-icon 
          name="arrow-back-outline" 
          class="back-icon"
          @click="goToMainLogged"
        ></ion-icon>
      </div>

      <!-- Contenido centrado -->
      <div class="content-center">
        <div class="main-text">
          ¡Unete y conoce miles<br>
          <strong>de recetas distintas!</strong>
        </div>
        
        <ion-button 
          class="register-button"
          expand="block"
          @click="goToMainLogged"
        >
          Registrate
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonContent, 
  IonIcon, 
  IonButton 
} from '@ionic/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToMainLogged = () => {
  router.push('/LogInPage')
}
</script>

<style scoped>
.please-login-page {
  --background: #ffffff !important;
  --ion-background-color: #ffffff !important;
}

.back-button-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
}

.back-icon {
  font-size: 28px;
  color: #333;
  cursor: pointer;
  padding: 12px;
}

.content-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 24px;
}

.main-text {
  font-family: 'Jost', sans-serif;
  font-size: 28px;
  font-weight: 400;
  color: #333;
  line-height: 1.3;
  margin-bottom: 40px;
  max-width: 300px;
}

.main-text strong {
  font-weight: 700;
  color: #000;
}

.register-button {
  --background: #000000;
  --color: #ffffff;
  --border-radius: 12px;
  width: 100%;
  max-width: 280px;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Jost', sans-serif;
  text-transform: none;
}

.register-button::part(native) {
  font-family: 'Jost', sans-serif;
}
</style>

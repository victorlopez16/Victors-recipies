<template>
  <ion-page>
    <ion-content :fullscreen="true" class="work-page">
      <div class="work-container">
        
        <div class="woman-illustration">
          <img
            class="woman-img"
            :src="imagePresentacion2"
            alt="Presentacion 2"
          />
        </div>

        <p class="msg">Podras subir tus propias recetas!</p>

        <ion-button
          expand="block"
          fill="solid"
          class="continue-button jost-font"
          @click="handleContinue"
        >
          Continuar
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, useIonRouter } from '@ionic/vue' // Cambiamos esto
import imagePresentacion2 from '@/assets/ImagePresentacion2.png'

// Usamos el router específico de Ionic
const ionRouter = useIonRouter()

const handleContinue = () => {
  // .push de ionRouter fuerza la navegación y la entrada en el stack de Ionic
  ionRouter.push('/MainNoLogged')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600&display=swap');

.work-page {
  --background: linear-gradient(180deg, #1d22ff 0%, #6f73ff 35%, #c7c9ff 65%, #ffffff 100%);
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}

.work-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 60px 24px 50px;
  box-sizing: border-box;
  text-align: center;
}

.woman-illustration {
  width: 320px;
  height: 380px;
}

.woman-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Mensaje con Jost */
.msg {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111;
  font-family: 'Jost', sans-serif;
}

.continue-button.jost-font {
  --background: #000000;
  --color: #FFFFFF;
  --border-radius: 12px;
  width: 100%;
  max-width: 343px;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  text-transform: none;
  font-family: 'Jost', sans-serif;
}

.continue-button.jost-font::part(native) {
  font-family: 'Jost', sans-serif;
}
</style>

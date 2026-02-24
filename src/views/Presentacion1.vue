<template>
  <ion-page>
    <ion-content :fullscreen="true" class="presentation-content">
      <div class="presentation-bg">
        <div class="content-wrapper">
          
          <img 
            class="chef-logo" 
            :src="chefImage" 
            alt="Chef"
          />

          <div class="message">
            Bienvenidos! Espero que las recetas sean de vuestro agrado
          </div>
        </div>

        <ion-button class="btn jost-font" expand="block" @click="goNext">
          Continuar
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { useRouter } from 'vue-router'
import chefImage from '@/assets/imagePresentacion1.png'

const router = useRouter()

function goNext() {
  router.push('/presentacion2')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600&display=swap');

.presentation-content {
  --background: transparent;
}

.presentation-bg {
  min-height: 100vh;
  background: linear-gradient(180deg, #1d22ff 0%, #6f73ff 35%, #c7c9ff 65%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 80px 22px 60px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  flex: 1;
  justify-content: center;
}

.chef-logo {
  width: 240px;
  height: 240px;
  max-width: 80vw;
  max-height: 80vh;
  opacity: 0.85;
  mix-blend-mode: multiply;
  filter: drop-shadow(0 8px 20px rgba(0,0,0,0.3));
}

.message {
  font-size: 24px;
  color: #111;
  text-align: center;
  line-height: 1.4;
  max-width: 320px;
  font-family: 'Jost', sans-serif;
  font-weight: 400;
  text-shadow: 0 2px 4px rgba(255,255,255,0.5);
}

.btn.jost-font {
  --background: #000;
  --color: #fff;
  --border-radius: 12px;
  height: 56px;
  width: 100%;
  max-width: 340px;
  text-transform: none;
  font-weight: 600;
  font-size: 18px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  font-family: 'Jost', sans-serif;
}

.btn.jost-font::part(native) {
  font-family: 'Jost', sans-serif;
}
</style>

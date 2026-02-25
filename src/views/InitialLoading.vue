<template>
  <ion-page>
    <ion-content :fullscreen="true" class="start-content">
      <div class="start-bg">
        
        <div class="circle-blur"></div>

        <div class="brand-container">
          <div class="logo-wrapper">
            <img :src="logoCubiertos" alt="Logo cubiertos" class="logo-img" />
          </div>
          
          <div class="text-group">
            <h1 class="brand-name">Victor's</h1>
            <h2 class="brand-subtitle">Recipes</h2>
          </div>
        </div>

        <div class="footer-section">
          <p class="welcome-text">Descubre el sabor de la cocina casera.</p>
          <ion-button class="access-btn" expand="block" mode="ios" @click="goNext">
            Acceder
          </ion-button>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { useRouter } from 'vue-router'
import logoCubiertos from '@/assets/LogoCubiertos.png'

const router = useRouter()
function goNext() {
  router.push('/Presentacion1') 
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Jost:wght@300;400;600;700&display=swap');

/* Fondo con un gradiente más moderno y fluido */
.start-bg {
  min-height: 100%;
  background: linear-gradient(180deg, #4f52ff 0%, #8b8eff 40%, #ffffff 90%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; 
  padding: 80px 30px 60px;
  position: relative;
  overflow: hidden;
}

/* Decoración: un círculo difuminado para dar textura al fondo */
.circle-blur {
  position: absolute;
  top: -10%;
  right: -10%;
  width: 250px;
  height: 250px;
  background: rgba(255, 255, 255, 0.2);
  filter: blur(80px);
  border-radius: 50%;
}

.brand-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  margin-top: 20px;
}

.logo-wrapper {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.text-group {
  text-align: center;
}

.brand-name {
  font-family: 'Dancing Script', cursive;
  font-size: 48px;
  color: #111;
  margin: 0;
  line-height: 1;
}

.brand-subtitle {
  font-family: 'Jost', sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 6px;
  color: #111;
  font-weight: 400;
  margin-top: 5px;
  opacity: 0.8;
}

/* SECCIÓN INFERIOR */
.footer-section {
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 10;
}

.welcome-text {
  font-family: 'Jost', sans-serif;
  font-size: 0.95rem;
  color: #555;
  text-align: center;
  margin-bottom: 10px;
}

.access-btn {
  --background: #000;
  --color: #fff;
  --border-radius: 18px;
  height: 60px;
  width: 100%;
  font-family: 'Jost', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  --box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  margin: 0;
}

.access-btn::part(native) {
  letter-spacing: 0.5px;
}
</style>
<template>
  <ion-page>
    <ion-content :fullscreen="true" class="presentation-content">
      <div class="presentation-wrapper">
        
        <div class="blob-decorator"></div>

        <div class="main-body">

          <div class="image-container anim-item" :class="{ visible: animado }" style="--delay: 0s">
            <img 
              class="chef-illustration floating" 
              :src="chefImage" 
              alt="Chef"
            />
            <div class="image-shadow"></div>
          </div>

          <div class="text-content">
            <h1 class="welcome-title anim-item" :class="{ visible: animado }" style="--delay: 0.2s">
              ¡Bienvenidos!
            </h1>
            <p class="welcome-message anim-item" :class="{ visible: animado }" style="--delay: 0.35s">
              Estamos encantados de tenerte aquí. Prepárate para descubrir recetas que deleitarán tu paladar.
            </p>
          </div>
        </div>

        <footer class="presentation-footer anim-item" :class="{ visible: animado }" style="--delay: 0.5s">
          <div class="step-indicator">
            <div class="dot active"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>

          <ion-button class="next-btn" expand="block" mode="ios" @click="goNext">
            Comenzar aventura
            <ion-icon slot="end" :icon="arrowForwardOutline"></ion-icon>
          </ion-button>
        </footer>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue'
import { arrowForwardOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import chefImage from '@/assets/imagePresentacion1.png'

const router = useRouter()
const animado = ref(false)

onMounted(() => {
  setTimeout(() => { animado.value = true }, 100)
})

function goNext() {
  router.push('/presentacion2')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;700&display=swap');

.presentation-content {
  --background: #fdfdfd;
  font-family: 'Jost', sans-serif;
}

.presentation-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 24px;
  position: relative;
  overflow: hidden;
}

.blob-decorator {
  position: absolute;
  top: -100px;
  right: -50px;
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(29, 34, 255, 0.1) 0%, rgba(111, 115, 255, 0.05) 100%);
  border-radius: 50%;
  filter: blur(40px);
  z-index: 0;
}

/* ANIMACIÓN DE ENTRADA */
.anim-item {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: var(--delay, 0s);
}

.anim-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.main-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

/* IMAGEN CON FLOTACIÓN */
.image-container {
  position: relative;
  margin-bottom: 40px;
}

.chef-illustration {
  width: 280px;
  height: auto;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1));
}

.floating {
  animation: flotar 3.5s ease-in-out infinite;
}

@keyframes flotar {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}

.image-shadow {
  position: absolute;
  bottom: 10px;
  left: 10%;
  width: 80%;
  height: 20px;
  background: rgba(0,0,0,0.05);
  filter: blur(10px);
  border-radius: 50%;
  animation: sombra 3.5s ease-in-out infinite;
}

@keyframes sombra {
  0%, 100% { transform: scaleX(1);   opacity: 0.5; }
  50%       { transform: scaleX(0.8); opacity: 0.25; }
}

/* TEXTO */
.text-content {
  text-align: center;
  max-width: 300px;
}

.welcome-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #000;
  margin-bottom: 12px;
  letter-spacing: -1px;
}

.welcome-message {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.5;
  font-weight: 400;
}

/* FOOTER */
.presentation-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  z-index: 1;
}

/* DOTS ANIMADOS */
.step-indicator {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  background: #e0e0e0;
  border-radius: 50%;
  transition: width 0.4s ease, border-radius 0.4s ease, background 0.4s ease;
}

.dot.active {
  width: 28px;
  border-radius: 4px;
  background: #000;
  animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.6; }
}

/* BOTÓN CON PULSO */
.next-btn {
  --background: #000;
  --background-activated: #333;
  --color: #fff;
  --border-radius: 20px;
  height: 60px;
  width: 100%;
  max-width: 320px;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
  animation: pulso 2.5s ease-in-out infinite;
  animation-delay: 1.2s;
}

@keyframes pulso {
  0%, 100% {
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25);
    transform: scale(1.02);
  }
}
</style>
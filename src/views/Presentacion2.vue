<template>
  <ion-page>
    <ion-content :fullscreen="true" class="presentation-content">
      <div class="presentation-wrapper">
        
        <div class="blob-decorator-alt"></div>

        <div class="main-body">

          <div class="illustration-box anim-item" :class="{ visible: animado }" style="--delay: 0s">
            <img
              class="main-img floating"
              :src="imagePresentacion2"
              alt="Comparte tus recetas"
            />
            <div class="image-shadow"></div>
            <div class="glow-effect"></div>
          </div>

          <div class="text-content">
            <h1 class="feature-title anim-item" :class="{ visible: animado }" style="--delay: 0.2s">
              Tu toque personal
            </h1>
            <p class="feature-desc anim-item" :class="{ visible: animado }" style="--delay: 0.35s">
              ¿Tienes una receta familiar secreta? <strong>¡Es hora de brillar!</strong> Sube tus propias creaciones y compártelas con el mundo.
            </p>
          </div>
        </div>

        <footer class="presentation-footer anim-item" :class="{ visible: animado }" style="--delay: 0.5s">
          <div class="step-indicator">
            <div class="dot"></div>
            <div class="dot active"></div>
            <div class="dot"></div>
          </div>

          <ion-button
            expand="block"
            class="main-btn"
            @click="handleContinue"
          >
            Continuar
          </ion-button>
        </footer>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, useIonRouter } from '@ionic/vue'
import imagePresentacion2 from '@/assets/ImagePresentacion2.png'
import { ref, onMounted } from 'vue'

const ionRouter = useIonRouter()
const animado = ref(false)

onMounted(() => {
  setTimeout(() => { animado.value = true }, 100)
})

const handleContinue = () => {
  ionRouter.navigate('/MainNoLogged', 'forward', 'replace')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;700;800&display=swap');

.presentation-content {
  --background: #fdfdfd;
  font-family: 'Jost', sans-serif;
}

.presentation-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 80px 24px 60px;
  position: relative;
  overflow: hidden;
}

.blob-decorator-alt {
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(111, 115, 255, 0.08) 0%, transparent 70%);
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
.illustration-box {
  position: relative;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}

.main-img {
  width: 100%;
  max-width: 280px;
  height: auto;
  z-index: 2;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.08));
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
  bottom: 0px;
  left: 10%;
  width: 80%;
  height: 20px;
  background: rgba(0,0,0,0.05);
  filter: blur(10px);
  border-radius: 50%;
  animation: sombra 3.5s ease-in-out infinite;
}

@keyframes sombra {
  0%, 100% { transform: scaleX(1);    opacity: 0.5; }
  50%       { transform: scaleX(0.8); opacity: 0.25; }
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(29, 34, 255, 0.03) 0%, transparent 60%);
  z-index: 1;
}

/* TEXTO */
.text-content {
  text-align: center;
  max-width: 320px;
}

.feature-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 12px;
  letter-spacing: -1px;
}

.feature-desc {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
}

.feature-desc strong {
  color: #000;
  font-weight: 600;
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
  background: #e5e5e5;
  border-radius: 50%;
  transition: width 0.4s ease, border-radius 0.4s ease, background 0.4s ease;
}

.dot.active {
  width: 28px;
  background: #000;
  border-radius: 4px;
  animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.6; }
}

/* BOTÓN */
.main-btn {
  --background: #000;
  --color: #fff;
  --border-radius: 20px;
  height: 60px;
  width: 100%;
  max-width: 340px;
  font-weight: 700;
  font-size: 1.1rem;
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
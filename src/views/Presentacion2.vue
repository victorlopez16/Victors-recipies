<template>
  <ion-page>
    <ion-content :fullscreen="true" class="presentation-content">
      <div class="presentation-wrapper">
        
        <div class="blob-decorator-alt"></div>

        <div class="main-body">
          <div class="illustration-box">
            <img
              class="main-img"
              :src="imagePresentacion2"
              alt="Comparte tus recetas"
            />
            <div class="glow-effect"></div>
          </div>

          <div class="text-content">
            <h1 class="feature-title">Tu toque personal</h1>
            <p class="feature-desc">
              ¿Tienes una receta familiar secreta? <strong>¡Es hora de brillar!</strong> Sube tus propias creaciones y compártelas con el mundo.
            </p>
          </div>
        </div>

        <footer class="presentation-footer">
          <div class="step-indicator">
            <div class="dot"></div>
            <div class="dot active"></div>
            <div class="dot"></div>
          </div>

          <div class="button-group">
            <ion-button
              expand="block"
              class="main-btn"
              @click="handleContinue"
            >
              Continuar
            </ion-button>
            <button class="skip-link" @click="handleContinue">Omitir</button>
          </div>
        </footer>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, useIonRouter } from '@ionic/vue'
import imagePresentacion2 from '@/assets/ImagePresentacion2.png'

const ionRouter = useIonRouter()

const handleContinue = () => {
  ionRouter.navigate('/MainNoLogged', 'forward', 'replace');
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
  padding: 40px 24px;
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

.main-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.illustration-box {
  position: relative;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}

.main-img {
  width: 100%;
  max-width: 300px;
  height: auto;
  z-index: 2;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.08));
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

/* FOOTER UNIFICADO */
.presentation-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  z-index: 1;
}

.step-indicator {
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #e5e5e5;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.dot.active {
  width: 24px;
  background: #000;
  border-radius: 10px;
}

.button-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.main-btn {
  --background: #000;
  --color: #fff;
  --border-radius: 20px;
  height: 60px;
  width: 100%;
  max-width: 340px;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.skip-link {
  background: none;
  border: none;
  color: #999;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 5px;
}
</style>
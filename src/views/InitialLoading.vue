<template>
  <ion-page>
    <ion-content :fullscreen="true" class="start-content">
      <div class="start-bg">
        
        <div class="circle-blur top-right"></div>
        <div class="circle-blur bottom-left"></div>

        <div class="brand-container" :class="{ visible: animado }">
          <div class="logo-wrapper anim-item" style="--delay: 0s">
            <img :src="logoCubiertos" alt="Logo cubiertos" class="logo-img" />
          </div>
          
          <div class="text-group anim-item" style="--delay: 0.2s">
            <h1 class="brand-name">Victor's</h1>
            <h2 class="brand-subtitle">Recipes</h2>
          </div>
        </div>

        <div class="footer-section" :class="{ visible: animado }">
          <p class="welcome-text anim-item" style="--delay: 0.4s">
            <span
              v-for="(letra, i) in letrasTexto"
              :key="i"
              class="letra"
              :style="{ animationDelay: `${0.6 + i * 0.04}s` }"
            >{{ letra }}</span>
          </p>
          <div class="anim-item btn-wrapper" style="--delay: 0.5s">
            <ion-button class="access-btn" expand="block" mode="ios" @click="goNext">
              Acceder
            </ion-button>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import logoCubiertos from '@/assets/LogoCubiertos.png'

const router = useRouter()
const animado = ref(false)

const texto = 'Descubre el sabor de la cocina casera.'
const letrasTexto = texto.split('')

onMounted(() => {
  setTimeout(() => { animado.value = true }, 100)
})

function goNext() {
  router.push('/Presentacion1')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Jost:wght@300;400;600;700&display=swap');

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

/* CÍRCULOS DECORATIVOS */
.circle-blur {
  position: absolute;
  width: 250px;
  height: 250px;
  background: rgba(255, 255, 255, 0.2);
  filter: blur(80px);
  border-radius: 50%;
  pointer-events: none;
}

.circle-blur.top-right {
  top: -10%;
  right: -10%;
}

.circle-blur.bottom-left {
  bottom: -8%;
  left: -12%;
  width: 200px;
  height: 200px;
  background: rgba(79, 82, 255, 0.25);
}

/* ANIMACIÓN DE ENTRADA */
.brand-container,
.footer-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.anim-item {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: var(--delay, 0s);
}

.visible .anim-item {
  opacity: 1;
  transform: translateY(0);
}

/* BRAND */
.brand-container {
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

.text-group { text-align: center; }

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

/* FOOTER */
.footer-section {
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 10;
}

/* TEXTO LETRA A LETRA */
.welcome-text {
  font-family: 'Jost', sans-serif;
  font-size: 0.95rem;
  color: #555;
  text-align: center;
  margin-bottom: 10px;
  opacity: 1 !important;
  transform: none !important;
}

.letra {
  display: inline-block;
  opacity: 0;
  transform: translateY(8px);
  animation: letraEntrada 0.4s ease forwards;
}

@keyframes letraEntrada {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* BOTÓN */
.btn-wrapper { width: 100%; }

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
  animation: pulso 2.5s ease-in-out infinite;
  animation-delay: 1.8s;
}

.access-btn::part(native) {
  letter-spacing: 0.5px;
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
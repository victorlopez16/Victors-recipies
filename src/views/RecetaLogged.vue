<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="recipe-header-title">Pizza Pepperoni</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="shareSocialOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- HERO -->
      <div class="main-image-container" @click="openZoom">
        <img
          :src="heroSrc"
          alt="Pizza"
          class="hero-img"
        />
        <div class="floating-stats">
          <div class="stat-badge">
            <ion-icon :icon="heart"></ion-icon>
            <span>2,154</span>
          </div>
          <div class="stat-badge">
            <ion-icon :icon="timeOutline"></ion-icon>
            <span>25 min</span>
          </div>
        </div>
      </div>

   
      <div class="recipe-container">
        <section class="section">
          <h2 class="section-title">Ingredientes</h2>
          <div class="ingredients-card">
            <div class="ingredient-item" v-for="(ing, i) in ingredientes" :key="i">
              <div class="check-box">
                <ion-icon :icon="checkmarkOutline"></ion-icon>
              </div>
              <span class="ingredient-text">{{ ing }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">Preparación</h2>
          <div class="prep-card">
            <p class="prep-step">
              Hacemos la masa y la estiramos sobre una bandeja. Untamos una capa de salsa de tomate por toda la superficie.
              Cubrimos con bastante queso mozzarella rallado y después colocamos las rodajas de pepperoni bien distribuidas.
              Añadimos un poco de orégano y un chorrito de aceite de oliva.
            </p>
          </div>
        </section>

        <section class="section last">
          <h2 class="section-title">Inspiración</h2>
          <div class="gallery-grid">
            <img
              src="https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=500"
              class="gallery-img"
            />
            <img
              src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500"
              class="gallery-img"
            />
          </div>
        </section>
      </div>

     
      <transition name="fade">
        <div
          v-if="zoomOpen"
          class="zoom-overlay"
          @click="closeZoom"
        >
          <div class="zoom-image-wrap" @click.stop>
            <img :src="heroSrc" class="zoom-image" alt="Zoom" />
            <div class="zoom-hint">Toca fuera para cerrar</div>
          </div>
        </div>
      </transition>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button @click="navegar('/PleaseLogin')">
          <div class="avatar-footer">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" />
          </div>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/PleaseLogin')">
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/MainLogged')" class="tab-selected">
          <div class="home-box"><ion-icon :icon="homeOutline"></ion-icon></div>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/PleaseLogin')">
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/PleaseLogin')">
          <ion-icon :icon="alertCircleOutline"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton, useIonRouter
} from '@ionic/vue';
import {
  chevronBackOutline, heart, paperPlaneOutline, shareSocialOutline,
  homeOutline, addCircleOutline, alertCircleOutline,
  checkmarkOutline, timeOutline
} from 'ionicons/icons';
import { ref, watch } from 'vue';

const ionRouter = useIonRouter();

const heroSrc =
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1400';

const ingredientes = ["Masa casera", "Tomate", "Queso mozzarella", "Pepperoni", "Orégano"];

const navegarAtras = () =>
  ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainLogged', 'back', 'replace');

const navegar = (ruta: string) => ionRouter.navigate(ruta, 'forward', 'push');


const zoomOpen = ref(false);

const openZoom = () => {
  zoomOpen.value = true;
};

const closeZoom = () => {
  zoomOpen.value = false;
};


watch(zoomOpen, (isOpen) => {
  const body = document.body;
  if (isOpen) body.classList.add('no-scroll');
  else body.classList.remove('no-scroll');
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap');

ion-content { --background: #ffffff; font-family: 'Jost', sans-serif; }
.white-toolbar { --background: #ffffff; --border-width: 0; }
.recipe-header-title { font-weight: 700; color: #000; font-size: 1.1rem; }
.black-icon { color: #000; font-size: 24px; }


.main-image-container {
  position: relative;
  height: 350px;
  width: 100%;
  overflow: hidden;
  cursor: zoom-in;
}
.hero-img { width: 100%; height: 100%; object-fit: cover; }

.floating-stats {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  z-index: 2;
}
.stat-badge {
  background: rgba(255, 255, 255, 0.9);
  padding: 6px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #000;
  font-weight: 600;
  font-size: 0.85rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.stat-badge ion-icon { color: #ff4757; }


.recipe-container { padding: 24px 20px; }
.section { margin-bottom: 30px; }
.section-title { font-size: 1.5rem; font-weight: 700; color: #000; margin-bottom: 18px; }


.ingredients-card { background: #f9f9fb; border-radius: 20px; padding: 10px 20px; }
.ingredient-item {
  display: flex; align-items: center; gap: 15px;
  padding: 12px 0; border-bottom: 1px solid #eee;
}
.ingredient-item:last-child { border-bottom: none; }
.check-box {
  width: 22px; height: 22px; border: 2px solid #000; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
}
.check-box ion-icon { font-size: 16px; color: #000; }
.ingredient-text { font-size: 1.05rem; color: #333; font-weight: 500; }


.prep-card { line-height: 1.7; color: #444; font-size: 1rem; }
.prep-step { margin: 0; }


.gallery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.gallery-img { width: 100%; height: 140px; border-radius: 16px; object-fit: cover; }
.last { padding-bottom: 80px; }

.custom-tab-bar { --background: #ffffff; height: 80px; border-top: 1px solid #f0f0f0; }
.avatar-footer { width: 32px; height: 32px; border-radius: 50%; overflow: hidden; border: 1.5px solid #000; }
.avatar-footer img { width: 100%; height: 100%; object-fit: cover; }
.home-box { background: #000; padding: 8px 16px; border-radius: 14px; color: #fff; display: flex; }
.tab-selected ion-icon { color: #fff !important; }

.zoom-overlay{
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.75);
  display: grid;
  place-items: center;
  padding: 18px;
  cursor: zoom-out;
}

.zoom-image-wrap{
  width: min(980px, 94vw);
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: default;
}

.zoom-image{
  width: 100%;
  max-height: 86vh;
  object-fit: contain;
  border-radius: 16px;
  background: rgba(255,255,255,0.06);
  box-shadow: 0 20px 50px rgba(0,0,0,0.45);
  transform: scale(0.96);
  animation: zoomIn 160ms ease-out forwards;
}

.zoom-hint{
  text-align: center;
  color: rgba(255,255,255,0.85);
  font-size: 0.85rem;
  font-weight: 600;
}

.fade-enter-active, .fade-leave-active { transition: opacity .16s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@keyframes zoomIn{
  to { transform: scale(1); }
}
</style>

<style>
.no-scroll{
  overflow: hidden !important;
}
</style>
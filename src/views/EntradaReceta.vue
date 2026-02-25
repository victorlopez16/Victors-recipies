<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="recipe-title">Detalle</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="shareOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="recipe-content">
      <div class="hero-container">
        <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800" class="main-recipe-img" />
        <div class="image-overlay"></div>
        <div class="recipe-header-info">
          <h1 class="main-name">Pizza Pepperoni Especial</h1>
          <div class="meta-row">
            <div class="stat">
              <ion-icon :icon="heart" class="red-heart"></ion-icon>
              <span>2,154</span>
            </div>
            <div class="stat">
              <ion-icon :icon="timeOutline"></ion-icon>
              <span>25 min</span>
            </div>
            <div class="stat">
              <ion-icon :icon="flameOutline"></ion-icon>
              <span>Media</span>
            </div>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="section-container">
          <h2 class="section-label">Ingredientes</h2>
          <div class="ingredients-list">
            <div class="ingredient-card" v-for="(ing, i) in ['Masa casera', 'Tomate natural', 'Queso Mozzarella', 'Pepperoni premium', 'Orégano seco']" :key="i">
              <div class="check-box">
                <ion-icon :icon="checkmarkOutline"></ion-icon>
              </div>
              <span class="ingredient-text">{{ ing }}</span>
            </div>
          </div>
        </div>

        <div class="section-container">
          <h2 class="section-label">Preparación</h2>
          <div class="steps-list">
            <div class="step-card">
              <div class="step-header">
                <span class="step-num">01</span>
                <div class="step-line"></div>
              </div>
              <p>Hacemos la masa y la estiramos sobre una bandeja. Untamos una capa de salsa de tomate por toda la superficie.</p>
            </div>
            <div class="step-card">
              <div class="step-header">
                <span class="step-num">02</span>
                <div class="step-line"></div>
              </div>
              <p>Cubrimos con bastante queso mozzarella rallado y después colocamos las rodajas de pepperoni bien distribuidas.</p>
            </div>
            <div class="step-card">
              <div class="step-header">
                <span class="step-num">03</span>
              </div>
              <p>Añadimos un poco de orégano y un chorrito de aceite de oliva. Horneamos a 200°C hasta que esté dorada.</p>
            </div>
          </div>
        </div>

        <div class="section-container last-section">
          <h2 class="section-label">Resultado Final</h2>
          <div class="gallery-grid">
            <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=500" class="gallery-img" />
            <img src="https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?q=80&w=500" class="gallery-img" />
          </div>
        </div>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button @click="navegar('/PleaseLogin')">
          <ion-icon :icon="personOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/PleaseLogin')">
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/')">
          <div class="home-indicator">
            <ion-icon :icon="homeOutline"></ion-icon>
          </div>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/PleaseLogin')">
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/PleaseLogin')">
          <ion-icon :icon="alertCircleOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/PleaseLogin')">
          <ion-icon :icon="searchOutline"></ion-icon>
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
  chevronBackOutline, heart, personOutline, paperPlaneOutline, 
  homeOutline, addCircleOutline, alertCircleOutline, searchOutline,
  shareOutline, timeOutline, flameOutline, checkmarkOutline
} from 'ionicons/icons';

const ionRouter = useIonRouter();
const navegarAtras = () => ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainNoLogged', 'back', 'push');
const navegar = (ruta: string) => ionRouter.navigate(ruta, 'forward', 'push');
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

.recipe-content { --background: #ffffff; font-family: 'Jost', sans-serif; }
.white-toolbar { --background: #ffffff; }
.recipe-title { font-weight: 700; font-size: 1rem; color: #bbb; text-transform: uppercase; letter-spacing: 2px; text-align: center; }
.black-icon { color: #000 !important; }

/* HERO */
.hero-container { position: relative; width: 100%; height: 380px; }
.main-recipe-img { width: 100%; height: 100%; object-fit: cover; }
.image-overlay { 
  position: absolute; bottom: 0; left: 0; width: 100%; height: 70%;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
}
.recipe-header-info { position: absolute; bottom: 30px; left: 20px; right: 20px; color: white; }
.main-name { font-size: 2.2rem; font-weight: 700; margin: 0; line-height: 1.1; }
.meta-row { display: flex; gap: 20px; margin-top: 15px; }
.stat { display: flex; align-items: center; gap: 6px; font-size: 0.9rem; }
.red-heart { color: #ff2d55; }

/* CONTENIDO */
.content-wrapper { padding: 30px 20px; max-width: 600px; margin: 0 auto; }
.section-label { font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #000; margin-bottom: 20px; border-left: 3px solid #000; padding-left: 10px; }
.section-container { margin-bottom: 45px; }

/* INGREDIENTES (LISTA CORREGIDA) */
.ingredients-list { display: flex; flex-direction: column; gap: 10px; }
.ingredient-card { 
  display: flex; align-items: center; gap: 12px; padding: 14px; 
  background: #f9f9f9; border-radius: 14px; 
}
.check-box { 
  width: 22px; height: 22px; background: #000; border-radius: 6px; 
  display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px;
}
.ingredient-text { font-size: 1rem; font-weight: 500; color: #333; }

/* PREPARACIÓN */
.steps-list { display: flex; flex-direction: column; }
.step-card { display: flex; gap: 20px; padding-bottom: 30px; }
.step-header { display: flex; flex-direction: column; align-items: center; }
.step-num { font-size: 1.1rem; font-weight: 800; color: #000; }
.step-line { width: 2px; flex: 1; background: #eee; margin-top: 10px; }
.step-card p { margin: 0; font-size: 1.05rem; line-height: 1.6; color: #444; padding-top: 2px; }

/* GALERÍA */
.gallery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.gallery-img { width: 100%; height: 160px; border-radius: 16px; object-fit: cover; }
.last-section { padding-bottom: 80px; }

/* FOOTER */
.custom-tab-bar { --background: #ffffff; height: 85px; border-top: 1px solid #f5f5f5; }
.home-indicator { background: #000; width: 45px; height: 45px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
.home-indicator ion-icon { color: #fff !important; }
.custom-tab-bar ion-icon { font-size: 24px; color: #000; }
</style>
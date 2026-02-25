<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="transparent-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras" class="glass-back">
            <ion-icon slot="icon-only" :icon="chevronBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button class="glass-back">
            <ion-icon slot="icon-only" :icon="shareOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="recipe-content">
      <div class="hero-container">
        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800" class="hero-img" />
        <div class="hero-overlay">
          <h1 class="main-recipe-name">Macarrones con Tomate</h1>
          <div class="recipe-meta">
            <div class="meta-item"><ion-icon :icon="timeOutline"></ion-icon> 20 min</div>
            <div class="meta-item"><ion-icon :icon="heartOutline"></ion-icon> 2,154</div>
          </div>
        </div>
      </div>

      <div class="recipe-body">
        <section class="recipe-section">
          <div class="section-title-row">
            <h2 class="modern-title">Ingredientes</h2>
            <span class="portion-tag">1 Persona</span>
          </div>
          
          <div class="ingredients-list-container">
            <div class="ingredient-row" v-for="(item, index) in listaIngredientes" :key="index">
              <div class="bullet-point">{{ index + 1 }}</div>
              <span class="ingredient-name">{{ item }}</span>
            </div>
          </div>
        </section>

        <section class="recipe-section">
          <h2 class="modern-title">Preparación</h2>
          <p class="preparation-text">
            Para hacer macarrones, primero pon una olla con agua al fuego y añade una pizca de sal; 
            cuando el agua hierva, agrega los macarrones y cuécelos durante 8–10 minutos hasta que estén al dente; 
            después escúrrelos bien y ponlos de nuevo en la olla...
          </p>
        </section>

        <section class="recipe-section last-section">
          <h2 class="modern-title">Galería</h2>
          <div class="photo-gallery">
            <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=500" />
            <img src="https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?q=80&w=500" />
          </div>
        </section>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button @click="navegar('/LoginPage')"><ion-icon :icon="personOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/LoginPage')"><ion-icon :icon="paperPlaneOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/MainNoLogged')" class="active-tab">
            <ion-icon :icon="homeOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/LoginPage')"><ion-icon :icon="addCircleOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/LoginPage')"><ion-icon :icon="alertCircleOutline"></ion-icon></ion-tab-button>
      </ion-tab-bar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonHeader, IonToolbar, IonContent, IonButtons, 
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton,
  useIonRouter
} from '@ionic/vue';
import { 
  chevronBackOutline, heartOutline, personOutline, paperPlaneOutline, 
  homeOutline, addCircleOutline, alertCircleOutline, shareOutline,
  timeOutline
} from 'ionicons/icons';

const router = useIonRouter();

// NAVEGACIÓN
const navegarAtras = () => router.back();
const navegar = (ruta: string) => router.navigate(ruta, 'forward', 'replace');

// --- AQUÍ ESTÁ LA LISTA QUE HACÍA FALTA ---
const listaIngredientes = [
  "400gr Pasta",
  "Tomate frito",
  "Queso rallado",
  "Orégano",
  "Sirope (opcional)"
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;700&display=swap');

.recipe-content { --background: #ffffff; font-family: 'Jost', sans-serif; }

/* NAVBAR TRANSPARENTE */
.transparent-toolbar {
  --background: transparent;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
}

.glass-back {
  --background: rgba(255, 255, 255, 0.3);
  --color: #000;
  --border-radius: 12px;
  backdrop-filter: blur(8px);
  margin: 10px;
}

/* HERO IMAGE */
.hero-container {
  height: 350px;
  position: relative;
}

.hero-img { width: 100%; height: 100%; object-fit: cover; }

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 20px 25px;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
}

.main-recipe-name { font-size: 1.8rem; font-weight: 700; margin: 0 0 8px; }

.recipe-meta { display: flex; gap: 15px; font-size: 0.9rem; opacity: 0.9; }
.meta-item { display: flex; align-items: center; gap: 5px; }

/* CUERPO DE LA RECETA */
.recipe-body {
  background: #fff;
  border-radius: 30px 30px 0 0;
  margin-top: -30px;
  position: relative;
  padding: 30px 20px;
}

.recipe-section { margin-bottom: 30px; }

.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modern-title { font-size: 1.4rem; font-weight: 700; color: #000; margin: 0; }

.portion-tag {
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 10px;
  font-size: 0.8rem;
  color: #666;
}

/* ESTILO DE INGREDIENTES */
.ingredients-list-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ingredient-row {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 0;
  border-bottom: 1px solid #f9f9f9;
}

.bullet-point {
  width: 24px;
  height: 24px;
  background: #000;
  color: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

.ingredient-name {
  font-size: 1.1rem;
  color: #333;
}

.preparation-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}

.photo-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.photo-gallery img {
  width: 100%;
  height: 120px;
  border-radius: 15px;
  object-fit: cover;
}

.last-section { padding-bottom: 80px; }

/* FOOTER */
.custom-tab-bar { --background: #fff; height: 70px; border-top: 1px solid #f2f2f2; }
.active-tab { color: #000; --color-selected: #000; }
</style>
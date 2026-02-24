<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar style="--background: #ffffff;">
        <ion-buttons slot="start">
          <ion-button @click="$router.back()">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" color="dark"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="recipe-title">Nombre receta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="force-white">
      <div class="main-image-container">
        <img src="file:///C:/Users/viict/Desktop/gofres-platano-arandanos.webp" alt="Tostadas" />
        <div class="likes-badge">
          <ion-icon :icon="heartOutline"></ion-icon>
          <span>2154</span>
        </div>
      </div>

      <div class="section-container">
        <h2 class="section-header">Ingredientes</h2>
        <ul class="ingredients-list">
          <li>1. Gofres</li>
          <li>2. Platanos (maduros)</li>
          <li>3. Arandanos (frescos)</li>
          <li>4. Azúcar glass</li>
          <li>5. Sirope</li>
        </ul>
      </div>

      <div class="section-container">
        <p class="preparation-text">
          1. Preparamos la masa de gofres y la vertemos en la gofrera caliente hasta que queden dorados y crujientes. 
          Cuando estén listos, colocamos los gofres en un plato y añadimos por encima los arándanos frescos y unas rodajas de plátano. 
          Espolvoreamos un poco de azúcar glas para darles un toque dulce y decorativo. Finalmente, bañamos todo con un buen chorro de sirope de arce, 
          dejando que se infiltre entre los huecos del gofre. Servimos inmediatamente para disfrutarlos calientes y esponjosos.
        </p>
      </div>

      <div class="section-container last-section">
        <h2 class="section-header">Otras fotos</h2>
        <div class="extra-photos">
          <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=500" class="extra-img" />
          <img src="https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?q=80&w=500" class="extra-img" />
        </div>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button @click="$router.push('/LoginPage')"><ion-icon :icon="personOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="$router.push('/LoginPage')"><ion-icon :icon="paperPlaneOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="$router.push('/')"><ion-icon :icon="homeOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="$router.push('/LoginPage')"><ion-icon :icon="addCircleOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="$router.push('/LoginPage')"><ion-icon :icon="alertCircleOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="$router.push('/LoginPage')"><ion-icon :icon="searchOutline"></ion-icon></ion-tab-button>
      </ion-tab-bar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonButton, IonIcon, IonFooter, IonTabBar, IonTabButton 
} from '@ionic/vue';
import { 
  chevronBackOutline, heartOutline, personOutline, paperPlaneOutline, 
  homeOutline, addCircleOutline, alertCircleOutline, searchOutline 
} from 'ionicons/icons';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&display=swap');

/* RESET TOTAL A BLANCO */
.force-white {
  --background: #ffffff !important;
  background-color: #ffffff !important;
  font-family: 'Jost', sans-serif;
}

.recipe-title {
  font-weight: 700;
  font-size: 1.4rem;
  color: #000;
}

.main-image-container {
  position: relative;
  width: 100%;
  height: 300px;
  background: #ffffff;
}

.main-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.likes-badge {
  position: absolute;
  bottom: 15px;
  left: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  padding: 5px 10px;
  border-radius: 10px;
}

.section-container {
  padding: 25px 20px;
  background: #ffffff !important; /* Forzamos blanco en cada bloque */
}

.section-header {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  color: #000;
}

.ingredients-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 280px;
  font-size: 1.2rem;
  line-height: 2;
  color: #000;
}

.preparation-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #000;
  text-align: left;
}

.extra-photos {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #ffffff;
}

.extra-img {
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
}

.last-section {
  padding-bottom: 100px;
}

.custom-tab-bar {
  --background: #ffffff;
  height: 65px;
  border-top: 1px solid #f0f0f0;
}

.custom-tab-bar ion-icon {
  font-size: 28px;
  color: #000;
}
</style>
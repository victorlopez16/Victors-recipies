<template>
  <ion-page>
    <ion-header class="ion-no-border custom-header">
      <ion-toolbar mode="md" class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="recipe-title">Nombre receta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="main-image-container">
        <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800" alt="Pizza Pepperoni" />
        <div class="likes-badge">
          <ion-icon :icon="heartOutline"></ion-icon>
          <span>2154</span>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="section-container">
          <h2 class="section-header">Ingredientes</h2>
          <ul class="ingredients-list">
            <li>1. Masa casera</li>
            <li>2. Tomate</li>
            <li>3. Queso mozzarela</li>
            <li>4. Peperoni</li>
            <li>5. Oregano</li>
          </ul>
        </div>

        <div class="section-container">
          <p class="preparation-text">
            1. Hacemos la masa y la estiramos sobre una bandeja. Untamos una capa de salsa de tomate por toda la superficie. 
            Cubrimos con bastante queso mozzarella rallado y después colocamos las rodajas de pepperoni bien distribuidas. 
            Añadimos un poco de orégano y un chorrito de aceite de oliva.
          </p>
        </div>

        <div class="section-container last-section">
          <h2 class="section-header">Otras fotos</h2>
          <div class="extra-photos">
            <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=500" class="extra-img" />
            <img src="https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?q=80&w=500" class="extra-img" />
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
          <div class="home-wrapper">
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
  chevronBackOutline, heartOutline, personOutline, paperPlaneOutline, 
  homeOutline, addCircleOutline, alertCircleOutline, searchOutline 
} from 'ionicons/icons';

const ionRouter = useIonRouter();

// Función de retroceso robusta
const navegarAtras = () => {
  // canGoBack() comprueba si hay historial. Si no lo hay, lo mandamos al Main manualmente.
  if (ionRouter.canGoBack()) {
    ionRouter.back();
  } else {
    // El segundo parámetro 'back' fuerza la animación de retroceso aunque sea un push
    ionRouter.navigate('/MainNoLogged', 'back', 'push');
  }
};

const navegar = (ruta: string) => {
  ionRouter.navigate(ruta, 'forward', 'push');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&display=swap');

ion-content { 
  --background: #ffffff; 
  font-family: 'Jost', sans-serif; 
}

/* HEADER */
.custom-header { background: #ffffff; }
.white-toolbar { --background: #ffffff; --color: #000; }
.recipe-title { font-weight: 700; font-size: 1.4rem; color: #000; text-align: center; }
.black-icon { color: #000 !important; }

/* IMAGEN PRINCIPAL */
.main-image-container { position: relative; width: 100%; height: 320px; }
.main-image-container img { width: 100%; height: 100%; object-fit: cover; }
.likes-badge { 
  position: absolute; 
  bottom: 15px; 
  left: 15px; 
  display: flex; 
  align-items: center; 
  gap: 6px; 
  color: white; 
  text-shadow: 1px 1px 3px rgba(0,0,0,0.8); 
}

/* CENTRADO DE TEXTO */
.content-wrapper {
  max-width: 310px; 
  margin: 0 auto;
}

.section-container { padding: 20px 0; }
.section-header { font-size: 1.8rem; font-weight: 700; margin-bottom: 15px; text-align: center; color: #000; }

.ingredients-list { 
  list-style: none; 
  padding: 0; 
  margin: 0 auto; 
  display: table; 
  font-size: 1.1rem; 
  line-height: 1.8; 
}

.preparation-text { 
  font-size: 1rem; 
  line-height: 1.5; 
  color: #000; 
  text-align: left; 
}

.extra-photos { display: flex; flex-direction: column; gap: 15px; margin-top: 10px; }
.extra-img { width: 100%; border-radius: 8px; object-fit: cover; }
.last-section { padding-bottom: 100px; }

/* FOOTER */
.custom-tab-bar { --background: #ffffff; height: 75px; border-top: 1px solid #f0f0f0; }
.custom-tab-bar ion-icon { font-size: 26px; color: #000; }
.home-wrapper { border: 2px solid #000; border-radius: 12px; padding: 4px 10px; display: flex; }
</style>
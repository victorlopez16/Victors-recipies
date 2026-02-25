<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="recipe-header-title">Gofres con Arándanos</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon slot="icon-only" :icon="bookmarkOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="main-image-container">
        <img src="@/assets/ArandanosGofres.png" alt="Gofres" />
        <div class="overlay-badges">
          <div class="glass-tag">
            <ion-icon :icon="heart"></ion-icon>
            <span>2,154</span>
          </div>
          <div class="glass-tag">
            <ion-icon :icon="restaurantOutline"></ion-icon>
            <span>Desayuno</span>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <section class="section">
          <h2 class="section-title">Ingredientes</h2>
          <div class="ingredients-grid">
            <div 
              class="ingredient-card" 
              v-for="(ing, i) in listaIngredientes" 
              :key="i"
            >
              <div class="bullet">{{ i + 1 }}</div>
              <span class="ing-name">{{ ing }}</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">Preparación</h2>
          <div class="prep-box">
            <p class="preparation-text">
              1. Preparamos la masa de gofres y la vertemos en la gofrera caliente hasta que queden dorados y crujientes. 
              <br><br>
              2. Cuando estén listos, colocamos los gofres en un plato y añadimos por encima los arándanos frescos y unas rodajas de plátano. 
              <br><br>
              3. Espolvoreamos un poco de azúcar glas para darles un toque dulce y decorativo. Finalmente, bañamos todo con un buen chorro de sirope de arce.
            </p>
          </div>
        </section>

        <section class="section last-section">
          <h2 class="section-title">Otras fotos</h2>
          <div class="extra-photos">
            <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=500" class="extra-img" />
            <img src="https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?q=80&w=500" class="extra-img" />
          </div>
        </section>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button @click="navegar('/PleaseLogin')">
          <div class="avatar-footer-circle">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="Profile" />
          </div>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/PleaseLogin')"><ion-icon :icon="paperPlaneOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/MainLogged')" class="selected-tab">
          <div class="active-indicator"><ion-icon :icon="homeOutline"></ion-icon></div>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/PleaseLogin')"><ion-icon :icon="addCircleOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/PleaseLogin')"><ion-icon :icon="alertCircleOutline"></ion-icon></ion-tab-button>
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
  chevronBackOutline, heart, paperPlaneOutline, bookmarkOutline,
  homeOutline, addCircleOutline, alertCircleOutline, restaurantOutline
} from 'ionicons/icons';

const ionRouter = useIonRouter();

const listaIngredientes = [
  "Gofres recién hechos",
  "Plátanos maduros",
  "Arándanos frescos",
  "Azúcar glass",
  "Sirope de arce"
];

const navegarAtras = () => {
  ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainLogged', 'back', 'replace');
};

const navegar = (ruta: string) => {
  ionRouter.navigate(ruta, 'forward', 'push');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;700&display=swap');

ion-content { --background: #ffffff; font-family: 'Jost', sans-serif; }
.white-toolbar { --background: #ffffff; --border-width: 0; }
.recipe-header-title { font-weight: 700; color: #000; font-size: 1.1rem; }
.black-icon { color: #000; font-size: 24px; }

/* HERO IMAGE */
.main-image-container { position: relative; width: 100%; height: 350px; }
.main-image-container img { width: 100%; height: 100%; object-fit: cover; }
.overlay-badges { 
  position: absolute; bottom: 20px; left: 20px; display: flex; gap: 10px; 
}
.glass-tag { 
  background: rgba(255, 255, 255, 0.9); padding: 6px 14px; border-radius: 20px;
  display: flex; align-items: center; gap: 6px; color: #000; font-weight: 600; font-size: 0.85rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.glass-tag ion-icon { color: #5d3fd3; }

/* WRAPPER */
.content-wrapper { padding: 25px 20px; max-width: 500px; margin: 0 auto; }
.section { margin-bottom: 35px; }
.section-title { font-size: 1.6rem; font-weight: 700; color: #000; margin-bottom: 20px; }

/* INGREDIENTES */
.ingredients-grid { display: flex; flex-direction: column; gap: 12px; }
.ingredient-card { 
  display: flex; align-items: center; gap: 15px; padding: 12px;
  background: #fdfdfd; border: 1px solid #f0f0f0; border-radius: 15px;
}
.bullet { 
  width: 26px; height: 26px; background: #000; color: #fff; 
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 700;
}
.ing-name { font-size: 1.05rem; color: #333; font-weight: 400; }

/* PREPARACIÓN */
.prep-box { background: #fff; line-height: 1.6; }
.preparation-text { font-size: 1rem; color: #444; }

/* GALERÍA */
.extra-photos { display: flex; flex-direction: column; gap: 15px; }
.extra-img { width: 100%; border-radius: 15px; object-fit: cover; height: 200px; }
.last-section { padding-bottom: 80px; }

/* TAB BAR */
.custom-tab-bar { --background: #ffffff; height: 80px; border-top: 1px solid #f2f2f2; }
.avatar-footer-circle { 
  width: 32px; height: 32px; border-radius: 50%; overflow: hidden; border: 1.5px solid #000; 
}
.avatar-footer-circle img { width: 100%; height: 100%; object-fit: cover; }
.active-indicator { background: #000; padding: 8px 16px; border-radius: 14px; color: #fff; display: flex; }
.selected-tab ion-icon { color: #fff !important; }
</style>
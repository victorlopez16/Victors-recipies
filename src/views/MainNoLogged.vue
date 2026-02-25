<template>
  <ion-page>
    <ion-header class="ion-no-border custom-header">
      <div class="header-content">
        <img :src="logoCubiertos" class="mini-logo" alt="Logo" />
        <ion-searchbar placeholder="Encontrar recetas..." class="custom-searchbar" mode="md"></ion-searchbar>
        
        <ion-icon :icon="funnelOutline" class="filter-icon" id="trigger-filtro"></ion-icon>

        <ion-popover trigger="trigger-filtro" trigger-action="click" class="custom-popover">
          <div class="popover-container">
            <div class="popover-item" v-for="cat in ['Vegana', 'Mexicana', 'Saludable', 'Hipercalorica', 'Veraniega', 'Fit']" :key="cat">
              <div class="item-main">
                <ion-icon :icon="checkmarkOutline" class="check-icon"></ion-icon>
                <span>{{ cat }}</span>
              </div>
              <div class="item-icons">
                <ion-icon :icon="scanOutline" class="small-icon"></ion-icon>
                <ion-icon :icon="chevronForwardOutline" class="small-icon"></ion-icon>
              </div>
            </div>
          </div>
        </ion-popover>
      </div>
    </ion-header>

    <ion-content :fullscreen="true" class="main-content-bg" :scroll-y="false">
      <div class="main-layout">
        
        <div class="static-section">
          <h2 class="section-title">Recetas de la semana</h2>
          <div class="horizontal-scroll">
            <div 
              class="recipe-card-mini no-click" 
              v-for="(recipe, index) in recetasSemanales" 
              :key="'p-' + index"
            >
              <img :src="recipe.image" class="mini-card-img" />
              <p class="mini-card-title">{{ recipe.title }}</p>
            </div>
          </div>

          <div class="categories-scroll">
            <ion-chip class="category-chip">Mexicana</ion-chip>
            <ion-chip class="category-chip">Argentina</ion-chip>
            <ion-chip class="category-chip">Saludable</ion-chip>
            <ion-chip class="category-chip">Vegana</ion-chip>
          </div>
        </div>

        <div class="vertical-scroll-area">
          <div class="recipe-item-card" @click="navegar('/EntradaReceta2')">
            <div class="image-container">
              <img :src="ArandanosGofres" alt="Gofres" />
              <ion-icon :icon="heartOutline" class="heart-icon"></ion-icon>
            </div>
            <div class="recipe-info">
              <h3>Gofres con miel</h3>
              <p>Gofres con miel, platano y arandanos</p>
              <div class="tag-row">
                <span class="recipe-tag">Dulce</span>
                <span class="recipe-tag">Saludable</span>
              </div>
            </div>
          </div>

          <div class="recipe-item-card no-click">
            <div class="image-container">
              <img src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500" alt="Tacos" />
              <ion-icon :icon="heartOutline" class="heart-icon"></ion-icon>
            </div>
            <div class="recipe-info">
              <h3>Tacos Al Pastor</h3>
              <p>Deliciosos tacos con piña y cilantro</p>
              <div class="tag-row">
                <span class="recipe-tag">Mexicana</span>
                <span class="recipe-tag">Picante</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <div class="join-banner">
        <span>¿Todavía no tienes cuenta? Únete!</span>
        <ion-button fill="clear" class="login-mini-btn" @click="navegar('/Pleaselogin')">
          Iniciar Sesion
        </ion-button>
      </div>
      
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button @click="navegar('/Pleaselogin')"><ion-icon :icon="personOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/Pleaselogin')"><ion-icon :icon="paperPlaneOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/Pleaselogin')"><div class="home-wrapper"><ion-icon :icon="homeOutline"></ion-icon></div></ion-tab-button>
        <ion-tab-button @click="navegar('/Pleaselogin')"><ion-icon :icon="addCircleOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/Pleaselogin')"><ion-icon :icon="alertCircleOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/Pleaselogin')"><ion-icon :icon="searchOutline"></ion-icon></ion-tab-button>
      </ion-tab-bar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonHeader, IonContent, IonSearchbar, IonIcon, 
  IonChip, IonFooter, IonButton, IonTabBar, IonTabButton, 
  IonPopover, useIonRouter 
} from '@ionic/vue';
import { 
  funnelOutline, heartOutline, personOutline, paperPlaneOutline, 
  homeOutline, addCircleOutline, alertCircleOutline, searchOutline,
  checkmarkOutline, scanOutline, chevronForwardOutline
} from 'ionicons/icons';

import logoCubiertos from '@/assets/LogoCubiertos.png';
import ArandanosGofres from '@/assets/ArandanosGofres.png';

const ionRouter = useIonRouter();

const navegar = (ruta: string) => {
  ionRouter.navigate(ruta, 'forward', 'push'); // Cambiado de 'replace' a 'push'
};

const recetasSemanales = [
  { title: 'Pizza Margarita', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500' },
  { title: 'Burger Deluxe', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500' },
  { title: 'Sushi Mix', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500' },
  { title: 'Pasta Pesto', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500' },
  { title: 'Ensalada Fit', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500' },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&display=swap');

/* Clase para quitar el cursor de mano en elementos sin click */
.no-click { cursor: default !important; }

.custom-popover { --background: rgba(130, 130, 130, 0.95); --width: 250px; }
.popover-container { padding: 10px; color: white; }
.popover-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 5px; border-bottom: 0.5px solid rgba(255, 255, 255, 0.2); }
.item-main { display: flex; align-items: center; gap: 10px; }
.item-icons { display: flex; gap: 8px; opacity: 0.7; }
.main-layout { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
.static-section { flex-shrink: 0; padding: 10px 16px; background: #fff; }
.vertical-scroll-area { flex-grow: 1; overflow-y: auto; padding: 0 16px 120px; }
.main-content-bg { --background: #ffffff; font-family: 'Jost', sans-serif; }
.custom-header { background: #ffffff; padding: 10px 16px 0; }
.header-content { display: flex; align-items: center; gap: 8px; }
.mini-logo { width: 42px; height: 42px; border: 1.5px solid #000; border-radius: 50%; padding: 2px; }
.custom-searchbar { --background: #ffffff; border: 1px solid #e0e0e0; border-radius: 20px; flex: 1; }
.filter-icon { font-size: 28px; color: #000; cursor: pointer; }
.section-title { font-weight: 700; font-size: 1.4rem; margin: 10px 0; color: #000; }
.horizontal-scroll { display: flex; overflow-x: auto; gap: 12px; padding-bottom: 10px; flex-wrap: nowrap; }
.horizontal-scroll::-webkit-scrollbar { display: none; }
.categories-scroll { display: flex; overflow-x: auto; gap: 10px; padding: 10px 0; flex-wrap: nowrap; -webkit-overflow-scrolling: touch; }
.categories-scroll::-webkit-scrollbar { display: none; }
.category-chip { --background: #000; --color: #fff; border-radius: 12px; padding: 8px 25px; flex-shrink: 0; }
.recipe-card-mini { min-width: 130px; background: #fff; border-radius: 18px; border: 1px solid #f0f0f0; text-align: center; overflow: hidden; flex-shrink: 0; }
.mini-card-img { width: 100%; height: 90px; object-fit: cover; }
.mini-card-title { font-weight: 600; margin: 8px 0; font-size: 0.9rem; color: #000; }
.recipe-item-card { display: flex; background: #fff; border-radius: 18px; margin-bottom: 14px; height: 120px; border: 1px solid #f5f5f5; overflow: hidden; cursor: pointer; }
.image-container { width: 38%; position: relative; }
.image-container img { width: 100%; height: 100%; object-fit: cover; }
.heart-icon { position: absolute; top: 8px; left: 8px; color: white; font-size: 20px; }
.recipe-info { padding: 10px; width: 62%; display: flex; flex-direction: column; justify-content: center; }
.recipe-info h3 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #000; }
.recipe-info p { font-size: 0.8rem; color: #666; margin: 4px 0 8px; }
.recipe-tag { background: #000; color: #fff; font-size: 0.65rem; padding: 3px 10px; border-radius: 15px; margin-right: 4px; }
.join-banner { background: #000; color: #fff; display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; border-top-left-radius: 15px; border-top-right-radius: 15px; }
.login-mini-btn { --background: #fff; --color: #000; font-weight: 700; height: 32px; border-radius: 8px; }
.custom-tab-bar { --background: #fff; height: 75px; border-top: 1px solid #f0f0f0; }
.custom-tab-bar ion-icon { color: black; font-size: 26px; }
.home-wrapper { border: 2px solid #000; border-radius: 12px; padding: 4px 10px; display: flex; align-items: center; }
</style>
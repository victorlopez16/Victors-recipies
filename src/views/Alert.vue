<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/MainLogged" text="" :icon="chevronBackOutline" class="custom-back" />
        </ion-buttons>
        <ion-title class="custom-title">Actividad</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="page-bg">
      <div class="main-container">
        
        <h2 class="time-label">Hoy</h2>
        <div class="alerts-grid">
          <div v-for="(a, index) in alerts.slice(0, 4)" :key="'today-' + index" class="alert-card">
            <div class="status-indicator"></div>
            <div class="icon-circle">
              <ion-icon :icon="heart" class="heart-icon-filled"></ion-icon>
            </div>
            <div class="alert-content">
              <p class="alert-text">{{ a }}</p>
              <span class="alert-time">Hace 2h</span>
            </div>
          </div>
        </div>

        <h2 class="time-label">Esta semana</h2>
        <div class="alerts-grid">
          <div v-for="(a, index) in alerts.slice(4)" :key="'week-' + index" class="alert-card read">
            <div class="icon-circle gray">
              <ion-icon :icon="heartOutline" class="heart-icon-outline"></ion-icon>
            </div>
            <div class="alert-content">
              <p class="alert-text">{{ a }}</p>
              <span class="alert-time">Ayer</span>
            </div>
          </div>
        </div>

        <div class="bottom-spacer"></div>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button @click="navegar('/Perfil')">
          <div class="avatar-wrapper">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" />
          </div>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/Chat')">
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/MainLogged')">
          <div class="home-indicator">
            <ion-icon :icon="homeOutline"></ion-icon>
          </div>
        </ion-tab-button>
        <ion-tab-button><ion-icon :icon="addCircleOutline"></ion-icon></ion-tab-button>
        <ion-tab-button class="tab-active">
          <ion-icon :icon="alertCircle"></ion-icon>
        </ion-tab-button>
        <ion-tab-button><ion-icon :icon="searchOutline"></ion-icon></ion-tab-button>
      </ion-tab-bar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton,
  IonTitle, IonContent, IonFooter, IonTabBar, IonTabButton,
  IonIcon, useIonRouter
} from '@ionic/vue';
import {
  paperPlaneOutline, homeOutline, addCircleOutline,
  alertCircleOutline, alertCircle, searchOutline, 
  chevronBackOutline, heart, heartOutline
} from 'ionicons/icons';

const router = useIonRouter();
const navegar = (ruta: string) => router.navigate(ruta, 'forward', 'replace');

const alerts = [
  '¡Dani le dio like a tu receta!',
  'Tu receta llegó a 10 likes',
  'Tu receta llegó a 100 likes',
  'Tu receta llegó a 1000 likes',
  '¡Porrino le dio like a tu receta!',
  '¡Luis Ela le dio like a tu receta!',
  '¡Fede le dio like a tu receta!',
  '¡Carlos le dio like a tu receta!',
  '¡Messi le dio like a tu receta!'
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

.page-bg { 
  --background: #ffffff; 
  font-family: 'Jost', sans-serif;
}

/* HEADER EDITORIAL */
.custom-toolbar { 
  --background: #ffffff; 
  --padding-top: 10px;
  --padding-bottom: 10px;
}

.custom-title { 
  font-weight: 700; 
  font-size: 1.2rem; 
  letter-spacing: -0.5px;
  text-align: center;
  color: #000;
}

.custom-back { color: #000 !important; }

/* CONTAINER Y GRID RESPONSIVE */
.main-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 10px 20px;
}

.time-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #000;
  font-weight: 600;
  margin: 25px 0 15px 5px;
}

.alerts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 768px) or (orientation: landscape) {
  .alerts-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* CARDS DE ALERTA MINIMAL */
.alert-card {
  display: flex;
  align-items: center;
  padding: 14px;
  background: #fff;
  border-radius: 18px;
  border: 1px solid #f2f2f2;
  position: relative;
  transition: all 0.2s ease;
}

.alert-card:active {
  background: #f9f9f9;
  transform: scale(0.98);
}

.alert-card.read {
  opacity: 0.7;
  border-color: transparent;
  background: #fafafa;
}

/* Indicador azul de "No leído" */
.status-indicator {
  position: absolute;
  left: 6px;
  width: 6px;
  height: 6px;
  background: #007aff;
  border-radius: 50%;
}

.icon-circle {
  width: 42px;
  height: 42px;
  background: #fff0f3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;
  flex-shrink: 0;
}

.icon-circle.gray {
  background: #eee;
}

.heart-icon-filled { color: #ff2d55; font-size: 20px; }
.heart-icon-outline { color: #888; font-size: 20px; }

.alert-content {
  display: flex;
  flex-direction: column;
}

.alert-text {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.3;
}

.alert-time {
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 2px;
}

.bottom-spacer { height: 120px; }

/* FOOTER STYLES (Mantenidos y mejorados) */
.custom-tab-bar { 
  --background: #ffffff; 
  height: 85px; 
  border-top: 1px solid #f5f5f5; 
}

.custom-tab-bar ion-icon { color: #000; font-size: 24px; }

.home-indicator {
  background: #000;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.home-indicator ion-icon { color: #fff !important; }

.tab-active ion-icon { color: #007aff !important; }

.avatar-wrapper { 
  width: 32px; 
  height: 32px; 
  border-radius: 50%; 
  overflow: hidden; 
  border: 1.5px solid #000; 
}

.avatar-wrapper img { width: 100%; height: 100%; object-fit: cover; }
</style>
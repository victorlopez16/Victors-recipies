<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras" class="round-btn">
            <ion-icon slot="icon-only" :icon="chevronBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button class="round-btn">
            <ion-icon slot="icon-only" :icon="ellipsisHorizontal"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="main-bg">
      <div class="profile-container">
        
        <header class="header-v2">
          <div class="avatar-box">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300" class="main-avatar" />
            <div class="status-indicator"></div>
          </div>
          
          <div class="user-meta">
            <h1 class="full-name">Daniel Martinez</h1>
            <span class="user-badge">Chef Pro</span>
          </div>
          
          <p class="user-bio">
            Amante de los sabores <strong>mediterráneos</strong>. Madrid. <br/>
            Cocinando con amor y aceite de oliva. 🌿
          </p>

          <div class="stats-card">
            <div class="stat-group">
              <span class="stat-num">12</span>
              <span class="stat-label">Recetas</span>
            </div>
            <div class="divider-v"></div>
            <div class="stat-group">
              <span class="stat-num">1.2k</span>
              <span class="stat-label">Seguidores</span>
            </div>
            <div class="divider-v"></div>
            <div class="stat-group">
              <span class="stat-num">340</span>
              <span class="stat-label">Siguiendo</span>
            </div>
          </div>

          <div class="action-grid">
            <button class="primary-action" @click="navegar('/EditarPerfil')">
              Editar Perfil
            </button>
            <button class="secondary-action" @click="navegar('/MainNoLogged')">
              <ion-icon :icon="logOutOutline"></ion-icon>
            </button>
          </div>
        </header>

        <section class="content-section">
          <div class="section-top">
            <h2 class="title-lg">Mis Creaciones</h2>
            <div class="filter-pills">
              <span class="pill-mini active">Recetas</span>
              <span class="pill-mini">Guardadas</span>
            </div>
          </div>

          <div class="recipe-stack">
            <div class="modern-recipe-card" v-for="(receta, i) in recetas" :key="i">
              <div class="card-media">
                <img :src="receta.image" />
                <div class="glass-tag">{{ receta.tags[0] }}</div>
              </div>
              <div class="card-content">
                <div class="card-title-row">
                  <h3>{{ receta.title }}</h3>
                  <ion-icon :icon="heartOutline" class="h-icon"></ion-icon>
                </div>
                <p>{{ receta.description }}</p>
                <div class="card-footer-info">
                  <span class="time">Hace 2 días</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-tab-bar slot="bottom" class="floating-tabs">
        <ion-tab-button class="tab-profile-active">
          <div class="avatar-tab">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" />
          </div>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/Chat')">
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/MainLogged')">
          <div class="home-btn-center">
            <ion-icon :icon="homeOutline"></ion-icon>
          </div>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/AgregarReceta')">
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/Alert')">
          <ion-icon :icon="alertCircleOutline"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonButton,
  IonIcon, IonContent, IonFooter, IonTabBar, IonTabButton, useIonRouter
} from '@ionic/vue';
import {
  chevronBackOutline, heartOutline, paperPlaneOutline,
  homeOutline, addCircleOutline, alertCircleOutline, searchOutline,
  logOutOutline, ellipsisHorizontal, checkmarkCircle
} from 'ionicons/icons';
import ArandanosGofres from '@/assets/ArandanosGofres.png';

const ionRouter = useIonRouter();
const navegarAtras = () => ionRouter.back();
const navegar = (ruta: string) => ionRouter.navigate(ruta, 'forward', 'replace');

const recetas = [
  { title: 'Gofres con miel', description: 'Miel de acacia orgánica y frutas silvestres.', image: ArandanosGofres, tags: ['Saludable'] },
  { title: 'Tacos Al Pastor', description: 'Tradición mexicana con piña asada.', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500', tags: ['Mexicana'] },
  { title: 'Pasta Carbonara', description: 'Receta clásica 100% italiana sin nata.', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=500', tags: ['Pasta'] }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

.main-bg { --background: #fcfcfc; font-family: 'Jost', sans-serif; }
.white-toolbar { --background: #fcfcfc; padding: 10px 10px 0; }

.round-btn {
  --background: #fff; --color: #000; --border-radius: 50%;
  width: 42px; height: 42px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.profile-container { padding: 10px 20px 120px; }

/* --- HEADER DESIGN --- */
.header-v2 { display: flex; flex-direction: column; align-items: center; text-align: center; }

.avatar-box { position: relative; margin-bottom: 15px; }
.main-avatar {
  width: 110px; height: 110px; border-radius: 40px; 
  object-fit: cover; border: 4px solid #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
.status-indicator {
  position: absolute; bottom: 5px; right: -2px; width: 18px; height: 18px;
  background: #2dd36f; border: 3px solid #fff; border-radius: 50%;
}

.user-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
.full-name { font-size: 1.6rem; font-weight: 800; color: #1a1a1a; margin: 0; }
.user-badge {
  background: #000; color: #fff; font-size: 0.65rem; padding: 2px 8px; border-radius: 20px; font-weight: 700;
}
.user-bio { font-size: 0.9rem; color: #666; max-width: 300px; line-height: 1.5; margin-bottom: 25px; }

/* --- STATS CARD --- */
.stats-card {
  background: #fff; width: 100%; border-radius: 24px; padding: 18px;
  display: flex; justify-content: space-around; align-items: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-bottom: 25px;
}
.stat-group { display: flex; flex-direction: column; align-items: center; }
.stat-num { font-size: 1.2rem; font-weight: 800; color: #000; }
.stat-label { font-size: 0.7rem; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
.divider-v { width: 1px; height: 30px; background: #f0f0f0; }

.action-grid { display: flex; gap: 12px; width: 100%; margin-bottom: 35px; }
.primary-action {
  flex: 1; background: #000; color: #fff; border: none; height: 52px;
  border-radius: 18px; font-weight: 700; font-size: 0.95rem; box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}
.secondary-action {
  width: 55px; background: #f0f0f0; border: none; border-radius: 18px; font-size: 20px;
}

/* --- RECIPES SECTION --- */
.section-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.title-lg { font-size: 1.3rem; font-weight: 800; margin: 0; }
.filter-pills { display: flex; gap: 8px; }
.pill-mini { padding: 6px 14px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; color: #aaa; }
.pill-mini.active { background: #000; color: #fff; }

.recipe-stack { display: flex; flex-direction: column; gap: 18px; }
.modern-recipe-card {
  background: #fff; border-radius: 24px; padding: 12px;
  display: flex; gap: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}
.card-media { width: 100px; height: 100px; border-radius: 18px; overflow: hidden; position: relative; flex-shrink: 0; }
.card-media img { width: 100%; height: 100%; object-fit: cover; }
.glass-tag {
  position: absolute; bottom: 6px; left: 6px; right: 6px;
  background: rgba(255,255,255,0.8); backdrop-filter: blur(5px);
  font-size: 0.6rem; font-weight: 700; text-align: center; padding: 3px; border-radius: 8px;
}

.card-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.card-title-row { display: flex; justify-content: space-between; align-items: center; }
.card-title-row h3 { font-size: 1.05rem; font-weight: 700; margin: 0; color: #1a1a1a; }
.h-icon { color: #f24e1e; font-size: 18px; }
.card-content p { font-size: 0.8rem; color: #888; margin: 4px 0 8px; line-height: 1.3; }
.card-footer-info { font-size: 0.7rem; color: #ccc; font-weight: 600; }

/* --- FOOTER --- */
.floating-tabs {
  --background: #fff; height: 90px; border-top: 1px solid #f2f2f2;
  padding: 0 10px;
}
.avatar-tab { width: 32px; height: 32px; border-radius: 10px; overflow: hidden; border: 2px solid #000; }
.home-btn-center {
  background: #000; color: #fff; padding: 10px 16px; border-radius: 18px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
.home-btn-center ion-icon { color: #fff; }
</style>
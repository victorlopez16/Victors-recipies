<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras" class="back-btn">
            <ion-icon slot="icon-only" :icon="chevronBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button class="more-btn">
            <ion-icon slot="icon-only" :icon="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="main-bg">
      <div class="profile-layout">
        
        <header class="user-header">
          <div class="avatar-wrapper-main">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" class="avatar-img" />
            <div class="verified-badge">
              <ion-icon :icon="checkmarkCircle"></ion-icon>
            </div>
          </div>

          <div class="user-details">
            <h1 class="name">Fernando Porrino</h1>
            <p class="username">@porrinofer</p>
          </div>

          <div class="stats-mini-row">
            <div class="mini-stat"><strong>24</strong><span>Recetas</span></div>
            <div class="mini-stat"><strong>850</strong><span>Seguidores</span></div>
          </div>

          <div class="actions-row">
            <button class="btn-message" @click="navegar('/Chat')">
              <ion-icon :icon="paperPlaneOutline" class="btn-icon"></ion-icon>
              Enviar Mensaje
            </button>
            <button class="btn-follow">Seguir</button>
          </div>
        </header>

        <section class="recetas-feed">
          <div class="feed-header">
            <h2 class="feed-title">Creaciones</h2>
            <div class="view-options">
              <ion-icon :icon="gridOutline" class="view-icon active"></ion-icon>
              <ion-icon :icon="listOutline" class="view-icon"></ion-icon>
            </div>
          </div>

          <div class="recipe-list">
            <div class="modern-recipe-item" v-for="(receta, i) in recetas" :key="i">
              <div class="recipe-media">
                <img :src="receta.image" :alt="receta.title" />
                <button class="fav-btn">
                  <ion-icon :icon="heartOutline"></ion-icon>
                </button>
              </div>
              
              <div class="recipe-content">
                <div class="recipe-main-info">
                  <h3>{{ receta.title }}</h3>
                  <p class="recipe-brief">{{ receta.description }}</p>
                </div>
                
                <div class="recipe-tags">
                  <span class="tag-pill" v-for="tag in receta.tags" :key="tag">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-tab-bar slot="bottom" class="modern-tab-bar">
        <ion-tab-button @click="navegar('/Perfil')">
          <div class="tab-avatar">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" />
          </div>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/Chat')">
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/MainLogged')">
          <div class="home-tab-active"><ion-icon :icon="homeOutline"></ion-icon></div>
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
  homeOutline, addCircleOutline, alertCircleOutline, 
  searchOutline, checkmarkCircle, ellipsisVertical,
  gridOutline, listOutline
} from 'ionicons/icons';
import ArandanosGofres from '@/assets/ArandanosGofres.png';

const ionRouter = useIonRouter();
const navegarAtras = () => ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainLogged', 'back', 'replace');
const navegar = (ruta: string) => ionRouter.navigate(ruta, 'forward', 'replace');

const recetas = [
  { title: 'Gofres con miel', description: 'Gofres con miel, plátano y arándanos', image: ArandanosGofres, tags: ['Dulce', 'Saludable'] },
  { title: 'Tacos Al Pastor', description: 'Tacos con piña y cilantro fresco', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500', tags: ['Mexicana'] },
  { title: 'Pasta Carbonara', description: 'Pasta italiana tradicional con guanciale', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=500', tags: ['Italiana'] },
  { title: 'Poke Bowl Salmón', description: 'Bowl de arroz con salmón marinado', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500', tags: ['Fit'] }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap');

.main-bg { --background: #ffffff; font-family: 'Jost', sans-serif; }
.white-toolbar { --background: #ffffff; --padding-top: 8px; }
.back-btn, .more-btn { --color: #000; font-size: 22px; }

.profile-layout { padding: 0 16px 100px; }

/* HEADER */
.user-header { display: flex; flex-direction: column; align-items: center; padding: 20px 0; }

.avatar-wrapper-main { position: relative; width: 110px; height: 110px; margin-bottom: 16px; }
.avatar-img { width: 100%; height: 100%; border-radius: 40px; object-fit: cover; box-shadow: 0 10px 20px rgba(0,0,0,0.08); }
.verified-badge { 
  position: absolute; bottom: -5px; right: -5px; background: #fff; 
  color: #4f52ff; font-size: 24px; border-radius: 50%; display: flex;
}

.user-details { text-align: center; margin-bottom: 15px; }
.name { font-size: 1.6rem; font-weight: 700; color: #000; margin: 0; }
.username { font-size: 0.95rem; color: #888; margin: 2px 0; }

.stats-mini-row { display: flex; gap: 24px; margin-bottom: 20px; }
.mini-stat { display: flex; flex-direction: column; align-items: center; }
.mini-stat strong { font-size: 1.1rem; color: #000; }
.mini-stat span { font-size: 0.7rem; color: #aaa; text-transform: uppercase; font-weight: 600; }

.actions-row { display: flex; gap: 10px; width: 100%; max-width: 320px; }
.btn-message { 
  flex: 2; background: #000; color: #fff; border-radius: 16px; 
  height: 48px; font-weight: 600; display: flex; align-items: center; 
  justify-content: center; gap: 8px; border: none;
}
.btn-follow { 
  flex: 1; background: #f5f5f5; color: #000; border-radius: 16px; 
  height: 48px; font-weight: 600; border: none;
}

/* FEED */
.recetas-feed { margin-top: 30px; }
.feed-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.feed-title { font-size: 1.2rem; font-weight: 700; margin: 0; }
.view-options { display: flex; gap: 12px; color: #ccc; }
.view-icon.active { color: #000; }

.recipe-list { display: flex; flex-direction: column; gap: 16px; }
.modern-recipe-item { 
  display: flex; background: #fff; border-radius: 20px; 
  overflow: hidden; border: 1px solid #f8f8f8; height: 110px;
}
.recipe-media { width: 110px; height: 110px; flex-shrink: 0; position: relative; }
.recipe-media img { width: 100%; height: 100%; object-fit: cover; }
.fav-btn { 
  position: absolute; top: 8px; left: 8px; background: rgba(255,255,255,0.8); 
  border: none; border-radius: 50%; padding: 5px; display: flex; font-size: 14px;
}

.recipe-content { flex: 1; padding: 12px; display: flex; flex-direction: column; justify-content: space-between; }
.recipe-main-info h3 { margin: 0; font-size: 1rem; font-weight: 700; color: #1a1a1a; }
.recipe-brief { margin: 2px 0; font-size: 0.8rem; color: #777; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.tag-pill { 
  display: inline-block; background: #f0f0f7; color: #4f52ff; 
  font-size: 0.65rem; font-weight: 700; padding: 3px 10px; border-radius: 8px;
  margin-right: 5px; text-transform: uppercase;
}

/* FOOTER */
.modern-tab-bar { --background: #fff; height: 80px; border-top: 1px solid #f2f2f2; }
.tab-avatar { width: 32px; height: 32px; border-radius: 50%; overflow: hidden; border: 1px solid #eee; }
.home-tab-active { background: #000; color: #fff; padding: 8px 15px; border-radius: 14px; display: flex; }
.home-tab-active ion-icon { color: #fff !important; }

/* LANDSCAPE */
@media (orientation: landscape) {
  .profile-layout { display: grid; grid-template-columns: 1fr 1.5fr; gap: 30px; }
  .user-header { position: sticky; top: 10px; }
}
</style>
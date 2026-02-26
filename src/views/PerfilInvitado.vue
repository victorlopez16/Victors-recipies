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
            <div class="mini-stat">
              <strong>{{ seguidores }}</strong>
              <span>Seguidores</span>
            </div>
          </div>

          <div class="actions-row">
            <button class="btn-message" @click="navegar('/Chat')">
              <ion-icon :icon="paperPlaneOutline" class="btn-icon"></ion-icon>
              Enviar Mensaje
            </button>
            <button
              class="btn-follow"
              :class="{ following: siguiendo }"
              @click="toggleSeguir"
            >
              <ion-icon :icon="siguiendo ? checkmarkOutline : personAddOutline" style="margin-right: 5px; font-size: 15px;"></ion-icon>
              {{ siguiendo ? 'Siguiendo' : 'Seguir' }}
            </button>
          </div>
        </header>

        <section class="recetas-feed">
          <div class="feed-header">
            <h2 class="feed-title">Creaciones</h2>
            <div class="filter-pills">
              <span
                class="pill-mini"
                :class="{ active: pillActiva === 'recetas' }"
                @click="cambiarPill('recetas')"
              >Recetas</span>
              <span
                class="pill-mini"
                :class="{ active: pillActiva === 'guardadas' }"
                @click="cambiarPill('guardadas')"
              >Guardadas</span>
            </div>
          </div>

          <!-- SKELETON -->
          <div v-if="cargando" class="recipe-list">
            <div class="modern-recipe-item skeleton-card" v-for="n in 4" :key="'sk-' + n">
              <div class="skeleton-media"></div>
              <div class="skeleton-content">
                <div class="skeleton-line wide"></div>
                <div class="skeleton-line medium"></div>
                <div class="skeleton-tags">
                  <div class="skeleton-tag"></div>
                  <div class="skeleton-tag"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- RECETAS REALES -->
          <div v-else class="recipe-list">
            <div v-if="listaActiva.length === 0" class="empty-state">
              <ion-icon :icon="pillActiva === 'guardadas' ? bookmarkOutline : restaurantOutline" class="empty-icon"></ion-icon>
              <p>{{ pillActiva === 'guardadas' ? 'No tiene recetas guardadas' : 'No tiene recetas creadas' }}</p>
            </div>

            <div class="modern-recipe-item" v-for="(receta, i) in listaActiva" :key="i">
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
                  <span class="tag-pill" v-for="tag in receta.tags" :key="tag">{{ tag }}</span>
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
        <ion-tab-button @click="navegar('/CreadorRecetas')">
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/Alert')">
          <ion-icon :icon="alertCircleOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/SearchLogged')">
          <ion-icon :icon="searchOutline"></ion-icon>
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
  bookmarkOutline, restaurantOutline,
  personAddOutline, checkmarkOutline
} from 'ionicons/icons';
import { ref, computed, onMounted } from 'vue';
import ArandanosGofres from '@/assets/ArandanosGofres.png';

const ionRouter = useIonRouter();
const navegarAtras = () => ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainLogged', 'back', 'replace');
const navegar = (ruta: string) => ionRouter.navigate(ruta, 'forward', 'push');

const pillActiva = ref<'recetas' | 'guardadas'>('recetas');
const cargando = ref(true);
const siguiendo = ref(false);
const seguidores = ref(850);

const toggleSeguir = () => {
  siguiendo.value = !siguiendo.value;
  seguidores.value += siguiendo.value ? 1 : -1;
};

onMounted(() => {
  setTimeout(() => { cargando.value = false; }, 1500);
});

const cambiarPill = (pill: 'recetas' | 'guardadas') => {
  cargando.value = true;
  pillActiva.value = pill;
  setTimeout(() => { cargando.value = false; }, 800);
};

const recetas = [
  { title: 'Gofres con miel', description: 'Gofres con miel, plátano y arándanos', image: ArandanosGofres, tags: ['Dulce', 'Saludable'] },
  { title: 'Tacos Al Pastor', description: 'Tacos con piña y cilantro fresco', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500', tags: ['Mexicana'] },
  { title: 'Pasta Carbonara', description: 'Pasta italiana tradicional con guanciale', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=500', tags: ['Italiana'] },
  { title: 'Poke Bowl Salmón', description: 'Bowl de arroz con salmón marinado', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500', tags: ['Fit'] }
];

const guardadas = [
  { title: 'Ramen Tonkotsu', description: 'Caldo cremoso de cerdo con huevo marinado.', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=500', tags: ['Japonesa'] },
  { title: 'Burger Deluxe', description: 'La mejor burger con queso fundido y bacon.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500', tags: ['Americana'] },
];

const listaActiva = computed(() => pillActiva.value === 'recetas' ? recetas : guardadas);
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
.verified-badge { position: absolute; bottom: -5px; right: -5px; background: #fff; color: #4f52ff; font-size: 24px; border-radius: 50%; display: flex; }
.user-details { text-align: center; margin-bottom: 15px; }
.name { font-size: 1.6rem; font-weight: 700; color: #000; margin: 0; }
.username { font-size: 0.95rem; color: #888; margin: 2px 0; }

.stats-mini-row { display: flex; gap: 24px; margin-bottom: 20px; }
.mini-stat { display: flex; flex-direction: column; align-items: center; }
.mini-stat strong { font-size: 1.1rem; color: #000; transition: all 0.2s ease; }
.mini-stat span { font-size: 0.7rem; color: #aaa; text-transform: uppercase; font-weight: 600; }

.actions-row { display: flex; gap: 10px; width: 100%; max-width: 320px; }
.btn-message {
  flex: 2; background: #000; color: #fff; border-radius: 16px;
  height: 48px; font-weight: 600; display: flex; align-items: center;
  justify-content: center; gap: 8px; border: none; cursor: pointer;
  font-family: 'Jost', sans-serif;
}
.btn-follow {
  flex: 1; background: #f5f5f5; color: #000; border-radius: 16px;
  height: 48px; font-weight: 600; border: none; cursor: pointer;
  font-family: 'Jost', sans-serif; display: flex; align-items: center;
  justify-content: center; transition: all 0.25s ease; font-size: 0.85rem;
}
.btn-follow.following { background: #4f52ff; color: #fff; box-shadow: 0 4px 12px rgba(79,82,255,0.3); }

/* FEED */
.recetas-feed { margin-top: 30px; }
.feed-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.feed-title { font-size: 1.2rem; font-weight: 700; margin: 0; }
.filter-pills { display: flex; gap: 8px; }
.pill-mini { padding: 6px 14px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; color: #aaa; cursor: pointer; transition: all 0.2s ease; }
.pill-mini.active { background: #000; color: #fff; }

/* EMPTY STATE */
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 40px 20px; color: #ccc; }
.empty-icon { font-size: 48px; }
.empty-state p { font-size: 0.9rem; font-weight: 600; margin: 0; }

/* RECETAS */
.recipe-list { display: flex; flex-direction: column; gap: 16px; }
.modern-recipe-item { display: flex; background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid #f8f8f8; height: 110px; }
.recipe-media { width: 110px; height: 110px; flex-shrink: 0; position: relative; }
.recipe-media img { width: 100%; height: 100%; object-fit: cover; }
.fav-btn { position: absolute; top: 8px; left: 8px; background: rgba(255,255,255,0.8); border: none; border-radius: 50%; padding: 5px; display: flex; font-size: 14px; cursor: pointer; }
.recipe-content { flex: 1; padding: 12px; display: flex; flex-direction: column; justify-content: space-between; }
.recipe-main-info h3 { margin: 0; font-size: 1rem; font-weight: 700; color: #1a1a1a; }
.recipe-brief { margin: 2px 0; font-size: 0.8rem; color: #777; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tag-pill { display: inline-block; background: #f0f0f7; color: #4f52ff; font-size: 0.65rem; font-weight: 700; padding: 3px 10px; border-radius: 8px; margin-right: 5px; text-transform: uppercase; }

/* SKELETON */
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton-card { cursor: default; }
.skeleton-media { width: 110px; height: 110px; flex-shrink: 0; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 800px 100%; animation: shimmer 1.4s infinite linear; }
.skeleton-content { flex: 1; padding: 12px; display: flex; flex-direction: column; justify-content: center; gap: 10px; }
.skeleton-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 800px 100%; animation: shimmer 1.4s infinite linear; }
.skeleton-line.wide { width: 75%; }
.skeleton-line.medium { width: 50%; }
.skeleton-tags { display: flex; gap: 6px; }
.skeleton-tag { width: 50px; height: 18px; border-radius: 8px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 800px 100%; animation: shimmer 1.4s infinite linear; }

/* TAB BAR */
.modern-tab-bar { --background: #fff; height: 80px; border-top: 1px solid #f2f2f2; }
.modern-tab-bar ion-icon { color: #000; font-size: 26px; }
.tab-avatar { width: 32px; height: 32px; border-radius: 50%; overflow: hidden; border: 1px solid #eee; }
.tab-avatar img { width: 100%; height: 100%; object-fit: cover; }
.home-tab-active { background: #000; color: #fff; padding: 8px 15px; border-radius: 14px; display: flex; }
.home-tab-active ion-icon { color: #fff !important; }

/* LANDSCAPE */
@media (orientation: landscape) {
  .profile-layout { display: grid; grid-template-columns: 1fr 1.5fr; gap: 30px; }
  .user-header { position: sticky; top: 10px; }
}
</style>
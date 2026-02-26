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
            <img :src="avatarActual" class="main-avatar" />
            <div class="status-indicator"></div>
            <!-- Botón para abrir selector -->
            <div class="avatar-edit-btn" @click="mostrarSelector = !mostrarSelector">
              <ion-icon :icon="cameraOutline"></ion-icon>
            </div>
          </div>

          <!-- SELECTOR DE AVATARES -->
          <div class="avatar-selector" v-if="mostrarSelector">
            <p class="selector-label">Elige tu foto de perfil</p>
            <div class="avatar-options">
              <div
                v-for="(foto, i) in fotosDisponibles"
                :key="i"
                class="avatar-option"
                :class="{ selected: avatarActual === foto }"
                @click="seleccionarAvatar(foto)"
              >
                <img :src="foto" />
                <div v-if="avatarActual === foto" class="check-overlay">
                  <ion-icon :icon="checkmarkCircle"></ion-icon>
                </div>
              </div>
            </div>
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
          <div v-if="cargando" class="recipe-stack">
            <div class="modern-recipe-card skeleton-card" v-for="n in 3" :key="'sk-' + n">
              <div class="skeleton-media"></div>
              <div class="skeleton-content">
                <div class="skeleton-line wide"></div>
                <div class="skeleton-line medium"></div>
                <div class="skeleton-line short"></div>
              </div>
            </div>
          </div>

          <!-- RECETAS REALES -->
          <div v-else class="recipe-stack">
            <div v-if="listaActiva.length === 0" class="empty-state">
              <ion-icon :icon="pillActiva === 'guardadas' ? bookmarkOutline : restaurantOutline" class="empty-icon"></ion-icon>
              <p>{{ pillActiva === 'guardadas' ? 'No tienes recetas guardadas' : 'No tienes recetas creadas' }}</p>
            </div>

            <div class="modern-recipe-card" v-for="(receta, i) in listaActiva" :key="i">
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

        <ion-tab-button class="tab-active-wrapper">
          <div class="avatar-tab active-avatar">
            <img :src="avatarActual" />
          </div>
          <div class="tab-dot"></div>
        </ion-tab-button>

        <ion-tab-button @click="navegar('/Chat')">
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button @click="navegar('/MainLogged')">
          <div class="home-btn-center">
            <ion-icon :icon="homeOutline"></ion-icon>
          </div>
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
  homeOutline, addCircleOutline, alertCircleOutline, searchOutline,
  logOutOutline, ellipsisHorizontal, bookmarkOutline, restaurantOutline,
  cameraOutline, checkmarkCircle
} from 'ionicons/icons';
import { ref, computed } from 'vue';
import ArandanosGofres from '@/assets/ArandanosGofres.png';

const ionRouter = useIonRouter();
const navegarAtras = () => ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainLogged', 'back', 'replace');
const navegar = (ruta: string) => ionRouter.navigate(ruta, 'forward', 'push');

const pillActiva = ref<'recetas' | 'guardadas'>('recetas');
const cargando = ref(false);
const mostrarSelector = ref(false);

const fotosDisponibles = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300',
];

const avatarActual = ref(fotosDisponibles[0]);

const seleccionarAvatar = (foto: string) => {
  avatarActual.value = foto;
  setTimeout(() => { mostrarSelector.value = false; }, 400);
};

const cambiarPill = (pill: 'recetas' | 'guardadas') => {
  pillActiva.value = pill;
};

const recetas = [
  { title: 'Gofres con miel', description: 'Miel de acacia orgánica y frutas silvestres.', image: ArandanosGofres, tags: ['Saludable'] },
  { title: 'Tacos Al Pastor', description: 'Tradición mexicana con piña asada.', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500', tags: ['Mexicana'] },
  { title: 'Pasta Carbonara', description: 'Receta clásica 100% italiana sin nata.', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=500', tags: ['Pasta'] }
];

const guardadas = [
  { title: 'Poke Bowl Salmón', description: 'Bowl de arroz con salmón marinado y aguacate.', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500', tags: ['Fit'] },
  { title: 'Burger Deluxe', description: 'La mejor burger con queso fundido y bacon.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500', tags: ['Americana'] },
];

const listaActiva = computed(() => pillActiva.value === 'recetas' ? recetas : guardadas);
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

/* HEADER */
.header-v2 { display: flex; flex-direction: column; align-items: center; text-align: center; }

.avatar-box { position: relative; margin-bottom: 15px; }
.main-avatar { width: 110px; height: 110px; border-radius: 40px; object-fit: cover; border: 4px solid #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.1); transition: opacity 0.2s ease; }
.status-indicator { position: absolute; bottom: 5px; right: -2px; width: 18px; height: 18px; background: #2dd36f; border: 3px solid #fff; border-radius: 50%; }

/* BOTÓN EDITAR AVATAR */
.avatar-edit-btn {
  position: absolute;
  bottom: -6px;
  left: -6px;
  width: 32px;
  height: 32px;
  background: #4f52ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  border: 2px solid #fff;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(79,82,255,0.4);
  transition: transform 0.2s ease;
}
.avatar-edit-btn:active { transform: scale(0.9); }

/* SELECTOR DE AVATARES */
.avatar-selector {
  width: 100%;
  background: #fff;
  border-radius: 24px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  animation: fadeInDown 0.25s ease;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.selector-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 12px;
  text-align: left;
}

.avatar-options {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.avatar-option {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid transparent;
  transition: border-color 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;
}

.avatar-option img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-option.selected {
  border-color: #4f52ff;
  box-shadow: 0 0 0 2px rgba(79,82,255,0.3);
}

.avatar-option:active { transform: scale(0.93); }

.check-overlay {
  position: absolute;
  inset: 0;
  background: rgba(79,82,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 22px;
}

.user-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
.full-name { font-size: 1.6rem; font-weight: 800; color: #1a1a1a; margin: 0; }
.user-badge { background: #000; color: #fff; font-size: 0.65rem; padding: 2px 8px; border-radius: 20px; font-weight: 700; }
.user-bio { font-size: 0.9rem; color: #666; max-width: 300px; line-height: 1.5; margin-bottom: 25px; }

/* STATS */
.stats-card { background: #fff; width: 100%; border-radius: 24px; padding: 18px; display: flex; justify-content: space-around; align-items: center; box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-bottom: 25px; }
.stat-group { display: flex; flex-direction: column; align-items: center; }
.stat-num { font-size: 1.2rem; font-weight: 800; color: #000; }
.stat-label { font-size: 0.7rem; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
.divider-v { width: 1px; height: 30px; background: #f0f0f0; }

.action-grid { display: flex; gap: 12px; width: 100%; margin-bottom: 35px; }
.primary-action { flex: 1; background: #000; color: #fff; border: none; height: 52px; border-radius: 18px; font-weight: 700; font-size: 0.95rem; box-shadow: 0 6px 15px rgba(0,0,0,0.15); cursor: pointer; }
.secondary-action { width: 55px; background: #f0f0f0; border: none; border-radius: 18px; font-size: 20px; cursor: pointer; }

/* SECTION */
.section-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.title-lg { font-size: 1.3rem; font-weight: 800; margin: 0; }
.filter-pills { display: flex; gap: 8px; }
.pill-mini { padding: 6px 14px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; color: #aaa; cursor: pointer; transition: all 0.2s ease; }
.pill-mini.active { background: #000; color: #fff; }

/* EMPTY STATE */
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 40px 20px; color: #ccc; }
.empty-icon { font-size: 48px; }
.empty-state p { font-size: 0.9rem; font-weight: 600; margin: 0; }

/* RECETAS */
.recipe-stack { display: flex; flex-direction: column; gap: 18px; }
.modern-recipe-card { background: #fff; border-radius: 24px; padding: 12px; display: flex; gap: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
.card-media { width: 100px; height: 100px; border-radius: 18px; overflow: hidden; position: relative; flex-shrink: 0; }
.card-media img { width: 100%; height: 100%; object-fit: cover; }
.glass-tag { position: absolute; bottom: 6px; left: 6px; right: 6px; background: rgba(255,255,255,0.8); backdrop-filter: blur(5px); font-size: 0.6rem; font-weight: 700; text-align: center; padding: 3px; border-radius: 8px; }
.card-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.card-title-row { display: flex; justify-content: space-between; align-items: center; }
.card-title-row h3 { font-size: 1.05rem; font-weight: 700; margin: 0; color: #1a1a1a; }
.h-icon { color: #f24e1e; font-size: 18px; }
.card-content p { font-size: 0.8rem; color: #888; margin: 4px 0 8px; line-height: 1.3; }
.card-footer-info { font-size: 0.7rem; color: #ccc; font-weight: 600; }

/* SKELETON */
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton-card { cursor: default; }
.skeleton-media { width: 100px; height: 100px; border-radius: 18px; flex-shrink: 0; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 800px 100%; animation: shimmer 1.4s infinite linear; }
.skeleton-content { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 10px; }
.skeleton-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 800px 100%; animation: shimmer 1.4s infinite linear; }
.skeleton-line.wide { width: 80%; }
.skeleton-line.medium { width: 55%; }
.skeleton-line.short { width: 30%; }

/* TAB BAR */
.floating-tabs { --background: #fff; height: 90px; border-top: 1px solid #f2f2f2; padding: 0 10px; }
.floating-tabs ion-icon { color: #000; font-size: 26px; }
.tab-active-wrapper { display: flex; flex-direction: column; align-items: center; gap: 3px; }
.avatar-tab { width: 32px; height: 32px; border-radius: 10px; overflow: hidden; border: 2px solid #000; transition: border-color 0.2s; }
.avatar-tab.active-avatar { border-color: #4f52ff; box-shadow: 0 0 0 2px rgba(79, 82, 255, 0.3); }
.avatar-tab img { width: 100%; height: 100%; object-fit: cover; }
.tab-dot { width: 5px; height: 5px; border-radius: 50%; background: #4f52ff; }
.home-btn-center { background: #000; color: #fff; padding: 10px 16px; border-radius: 18px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
.home-btn-center ion-icon { color: #fff; }
</style>
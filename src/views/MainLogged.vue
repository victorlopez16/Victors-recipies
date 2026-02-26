<template>
  <ion-page>

    <!-- ✅ MODAL PREVIEW DE RECETA -->
    <transition name="modal-fade">
      <div v-if="modalReceta" class="modal-overlay" @click.self="modalReceta = null">
        <div class="modal-card">
          <button class="modal-close-btn" @click="modalReceta = null">✕</button>
          <img :src="modalReceta.image" class="modal-img" />
          <div class="modal-body">
            <h3 class="modal-title">{{ modalReceta.title }}</h3>
            <p class="modal-desc">{{ modalReceta.description }}</p>

            <div class="modal-meta">
              <span class="modal-meta-chip">
                <ion-icon :icon="flameOutline" class="meta-icon flame-c"></ion-icon>
                {{ modalReceta.popularity }}%
              </span>
              <span class="modal-meta-chip">
                <ion-icon :icon="timeOutline" class="meta-icon"></ion-icon>
                {{ modalReceta.time }}
              </span>
            </div>

            <div class="modal-tags">
              <span v-for="t in modalReceta.tags" :key="t" class="modal-tag">{{ t }}</span>
            </div>

            <div class="modal-nutrition">
              <div class="nutrition-row" v-for="n in modalReceta.nutrition" :key="n.label">
                <span class="nut-label">{{ n.label }}</span>
                <div class="nut-bar-bg"><div class="nut-bar-fill" :style="{ width: n.pct + '%', background: n.color }"></div></div>
                <span class="nut-value">{{ n.value }}</span>
              </div>
            </div>

            <button class="modal-cta" @click="navegar('/RecetaLogged'); modalReceta = null">
              Ver receta completa
            </button>
          </div>
        </div>
      </div>
    </transition>

    <ion-header class="ion-no-border custom-header">
      <div class="header-content">
        <img :src="logoCubiertos" class="mini-logo" alt="Logo" />
        <ion-searchbar
          v-model="busqueda"
          placeholder="Encontrar recetas..."
          class="custom-searchbar"
          mode="md"
          @ionInput="onSearch"
        ></ion-searchbar>

        <ion-icon :icon="funnelOutline" class="filter-icon" id="trigger-filtro"></ion-icon>

        <ion-popover trigger="trigger-filtro" trigger-action="click" class="custom-popover">
          <div class="popover-container">
            <div
              class="popover-item"
              v-for="cat in ['Vegana', 'Mexicana', 'Saludable', 'Hipercalorica', 'Veraniega', 'Fit']"
              :key="cat"
              @click="toggleFiltro(cat)"
              :class="{ 'active-filter': filtrosActivos.includes(cat) }"
            >
              <div class="item-main">
                <ion-icon
                  :icon="filtrosActivos.includes(cat) ? checkmarkCircleOutline : checkmarkOutline"
                  class="check-icon"
                  :style="{ color: filtrosActivos.includes(cat) ? '#4ade80' : 'white' }"
                ></ion-icon>
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

          <!-- ✅ CARRUSEL AUTOMÁTICO -->
          <div class="carousel-wrapper">
            <transition-group name="carousel-fade" tag="div" class="carousel-inner">
              <div
                v-for="(recipe, index) in recetasSemanales"
                :key="'slide-' + index"
                v-show="carouselIndex === index"
                class="carousel-slide"
                @click="recipe.title === 'Pizza Margarita' ? navegar('/RecetaLogged') : abrirModal(listadoPrincipal[0])"
              >
                <img :src="recipe.image" class="carousel-img" />
                <div class="carousel-overlay">
                  <span class="carousel-title">{{ recipe.title }}</span>
                </div>
              </div>
            </transition-group>
            <div class="carousel-dots">
              <span
                v-for="(_, i) in recetasSemanales" :key="i"
                class="dot" :class="{ active: carouselIndex === i }"
                @click="carouselIndex = i"
              ></span>
            </div>
          </div>

          <div class="categories-scroll">
            <ion-chip
              v-for="chip in ['Mexicana','Argentina','Saludable','Vegana','Postres','Japonesa']"
              :key="chip"
              class="category-chip"
              :class="{ 'chip-active': filtrosActivos.includes(chip) }"
              @click="toggleFiltro(chip)"
            >{{ chip }}</ion-chip>
          </div>
        </div>

        <div class="vertical-scroll-area">

          <!-- ✅ LISTA FILTRADA -->
          <transition-group name="card-anim" tag="div">
            <div
              class="recipe-item-card"
              v-for="(item, index) in listaFiltrada"
              :key="item.title"
              :style="{ animationDelay: index * 55 + 'ms' }"
              @click="abrirModal(item)"
            >
              <div class="image-container">
                <img :src="item.image" :alt="item.title" />
                <div class="popularity-badge">
                  <ion-icon :icon="flameOutline" class="flame-icon"></ion-icon>
                  <span>{{ item.popularity }}%</span>
                </div>
                <div class="time-badge">
                  <ion-icon :icon="timeOutline" class="time-icon"></ion-icon>
                  <span>{{ item.time }}</span>
                </div>
                <ion-icon :icon="heartOutline" class="heart-icon"></ion-icon>
              </div>

              <div class="recipe-info">
                <div class="info-top">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.description }}</p>
                </div>
                <div class="tag-row">
                  <span v-for="tag in item.tags" :key="tag" class="recipe-tag">{{ tag }}</span>
                </div>
                <div class="nutrition-section">
                  <div class="nutrition-row" v-for="n in item.nutrition" :key="n.label">
                    <span class="nut-label">{{ n.label }}</span>
                    <div class="nut-bar-bg">
                      <div class="nut-bar-fill" :style="{ width: n.pct + '%', background: n.color }"></div>
                    </div>
                    <span class="nut-value">{{ n.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>

          <!-- Estado vacío -->
          <div v-if="listaFiltrada.length === 0" class="empty-state">
            <ion-icon :icon="searchOutline" class="empty-icon"></ion-icon>
            <p>No se encontraron recetas</p>
          </div>

          <!-- ✅ ESTADÍSTICAS COMUNIDAD -->
          <div class="community-section">
            <h2 class="section-title-sm">La comunidad</h2>
            <div class="stats-row">
              <div class="stat-card">
                <span class="stat-num">12.4K</span>
                <span class="stat-label">Recetas</span>
              </div>
              <div class="stat-card">
                <span class="stat-num">8.1K</span>
                <span class="stat-label">Usuarios</span>
              </div>
              <div class="stat-card">
                <span class="stat-num">94K</span>
                <span class="stat-label">Likes</span>
              </div>
            </div>
          </div>

          <!-- ✅ TESTIMONIOS -->
          <div class="testimonios-section">
            <h2 class="section-title-sm">Lo que dicen</h2>
            <div class="testimonio-card" v-for="t in testimonios" :key="t.nombre">
              <div class="test-header">
                <img :src="t.avatar" class="test-avatar" />
                <div>
                  <p class="test-nombre">{{ t.nombre }}</p>
                  <div class="test-stars">★★★★★</div>
                </div>
              </div>
              <p class="test-texto">"{{ t.texto }}"</p>
            </div>
          </div>

        </div>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-tab-bar slot="bottom" class="custom-tab-bar">

        <ion-tab-button @click="navegar('/Perfil')">
          <div class="avatar-wrapper">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="Profile" />
          </div>
        </ion-tab-button>

        <ion-tab-button @click="navegar('/Chat')">
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button @click="navegar('/MainLogged')">
          <div class="home-wrapper">
            <ion-icon :icon="homeOutline"></ion-icon>
          </div>
        </ion-tab-button>

        <ion-tab-button @click="navegar('/CreadorRecetas')">
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button @click="navegar('/Alert')">
          <div class="alert-badge-wrap">
            <ion-icon :icon="alertCircleOutline"></ion-icon>
            <span class="alert-badge">{{ numAlertas }}</span>
          </div>
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
  IonPage, IonHeader, IonContent, IonSearchbar, IonIcon,
  IonChip, IonFooter, IonTabBar, IonTabButton, IonPopover, useIonRouter
} from '@ionic/vue';
import {
  funnelOutline, heartOutline, paperPlaneOutline,
  homeOutline, addCircleOutline, alertCircleOutline, searchOutline,
  checkmarkOutline, checkmarkCircleOutline, scanOutline, chevronForwardOutline,
  flameOutline, timeOutline
} from 'ionicons/icons';
import { ref, computed, onMounted, onUnmounted } from 'vue';

import logoCubiertos from '@/assets/LogoCubiertos.png';
import ArandanosGofres from '@/assets/ArandanosGofres.png';

const router = useIonRouter();
const navegar = (ruta: string) => router.navigate(ruta, 'forward', 'push');

const numAlertas = ref(4);

// ── Búsqueda + filtros ────────────────────────────────────────
const busqueda      = ref('');
const filtrosActivos = ref<string[]>([]);
const onSearch      = (e: any) => { busqueda.value = e.target.value ?? ''; };
const toggleFiltro  = (cat: string) => {
  const idx = filtrosActivos.value.indexOf(cat);
  idx === -1 ? filtrosActivos.value.push(cat) : filtrosActivos.value.splice(idx, 1);
};

// ── Carrusel automático ───────────────────────────────────────
const carouselIndex = ref(0);
let carouselTimer: ReturnType<typeof setInterval>;
onMounted(()  => { carouselTimer = setInterval(() => { carouselIndex.value = (carouselIndex.value + 1) % recetasSemanales.length; }, 3200); });
onUnmounted(() => clearInterval(carouselTimer));

// ── Modal ─────────────────────────────────────────────────────
interface Receta {
  title: string; description: string; image: string;
  tags: string[]; popularity: number; time: string;
  nutrition: { label: string; value: string; pct: number; color: string }[];
}
const modalReceta = ref<Receta | null>(null);
const abrirModal  = (r: Receta) => { modalReceta.value = r; };

// ── Datos ─────────────────────────────────────────────────────
const recetasSemanales = [
  { title: 'Pizza Margarita', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500' },
  { title: 'Burger Deluxe',   image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500' },
  { title: 'Sushi Mix',       image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500' },
];

const listadoPrincipal: Receta[] = [
  {
    title: 'Gofres con miel', description: 'Gofres con miel, plátano y arándanos',
    image: ArandanosGofres, tags: ['Dulce', 'Saludable'], time: '20 min', popularity: 87,
    nutrition: [
      { label: 'Prot', value: '8g',  pct: 40, color: '#4ade80' },
      { label: 'Carb', value: '52g', pct: 70, color: '#facc15' },
      { label: 'Gras', value: '12g', pct: 30, color: '#f87171' },
    ]
  },
  {
    title: 'Tacos Al Pastor', description: 'Deliciosos tacos con piña y cilantro fresco',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500',
    tags: ['Mexicana', 'Picante'], time: '35 min', popularity: 94,
    nutrition: [
      { label: 'Prot', value: '22g', pct: 65, color: '#4ade80' },
      { label: 'Carb', value: '30g', pct: 45, color: '#facc15' },
      { label: 'Gras', value: '18g', pct: 40, color: '#f87171' },
    ]
  },
  {
    title: 'Pasta Carbonara', description: 'Pasta italiana tradicional con guanciale y huevo',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=500',
    tags: ['Italiana', 'Pasta'], time: '25 min', popularity: 91,
    nutrition: [
      { label: 'Prot', value: '18g', pct: 55, color: '#4ade80' },
      { label: 'Carb', value: '68g', pct: 85, color: '#facc15' },
      { label: 'Gras', value: '24g', pct: 55, color: '#f87171' },
    ]
  },
  {
    title: 'Poke Bowl Salmón', description: 'Bowl de arroz con salmón marinado y aguacate',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500',
    tags: ['Fit', 'Saludable'], time: '15 min', popularity: 89,
    nutrition: [
      { label: 'Prot', value: '28g', pct: 75, color: '#4ade80' },
      { label: 'Carb', value: '40g', pct: 55, color: '#facc15' },
      { label: 'Gras', value: '14g', pct: 32, color: '#f87171' },
    ]
  },
];

// ── Lista filtrada ────────────────────────────────────────────
const listaFiltrada = computed(() => {
  const q = busqueda.value.toLowerCase().trim();
  return listadoPrincipal.filter(item => {
    const matchSearch = !q ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q));
    const matchFiltro = filtrosActivos.value.length === 0 ||
      item.tags.some(t => filtrosActivos.value.includes(t));
    return matchSearch && matchFiltro;
  });
});

// ── Testimonios ───────────────────────────────────────────────
const testimonios = [
  { nombre: 'Laura M.',  avatar: 'https://i.pravatar.cc/80?img=47', texto: 'Desde que uso esta app cocino algo nuevo cada día. ¡Increíble!' },
  { nombre: 'Dani G.',   avatar: 'https://i.pravatar.cc/80?img=3',  texto: 'Las recetas son súper fáciles de seguir. 100% recomendado.' },
  { nombre: 'Carlos R.', avatar: 'https://i.pravatar.cc/80?img=7',  texto: 'Encontré recetas que nunca hubiera imaginado. La comunidad es genial.' },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&display=swap');

.no-click { cursor: default !important; }

/* ── Popover ─────────────────────────────────────── */
.custom-popover { --background: rgba(130,130,130,0.95); --width: 250px; }
.popover-container { padding: 10px; color: white; }
.popover-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 5px; border-bottom: 0.5px solid rgba(255,255,255,0.2);
  cursor: pointer; border-radius: 6px; transition: background 0.15s;
}
.popover-item.active-filter { background: rgba(255,255,255,0.1); }
.item-main { display: flex; align-items: center; gap: 10px; }
.item-icons { display: flex; gap: 8px; opacity: 0.7; }
.check-icon { font-size: 20px; transition: color 0.2s; }
.small-icon { font-size: 16px; }

/* ── Layout ──────────────────────────────────────── */
.main-layout { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
.static-section { flex-shrink: 0; padding: 10px 16px; background: #fff; }
.vertical-scroll-area { flex-grow: 1; overflow-y: auto; padding: 0 16px 10px; }
.main-content-bg { --background: #ffffff; font-family: 'Jost', sans-serif; }

/* ── Header ──────────────────────────────────────── */
.custom-header { background: #ffffff; padding: 10px 16px 0; }
.header-content { display: flex; align-items: center; gap: 8px; }
.mini-logo { width: 42px; height: 42px; border: 1.5px solid #000; border-radius: 50%; padding: 2px; }
.custom-searchbar { --background: #ffffff; border: 1px solid #e0e0e0; border-radius: 20px; flex: 1; }
.filter-icon { font-size: 28px; color: #000; cursor: pointer; }

/* ── Carrusel ────────────────────────────────────── */
.carousel-wrapper {
  position: relative; border-radius: 20px; overflow: hidden;
  height: 160px; margin-bottom: 10px;
}
.carousel-inner {
  position: relative; width: 100%; height: 100%;
}
.carousel-slide {
  position: absolute; inset: 0; cursor: pointer;
}
.carousel-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.carousel-overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.65));
  padding: 20px 14px 10px;
}
.carousel-title { color: #fff; font-weight: 700; font-size: 1.05rem; display: block; }
.carousel-dots  { position: absolute; bottom: 8px; right: 12px; display: flex; gap: 5px; z-index: 2; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.2s; }
.dot.active { background: #fff; width: 18px; border-radius: 4px; }

/* Transición fade del carrusel */
.carousel-fade-enter-active, .carousel-fade-leave-active { transition: opacity 0.5s ease; }
.carousel-fade-enter-from, .carousel-fade-leave-to { opacity: 0; }
.carousel-fade-enter-to, .carousel-fade-leave-from { opacity: 1; }

/* ── Chips ───────────────────────────────────────── */
.section-title { font-weight: 700; font-size: 1.4rem; margin: 10px 0; color: #000; }
.categories-scroll { display: flex; overflow-x: auto; gap: 10px; padding: 10px 0; flex-wrap: nowrap; -webkit-overflow-scrolling: touch; }
.categories-scroll::-webkit-scrollbar { display: none; }
.category-chip { --background: #000; --color: #fff; border-radius: 12px; padding: 8px 25px; flex-shrink: 0; cursor: pointer; transition: opacity 0.2s; }
.chip-active { opacity: 0.55; box-shadow: 0 0 0 2px #000; }

/* ── Cards ───────────────────────────────────────── */
.card-anim-enter-active { animation: cardIn 0.35s ease both; }
.card-anim-leave-active { transition: all 0.2s ease; }
.card-anim-leave-to     { opacity: 0; transform: translateX(-16px); }
@keyframes cardIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

.recipe-item-card {
  display: flex; background: #fff; border-radius: 20px;
  margin-bottom: 16px; height: 148px; border: 1px solid #f0f0f0;
  overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  cursor: pointer;
}
.image-container { width: 36%; position: relative; flex-shrink: 0; }
.image-container img { width: 100%; height: 100%; object-fit: cover; }

.popularity-badge {
  position: absolute; top: 8px; left: 8px;
  background: rgba(0,0,0,0.65); color: #fff;
  border-radius: 20px; padding: 3px 8px;
  font-size: 0.68rem; font-weight: 700;
  display: flex; align-items: center; gap: 3px; backdrop-filter: blur(4px);
}
.flame-icon { font-size: 12px; color: #ff6b35; }
.time-badge {
  position: absolute; bottom: 8px; left: 8px;
  background: rgba(255,255,255,0.88); color: #000;
  border-radius: 20px; padding: 3px 8px;
  font-size: 0.68rem; font-weight: 600;
  display: flex; align-items: center; gap: 3px; backdrop-filter: blur(4px);
}
.time-icon { font-size: 12px; color: #555; }
.heart-icon { position: absolute; top: 8px; right: 8px; color: white; font-size: 20px; filter: drop-shadow(0 1px 3px rgba(0,0,0,0.4)); }

.recipe-info { padding: 10px 12px; width: 64%; display: flex; flex-direction: column; justify-content: space-between; }
.info-top h3 { margin: 0 0 2px; font-size: 1rem; font-weight: 700; color: #000; }
.info-top p  { font-size: 0.75rem; color: #777; margin: 0 0 6px; line-height: 1.3; }
.tag-row     { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 6px; }
.recipe-tag  { background: #000; color: #fff; font-size: 0.6rem; padding: 2px 9px; border-radius: 15px; }
.nutrition-section { display: flex; flex-direction: column; gap: 3px; }
.nutrition-row     { display: flex; align-items: center; gap: 5px; }
.nut-label  { font-size: 0.58rem; font-weight: 600; color: #555; width: 26px; flex-shrink: 0; }
.nut-bar-bg { flex: 1; height: 5px; background: #f0f0f0; border-radius: 10px; overflow: hidden; }
.nut-bar-fill { height: 100%; border-radius: 10px; }
.nut-value  { font-size: 0.58rem; color: #555; width: 26px; text-align: right; flex-shrink: 0; }

/* ── Estado vacío ────────────────────────────────── */
.empty-state { display: flex; flex-direction: column; align-items: center; padding: 40px 0; color: #bbb; gap: 8px; }
.empty-icon  { font-size: 44px; opacity: 0.4; }
.empty-state p { font-size: 0.9rem; margin: 0; }

/* ── Comunidad ───────────────────────────────────── */
.community-section { margin: 8px 0 20px; }
.section-title-sm  { font-weight: 700; font-size: 1.1rem; color: #000; margin: 0 0 12px; }
.stats-row { display: flex; gap: 10px; }
.stat-card {
  flex: 1; background: #f7f7f7; border-radius: 16px;
  padding: 14px 10px; text-align: center; border: 1px solid #f0f0f0;
  display: flex; flex-direction: column; gap: 4px;
}
.stat-num   { font-size: 1.3rem; font-weight: 700; color: #000; }
.stat-label { font-size: 0.72rem; color: #aaa; font-weight: 600; }

/* ── Testimonios ─────────────────────────────────── */
.testimonios-section { padding-bottom: 20px; }
.testimonio-card {
  background: #f9f9f9; border-radius: 18px; padding: 16px;
  margin-bottom: 12px; border: 1px solid #f0f0f0;
}
.test-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.test-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid #e0e0e0; }
.test-nombre { margin: 0; font-weight: 700; font-size: 0.9rem; color: #000; }
.test-stars  { color: #f5a623; font-size: 0.85rem; }
.test-texto  { margin: 0; font-size: 0.83rem; color: #555; line-height: 1.5; font-style: italic; }

/* ── Modal ───────────────────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.55); backdrop-filter: blur(6px);
  display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 0;
}
.modal-card {
  background: #fff; border-radius: 28px 28px 0 0; width: 100%;
  max-width: 560px; position: relative; max-height: 90vh; overflow-y: auto;
  animation: slideUp 0.35s cubic-bezier(0.34,1.2,0.64,1) both;
}
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
.modal-close-btn {
  position: absolute; top: 14px; right: 16px; z-index: 2;
  background: rgba(0,0,0,0.5); color: #fff; border: none;
  width: 30px; height: 30px; border-radius: 50%; font-size: 14px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.modal-img  { width: 100%; height: 200px; object-fit: cover; }
.modal-body { padding: 16px 20px 28px; }
.modal-title { margin: 0 0 6px; font-size: 1.2rem; font-weight: 700; color: #000; }
.modal-desc  { margin: 0 0 12px; font-size: 0.85rem; color: #777; line-height: 1.4; }
.modal-meta  { display: flex; gap: 8px; margin-bottom: 12px; }
.modal-meta-chip {
  display: inline-flex; align-items: center; gap: 4px;
  background: #f5f5f5; border-radius: 10px; padding: 4px 10px;
  font-size: 0.8rem; font-weight: 600; color: #333;
}
.meta-icon  { font-size: 13px; }
.flame-c    { color: #ff6b35; }
.modal-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
.modal-tag  { background: #000; color: #fff; font-size: 0.62rem; padding: 3px 10px; border-radius: 12px; }
.modal-nutrition { margin-bottom: 18px; display: flex; flex-direction: column; gap: 5px; }
.modal-cta {
  width: 100%; background: #000; color: #fff; border: none;
  border-radius: 16px; padding: 14px; font-family: 'Jost', sans-serif;
  font-size: 0.95rem; font-weight: 700; cursor: pointer;
  transition: opacity 0.2s;
}
.modal-cta:active { opacity: 0.8; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* ── Tab bar ─────────────────────────────────────── */
.custom-tab-bar { --background: #fff; height: 75px; border-top: 1px solid #f0f0f0; }
.custom-tab-bar ion-icon { color: black; font-size: 26px; }
.avatar-wrapper { width: 30px; height: 30px; border-radius: 50%; overflow: hidden; border: 1px solid #000; cursor: pointer; }
.avatar-wrapper img { width: 100%; height: 100%; object-fit: cover; }
.home-wrapper { border: 2px solid #000; border-radius: 12px; padding: 4px 10px; display: flex; align-items: center; }
.alert-badge-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
.alert-badge {
  position: absolute; top: -8px; right: -10px;
  background: #ff3b30; color: #fff; font-size: 0.6rem; font-weight: 700;
  min-width: 16px; height: 16px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px; border: 1.5px solid #fff; font-family: 'Jost', sans-serif;
}

/* ── Landscape ───────────────────────────────────── */
@media (orientation: landscape) and (max-height: 500px) {
  .custom-header { padding: 6px 16px 0; }
  .mini-logo { width: 32px; height: 32px; }
  .custom-tab-bar { height: 52px; }
  .custom-tab-bar ion-icon { font-size: 20px; }
  .avatar-wrapper { width: 24px; height: 24px; }
  .home-wrapper { padding: 2px 8px; }
  .static-section { padding: 6px 16px; }
  .section-title { font-size: 1rem; margin: 4px 0; }
  .carousel-wrapper { height: 110px; }
  .category-chip { padding: 4px 14px; font-size: 0.8rem; }
  .categories-scroll { padding: 4px 0; }
  .recipe-item-card { height: 110px; margin-bottom: 10px; }
  .info-top h3 { font-size: 0.88rem; }
  .info-top p  { font-size: 0.68rem; }
  .recipe-tag  { font-size: 0.55rem; padding: 2px 7px; }
  .nut-label, .nut-value { font-size: 0.52rem; }
}
</style>
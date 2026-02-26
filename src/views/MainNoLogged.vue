<template>
  <ion-page>

    <!-- ✅ MODAL PREVIEW BLOQUEADO -->
    <transition name="modal-fade">
      <div v-if="modalReceta" class="modal-overlay" @click.self="modalReceta = null">
        <div class="modal-card">
          <img :src="modalReceta.image" class="modal-img" />
          <div class="modal-blur-overlay">
            <ion-icon :icon="lockClosedOutline" class="modal-lock"></ion-icon>
            <h3>Contenido exclusivo</h3>
            <p>Regístrate gratis para ver esta receta completa</p>
            <button class="modal-cta" @click="navegar('/Pleaselogin')">Crear cuenta gratis</button>
            <button class="modal-login" @click="navegar('/Pleaselogin')">Ya tengo cuenta</button>
          </div>
          <div class="modal-header-info">
            <h4>{{ modalReceta.title }}</h4>
            <div class="modal-tags">
              <span v-for="t in modalReceta.tags" :key="t" class="modal-tag">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <ion-header class="ion-no-border custom-header">
      <div class="header-content">
        <img :src="logoCubiertos" class="mini-logo" alt="Logo" />

        <!-- ✅ BÚSQUEDA CON BLOQUEO -->
        <div class="search-wrapper" @click="mostrarBloqueoBusqueda = true">
          <ion-icon :icon="searchOutline" class="search-inner-icon"></ion-icon>
          <span class="search-placeholder">Encontrar recetas...</span>
        </div>

        <ion-icon :icon="funnelOutline" class="filter-icon" @click="mostrarBloqueoBusqueda = true"></ion-icon>
      </div>

      <!-- Aviso bloqueo búsqueda -->
      <transition name="slide-down">
        <div v-if="mostrarBloqueoBusqueda" class="search-block-banner">
          <ion-icon :icon="lockClosedOutline" class="block-icon"></ion-icon>
          <span>Regístrate para buscar recetas</span>
          <button class="block-cta" @click="navegar('/Pleaselogin')">Unirme</button>
          <ion-icon :icon="closeOutline" class="block-close" @click="mostrarBloqueoBusqueda = false"></ion-icon>
        </div>
      </transition>
    </ion-header>

    <ion-content :fullscreen="true" class="main-content-bg" :scroll-y="false">
      <div class="main-layout">

        <div class="static-section">
          <h2 class="section-title">Recetas de la semana</h2>

          <!-- ✅ CARRUSEL AUTOMÁTICO -->
          <div class="carousel-wrapper">
            <div class="carousel-track" :style="{ transform: `translateX(-${carouselIndex * 100}%)` }">
              <div
                class="carousel-slide"
                v-for="(recipe, index) in recetasSemanales"
                :key="'c-' + index"
                @click="abrirModal(recipe)"
              >
                <img :src="recipe.image" class="carousel-img" />
                <div class="carousel-overlay">
                  <span class="carousel-title">{{ recipe.title }}</span>
                  <div class="carousel-tags">
                    <span v-for="t in recipe.tags" :key="t" class="carousel-tag">{{ t }}</span>
                  </div>
                </div>
                <div class="carousel-lock">
                  <ion-icon :icon="lockClosedOutline"></ion-icon>
                </div>
              </div>
            </div>
            <!-- Dots -->
            <div class="carousel-dots">
              <span
                v-for="(_, i) in recetasSemanales" :key="i"
                class="dot" :class="{ active: carouselIndex === i }"
                @click="carouselIndex = i"
              ></span>
            </div>
          </div>

          <div class="categories-scroll">
            <ion-chip class="category-chip" @click="mostrarBloqueoBusqueda = true">Mexicana</ion-chip>
            <ion-chip class="category-chip" @click="mostrarBloqueoBusqueda = true">Argentina</ion-chip>
            <ion-chip class="category-chip" @click="mostrarBloqueoBusqueda = true">Saludable</ion-chip>
            <ion-chip class="category-chip" @click="mostrarBloqueoBusqueda = true">Vegana</ion-chip>
          </div>
        </div>

        <!-- ✅ CARDS CON BLUR -->
        <div class="vertical-scroll-area">

          <div
            class="recipe-item-card"
            v-for="(receta, i) in recetasLista"
            :key="'r-' + i"
            @click="abrirModal(receta)"
          >
            <div class="image-container">
              <img :src="receta.image" :alt="receta.title" />
              <ion-icon :icon="heartOutline" class="heart-icon"></ion-icon>
            </div>
            <div class="recipe-info" :class="{ blurred: i > 0 }">
              <h3>{{ receta.title }}</h3>
              <p>{{ receta.description }}</p>
              <div class="tag-row">
                <span class="recipe-tag" v-for="t in receta.tags" :key="t">{{ t }}</span>
              </div>
            </div>
            <!-- Overlay blur en cards 2+ -->
            <div v-if="i > 0" class="card-lock-overlay" @click.stop="navegar('/Pleaselogin')">
              <ion-icon :icon="lockClosedOutline" class="card-lock-icon"></ion-icon>
              <span>Regístrate para ver</span>
            </div>
          </div>

          <!-- ✅ TESTIMONIOS -->
          <div class="testimonios-section">
            <h2 class="section-title" style="margin-bottom: 12px;">Lo que dice la comunidad</h2>
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

    <!-- ✅ BANNER INFERIOR REDISEÑADO -->
    <ion-footer class="ion-no-border">
      <div class="join-banner">
        <div class="banner-left">
          <p class="banner-title">¡Únete gratis!</p>
          <p class="banner-sub">+12.000 recetas te esperan</p>
        </div>
        <div class="banner-btns">
          <button class="btn-register" @click="navegar('/Register')">Crear cuenta</button>
          <button class="btn-login-sm" @click="navegar('/Pleaselogin')">Entrar</button>
        </div>
      </div>

      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button @click="navegar('/Pleaselogin')"><ion-icon :icon="personOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/Pleaselogin')"><ion-icon :icon="paperPlaneOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/Pleaselogin')"><div class="home-wrapper"><ion-icon :icon="homeOutline"></ion-icon></div></ion-tab-button>
        <ion-tab-button @click="navegar('/Pleaselogin')"><ion-icon :icon="addCircleOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="navegar('/Pleaselogin')"><ion-icon :icon="alertCircleOutline"></ion-icon></ion-tab-button>
        <ion-tab-button @click="mostrarBloqueoBusqueda = true"><ion-icon :icon="searchOutline"></ion-icon></ion-tab-button>
      </ion-tab-bar>
    </ion-footer>

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonContent, IonIcon,
  IonChip, IonFooter, IonTabBar, IonTabButton,
  useIonRouter
} from '@ionic/vue';
import {
  funnelOutline, heartOutline, personOutline, paperPlaneOutline,
  homeOutline, addCircleOutline, alertCircleOutline, searchOutline,
  lockClosedOutline, closeOutline
} from 'ionicons/icons';
import { ref, onMounted, onUnmounted } from 'vue';

import logoCubiertos from '@/assets/LogoCubiertos.png';
import ArandanosGofres from '@/assets/ArandanosGofres.png';

const ionRouter = useIonRouter();
const navegar = (ruta: string) => ionRouter.navigate(ruta, 'forward', 'push');

const mostrarBloqueoBusqueda = ref(false);

// ── Modal preview ─────────────────────────────────────────────
interface Receta { title: string; image: string; tags: string[]; description?: string; }
const modalReceta = ref<Receta | null>(null);
const abrirModal  = (r: Receta) => { modalReceta.value = r; };

// ── Carrusel automático ───────────────────────────────────────
const carouselIndex = ref(0);
let carouselTimer: ReturnType<typeof setInterval>;

onMounted(() => {
  carouselTimer = setInterval(() => {
    carouselIndex.value = (carouselIndex.value + 1) % recetasSemanales.length;
  }, 3000);
});
onUnmounted(() => clearInterval(carouselTimer));

// ── Datos ─────────────────────────────────────────────────────
const recetasSemanales: Receta[] = [
  { title: 'Pizza Margarita', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500', tags: ['Italiana', 'Clásica'] },
  { title: 'Burger Deluxe',   image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500', tags: ['Americana', 'Rápida'] },
  { title: 'Sushi Mix',       image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500', tags: ['Japonesa', 'Fit'] },
  { title: 'Pasta Pesto',     image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500', tags: ['Italiana', 'Pasta'] },
  { title: 'Ensalada Fit',    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500', tags: ['Saludable', 'Vegana'] },
];

const recetasLista = [
  { title: 'Gofres con miel',  description: 'Gofres con miel, plátano y arándanos', image: ArandanosGofres, tags: ['Dulce', 'Saludable'] },
  { title: 'Tacos Al Pastor',  description: 'Deliciosos tacos con piña y cilantro',  image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500', tags: ['Mexicana', 'Picante'] },
  { title: 'Pasta Carbonara',  description: 'Pasta italiana con guanciale y huevo',  image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=500', tags: ['Italiana', 'Pasta'] },
];

const testimonios = [
  { nombre: 'Laura M.',   avatar: 'https://i.pravatar.cc/80?img=47', texto: 'Desde que uso esta app cocino cada día algo nuevo. ¡Increíble!' },
  { nombre: 'Dani G.',    avatar: 'https://i.pravatar.cc/80?img=3',  texto: 'Las recetas son súper fáciles de seguir. 100% recomendado.' },
  { nombre: 'Carlos R.',  avatar: 'https://i.pravatar.cc/80?img=7',  texto: 'Encontré recetas que nunca hubiera imaginado. La comunidad es genial.' },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&display=swap');

.no-click { cursor: default !important; }
.main-content-bg { --background: #ffffff; font-family: 'Jost', sans-serif; }
.main-layout { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
.static-section { flex-shrink: 0; padding: 10px 16px; background: #fff; }
.vertical-scroll-area { flex-grow: 1; overflow-y: auto; padding: 0 16px 10px; }

/* ── Header ──────────────────────────────────────────────── */
.custom-header { background: #fff; padding: 10px 16px 0; }
.header-content { display: flex; align-items: center; gap: 8px; }
.mini-logo { width: 42px; height: 42px; border: 1.5px solid #000; border-radius: 50%; padding: 2px; }
.search-wrapper {
  flex: 1; height: 42px; background: #f4f4f6; border-radius: 16px;
  display: flex; align-items: center; gap: 8px; padding: 0 14px; cursor: pointer;
}
.search-inner-icon { color: #999; font-size: 18px; }
.search-placeholder { color: #aaa; font-size: 0.9rem; }
.filter-icon { font-size: 28px; color: #000; cursor: pointer; }

/* Bloqueo búsqueda */
.search-block-banner {
  display: flex; align-items: center; gap: 10px;
  background: #000; color: #fff; padding: 10px 16px;
  font-size: 0.85rem; font-weight: 600;
}
.block-icon { font-size: 18px; flex-shrink: 0; }
.search-block-banner span { flex: 1; }
.block-cta {
  background: #fff; color: #000; border: none; border-radius: 12px;
  padding: 5px 14px; font-weight: 700; font-size: 0.82rem;
  font-family: 'Jost', sans-serif; cursor: pointer;
}
.block-close { font-size: 20px; cursor: pointer; opacity: 0.7; }
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Carrusel ────────────────────────────────────────────── */
.carousel-wrapper {
  position: relative; border-radius: 20px; overflow: hidden;
  height: 180px; margin-bottom: 10px;
}
.carousel-track {
  display: flex; height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.carousel-slide {
  min-width: 100%; position: relative; cursor: pointer; flex-shrink: 0;
}
.carousel-img { width: 100%; height: 100%; object-fit: cover; }
.carousel-overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  padding: 20px 14px 10px;
}
.carousel-title { color: #fff; font-weight: 700; font-size: 1.1rem; display: block; }
.carousel-tags { display: flex; gap: 6px; margin-top: 4px; }
.carousel-tag { background: rgba(255,255,255,0.25); color: #fff; font-size: 0.65rem; padding: 2px 8px; border-radius: 10px; backdrop-filter: blur(4px); }
.carousel-lock {
  position: absolute; top: 10px; right: 10px;
  background: rgba(0,0,0,0.5); color: #fff;
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; backdrop-filter: blur(4px);
}
.carousel-dots { position: absolute; bottom: 8px; right: 12px; display: flex; gap: 5px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.2s; }
.dot.active { background: #fff; width: 18px; border-radius: 4px; }

/* ── Chips ───────────────────────────────────────────────── */
.categories-scroll { display: flex; overflow-x: auto; gap: 10px; padding: 10px 0; flex-wrap: nowrap; }
.categories-scroll::-webkit-scrollbar { display: none; }
.category-chip { --background: #000; --color: #fff; border-radius: 12px; padding: 8px 25px; flex-shrink: 0; cursor: pointer; }

/* ── Cards lista ─────────────────────────────────────────── */
.recipe-item-card {
  display: flex; background: #fff; border-radius: 18px; margin-bottom: 14px;
  height: 120px; border: 1px solid #f5f5f5; overflow: hidden; cursor: pointer;
  position: relative;
}
.image-container { width: 38%; position: relative; flex-shrink: 0; }
.image-container img { width: 100%; height: 100%; object-fit: cover; }
.heart-icon { position: absolute; top: 8px; left: 8px; color: white; font-size: 20px; }

.recipe-info { padding: 10px; width: 62%; display: flex; flex-direction: column; justify-content: center; }
.recipe-info h3 { margin: 0; font-size: 1.1rem; font-weight: 700; color: #000; }
.recipe-info p { font-size: 0.8rem; color: #666; margin: 4px 0 8px; }
.recipe-tag { background: #000; color: #fff; font-size: 0.65rem; padding: 3px 10px; border-radius: 15px; margin-right: 4px; }

/* Blur en cards bloqueadas */
.recipe-info.blurred { filter: blur(4px); user-select: none; pointer-events: none; }
.card-lock-overlay {
  position: absolute; inset: 0;
  background: rgba(255,255,255,0.15);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 4px; cursor: pointer;
  /* solo cubre la parte de info */
  left: 38%;
}
.card-lock-icon { font-size: 22px; color: #000; }
.card-lock-overlay span { font-size: 0.75rem; font-weight: 700; color: #000; }

/* ── Testimonios ─────────────────────────────────────────── */
.testimonios-section { padding: 10px 0 20px; }
.section-title { font-weight: 700; font-size: 1.2rem; color: #000; margin: 16px 0 8px; }
.testimonio-card {
  background: #f9f9f9; border-radius: 18px; padding: 16px;
  margin-bottom: 12px; border: 1px solid #f0f0f0;
}
.test-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.test-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid #e0e0e0; }
.test-nombre { margin: 0; font-weight: 700; font-size: 0.9rem; color: #000; }
.test-stars { color: #f5a623; font-size: 0.85rem; }
.test-texto { margin: 0; font-size: 0.85rem; color: #555; line-height: 1.5; font-style: italic; }

/* ── Banner inferior rediseñado ──────────────────────────── */
.join-banner {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 20px;
  background: linear-gradient(135deg, #000 0%, #333 100%);
  border-top-left-radius: 20px; border-top-right-radius: 20px;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
}
.banner-left { display: flex; flex-direction: column; gap: 2px; }
.banner-title { margin: 0; color: #fff; font-weight: 700; font-size: 1rem; }
.banner-sub   { margin: 0; color: rgba(255,255,255,0.6); font-size: 0.78rem; }
.banner-btns  { display: flex; gap: 8px; align-items: center; }
.btn-register {
  background: #fff; color: #000; border: none; border-radius: 14px;
  padding: 9px 18px; font-weight: 700; font-size: 0.88rem;
  font-family: 'Jost', sans-serif; cursor: pointer;
  box-shadow: 0 4px 12px rgba(255,255,255,0.15);
}
.btn-login-sm {
  background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.4);
  border-radius: 14px; padding: 9px 14px; font-weight: 600; font-size: 0.88rem;
  font-family: 'Jost', sans-serif; cursor: pointer;
}

/* ── Tab bar ─────────────────────────────────────────────── */
.custom-tab-bar { --background: #fff; height: 75px; border-top: 1px solid #f0f0f0; }
.custom-tab-bar ion-icon { color: black; font-size: 26px; }
.home-wrapper { border: 2px solid #000; border-radius: 12px; padding: 4px 10px; display: flex; align-items: center; }

/* ── Modal ───────────────────────────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.6); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center; padding: 24px;
}
.modal-card {
  background: #fff; border-radius: 28px; overflow: hidden;
  width: 100%; max-width: 360px;
  animation: popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
}
@keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.modal-img { width: 100%; height: 200px; object-fit: cover; filter: blur(6px) brightness(0.6); }
.modal-blur-overlay {
  position: absolute; top: 0; left: 0; right: 0; height: 200px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; padding: 16px; text-align: center;
}
.modal-lock { font-size: 36px; color: #fff; margin-bottom: 4px; }
.modal-blur-overlay h3 { margin: 0; color: #fff; font-size: 1.1rem; font-weight: 700; }
.modal-blur-overlay p  { margin: 0; color: rgba(255,255,255,0.8); font-size: 0.82rem; }
.modal-cta {
  background: #fff; color: #000; border: none; border-radius: 14px;
  padding: 9px 22px; font-weight: 700; font-size: 0.88rem;
  font-family: 'Jost', sans-serif; cursor: pointer; margin-top: 4px;
}
.modal-login {
  background: transparent; color: rgba(255,255,255,0.7); border: none;
  font-size: 0.8rem; cursor: pointer; font-family: 'Jost', sans-serif;
  text-decoration: underline;
}
.modal-header-info { padding: 14px 16px 18px; }
.modal-header-info h4 { margin: 0 0 8px; font-size: 1rem; font-weight: 700; color: #000; }
.modal-tags { display: flex; gap: 6px; }
.modal-tag { background: #000; color: #fff; font-size: 0.65rem; padding: 3px 10px; border-radius: 12px; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
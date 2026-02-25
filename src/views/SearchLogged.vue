<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
        
        <div class="search-header-container">
          <div class="search-input-wrapper">
            <ion-icon :icon="searchOutline" class="inner-search-icon"></ion-icon>
            <input 
              v-model="busqueda" 
              type="text" 
              placeholder="Encontrar recetas..." 
              class="minimal-input"
            />
          </div>
          <div class="filter-pill" @click="abrirFiltros">
            <ion-icon :icon="funnelOutline"></ion-icon>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="content">
      <div class="list-container">
        <div class="results-info" v-if="busqueda">
          <p>{{ recetasFiltradas.length }} resultados para "{{ busqueda }}"</p>
        </div>

        <div class="recipe-card" v-for="(receta, i) in recetasFiltradas" :key="i" @click="navegar('/RecipeDetail')">
          <div class="image-section">
            <img :src="receta.image" :alt="receta.title" />
            <div class="category-badge">{{ receta.tags[0] }}</div>
          </div>
          
          <div class="info-section">
            <div class="text-content">
              <h3>{{ receta.title }}</h3>
              <p>{{ receta.description }}</p>
            </div>
            <div class="tags-footer">
              <span class="mini-tag" v-for="tag in receta.tags" :key="tag">
                #{{ tag.toLowerCase() }}
              </span>
            </div>
          </div>
          
          <div class="arrow-section">
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </div>
        </div>

        <div class="no-results" v-if="recetasFiltradas.length === 0">
          <ion-icon :icon="searchOutline"></ion-icon>
          <h3>No hay coincidencias</h3>
          <p>Intenta con otras palabras clave.</p>
        </div>
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
          <ion-icon :icon="homeOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/AgregarReceta')">
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button class="tab-selected">
          <div class="active-pill">
            <ion-icon :icon="searchOutline"></ion-icon>
            <span class="tab-label">Explorar</span>
          </div>
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
  chevronBackOutline, funnelOutline, paperPlaneOutline,
  homeOutline, addCircleOutline, searchOutline, chevronForwardOutline
} from 'ionicons/icons';
import { ref, computed } from 'vue';
import ArandanosGofres from '@/assets/ArandanosGofres.png';

const ionRouter = useIonRouter();
const busqueda = ref('');

const navegarAtras = () => {
  ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainLogged', 'back', 'replace');
};

const navegar = (ruta: string) => {
  ionRouter.navigate(ruta, 'forward', 'replace');
};

const abrirFiltros = () => console.log('Abrir filtros');

const recetas = [
  { title: 'Gofres con miel', description: 'Gofres con miel, plátano y arándanos', image: ArandanosGofres, tags: ['Dulce', 'Saludable'] },
  { title: 'Tacos Al Pastor', description: 'Deliciosos tacos con piña y cilantro fresco', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=500', tags: ['Mexicana', 'Picante'] },
  { title: 'Pasta Carbonara', description: 'Pasta italiana tradicional con guanciale y huevo', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=500', tags: ['Italiana', 'Pasta'] },
  { title: 'Poke Bowl Salmón', description: 'Bowl de arroz con salmón marinado y aguacate', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500', tags: ['Fit', 'Saludable'] }
];

const recetasFiltradas = computed(() => {
  if (!busqueda.value.trim()) return recetas;
  return recetas.filter(r =>
    r.title.toLowerCase().includes(busqueda.value.toLowerCase()) ||
    r.tags.some(t => t.toLowerCase().includes(busqueda.value.toLowerCase()))
  );
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap');

/* FONDO Y TIPOGRAFÍA */
.content { --background: #fdfdfd; font-family: 'Jost', sans-serif; }
.white-toolbar { --background: #ffffff; padding-bottom: 10px; }
.black-icon { color: #000; font-size: 24px; }

/* BARRA DE BÚSQUEDA PERSONALIZADA (ESTILO SEARCHLOGGED) */
.search-header-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px 0 0;
  flex: 1;
}

.search-input-wrapper {
  flex: 1;
  background: #f4f4f6;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  gap: 10px;
}

.inner-search-icon { color: #999; font-size: 20px; }

.minimal-input {
  border: none;
  background: transparent;
  width: 100%;
  font-family: 'Jost', sans-serif;
  font-size: 0.95rem;
  color: #000;
  outline: none;
}

.filter-pill {
  width: 48px;
  height: 48px;
  background: #000;
  color: #fff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

/* LISTA Y TARJETAS */
.list-container { padding: 10px 18px 100px; }
.results-info { margin-bottom: 15px; color: #888; font-size: 0.9rem; font-weight: 500; }

.recipe-card {
  display: flex;
  background: #fff;
  border-radius: 24px;
  height: 135px;
  margin-bottom: 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.04);
  overflow: hidden;
  border: 1px solid #f0f0f0;
  transition: transform 0.2s;
}

.recipe-card:active { transform: scale(0.98); }

.image-section { width: 35%; position: relative; }
.image-section img { width: 100%; height: 100%; object-fit: cover; }
.category-badge {
  position: absolute; bottom: 8px; left: 8px;
  background: rgba(0,0,0,0.6); color: #fff;
  padding: 3px 8px; border-radius: 8px; font-size: 0.6rem;
  backdrop-filter: blur(4px); text-transform: uppercase;
  font-weight: 700;
}

.info-section {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.text-content h3 { margin: 0; font-size: 1.05rem; font-weight: 700; color: #000; }
.text-content p { 
  margin: 4px 0 0; font-size: 0.8rem; color: #666; 
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; 
  overflow: hidden; line-height: 1.3;
}

.tags-footer { display: flex; gap: 8px; }
.mini-tag { color: #4f52ff; font-weight: 600; font-size: 0.75rem; }

.arrow-section {
  display: flex; align-items: center; padding-right: 12px; color: #ccc;
}

/* ESTADO VACÍO */
.no-results { text-align: center; margin-top: 60px; color: #bbb; }
.no-results ion-icon { font-size: 60px; }
.no-results h3 { color: #888; margin-top: 10px; font-weight: 600; }

/* FOOTER CUSTOM (PILL STYLE) */
.custom-tab-bar { --background: #fff; height: 85px; border-top: 1px solid #f2f2f2; }
.custom-tab-bar ion-icon { color: #999; font-size: 24px; }

.active-pill {
  background: #000;
  padding: 8px 18px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
}

.active-pill ion-icon { color: #fff !important; font-size: 20px; }
.tab-label { font-size: 0.85rem; font-weight: 600; }

.avatar-wrapper { width: 32px; height: 32px; border-radius: 50%; overflow: hidden; border: 1.5px solid #eee; }
.avatar-wrapper img { width: 100%; height: 100%; object-fit: cover; }
</style>
<template>
  <ion-page>

    <!-- ✅ ANIMACIÓN DE ÉXITO -->
    <transition name="success-fade">
      <div v-if="publicado" class="success-overlay">
        <div class="success-card">
          <div class="success-icon-wrap">
            <ion-icon :icon="checkmarkCircle" class="success-icon"></ion-icon>
          </div>
          <h2>¡Receta publicada!</h2>
          <p>Tu receta ya está disponible para la comunidad.</p>
          <ion-button expand="block" class="success-btn" @click="irAMain">Ver recetas</ion-button>
        </div>
      </div>
    </transition>

    <ion-header class="ion-no-border">
      <ion-toolbar class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="header-title">Nueva Receta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="content">
      <div class="bg-shell">

        <!-- DECORACIÓN IZQUIERDA -->
        <div class="decor decor-left" aria-hidden="true">
          <svg viewBox="0 0 260 900" class="decor-svg">
            <path d="M78 70c0-22 18-40 40-40s40 18 40 40-18 40-40 40-40-18-40-40z" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10"/>
            <path d="M118 110v170" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <path d="M65 340c60-70 130-70 160 0-30 55-100 70-160 0z" fill="rgba(0,0,0,.04)"/>
            <path d="M85 340c35 30 75 35 115 0" fill="none" stroke="rgba(0,0,0,.07)" stroke-width="6" stroke-linecap="round"/>
            <path d="M70 470v160" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <path d="M70 470h55" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <path d="M70 500h55" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <path d="M70 530h55" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <circle cx="135" cy="720" r="65" fill="rgba(0,0,0,.03)" stroke="rgba(0,0,0,.08)" stroke-width="8"/>
            <path d="M135 655v130M70 720h130M90 675l90 90M180 675l-90 90" stroke="rgba(0,0,0,.06)" stroke-width="6" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- DECORACIÓN DERECHA -->
        <div class="decor decor-right" aria-hidden="true">
          <svg viewBox="0 0 260 900" class="decor-svg">
            <path d="M120 60c40 0 70 40 40 75l-75 90" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <path d="M60 245l-25 30" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <path d="M150 380c-20 70-20 140 0 210 70-10 110-60 120-120-35-55-70-80-120-90z" fill="rgba(0,0,0,.04)" stroke="rgba(0,0,0,.07)" stroke-width="6" stroke-linejoin="round"/>
            <path d="M150 380c-15-35-35-45-60-50" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="8" stroke-linecap="round"/>
            <path d="M150 420c30 25 55 60 70 105" fill="none" stroke="rgba(0,0,0,.06)" stroke-width="6" stroke-linecap="round"/>
            <path d="M95 680c0-18 14-32 32-32s32 14 32 32-14 32-32 32-32-14-32-32z" fill="rgba(0,0,0,.03)" stroke="rgba(0,0,0,.08)" stroke-width="8"/>
            <path d="M127 712v140" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="8" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="page-wrapper">
          <div class="form-container">

            <div class="section-header">
              <h1 class="main-title">Comparte tu sabor</h1>
              <p class="main-subtitle">Completa los detalles para publicar tu creación.</p>
            </div>

            <!-- Nombre -->
            <div class="form-group">
              <label class="input-label">Nombre de la receta</label>
              <div class="input-box-main" :class="{ 'input-error': errores.nombre }">
                <ion-input v-model="nombre" placeholder="Ej: Croquetas de la abuela" class="custom-input"></ion-input>
              </div>
              <span v-if="errores.nombre" class="error-msg">{{ errores.nombre }}</span>
            </div>

            <!-- ✅ FILA: Tiempo + Porciones + Dificultad -->
            <div class="meta-row">

              <!-- Tiempo de preparación -->
              <div class="meta-block">
                <label class="input-label">Tiempo</label>
                <div class="time-selector">
                  <button class="time-btn" @click="cambiarTiempo(-5)" :disabled="tiempoMin <= 5">−</button>
                  <span class="time-value">{{ tiempoMin }} min</span>
                  <button class="time-btn" @click="cambiarTiempo(5)">+</button>
                </div>
              </div>

              <!-- Porciones -->
              <div class="meta-block">
                <label class="input-label">Porciones</label>
                <div class="time-selector">
                  <button class="time-btn" @click="cambiarPorciones(-1)" :disabled="porciones <= 1">−</button>
                  <span class="time-value">{{ porciones }}</span>
                  <button class="time-btn" @click="cambiarPorciones(1)">+</button>
                </div>
              </div>

              <!-- Dificultad -->
              <div class="meta-block meta-dificultad">
                <label class="input-label">Dificultad</label>
                <div class="dificultad-selector">
                  <button
                    v-for="d in ['Fácil','Media','Difícil']"
                    :key="d"
                    class="dif-btn"
                    :class="{ 'dif-active': dificultad === d, ['dif-' + d.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')]: true }"
                    @click="dificultad = d"
                  >{{ d }}</button>
                </div>
              </div>

            </div>

            <!-- Ingredientes -->
            <div class="form-group">
              <div class="label-row">
                <label class="input-label">Ingredientes</label>
                <ion-button fill="clear" size="small" @click="agregarIngrediente" class="add-mini-btn">
                  <ion-icon slot="start" :icon="addOutline"></ion-icon> Añadir
                </ion-button>
              </div>
              <span v-if="errores.ingredientes" class="error-msg">{{ errores.ingredientes }}</span>
              <div class="list-container">
                <div class="input-gray-wrapper" v-for="(_, i) in ingredientes" :key="'ing-' + i">
                  <ion-input v-model="ingredientes[i]" placeholder="Cantidad e ingrediente" class="custom-input-gray"></ion-input>
                  <ion-icon :icon="closeOutline" class="remove-icon" @click="eliminarIngrediente(i)"></ion-icon>
                </div>
              </div>
            </div>

            <!-- Preparación + Pasos drag & drop -->
            <div class="form-group">
              <label class="input-label">Preparación</label>
              <div class="textarea-box">
                <ion-textarea
                  v-model="descripcion"
                  placeholder="Una breve descripción o secreto de la receta..."
                  :auto-grow="true"
                  class="custom-textarea">
                </ion-textarea>
              </div>
              <span v-if="errores.descripcion" class="error-msg">{{ errores.descripcion }}</span>

              <!-- ✅ DRAG & DROP PASOS -->
              <div class="steps-container">
                <div
                  v-for="(_, i) in pasos"
                  :key="'paso-' + i"
                  class="paso-row"
                  :class="{ 'dragging': dragIndex === i, 'drag-over': dragOverIndex === i }"
                  draggable="true"
                  @dragstart="onDragStart(i)"
                  @dragover.prevent="onDragOver(i)"
                  @drop="onDrop(i)"
                  @dragend="onDragEnd"
                >
                  <ion-icon :icon="reorderThreeOutline" class="drag-handle"></ion-icon>
                  <div class="paso-badge">{{ i + 1 }}</div>
                  <div class="input-gray-step">
                    <ion-input
                      v-model="pasos[i]"
                      :placeholder="pasosPlaceholders[i] || 'Siguiente paso...'"
                      class="custom-input-gray">
                    </ion-input>
                  </div>
                  <ion-icon :icon="closeOutline" class="remove-icon" @click="eliminarPaso(i)" v-if="pasos.length > 1"></ion-icon>
                </div>
                <ion-button fill="clear" size="small" @click="agregarPaso" class="add-mini-btn" style="margin-top:4px">
                  <ion-icon slot="start" :icon="addOutline"></ion-icon> Añadir paso
                </ion-button>
              </div>
            </div>

            <!-- Tags con sugerencias -->
            <div class="form-group">
              <label class="input-label">Etiquetas</label>
              <div class="tag-input-box">
                <ion-input
                  v-model="nuevoTag"
                  placeholder="Ej: Vegano, Rápido..."
                  class="custom-input-gray"
                  @ionInput="onTagInput"
                  @keyup.enter="agregarTagManual">
                </ion-input>
                <ion-button fill="clear" @click="agregarTagManual">
                  <ion-icon :icon="arrowForwardOutline"></ion-icon>
                </ion-button>
              </div>

              <!-- ✅ SUGERENCIAS DE TAGS -->
              <div class="tag-suggestions" v-if="sugerencias.length">
                <span
                  v-for="s in sugerencias"
                  :key="s"
                  class="tag-sugerencia"
                  @click="agregarSugerencia(s)"
                >+ {{ s }}</span>
              </div>

              <div class="tags-row">
                <div class="tag-pill" v-for="(tag, i) in tags" :key="'tag-' + i">
                  <span>{{ tag }}</span>
                  <ion-icon :icon="closeCircle" @click="eliminarTag(i)" class="tag-close"></ion-icon>
                </div>
              </div>
            </div>

            <!-- ✅ UPLOAD CON PREVIEW -->
            <div class="form-group">
              <label class="input-label">Fotos de la receta</label>

              <div class="upload-area" @click="triggerFileInput" v-if="imagenes.length === 0">
                <div class="upload-content">
                  <ion-icon :icon="cameraOutline" class="upload-icon"></ion-icon>
                  <span>Toca para subir imágenes</span>
                  <p>Formatos JPG o PNG (Max. 5MB)</p>
                </div>
              </div>

              <div v-else class="preview-grid">
                <div class="preview-item" v-for="(img, i) in imagenes" :key="'img-' + i">
                  <img :src="img" class="preview-img" />
                  <button class="preview-remove" @click="eliminarImagen(i)">✕</button>
                </div>
                <div class="preview-add" @click="triggerFileInput">
                  <ion-icon :icon="addOutline" class="add-img-icon"></ion-icon>
                </div>
              </div>

              <input
                ref="fileInput"
                type="file"
                accept="image/png, image/jpeg"
                multiple
                style="display:none"
                @change="onFileChange"
              />
            </div>

            <!-- Validación global -->
            <div class="error-banner" v-if="errorGlobal">
              <ion-icon :icon="alertCircleOutline" class="error-banner-icon"></ion-icon>
              <span>{{ errorGlobal }}</span>
            </div>

            <div class="action-footer">
              <ion-button expand="block" class="publish-btn" @click="publicar">
                Publicar Receta
              </ion-button>
            </div>

          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonButton,
  IonIcon, IonContent, IonInput, IonTextarea, IonTitle, useIonRouter
} from '@ionic/vue';
import {
  chevronBackOutline, cameraOutline, addOutline,
  closeOutline, closeCircle, arrowForwardOutline,
  reorderThreeOutline, checkmarkCircle, alertCircleOutline
} from 'ionicons/icons';
import { ref, reactive } from 'vue';

const ionRouter = useIonRouter();
const navegarAtras = () =>
  ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainLogged', 'back', 'replace');
const irAMain = () => ionRouter.navigate('/MainLogged', 'back', 'replace');

// ── Campos básicos ────────────────────────────────────────────
const nombre      = ref('');
const descripcion = ref('');
const tiempoMin   = ref(30);
const porciones   = ref(2);
const dificultad  = ref('Fácil');

const cambiarTiempo   = (delta: number) => { tiempoMin.value = Math.max(5, tiempoMin.value + delta); };
const cambiarPorciones = (delta: number) => { porciones.value = Math.max(1, porciones.value + delta); };

// ── Ingredientes ──────────────────────────────────────────────
const ingredientes = ref(['', '']);
const agregarIngrediente  = () => ingredientes.value.push('');
const eliminarIngrediente = (i: number) => ingredientes.value.splice(i, 1);

// ── Pasos drag & drop ─────────────────────────────────────────
const pasos = ref(['', '', '']);
const pasosPlaceholders = ['Empezamos por...', 'Luego debemos...', 'Finalmente...'];
const agregarPaso  = () => pasos.value.push('');
const eliminarPaso = (i: number) => { if (pasos.value.length > 1) pasos.value.splice(i, 1); };

const dragIndex     = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);

const onDragStart = (i: number) => { dragIndex.value = i; };
const onDragOver  = (i: number) => { dragOverIndex.value = i; };
const onDrop      = (i: number) => {
  if (dragIndex.value === null || dragIndex.value === i) return;
  const arr = [...pasos.value];
  const [moved] = arr.splice(dragIndex.value, 1);
  arr.splice(i, 0, moved);
  pasos.value = arr;
};
const onDragEnd = () => { dragIndex.value = null; dragOverIndex.value = null; };

// ── Tags + sugerencias ────────────────────────────────────────
const tags     = ref(['Saludable', 'Fit']);
const nuevoTag = ref('');

const todosSugeridos = ['Vegano', 'Rápido', 'Sin gluten', 'Bajo en calorías', 'Postres',
                        'Mexicana', 'Italiana', 'Picante', 'Dulce', 'Proteico',
                        'Fácil', 'Sin lactosa', 'Veraniega', 'Navidad', 'Fit'];
const sugerencias = ref<string[]>([]);

const onTagInput = (e: any) => {
  const q = (e.target.value ?? '').toLowerCase().trim();
  if (!q) { sugerencias.value = []; return; }
  sugerencias.value = todosSugeridos
    .filter(s => s.toLowerCase().includes(q) && !tags.value.includes(s))
    .slice(0, 5);
};

const agregarTagManual = () => {
  const t = nuevoTag.value.trim();
  if (t && !tags.value.includes(t)) { tags.value.push(t); }
  nuevoTag.value = '';
  sugerencias.value = [];
};
const agregarSugerencia = (s: string) => {
  if (!tags.value.includes(s)) tags.value.push(s);
  nuevoTag.value = '';
  sugerencias.value = [];
};
const eliminarTag = (i: number) => tags.value.splice(i, 1);

// ── Upload con preview ────────────────────────────────────────
const imagenes  = ref<string[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => fileInput.value?.click();

const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;
  Array.from(files).forEach(file => {
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) imagenes.value.push(ev.target.result as string);
    };
    reader.readAsDataURL(file);
  });
  (e.target as HTMLInputElement).value = '';
};
const eliminarImagen = (i: number) => imagenes.value.splice(i, 1);

// ── Validación ────────────────────────────────────────────────
const errores     = reactive({ nombre: '', ingredientes: '', descripcion: '' });
const errorGlobal = ref('');
const publicado   = ref(false);

const validar = (): boolean => {
  errores.nombre       = '';
  errores.ingredientes = '';
  errores.descripcion  = '';
  errorGlobal.value    = '';

  let ok = true;
  if (!nombre.value.trim()) { errores.nombre = 'El nombre es obligatorio.'; ok = false; }
  if (ingredientes.value.every(i => !i.trim())) { errores.ingredientes = 'Añade al menos un ingrediente.'; ok = false; }
  if (!descripcion.value.trim()) { errores.descripcion = 'Escribe una breve descripción.'; ok = false; }
  if (!ok) errorGlobal.value = 'Revisa los campos marcados antes de publicar.';
  return ok;
};

const publicar = () => {
  if (!validar()) return;
  publicado.value = true;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

.content { --background: #ffffff; font-family: 'Jost', sans-serif; }
.white-toolbar { --background: #ffffff; --padding-top: 10px; }
.header-title { font-weight: 700; font-size: 1rem; text-align: center; color: #000; }
.black-icon { color: #000; }

/* ── Decoraciones ────────────────────────────────────────── */
.bg-shell { position: relative; min-height: 100%; }
.decor { display: none; }
@media (min-width: 1024px) {
  .decor { display: block; position: fixed; top: 70px; bottom: 0; width: 280px; pointer-events: none; z-index: 0; }
  .decor-left { left: 0; }
  .decor-right { right: 0; }
  .decor-svg { width: 100%; height: 100%; }
  .page-wrapper { position: relative; z-index: 1; }
}

/* ── Layout ──────────────────────────────────────────────── */
.page-wrapper { max-width: 600px; margin: 0 auto; }
.form-container { padding: 10px 24px 80px; display: flex; flex-direction: column; gap: 28px; }

/* ── Títulos ─────────────────────────────────────────────── */
.section-header { text-align: left; margin-bottom: 10px; }
.main-title { font-size: 1.8rem; font-weight: 700; color: #000; margin: 0; letter-spacing: -0.5px; }
.main-subtitle { font-size: 0.95rem; color: #777; margin: 5px 0 0; }

/* ── Grupos ──────────────────────────────────────────────── */
.form-group { display: flex; flex-direction: column; gap: 10px; }
.label-row { display: flex; justify-content: space-between; align-items: center; }
.input-label { font-size: 0.9rem; font-weight: 700; color: #000; text-transform: uppercase; letter-spacing: 1px; }

/* ── Inputs ──────────────────────────────────────────────── */
.input-box-main { border-bottom: 2px solid #000; padding: 4px 0; transition: border-color 0.2s; }
.input-box-main.input-error { border-color: #f87171; }
.custom-input { --color: #000; font-size: 1.2rem; font-weight: 500; }
.input-gray-wrapper { display: flex; align-items: center; background: #f6f6f6; border-radius: 12px; padding: 2px 12px; margin-bottom: 8px; }
.custom-input-gray { --color: #000; --placeholder-color: #aaa; font-size: 0.95rem; }
.remove-icon { color: #ccc; font-size: 20px; cursor: pointer; flex-shrink: 0; }

/* ── Error ───────────────────────────────────────────────── */
.error-msg { font-size: 0.78rem; color: #f87171; margin-top: -4px; }
.error-banner {
  display: flex; align-items: center; gap: 8px;
  background: #fff1f1; border: 1px solid #f87171; border-radius: 12px;
  padding: 12px 16px; color: #c0392b; font-size: 0.88rem;
}
.error-banner-icon { font-size: 20px; flex-shrink: 0; }

/* ── META ROW (tiempo / porciones / dificultad) ─────────── */
.meta-row { display: flex; gap: 12px; flex-wrap: wrap; }
.meta-block { display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 90px; }
.meta-dificultad { flex: 2; min-width: 160px; }

.time-selector {
  display: flex; align-items: center; justify-content: space-between;
  background: #f6f6f6; border-radius: 12px; padding: 6px 10px;
}
.time-btn {
  width: 28px; height: 28px; border-radius: 50%; border: none;
  background: #000; color: #fff; font-size: 1.2rem; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: opacity 0.2s;
}
.time-btn:disabled { opacity: 0.3; cursor: default; }
.time-value { font-weight: 700; font-size: 0.95rem; color: #000; }

.dificultad-selector { display: flex; gap: 6px; }
.dif-btn {
  flex: 1; padding: 7px 4px; border-radius: 10px; border: 1.5px solid #e0e0e0;
  background: #fff; font-size: 0.78rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s; color: #555; font-family: 'Jost', sans-serif;
}
.dif-btn.dif-active.dif-facil  { background: #4ade80; border-color: #4ade80; color: #fff; }
.dif-btn.dif-active.dif-media  { background: #facc15; border-color: #facc15; color: #fff; }
.dif-btn.dif-active.dif-dificil { background: #f87171; border-color: #f87171; color: #fff; }

/* ── Pasos drag & drop ───────────────────────────────────── */
.steps-container { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
.paso-row {
  display: flex; align-items: center; gap: 10px;
  padding: 4px; border-radius: 14px;
  transition: background 0.15s, transform 0.15s;
  cursor: grab;
}
.paso-row:active { cursor: grabbing; }
.paso-row.dragging { opacity: 0.45; transform: scale(0.98); }
.paso-row.drag-over { background: #f0f0f0; }
.drag-handle { font-size: 22px; color: #ccc; flex-shrink: 0; }
.paso-badge {
  width: 28px; height: 28px; background: #000; color: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 700; flex-shrink: 0;
}
.input-gray-step { flex: 1; background: #f6f6f6; border-radius: 12px; padding: 2px 12px; }

/* ── Textarea ────────────────────────────────────────────── */
.textarea-box { background: #f6f6f6; border-radius: 12px; padding: 10px; }
.custom-textarea { --color: #000; font-size: 0.95rem; }

/* ── Tags ────────────────────────────────────────────────── */
.tag-input-box { display: flex; align-items: center; background: #f6f6f6; border-radius: 12px; padding-left: 12px; }
.tag-suggestions { display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 0; }
.tag-sugerencia {
  background: #f0f0f0; color: #333; font-size: 0.8rem;
  padding: 4px 12px; border-radius: 20px; cursor: pointer;
  transition: background 0.15s;
}
.tag-sugerencia:hover { background: #e0e0e0; }
.tags-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px; }
.tag-pill {
  display: flex; align-items: center; gap: 6px; background: #000;
  color: #fff; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem;
}
.tag-close { font-size: 16px; opacity: 0.7; cursor: pointer; }

/* ── Upload + Preview ────────────────────────────────────── */
.upload-area {
  border: 2px dashed #eee; border-radius: 20px; height: 160px;
  display: flex; align-items: center; justify-content: center;
  background: #fafafa; cursor: pointer; transition: all 0.2s ease;
}
.upload-area:active { background: #f0f0f0; border-color: #ccc; }
.upload-content { text-align: center; color: #aaa; }
.upload-icon { font-size: 40px; margin-bottom: 8px; color: #000; }
.upload-content span { display: block; color: #000; font-weight: 600; font-size: 0.9rem; }
.upload-content p { font-size: 0.75rem; margin: 4px 0 0; }

.preview-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.preview-item { position: relative; width: 90px; height: 90px; }
.preview-img { width: 100%; height: 100%; object-fit: cover; border-radius: 14px; }
.preview-remove {
  position: absolute; top: -6px; right: -6px;
  width: 22px; height: 22px; border-radius: 50%; border: none;
  background: #000; color: #fff; font-size: 11px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.preview-add {
  width: 90px; height: 90px; border: 2px dashed #ddd;
  border-radius: 14px; display: flex; align-items: center;
  justify-content: center; cursor: pointer; background: #fafafa;
  transition: background 0.2s;
}
.preview-add:hover { background: #f0f0f0; }
.add-img-icon { font-size: 28px; color: #aaa; }

/* ── Botón publicar ──────────────────────────────────────── */
.publish-btn {
  --background: #000; --color: #fff; --border-radius: 16px;
  height: 56px; font-size: 1rem; font-weight: 700; margin-top: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* ── Animación de éxito ──────────────────────────────────── */
.success-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.55); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
}
.success-card {
  background: #fff; border-radius: 28px; padding: 40px 32px;
  max-width: 320px; width: 90%; text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
}
@keyframes popIn {
  from { transform: scale(0.7); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}
.success-icon-wrap { margin-bottom: 16px; }
.success-icon { font-size: 72px; color: #4ade80; }
.success-card h2 { font-size: 1.5rem; font-weight: 700; margin: 0 0 8px; color: #000; }
.success-card p  { color: #777; font-size: 0.9rem; margin: 0 0 24px; }
.success-btn { --background: #000; --color: #fff; --border-radius: 14px; font-weight: 700; }

.success-fade-enter-active { transition: opacity 0.3s; }
.success-fade-leave-active { transition: opacity 0.3s; }
.success-fade-enter-from, .success-fade-leave-to { opacity: 0; }

.add-mini-btn { --color: #000; font-size: 0.85rem; }
</style>
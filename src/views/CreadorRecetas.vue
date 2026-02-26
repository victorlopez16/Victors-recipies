<template>
  <ion-page>
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
      <!-- ✅ SHELL PARA DECORACIÓN LATERAL EN PC -->
      <div class="bg-shell">

        <!-- ✅ DECORACIÓN IZQUIERDA (solo PC) -->
        <div class="decor decor-left" aria-hidden="true">
          <svg viewBox="0 0 260 900" class="decor-svg">
            <!-- cucharón -->
            <path d="M78 70c0-22 18-40 40-40s40 18 40 40-18 40-40 40-40-18-40-40z"
                  fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10"/>
            <path d="M118 110v170"
                  fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <!-- hoja -->
            <path d="M65 340c60-70 130-70 160 0-30 55-100 70-160 0z"
                  fill="rgba(0,0,0,.04)"/>
            <path d="M85 340c35 30 75 35 115 0"
                  fill="none" stroke="rgba(0,0,0,.07)" stroke-width="6" stroke-linecap="round"/>
            <!-- tenedor -->
            <path d="M70 470v160" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <path d="M70 470h55" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <path d="M70 500h55" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <path d="M70 530h55" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>

            <!-- rodaja de limón -->
            <circle cx="135" cy="720" r="65" fill="rgba(0,0,0,.03)" stroke="rgba(0,0,0,.08)" stroke-width="8"/>
            <path d="M135 655v130M70 720h130M90 675l90 90M180 675l-90 90"
                  stroke="rgba(0,0,0,.06)" stroke-width="6" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- ✅ DECORACIÓN DERECHA (solo PC) -->
        <div class="decor decor-right" aria-hidden="true">
          <svg viewBox="0 0 260 900" class="decor-svg">
            <!-- cuchillo -->
            <path d="M120 60c40 0 70 40 40 75l-75 90"
                  fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <path d="M60 245l-25 30"
                  fill="none" stroke="rgba(0,0,0,.08)" stroke-width="10" stroke-linecap="round"/>
            <!-- zanahoria -->
            <path d="M150 380c-20 70-20 140 0 210 70-10 110-60 120-120-35-55-70-80-120-90z"
                  fill="rgba(0,0,0,.04)" stroke="rgba(0,0,0,.07)" stroke-width="6" stroke-linejoin="round"/>
            <path d="M150 380c-15-35-35-45-60-50"
                  fill="none" stroke="rgba(0,0,0,.08)" stroke-width="8" stroke-linecap="round"/>
            <path d="M150 420c30 25 55 60 70 105"
                  fill="none" stroke="rgba(0,0,0,.06)" stroke-width="6" stroke-linecap="round"/>

            <!-- cucharita -->
            <path d="M95 680c0-18 14-32 32-32s32 14 32 32-14 32-32 32-32-14-32-32z"
                  fill="rgba(0,0,0,.03)" stroke="rgba(0,0,0,.08)" stroke-width="8"/>
            <path d="M127 712v140"
                  fill="none" stroke="rgba(0,0,0,.08)" stroke-width="8" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- ✅ TU CONTENIDO EXACTO -->
        <div class="page-wrapper">
          <div class="form-container">

            <div class="section-header">
              <h1 class="main-title">Comparte tu sabor</h1>
              <p class="main-subtitle">Completa los detalles para publicar tu creación.</p>
            </div>

            <div class="form-group">
              <label class="input-label">Nombre de la receta</label>
              <div class="input-box-main">
                <ion-input v-model="nombre" placeholder="Ej: Croquetas de la abuela" class="custom-input"></ion-input>
              </div>
            </div>

            <div class="form-group">
              <div class="label-row">
                <label class="input-label">Ingredientes</label>
                <ion-button fill="clear" size="small" @click="agregarIngrediente" class="add-mini-btn">
                  <ion-icon slot="start" :icon="addOutline"></ion-icon> Añadir
                </ion-button>
              </div>
              <div class="list-container">
                <div class="input-gray-wrapper" v-for="(_, i) in ingredientes" :key="'ing-' + i">
                  <ion-input v-model="ingredientes[i]" placeholder="Cantidad e ingrediente" class="custom-input-gray"></ion-input>
                  <ion-icon :icon="closeOutline" class="remove-icon" @click="eliminarIngrediente(i)"></ion-icon>
                </div>
              </div>
            </div>

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

              <div class="steps-container">
                <div class="paso-row" v-for="(_, i) in pasos" :key="'paso-' + i">
                  <div class="paso-badge">{{ i + 1 }}</div>
                  <div class="input-gray-step">
                    <ion-input
                      v-model="pasos[i]"
                      :placeholder="pasosPlaceholders[i] || 'Siguiente paso...'"
                      class="custom-input-gray">
                    </ion-input>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="input-label">Etiquetas</label>
              <div class="tag-input-box">
                <ion-input
                  v-model="nuevoTag"
                  placeholder="Ej: Vegano, Rápido..."
                  class="custom-input-gray"
                  @keyup.enter="agregarTag">
                </ion-input>
                <ion-button fill="clear" @click="agregarTag">
                  <ion-icon :icon="arrowForwardOutline"></ion-icon>
                </ion-button>
              </div>

              <div class="tags-row">
                <div class="tag-pill" v-for="(tag, i) in tags" :key="'tag-' + i">
                  <span>{{ tag }}</span>
                  <ion-icon :icon="closeCircle" @click="eliminarTag(i)" class="tag-close"></ion-icon>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="input-label">Fotos de la receta</label>
              <div class="upload-area">
                <div class="upload-content">
                  <ion-icon :icon="cameraOutline" class="upload-icon"></ion-icon>
                  <span>Toca para subir imágenes</span>
                  <p>Formatos JPG o PNG (Max. 5MB)</p>
                </div>
              </div>
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
  closeOutline, closeCircle, arrowForwardOutline
} from 'ionicons/icons';
import { ref } from 'vue';

const ionRouter = useIonRouter();
const navegarAtras = () =>
  ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainLogged', 'back', 'replace');

const nombre = ref('');
const descripcion = ref('');
const ingredientes = ref(['', '']);
const pasos = ref(['', '', '']);
const pasosPlaceholders = ['Empezamos por...', 'Luego debemos...', 'Finalmente...'];
const tags = ref(['Saludable', 'Fit']);
const nuevoTag = ref('');

const agregarIngrediente = () => ingredientes.value.push('');
const eliminarIngrediente = (i: number) => ingredientes.value.splice(i, 1);

const agregarTag = () => {
  if (nuevoTag.value.trim()) {
    tags.value.push(nuevoTag.value.trim());
    nuevoTag.value = '';
  }
};
const eliminarTag = (i: number) => tags.value.splice(i, 1);

const publicar = () => ionRouter.navigate('/RecetaPublicada', 'forward', 'replace');
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

.content { --background: #ffffff; font-family: 'Jost', sans-serif; }
.white-toolbar { --background: #ffffff; --padding-top: 10px; }
.header-title { font-weight: 700; font-size: 1rem; text-align: center; color: #000; }
.black-icon { color: #000; }

/* ✅ SHELL */
.bg-shell{
  position: relative;
  min-height: 100%;
}

/* ✅ DECORACIONES (por defecto ocultas) */
.decor{
  display: none;
}

/* ✅ SOLO EN PC: mostrar decoraciones y dejar el contenido centrado */
@media (min-width: 1024px){
  .decor{
    display: block;
    position: fixed;
    top: 70px;
    bottom: 0;
    width: 280px;
    pointer-events: none;
    opacity: 1;
    z-index: 0;
  }
  .decor-left{ left: 0; }
  .decor-right{ right: 0; }
  .decor-svg{ width: 100%; height: 100%; }

  /* el contenido por encima */
  .page-wrapper{
    position: relative;
    z-index: 1;
  }

  /* un pelín de “marco” para que no se vea vacío */
  .content{
    --background: linear-gradient(90deg, #f7f7f7 0%, #ffffff 18%, #ffffff 82%, #f7f7f7 100%);
  }
}

/* CONTENIDO */
.page-wrapper { max-width: 600px; margin: 0 auto; }
.form-container { padding: 10px 24px 80px; display: flex; flex-direction: column; gap: 28px; }

/* TITULARES */
.section-header { text-align: left; margin-bottom: 10px; }
.main-title { font-size: 1.8rem; font-weight: 700; color: #000; margin: 0; letter-spacing: -0.5px; }
.main-subtitle { font-size: 0.95rem; color: #777; margin: 5px 0 0; }

/* GRUPOS DE FORMULARIO */
.form-group { display: flex; flex-direction: column; gap: 10px; }
.label-row { display: flex; justify-content: space-between; align-items: center; }
.input-label { font-size: 0.9rem; font-weight: 700; color: #000; text-transform: uppercase; letter-spacing: 1px; }

/* INPUTS ESTILIZADOS */
.input-box-main { border-bottom: 2px solid #000; padding: 4px 0; }
.custom-input { --color: #000; font-size: 1.2rem; font-weight: 500; }

.input-gray-wrapper {
  display: flex;
  align-items: center;
  background: #f6f6f6;
  border-radius: 12px;
  padding: 2px 12px;
  margin-bottom: 8px;
}
.custom-input-gray { --color: #000; --placeholder-color: #aaa; font-size: 0.95rem; }
.remove-icon { color: #ccc; font-size: 20px; cursor: pointer; }

/* PASOS */
.steps-container { display: flex; flex-direction: column; gap: 12px; margin-top: 10px; }
.paso-row { display: flex; align-items: center; gap: 15px; }
.paso-badge {
  width: 28px; height: 28px; background: #000; color: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 700; flex-shrink: 0;
}
.input-gray-step { flex: 1; background: #f6f6f6; border-radius: 12px; padding: 2px 12px; }

/* TEXTAREA */
.textarea-box { background: #f6f6f6; border-radius: 12px; padding: 10px; }
.custom-textarea { --color: #000; font-size: 0.95rem; }

/* TAGS */
.tag-input-box { display: flex; align-items: center; background: #f6f6f6; border-radius: 12px; padding-left: 12px; }
.tags-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px; }
.tag-pill {
  display: flex; align-items: center; gap: 6px; background: #000;
  color: #fff; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem;
}
.tag-close { font-size: 16px; opacity: 0.7; }

/* UPLOAD */
.upload-area {
  border: 2px dashed #eee; border-radius: 20px; height: 160px;
  display: flex; align-items: center; justify-content: center;
  background: #fafafa; transition: all 0.2s ease;
}
.upload-area:active { background: #f0f0f0; border-color: #ccc; }
.upload-content { text-align: center; color: #aaa; }
.upload-icon { font-size: 40px; margin-bottom: 8px; color: #000; }
.upload-content span { display: block; color: #000; font-weight: 600; font-size: 0.9rem; }
.upload-content p { font-size: 0.75rem; margin: 4px 0 0; }

/* BOTÓN PUBLICAR */
.publish-btn {
  --background: #000;
  --color: #fff;
  --border-radius: 16px;
  height: 56px;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
</style>
<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="header-title">Editar Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="edit-content">
      <div class="page-wrapper">
        <div class="form-container">

          <div class="avatar-section">
            <div class="avatar-wrapper">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300" class="avatar-img" />
              <div class="camera-overlay">
                <ion-icon :icon="cameraOutline" class="camera-icon"></ion-icon>
              </div>
            </div>
            <p class="edit-photo-text">Cambiar foto de perfil</p>
          </div>

          <div class="inputs-group">
            <div class="input-field">
              <label class="field-label">Nombre completo</label>
              <div class="input-container">
                <ion-input v-model="nombre" placeholder="Tu nombre" class="custom-input"></ion-input>
              </div>
            </div>

            <div class="input-field">
              <label class="field-label">Nombre de usuario</label>
              <div class="input-container">
                <ion-input v-model="username" placeholder="@usuario" class="custom-input"></ion-input>
              </div>
            </div>
          </div>

          <div class="footer-actions">
            <ion-button expand="block" class="confirm-btn" @click="confirmar">
              Guardar Cambios
            </ion-button>
            <p class="cancel-text" @click="navegarAtras">Cancelar</p>
          </div>

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonIcon, IonContent, IonInput, useIonRouter
} from '@ionic/vue';
import { chevronBackOutline, cameraOutline } from 'ionicons/icons';
import { ref } from 'vue';

const ionRouter = useIonRouter();
const nombre = ref('Daniel Martinez');
const username = ref('@danimarti');

const navegarAtras = () => {
  ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/Perfil', 'back', 'replace');
};

const confirmar = () => {
  ionRouter.navigate('/Perfil', 'back', 'replace');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

.edit-content {
  --background: #ffffff;
  font-family: 'Jost', sans-serif;
}

.white-toolbar {
  --background: #ffffff;
  --padding-top: 10px;
}

.header-title {
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  color: #000;
  letter-spacing: -0.5px;
}

.black-icon { color: #000; }

.page-wrapper {
  max-width: 500px;
  margin: 0 auto;
}

.form-container {
  display: flex;
  flex-direction: column;
  padding: 30px 24px;
  gap: 32px;
}

/* AVATAR SECTION REFINADA */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.avatar-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  cursor: pointer;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 40px; /* Un poco menos circular para estilo App Store */
  object-fit: cover;
  border: 4px solid #f8f8f8;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.camera-overlay {
  position: absolute;
  bottom: -5px;
  right: -5px;
  background: #4f52ff; /* El azul de tu gradiente como acento */
  border-radius: 15px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: 3px solid #fff;
  box-shadow: 0 4px 10px rgba(79, 82, 255, 0.3);
}

.camera-icon { font-size: 20px; }
.edit-photo-text { font-size: 0.9rem; font-weight: 600; color: #4f52ff; }

/* INPUTS */
.inputs-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-left: 4px;
}

.input-container {
  background: #f7f7f9;
  border-radius: 16px;
  padding: 4px 16px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.input-container:focus-within {
  background: #fff;
  border-color: #4f52ff;
  box-shadow: 0 0 0 4px rgba(79, 82, 255, 0.1);
}

.custom-input {
  --color: #000;
  --placeholder-color: #999;
  font-weight: 500;
  font-size: 1rem;
}

/* ACCIONES */
.footer-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
}

.confirm-btn {
  --background: #000;
  --color: #fff;
  --border-radius: 18px;
  width: 100%;
  height: 58px;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.cancel-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ff3b30;
  cursor: pointer;
}
</style>
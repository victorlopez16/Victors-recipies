<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="clear-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras">
            <ion-icon slot="icon-only" :icon="closeOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="success-page">
      <div class="center-container">
        <div class="success-icon-wrapper">
          <div class="circle-bg"></div>
          <ion-icon :icon="checkmarkCircle" class="check-icon"></ion-icon>
        </div>

        <div class="text-group">
          <h1 class="title">¡Se ha publicado!</h1>
          <p class="subtitle">
            Tu receta ya está disponible para el mundo. 
            <strong>Pronto recibirás notificaciones</strong> cuando alguien la guarde.
          </p>
        </div>

        <div class="action-area">
          <ion-button expand="block" mode="ios" class="visualizar-btn" @click="visualizar">
            Ver mi receta
          </ion-button>
          
          <button class="home-link" @click="navegarAtras">
            Volver al inicio
          </button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonButton,
  IonIcon, IonContent, useIonRouter
} from '@ionic/vue';
import { closeOutline, checkmarkCircle } from 'ionicons/icons';

const ionRouter = useIonRouter();

const navegarAtras = () => {
  ionRouter.navigate('/MainLogged', 'back', 'replace');
};

const visualizar = () => {
  // Aquí podrías redirigir a la vista de la receta recién creada
  ionRouter.navigate('/MainLogged', 'forward', 'replace');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&display=swap');

.success-page { 
  --background: #ffffff; 
  font-family: 'Jost', sans-serif; 
}

.clear-toolbar { --background: #ffffff; }
.black-icon { color: #000; font-size: 28px; }

.center-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  text-align: center;
}

/* Animación del icono */
.success-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.circle-bg {
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(45, 211, 111, 0.1);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.check-icon {
  font-size: 100px;
  color: #2dd36f;
  z-index: 2;
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 0.8; }
  70% { transform: scale(1.2); opacity: 0; }
  100% { transform: scale(0.95); opacity: 0; }
}

.text-group {
  margin-bottom: 50px;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 12px 0;
  letter-spacing: -1px;
}

.subtitle {
  font-size: 1.1rem;
  font-weight: 400;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.subtitle strong {
  color: #000;
  font-weight: 600;
}

/* Botones */
.action-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.visualizar-btn {
  --background: #000;
  --color: #fff;
  --border-radius: 16px;
  width: 100%;
  max-width: 300px;
  height: 64px;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.home-link {
  background: none;
  border: none;
  color: #999;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px;
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>
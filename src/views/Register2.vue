<template>
  <ion-page>
    <ion-content :fullscreen="true" class="recovery-page">
      <div class="recovery-wrapper">
        
        <div class="header-row">
          <ion-button fill="clear" class="back-btn" @click="router.back()">
            <ion-icon slot="icon-only" :icon="arrowBackOutline" class="dark-icon"></ion-icon>
          </ion-button>
          <img :src="logoCubiertos" alt="Logo" class="mini-logo" />
          <div class="spacer"></div>
        </div>

        <div class="recovery-card">
          <div class="title-section">
            <h2 class="main-title">Nueva Contraseña</h2>
            <p class="subtitle">Crea una contraseña segura para proteger tu cuenta.</p>
          </div>

          <div class="form-section">
            <div class="input-group">
              <label class="input-label">Contraseña</label>
              <ion-input
                class="custom-recovery-input"
                type="password"
                placeholder="••••••••"
                v-model="newPassword"
              ></ion-input>
            </div>

            <div class="input-group">
              <label class="input-label">Confirmar Contraseña</label>
              <ion-input
                class="custom-recovery-input"
                type="password"
                placeholder="••••••••"
                v-model="confirmPassword"
              ></ion-input>
            </div>

            <ion-button expand="block" class="main-action-btn" @click="handleReset">
              Actualizar Contraseña
            </ion-button>
          </div>

          <div class="divider">
            <div class="line"></div>
            <span>o regístrate con</span>
            <div class="line"></div>
          </div>

          <div class="social-grid">
            <div class="social-item"><ion-icon :icon="logoGoogle"></ion-icon></div>
            <div class="social-item"><ion-icon :icon="logoFacebook"></ion-icon></div>
            <div class="social-item"><ion-icon :icon="logoTwitter"></ion-icon></div>
          </div>

          <p class="footer-text">
            ¿Ya tienes cuenta? <span class="link" @click="goToLogin">Ingresa</span>
          </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonContent, IonButton, IonInput, IonIcon
} from '@ionic/vue';
import { 
  arrowBackOutline, logoGoogle, logoFacebook, logoTwitter 
} from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logoCubiertos from '@/assets/LogoCubiertos.png';

const router = useRouter();
const newPassword = ref('');
const confirmPassword = ref('');

const handleReset = () => {
  // Aquí iría la validación de que ambas coincidan
  router.push('/LoginPage');
};
const goToLogin = () => router.push('/LoginPage');
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

.recovery-page {
  --background: linear-gradient(180deg, #4f52ff 0%, #8b8eff 30%, #ffffff 80%);
  font-family: 'Jost', sans-serif;
}

.recovery-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 20px;
}

/* HEADER */
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.back-btn { --color: #000; }
.mini-logo { width: 50px; height: 50px; object-fit: contain; }
.spacer { width: 48px; }

/* CARD */
.recovery-card {
  background: white;
  border-radius: 30px;
  padding: 32px 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  flex-grow: 1;
}

.title-section { margin-bottom: 30px; }
.main-title { font-size: 1.8rem; font-weight: 700; color: #000; margin: 0; }
.subtitle { color: #888; font-size: 0.95rem; margin-top: 5px; }

/* FORM */
.form-section { display: flex; flex-direction: column; gap: 20px; }
.input-group { display: flex; flex-direction: column; gap: 8px; }
.input-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #aaa; margin-left: 4px; }

.custom-recovery-input {
  --background: #f7f7f9;
  --border-radius: 16px;
  --padding-start: 18px;
  --color: #000;
  --placeholder-color: #aaa;
  height: 54px;
  font-weight: 500;
}

.main-action-btn {
  --background: #000;
  --color: #fff;
  --border-radius: 18px;
  height: 56px;
  font-weight: 700;
  margin-top: 10px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* DIVIDER */
.divider {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 30px 0;
  color: #ccc;
  font-size: 0.85rem;
}
.line { height: 1px; background: #eee; flex: 1; }

/* SOCIAL */
.social-grid { display: flex; justify-content: center; gap: 20px; margin-bottom: 30px; }
.social-item {
  width: 60px;
  height: 60px;
  border: 1px solid #f0f0f0;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #000;
}

.footer-text { text-align: center; font-size: 0.9rem; color: #888; }
.link { color: #4f52ff; font-weight: 700; cursor: pointer; }

/* LANDSCAPE */
@media (orientation: landscape) {
  .recovery-wrapper { flex-direction: row; align-items: center; gap: 20px; }
  .recovery-card { padding: 20px; }
}
</style>
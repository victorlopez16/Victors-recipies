<template>
  <ion-page>
    <ion-content :fullscreen="true" class="login-bg">
      <div class="hero-overlay"></div>

      <div class="top-nav">
        <button class="back-circle" @click="goBack">
          <ion-icon :icon="chevronBackOutline"></ion-icon>
        </button>
      </div>

      <div class="auth-wrapper">
        <div class="brand-section">
          <div class="app-logo">
            <img :src="logoCubiertos" alt="Logo" />
          </div>
          <h1 class="welcome-text">
            ¡Únete y conoce miles<br>
            <span>de recetas distintas!</span>
          </h1>
          <p class="sub-text">Crea una cuenta para guardar tus platos favoritos y contactar con otros chefs.</p>
        </div>
        
        <div class="action-footer">
          <ion-button 
            class="main-auth-btn"
            expand="block"
            @click="goToLogin"
          >
            Crear cuenta gratis
          </ion-button>
          
          <button class="ghost-btn" @click="goToLogin">
            Ya tengo cuenta. <strong>Iniciar sesión</strong>
          </button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonIcon, IonButton, IonPage, useIonRouter } from '@ionic/vue';
import { chevronBackOutline } from 'ionicons/icons';
import logoCubiertos from '@/assets/LogoCubiertos.png';

const ionRouter = useIonRouter();

const goBack = () => {
  ionRouter.back();
};

const goToLogin = () => {
  ionRouter.navigate('/LogInPage', 'forward', 'push');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;600;700&display=swap');

.login-bg {
  /* Imagen de fondo sugerente pero oscurecida */
  --background: url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000') no-repeat center center / cover;
  font-family: 'Jost', sans-serif;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%);
  z-index: 1;
}

.top-nav {
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 10;
}

.back-circle {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.auth-wrapper {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px 30px 60px;
}

.brand-section {
  margin-bottom: 40px;
}

.app-logo {
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  padding: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.app-logo img {
  width: 100%;
}

.welcome-text {
  color: white;
  font-size: 32px;
  font-weight: 300;
  line-height: 1.1;
  margin: 0;
}

.welcome-text span {
  font-weight: 700;
}

.sub-text {
  color: rgba(255,255,255,0.7);
  font-size: 1rem;
  margin-top: 15px;
  line-height: 1.5;
}

.action-footer {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.main-auth-btn {
  --background: #ffffff;
  --color: #000000;
  --border-radius: 18px;
  height: 60px;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.ghost-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 0.95rem;
  padding: 10px;
  cursor: pointer;
}

.ghost-btn strong {
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* Efecto de pulsación para el botón principal */
.main-auth-btn:active {
  transform: scale(0.98);
  transition: 0.1s;
}
</style>
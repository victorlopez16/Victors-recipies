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
            <h2 class="main-title">Recuperar acceso</h2>
            <p class="subtitle">Enviaremos un código de verificación a tu correo electrónico</p>
          </div>

          <div class="form-section">

            <!-- EMAIL -->
            <div class="input-group">
              <label class="input-label">Email de recuperación</label>
              <div class="input-wrapper" :class="estadoEmail">
                <ion-input
                  class="custom-recovery-input"
                  type="email"
                  placeholder="tu@correo.com"
                  v-model="email"
                  @ion-blur="emailTocado = true"
                ></ion-input>
                <ion-icon
                  v-if="emailTocado"
                  :icon="emailValido ? checkmarkCircleOutline : closeCircleOutline"
                  class="validation-icon"
                  :class="estadoEmail"
                ></ion-icon>
              </div>
              <p v-if="emailTocado && !emailValido" class="field-error">Introduce un email válido</p>
            </div>

            <!-- CÓDIGO -->
            <div class="input-group">
              <label class="input-label">Código de comprobación</label>
              <div class="input-wrapper" :class="estadoCodigo">
                <ion-input
                  class="custom-recovery-input"
                  :type="mostrarCodigo ? 'text' : 'password'"
                  placeholder="Introduce el código"
                  v-model="code"
                  @ion-blur="codigoTocado = true"
                ></ion-input>
                <ion-icon
                  :icon="mostrarCodigo ? eyeOffOutline : eyeOutline"
                  class="eye-icon"
                  @click="mostrarCodigo = !mostrarCodigo"
                ></ion-icon>
                <ion-icon
                  v-if="codigoTocado"
                  :icon="codigoValido ? checkmarkCircleOutline : closeCircleOutline"
                  class="validation-icon"
                  :class="estadoCodigo"
                ></ion-icon>
              </div>
              <p v-if="codigoTocado && !codigoValido" class="field-error">El código debe tener al menos 4 caracteres</p>
            </div>

            <ion-button
              expand="block"
              class="main-recovery-btn"
              :class="{ 'btn-success': verificadoExitoso }"
              :disabled="cargando"
              @click="handleVerify"
            >
              <span v-if="!cargando && !verificadoExitoso">Verificar Código</span>
              <span v-else-if="cargando" class="loading-text">
                Verificando<span class="dot1">.</span><span class="dot2">.</span><span class="dot3">.</span>
              </span>
              <span v-else>✓ ¡Verificado!</span>
            </ion-button>

            <p class="resend-text">
              ¿No recibiste nada? <span class="link-alt" @click="resendCode">Reenviar código</span>
            </p>
          </div>

          <div class="divider">
            <div class="line"></div>
            <span>o usa tus redes</span>
            <div class="line"></div>
          </div>

          <div class="social-grid">
            <div class="social-item"><ion-icon :icon="logoGoogle"></ion-icon></div>
            <div class="social-item"><ion-icon :icon="logoFacebook"></ion-icon></div>
            <div class="social-item"><ion-icon :icon="logoTwitter"></ion-icon></div>
          </div>

          <p class="footer-text">
            ¿Recordaste tu contraseña? <span class="link" @click="goToLogin">Ingresa</span>
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
  arrowBackOutline, logoGoogle, logoFacebook, logoTwitter,
  eyeOutline, eyeOffOutline, checkmarkCircleOutline, closeCircleOutline
} from 'ionicons/icons';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import logoCubiertos from '@/assets/LogoCubiertos.png';

const router = useRouter();
const email = ref('');
const code = ref('');
const emailTocado = ref(false);
const codigoTocado = ref(false);
const mostrarCodigo = ref(false);
const cargando = ref(false);
const verificadoExitoso = ref(false);

// Validaciones
const emailValido = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const codigoValido = computed(() => code.value.trim().length >= 4);

const estadoEmail = computed(() => {
  if (!emailTocado.value) return '';
  return emailValido.value ? 'valid' : 'invalid';
});

const estadoCodigo = computed(() => {
  if (!codigoTocado.value) return '';
  return codigoValido.value ? 'valid' : 'invalid';
});

const handleVerify = async () => {
  emailTocado.value = true;
  codigoTocado.value = true;
  if (!emailValido.value || !codigoValido.value) return;

  cargando.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  cargando.value = false;
  verificadoExitoso.value = true;

  await new Promise(resolve => setTimeout(resolve, 900));
  router.push('/Register2');
};

const goToLogin = () => router.push('/LoginPage');
const resendCode = () => console.log('Código reenviado');
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
.header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
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
.subtitle { color: #888; font-size: 0.95rem; margin-top: 5px; line-height: 1.4; }

/* FORM */
.form-section { display: flex; flex-direction: column; gap: 20px; }
.input-group { display: flex; flex-direction: column; gap: 6px; }
.input-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #aaa; margin-left: 4px; }

.input-wrapper {
  display: flex;
  align-items: center;
  background: #f7f7f9;
  border-radius: 16px;
  border: 1.5px solid transparent;
  padding-right: 12px;
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.input-wrapper:focus-within {
  background: #fff;
  border-color: #4f52ff;
  box-shadow: 0 0 0 4px rgba(79, 82, 255, 0.1);
}

.input-wrapper.valid {
  border-color: #34c759;
  background: #f0fdf4;
}

.input-wrapper.invalid {
  border-color: #ff3b30;
  background: #fff5f5;
}

.custom-recovery-input {
  --background: transparent;
  --border-radius: 16px;
  --padding-start: 18px;
  --color: #000;
  --placeholder-color: #aaa;
  height: 54px;
  font-weight: 500;
  flex: 1;
}

.eye-icon {
  font-size: 20px;
  color: #aaa;
  cursor: pointer;
  padding: 4px;
  margin-right: 4px;
  transition: color 0.2s;
}
.eye-icon:active { color: #4f52ff; }

.validation-icon { font-size: 20px; flex-shrink: 0; }
.validation-icon.valid { color: #34c759; }
.validation-icon.invalid { color: #ff3b30; }

.field-error {
  font-size: 0.78rem;
  color: #ff3b30;
  font-weight: 500;
  padding-left: 4px;
  margin: 0;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* BOTÓN */
.main-recovery-btn {
  --background: #000;
  --color: #fff;
  --border-radius: 18px;
  height: 56px;
  font-weight: 700;
  margin-top: 10px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.main-recovery-btn.btn-success {
  --background: #34c759;
  box-shadow: 0 10px 20px rgba(52, 199, 89, 0.25);
}

.main-recovery-btn[disabled] {
  --background: #555;
  opacity: 1;
}

.loading-text .dot1,
.loading-text .dot2,
.loading-text .dot3 { animation: blink 1.2s infinite; }
.loading-text .dot2 { animation-delay: 0.2s; }
.loading-text .dot3 { animation-delay: 0.4s; }

@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}

.resend-text { text-align: center; font-size: 0.85rem; color: #888; margin: 0; }
.link-alt { color: #4f52ff; font-weight: 600; cursor: pointer; }

/* DIVIDER */
.divider { display: flex; align-items: center; gap: 15px; margin: 25px 0; color: #ccc; font-size: 0.85rem; }
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
  transition: all 0.2s;
}
.social-item:active { background: #f9f9f9; transform: scale(0.95); }

.footer-text { text-align: center; font-size: 0.9rem; color: #888; }
.link { color: #4f52ff; font-weight: 700; cursor: pointer; }

/* LANDSCAPE */
@media (orientation: landscape) {
  .recovery-wrapper { flex-direction: row; align-items: center; gap: 20px; }
  .recovery-card { padding: 20px; }
}
</style>
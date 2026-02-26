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
            <div class="avatar-wrapper" :class="{ 'avatar-hover': isHoveringAvatar }"
              @mouseenter="isHoveringAvatar = true"
              @mouseleave="isHoveringAvatar = false"
            >
              <img v-if="photoUrl" :src="photoUrl" class="avatar-img" alt="Foto de perfil" />
              <div v-else class="avatar-placeholder">
                <ion-icon :icon="personOutline" class="person-icon"></ion-icon>
              </div>

              <div class="avatar-overlay" :class="{ visible: isHoveringAvatar }">
                <ion-icon :icon="cameraOutline" class="overlay-camera-icon"></ion-icon>
              </div>

              <div class="camera-overlay" id="trigger-foto">
                <ion-icon :icon="cameraOutline" class="camera-icon"></ion-icon>
              </div>

              <ion-popover
                trigger="trigger-foto"
                trigger-action="click"
                class="photo-popover"
                :keep-contents-mounted="true"
              >
                <div class="popover-menu">
                  <button class="popover-item" @click="tomarFoto">📷 Tomar foto</button>
                  <button class="popover-item" @click="elegirDeGaleria">🖼️ Elegir foto de la galería</button>
                  <button v-if="photoUrl !== defaultPhoto" class="popover-item restore" @click="restaurarFoto">🔄 Restaurar foto original</button>
                  <button v-if="photoUrl" class="popover-item danger" @click="eliminarFoto">🗑️ Eliminar foto</button>
                </div>
              </ion-popover>
            </div>
            <p class="edit-photo-text">Cambiar foto de perfil</p>
          </div>

          <input ref="fileInputRef" type="file" accept="image/*" style="display: none" @change="onFileSelected" />
          <input ref="cameraInputRef" type="file" accept="image/*" capture="environment" style="display: none" @change="onFileSelected" />

          <div class="inputs-group">

            <!-- Nombre completo -->
            <div class="input-field">
              <div class="label-row">
                <label class="field-label">Nombre completo</label>
                <span class="char-counter" :class="{ 'counter-warning': nombre.length > 40, 'counter-ok': nombre.length > 0 && nombre.length <= 40 }">
                  {{ nombre.length }}/50
                </span>
              </div>
              <div class="input-container" :class="validacionNombre.clase">
                <ion-input
                  v-model="nombre"
                  placeholder="Tu nombre"
                  class="custom-input"
                  :maxlength="50"
                  @ion-blur="nombreTocado = true"
                ></ion-input>
                <ion-icon v-if="nombreTocado" :icon="validacionNombre.icono" class="validation-icon" :class="validacionNombre.clase"></ion-icon>
              </div>
              <p v-if="nombreTocado && nombre.trim().length === 0" class="field-error">El nombre no puede estar vacío</p>
            </div>

            <!-- Nombre de usuario -->
            <div class="input-field">
              <div class="label-row">
                <label class="field-label">Nombre de usuario</label>
                <span class="char-counter" :class="{ 'counter-warning': username.length > 20, 'counter-ok': username.length > 0 && username.length <= 20 }">
                  {{ username.length }}/25
                </span>
              </div>
              <div class="input-container" :class="validacionUsername.clase">
                <ion-input
                  v-model="username"
                  placeholder="@usuario"
                  class="custom-input"
                  :maxlength="25"
                  @ion-blur="usernameTocado = true"
                ></ion-input>
                <ion-icon v-if="usernameTocado" :icon="validacionUsername.icono" class="validation-icon" :class="validacionUsername.clase"></ion-icon>
              </div>
              <p v-if="usernameTocado && !usernameValido" class="field-error">
                {{ username.trim().length === 0 ? 'El usuario no puede estar vacío' : 'Solo letras, números y guión bajo' }}
              </p>
            </div>

          </div>

          <!-- SECCIÓN CAMBIAR CONTRASEÑA -->
          <div class="password-section">
            <button class="password-toggle" @click="mostrarCambioPassword = !mostrarCambioPassword">
              <div class="password-toggle-left">
                <div class="password-icon-wrapper">
                  <ion-icon :icon="lockClosedOutline"></ion-icon>
                </div>
                <span>Cambiar contraseña</span>
              </div>
              <ion-icon
                :icon="mostrarCambioPassword ? chevronUpOutline : chevronDownOutline"
                class="toggle-arrow"
                :class="{ rotated: mostrarCambioPassword }"
              ></ion-icon>
            </button>

            <div class="password-fields" :class="{ expanded: mostrarCambioPassword }">
              <div class="password-fields-inner">

                <!-- Contraseña actual -->
                <div class="input-field">
                  <label class="field-label">Contraseña actual</label>
                  <div class="input-container" :class="estadoPasswordActual">
                    <ion-input
                      :type="mostrarPasswordActual ? 'text' : 'password'"
                      v-model="passwordActual"
                      placeholder="••••••••"
                      class="custom-input"
                      @ion-blur="passwordActualTocado = true"
                    ></ion-input>
                    <ion-icon
                      :icon="mostrarPasswordActual ? eyeOffOutline : eyeOutline"
                      class="eye-icon"
                      @click="mostrarPasswordActual = !mostrarPasswordActual"
                    ></ion-icon>
                    <ion-icon
                      v-if="passwordActualTocado"
                      :icon="passwordActualValido ? checkmarkCircleOutline : closeCircleOutline"
                      class="validation-icon"
                      :class="estadoPasswordActual"
                    ></ion-icon>
                  </div>
                  <p v-if="passwordActualTocado && !passwordActualValido" class="field-error">Introduce tu contraseña actual</p>
                </div>

                <!-- Nueva contraseña -->
                <div class="input-field">
                  <label class="field-label">Nueva contraseña</label>
                  <div class="input-container" :class="estadoPasswordNueva">
                    <ion-input
                      :type="mostrarPasswordNueva ? 'text' : 'password'"
                      v-model="passwordNueva"
                      placeholder="••••••••"
                      class="custom-input"
                      @ion-blur="passwordNuevaTocado = true"
                    ></ion-input>
                    <ion-icon
                      :icon="mostrarPasswordNueva ? eyeOffOutline : eyeOutline"
                      class="eye-icon"
                      @click="mostrarPasswordNueva = !mostrarPasswordNueva"
                    ></ion-icon>
                    <ion-icon
                      v-if="passwordNuevaTocado"
                      :icon="passwordNuevaValido ? checkmarkCircleOutline : closeCircleOutline"
                      class="validation-icon"
                      :class="estadoPasswordNueva"
                    ></ion-icon>
                  </div>
                  <p v-if="passwordNuevaTocado && !passwordNuevaValido" class="field-error">Mínimo 6 caracteres</p>
                </div>

                <!-- Confirmar nueva contraseña -->
                <div class="input-field">
                  <label class="field-label">Confirmar nueva contraseña</label>
                  <div class="input-container" :class="estadoPasswordConfirm">
                    <ion-input
                      :type="mostrarPasswordConfirm ? 'text' : 'password'"
                      v-model="passwordConfirm"
                      placeholder="••••••••"
                      class="custom-input"
                      @ion-blur="passwordConfirmTocado = true"
                    ></ion-input>
                    <ion-icon
                      :icon="mostrarPasswordConfirm ? eyeOffOutline : eyeOutline"
                      class="eye-icon"
                      @click="mostrarPasswordConfirm = !mostrarPasswordConfirm"
                    ></ion-icon>
                    <ion-icon
                      v-if="passwordConfirmTocado"
                      :icon="passwordConfirmValido ? checkmarkCircleOutline : closeCircleOutline"
                      class="validation-icon"
                      :class="estadoPasswordConfirm"
                    ></ion-icon>
                  </div>
                  <p v-if="passwordConfirmTocado && !passwordConfirmValido" class="field-error">
                    {{ passwordConfirm.length === 0 ? 'Confirma tu nueva contraseña' : 'Las contraseñas no coinciden' }}
                  </p>
                </div>

                <!-- Botón guardar contraseña -->
                <ion-button
                  expand="block"
                  class="password-save-btn"
                  :class="{ 'btn-success': passwordGuardado }"
                  :disabled="guardandoPassword"
                  @click="guardarPassword"
                >
                  <span v-if="!guardandoPassword && !passwordGuardado">Actualizar contraseña</span>
                  <span v-else-if="guardandoPassword" class="saving-dots">
                    Actualizando<span class="dot1">.</span><span class="dot2">.</span><span class="dot3">.</span>
                  </span>
                  <span v-else>✓ ¡Contraseña actualizada!</span>
                </ion-button>

              </div>
            </div>
          </div>

          <div class="footer-actions">
            <ion-button
              expand="block"
              class="confirm-btn"
              :class="{ 'btn-success': guardadoExitoso }"
              :disabled="guardando || !formularioValido"
              @click="confirmar"
            >
              <span v-if="!guardando && !guardadoExitoso">Guardar Cambios</span>
              <span v-else-if="guardando" class="saving-dots">Guardando<span class="dot1">.</span><span class="dot2">.</span><span class="dot3">.</span></span>
              <span v-else class="success-check">✓ ¡Guardado!</span>
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
  IonIcon, IonContent, IonInput, IonPopover, useIonRouter
} from '@ionic/vue';
import {
  chevronBackOutline, cameraOutline, personOutline,
  checkmarkCircleOutline, closeCircleOutline,
  eyeOutline, eyeOffOutline, lockClosedOutline,
  chevronDownOutline, chevronUpOutline
} from 'ionicons/icons';
import { ref, computed } from 'vue';

const ionRouter = useIonRouter();

// Perfil
const nombre = ref('Daniel Martinez');
const username = ref('@danimarti');
const nombreTocado = ref(false);
const usernameTocado = ref(false);
const isHoveringAvatar = ref(false);
const guardando = ref(false);
const guardadoExitoso = ref(false);

// Foto
const defaultPhoto = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300';
const photoUrl = ref<string>(defaultPhoto);
const fileInputRef = ref<HTMLInputElement | null>(null);
const cameraInputRef = ref<HTMLInputElement | null>(null);

// Contraseña
const mostrarCambioPassword = ref(false);
const passwordActual = ref('');
const passwordNueva = ref('');
const passwordConfirm = ref('');
const passwordActualTocado = ref(false);
const passwordNuevaTocado = ref(false);
const passwordConfirmTocado = ref(false);
const mostrarPasswordActual = ref(false);
const mostrarPasswordNueva = ref(false);
const mostrarPasswordConfirm = ref(false);
const guardandoPassword = ref(false);
const passwordGuardado = ref(false);

// Validaciones perfil
const nombreValido = computed(() => nombre.value.trim().length > 0 && nombre.value.length <= 50);
const usernameValido = computed(() => {
  const val = username.value.trim();
  return val.length > 0 && val.length <= 25 && /^@?[\w]+$/.test(val);
});
const formularioValido = computed(() => nombreValido.value && usernameValido.value);

const validacionNombre = computed(() => ({
  clase: nombreTocado.value ? (nombreValido.value ? 'valid' : 'invalid') : '',
  icono: nombreValido.value ? checkmarkCircleOutline : closeCircleOutline,
}));
const validacionUsername = computed(() => ({
  clase: usernameTocado.value ? (usernameValido.value ? 'valid' : 'invalid') : '',
  icono: usernameValido.value ? checkmarkCircleOutline : closeCircleOutline,
}));

// Validaciones contraseña
const passwordActualValido = computed(() => passwordActual.value.length >= 6);
const passwordNuevaValido = computed(() => passwordNueva.value.length >= 6);
const passwordConfirmValido = computed(() => passwordConfirm.value.length > 0 && passwordConfirm.value === passwordNueva.value);

const estadoPasswordActual = computed(() => {
  if (!passwordActualTocado.value) return '';
  return passwordActualValido.value ? 'valid' : 'invalid';
});
const estadoPasswordNueva = computed(() => {
  if (!passwordNuevaTocado.value) return '';
  return passwordNuevaValido.value ? 'valid' : 'invalid';
});
const estadoPasswordConfirm = computed(() => {
  if (!passwordConfirmTocado.value) return '';
  return passwordConfirmValido.value ? 'valid' : 'invalid';
});

const navegarAtras = () => {
  ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/Perfil', 'back', 'replace');
};

const confirmar = async () => {
  nombreTocado.value = true;
  usernameTocado.value = true;
  if (!formularioValido.value) return;

  guardando.value = true;
  await new Promise(resolve => setTimeout(resolve, 1400));
  guardando.value = false;
  guardadoExitoso.value = true;

  await new Promise(resolve => setTimeout(resolve, 1200));
  ionRouter.navigate('/Perfil', 'back', 'replace');
};

const guardarPassword = async () => {
  passwordActualTocado.value = true;
  passwordNuevaTocado.value = true;
  passwordConfirmTocado.value = true;
  if (!passwordActualValido.value || !passwordNuevaValido.value || !passwordConfirmValido.value) return;

  guardandoPassword.value = true;
  await new Promise(resolve => setTimeout(resolve, 1400));
  guardandoPassword.value = false;
  passwordGuardado.value = true;

  // Limpiar campos tras éxito
  await new Promise(resolve => setTimeout(resolve, 1500));
  passwordActual.value = '';
  passwordNueva.value = '';
  passwordConfirm.value = '';
  passwordActualTocado.value = false;
  passwordNuevaTocado.value = false;
  passwordConfirmTocado.value = false;
  passwordGuardado.value = false;
  mostrarCambioPassword.value = false;
};

const onFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;
  const file = input.files[0];
  if (!file.type.startsWith('image/')) { alert('Selecciona una imagen válida.'); return; }
  const reader = new FileReader();
  reader.onload = (e) => { if (e.target?.result) photoUrl.value = e.target.result as string; };
  reader.readAsDataURL(file);
  input.value = '';
};

const tomarFoto = () => setTimeout(() => cameraInputRef.value?.click(), 300);
const elegirDeGaleria = () => setTimeout(() => fileInputRef.value?.click(), 300);
const eliminarFoto = () => { photoUrl.value = ''; };
const restaurarFoto = () => { photoUrl.value = defaultPhoto; };
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

.edit-content { --background: #ffffff; font-family: 'Jost', sans-serif; }
.white-toolbar { --background: #ffffff; --padding-top: 10px; }
.header-title { font-weight: 700; font-size: 1.1rem; text-align: center; color: #000; letter-spacing: -0.5px; }
.black-icon { color: #000; }

.page-wrapper { max-width: 500px; margin: 0 auto; }
.form-container { display: flex; flex-direction: column; padding: 30px 24px; gap: 32px; }

/* AVATAR */
.avatar-section { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.avatar-wrapper { position: relative; width: 120px; height: 120px; cursor: pointer; }
.avatar-img { width: 100%; height: 100%; border-radius: 40px; object-fit: cover; border: 4px solid #f8f8f8; box-shadow: 0 10px 25px rgba(0,0,0,0.05); transition: transform 0.2s ease; }
.avatar-wrapper:hover .avatar-img { transform: scale(1.03); }
.avatar-placeholder { width: 100%; height: 100%; border-radius: 40px; background: #f0f0f5; border: 4px solid #f8f8f8; box-shadow: 0 10px 25px rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: center; }
.person-icon { font-size: 56px; color: #ccc; }
.avatar-overlay { position: absolute; inset: 0; border-radius: 40px; background: rgba(0,0,0,0); display: flex; align-items: center; justify-content: center; transition: background 0.25s ease, opacity 0.25s ease; opacity: 0; pointer-events: none; }
.avatar-overlay.visible { background: rgba(0,0,0,0.38); opacity: 1; }
.overlay-camera-icon { font-size: 34px; color: #fff; }
.camera-overlay { position: absolute; bottom: -5px; right: -5px; background: #4f52ff; border-radius: 15px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; color: #fff; border: 3px solid #fff; box-shadow: 0 4px 10px rgba(79,82,255,0.3); transition: transform 0.2s ease; }
.avatar-wrapper:hover .camera-overlay { transform: scale(1.1); }
.camera-icon { font-size: 20px; }
.edit-photo-text { font-size: 0.9rem; font-weight: 600; color: #4f52ff; }

/* INPUTS */
.inputs-group { display: flex; flex-direction: column; gap: 20px; }
.input-field { display: flex; flex-direction: column; gap: 6px; }
.label-row { display: flex; justify-content: space-between; align-items: center; padding: 0 4px; }
.field-label { font-size: 0.85rem; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }
.char-counter { font-size: 0.75rem; font-weight: 600; color: #ccc; transition: color 0.2s; }
.char-counter.counter-ok { color: #34c759; }
.char-counter.counter-warning { color: #ff9500; }

.input-container {
  background: #f7f7f9;
  border-radius: 16px;
  padding: 4px 16px;
  border: 1.5px solid transparent;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
}
.input-container:focus-within { background: #fff; border-color: #4f52ff; box-shadow: 0 0 0 4px rgba(79,82,255,0.1); }
.input-container.valid { border-color: #34c759; background: #f0fdf4; }
.input-container.invalid { border-color: #ff3b30; background: #fff5f5; }

.custom-input { flex: 1; --color: #000; --placeholder-color: #999; font-weight: 500; font-size: 1rem; }

.eye-icon { font-size: 20px; color: #aaa; cursor: pointer; padding: 4px; margin-right: 2px; transition: color 0.2s; flex-shrink: 0; }
.eye-icon:active { color: #4f52ff; }

.validation-icon { font-size: 20px; flex-shrink: 0; margin-left: 4px; }
.validation-icon.valid { color: #34c759; }
.validation-icon.invalid { color: #ff3b30; }

.field-error { font-size: 0.78rem; color: #ff3b30; font-weight: 500; padding-left: 4px; margin: 0; animation: fadeIn 0.2s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

/* SECCIÓN CAMBIAR CONTRASEÑA */
.password-section {
  border: 1.5px solid #f0f0f0;
  border-radius: 20px;
  overflow: hidden;
  transition: border-color 0.25s ease;
}

.password-section:has(.expanded) {
  border-color: #e0e0ff;
}

.password-toggle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  background: #fafafa;
  border: none;
  cursor: pointer;
  font-family: 'Jost', sans-serif;
  transition: background 0.2s ease;
}

.password-toggle:active { background: #f0f0f5; }

.password-toggle-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.password-icon-wrapper {
  width: 36px;
  height: 36px;
  background: #000;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  flex-shrink: 0;
}

.password-toggle-left span {
  font-size: 0.95rem;
  font-weight: 700;
  color: #000;
}

.toggle-arrow {
  font-size: 18px;
  color: #aaa;
  transition: transform 0.3s ease;
}

/* Animación desplegable */
.password-fields {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.password-fields.expanded {
  max-height: 600px;
}

.password-fields-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 18px;
  border-top: 1px solid #f0f0f0;
}

.password-save-btn {
  --background: #4f52ff;
  --color: #fff;
  --border-radius: 14px;
  height: 50px;
  font-weight: 700;
  font-size: 0.95rem;
  margin-top: 4px;
  box-shadow: 0 6px 16px rgba(79, 82, 255, 0.25);
}

.password-save-btn.btn-success {
  --background: #34c759;
  box-shadow: 0 6px 16px rgba(52, 199, 89, 0.25);
}

.password-save-btn[disabled] {
  --background: #aaa;
  opacity: 1;
}

/* FOOTER */
.footer-actions { display: flex; flex-direction: column; align-items: center; gap: 16px; margin-top: 10px; }

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
.confirm-btn.btn-success { --background: #34c759; box-shadow: 0 10px 20px rgba(52,199,89,0.25); }
.confirm-btn[disabled] { --background: #ccc; box-shadow: none; }

.saving-dots .dot1, .saving-dots .dot2, .saving-dots .dot3 { animation: blink 1.2s infinite; }
.saving-dots .dot2 { animation-delay: 0.2s; }
.saving-dots .dot3 { animation-delay: 0.4s; }
@keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }

.success-check { font-size: 1.05rem; font-weight: 700; }
.cancel-text { font-size: 0.9rem; font-weight: 600; color: #ff3b30; cursor: pointer; }

/* POPOVER */
.photo-popover { --background: #ffffff; --min-width: 220px; --max-width: 260px; }
.popover-menu { padding: 10px; display: flex; flex-direction: column; gap: 6px; }
.popover-item { width: 100%; text-align: left; padding: 10px 12px; border-radius: 12px; border: 1px solid #f0f0f0; background: #fff; font-family: 'Jost', sans-serif; font-weight: 600; font-size: 0.95rem; color: #000; cursor: pointer; }
.popover-item:active { background: #f7f7f7; }
.popover-item.danger { color: #ff3b30; border-color: rgba(255,59,48,0.25); }
.popover-item.restore { color: #4f52ff; border-color: rgba(79,82,255,0.25); }
</style>
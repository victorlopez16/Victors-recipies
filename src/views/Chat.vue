<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-title class="chat-title">Dani</ion-title>

        <ion-buttons slot="end">
          <ion-button id="chat-menu-trigger">
            <ion-icon slot="icon-only" :icon="ellipsisHorizontalOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-popover
          trigger="chat-menu-trigger"
          trigger-action="click"
          :dismiss-on-select="true"
          class="chat-popover"
        >
          <div class="menu">
            <button class="menu-item" @click="marcarFavorito">Marcar como favorito este chat</button>
            <button class="menu-item danger" @click="eliminarChat">Eliminar chat</button>
            <button class="menu-item danger" @click="bloquearChat">Bloquear chat</button>
          </div>
        </ion-popover>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="chat-content" ref="contentRef">
      <div class="messages-container">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message-wrapper', msg.side]"
        >
          <!-- Avatar izquierda (Dani) -->
          <ion-avatar v-if="msg.side === 'left'" class="chat-avatar" @click="navegar('/PerfilInvitado')">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" />
          </ion-avatar>

          <div class="bubble-content">
            <!-- Imagen enviada -->
            <img
              v-if="msg.type === 'image'"
              :src="msg.text"
              class="message-image"
            />
            <!-- Burbuja de texto -->
            <div v-else :class="['message-bubble', msg.side === 'right' ? 'dark' : '']">
              {{ msg.text }}
            </div>
            <span class="message-time">{{ msg.time }}</span>
          </div>

          <!-- Avatar derecha (yo) -->
          <ion-avatar v-if="msg.side === 'right'" class="chat-avatar" @click="navegar('/Perfil')">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" />
          </ion-avatar>
        </div>

        <!-- Indicador "escribiendo..." -->
        <div v-if="isTyping" class="message-wrapper left">
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" />
          </ion-avatar>
          <div class="bubble-content">
            <div class="message-bubble typing-bubble">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

    <!-- Input oculto para fotos -->
    <input ref="photoInputRef" type="file" accept="image/*" style="display:none" @change="onPhotoSelected" />

    <ion-footer class="ion-no-border chat-footer">
      <div class="input-area">
        <div class="input-container-modern">
          <ion-input
            v-model="inputText"
            placeholder="Escribe un mensaje..."
            class="custom-input"
            mode="md"
            @keyup.enter="enviarMensaje"
          ></ion-input>

          <div class="input-actions">
            <ion-icon :icon="imageOutline" @click="photoInputRef?.click()"></ion-icon>
            <ion-icon :icon="micOutline"></ion-icon>
          </div>
        </div>

        <ion-button fill="clear" class="send-btn-modern" @click="enviarMensaje">
          <ion-icon slot="icon-only" :icon="arrowUpOutline"></ion-icon>
        </ion-button>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonIcon, IonFooter, IonAvatar, IonInput, IonPopover, useIonRouter
} from '@ionic/vue'
import {
  chevronBackOutline, imageOutline, micOutline, arrowUpOutline, ellipsisHorizontalOutline
} from 'ionicons/icons'
import { ref, nextTick } from 'vue'

const ionRouter = useIonRouter()
const navegarAtras = () => ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainLogged', 'back', 'replace')
const navegar = (ruta: string) => ionRouter.navigate(ruta, 'forward', 'replace')

const contentRef = ref()
const photoInputRef = ref<HTMLInputElement | null>(null)
const inputText = ref('')
const isTyping = ref(false)

interface Message {
  side: 'left' | 'right'
  text: string
  time: string
  type?: 'text' | 'image'
}

const getTime = () => {
  const now = new Date()
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
}

const messages = ref<Message[]>([
  { side: 'left',  text: 'Hola Porrino, ¿qué tal?', time: '14:02' },
  { side: 'right', text: 'Hola Dani, bien gracias. Sobreviviendo a la semana... 😅', time: '14:05' },
  { side: 'left',  text: 'Oye, quería compartir una receta contigo. El secreto es la bechamel de mi abuela.', time: '14:06' },
  { side: 'right', text: '¿Llevan cebolla? No quiero abrir un debate nacional pero... 🧐', time: '14:08' },
  { side: 'left',  text: '¡Cebolla siempre! Si no, es solo pollo frito con cosas. ¿Mañana te pasas y las catas?', time: '14:10' },
  { side: 'right', text: '¿A qué hora? Iría ahora mismo pero estoy en el gimnasio fingiendo que entreno. 🏋️‍♂️', time: '14:12' },
  { side: 'left',  text: 'Vente sobre las 14:00. Trae hambre y una Coca-Cola fría. ¡Nos vemos!', time: '14:15' },
  { side: 'right', text: 'Trato hecho. ¡Mañana nos vemos, chef! 👨‍🍳', time: '14:16' },
])

const scrollAbajo = async () => {
  await nextTick()
  contentRef.value?.$el?.scrollToBottom(300)
}

const respuestas = [
  '¡Qué buena pinta! 😄', 'Jajaja sí sí', '¿En serio? 😂', 'Totalmente de acuerdo',
  'Madre mía...', '¡Venga va!', 'Me parece bien', 'Oye pues sí 🤔',
  '😂😂😂', 'Eso tiene sentido', '¡Dale!', 'Buenas noticias 🙌',
  'Cuéntame más', 'No me lo puedo creer 😅', '¡Qué fuerte!', 'Ok ok, entendido'
]

const respuestasImagen = [
  '¡Qué foto más chula! 📸', 'Jaja esto es muy bueno 😂', '¿Dónde es eso?',
  'Me encanta 😍', '¡Wow!', 'Qué buena pinta tiene eso 👀'
]

const enviarRespuesta = async (esImagen = false) => {
  isTyping.value = true
  await scrollAbajo()

  const delay = 1000 + Math.random() * 1500
  setTimeout(async () => {
    isTyping.value = false
    const pool = esImagen ? respuestasImagen : respuestas
    const respuesta = pool[Math.floor(Math.random() * pool.length)]
    messages.value.push({ side: 'left', text: respuesta, time: getTime() })
    await scrollAbajo()
  }, delay)
}

const enviarMensaje = async () => {
  const texto = inputText.value.trim()
  if (!texto) return

  messages.value.push({ side: 'right', text: texto, time: getTime(), type: 'text' })
  inputText.value = ''
  await scrollAbajo()
  await enviarRespuesta(false)
}

const onPhotoSelected = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return

  const file = input.files[0]
  const reader = new FileReader()
  reader.onload = async (e) => {
    if (e.target?.result) {
      messages.value.push({ side: 'right', text: e.target.result as string, time: getTime(), type: 'image' })
      await scrollAbajo()
      await enviarRespuesta(true)
    }
  }
  reader.readAsDataURL(file)
  input.value = ''
}

const marcarFavorito = () => console.log('Marcar como favorito')
const eliminarChat = () => console.log('Eliminar chat')
const bloquearChat = () => console.log('Bloquear chat')
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap');

.chat-content { --background: #ffffff; font-family: 'Jost', sans-serif; }
.white-toolbar { --background: #ffffff; --color: #000; border-bottom: 1px solid #f2f2f2; }
.chat-title { font-weight: 700; font-size: 1.1rem; text-align: center; letter-spacing: -0.3px; }
.black-icon { color: #000; font-size: 24px; }

.messages-container {
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.message-wrapper { display: flex; align-items: flex-end; gap: 10px; max-width: 90%; }
.left { align-self: flex-start; }
.right { align-self: flex-end; }

.chat-avatar { width: 32px; height: 32px; flex-shrink: 0; cursor: pointer; border: 1px solid #f0f0f0; }
.chat-avatar img { border-radius: 50%; object-fit: cover; }

.bubble-content { display: flex; flex-direction: column; }
.left .bubble-content { align-items: flex-start; }
.right .bubble-content { align-items: flex-end; }

.message-bubble {
  padding: 12px 16px;
  font-size: 0.92rem;
  line-height: 1.4;
  background: #f4f4f4;
  color: #1a1a1a;
  border-radius: 18px;
}

.left .message-bubble { border-bottom-left-radius: 4px; }
.right .message-bubble { border-bottom-right-radius: 4px; }
.message-bubble.dark { background: #000; color: #fff; }

.message-image {
  max-width: 220px;
  border-radius: 16px;
  object-fit: cover;
}

.message-time { font-size: 0.65rem; color: #bbb; margin-top: 4px; font-weight: 500; }

/* TYPING */
.typing-bubble {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 14px 18px;
  min-width: 60px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #aaa;
  animation: bounce 1.2s infinite ease-in-out;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
  40% { transform: scale(1.2); opacity: 1; }
}

/* FOOTER */
.chat-footer { background: #fff; padding: 10px 16px 30px; }
.input-area { display: flex; align-items: center; gap: 10px; }

.input-container-modern {
  flex: 1;
  background: #f8f8f8;
  border-radius: 24px;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  border: 1px solid #eee;
}

.custom-input {
  --padding-start: 0;
  font-size: 0.95rem;
  --color: #000000 !important;
  color: #000000 !important;
}

.input-actions { display: flex; gap: 12px; color: #888; font-size: 20px; cursor: pointer; }
.input-actions ion-icon:active { color: #000; }

.send-btn-modern {
  --background: #000;
  --color: #fff;
  --border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0;
  --padding-start: 0;
  --padding-end: 0;
}

/* POPOVER */
.chat-popover { --width: 260px; }
.menu { padding: 10px; background: #fff; }
.menu-item {
  width: 100%;
  text-align: left;
  padding: 12px 10px;
  border: none;
  background: transparent;
  font-family: 'Jost', sans-serif;
  font-size: 14px;
  color: #111;
  border-radius: 10px;
}
.menu-item:hover { background: #f3f3f3; }
.menu-item.danger { color: #d10000; }
</style>
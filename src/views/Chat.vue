<template>
  <ion-page>

    <!-- ✅ TOAST NOTIFICACIÓN -->
    <transition name="toast-fade">
      <div v-if="toastVisible" class="toast-msg">{{ toastMsg }}</div>
    </transition>

    <!-- ✅ DIALOG CONFIRMAR (eliminar / bloquear) -->
    <transition name="modal-fade">
      <div v-if="confirmDialog" class="confirm-overlay" @click.self="confirmDialog = null">
        <div class="confirm-card">
          <h3>{{ confirmDialog.tipo === 'eliminar' ? '🗑️ Eliminar chat' : '🚫 Bloquear usuario' }}</h3>
          <p>{{ confirmDialog.tipo === 'eliminar'
            ? '¿Seguro que quieres eliminar esta conversación? No se podrá recuperar.'
            : '¿Seguro que quieres bloquear a Dani? No podrá enviarte mensajes.' }}</p>
          <div class="confirm-btns">
            <button class="confirm-cancel" @click="confirmDialog = null">Cancelar</button>
            <button class="confirm-ok danger" @click="confirmarAccion">
              {{ confirmDialog.tipo === 'eliminar' ? 'Eliminar' : 'Bloquear' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ✅ PANEL DE BÚSQUEDA -->
    <transition name="slide-down">
      <div v-if="buscando" class="search-panel">
        <div class="search-input-wrap">
          <ion-icon :icon="searchOutline" class="s-icon"></ion-icon>
          <input v-model="textoBusqueda" placeholder="Buscar en el chat..." class="search-input" autofocus />
          <span v-if="resultadosBusqueda.length" class="search-count">
            {{ indiceBusqueda + 1 }}/{{ resultadosBusqueda.length }}
          </span>
          <span v-else-if="textoBusqueda" class="search-count no-res">0 resultados</span>
        </div>
        <div class="search-nav">
          <button class="snav-btn" @click="navBusqueda(-1)">↑</button>
          <button class="snav-btn" @click="navBusqueda(1)">↓</button>
          <button class="snav-btn close-btn" @click="cerrarBusqueda">✕</button>
        </div>
      </div>
    </transition>

    <!-- ✅ PICKER DE REACCIONES -->
    <transition name="emoji-pop">
      <div
        v-if="reaccionMenu"
        class="emoji-picker"
        :style="{ top: reaccionMenu.y + 'px', left: reaccionMenu.x + 'px' }"
      >
        <span v-for="e in emojis" :key="e" class="emoji-opt" @click="agregarReaccion(reaccionMenu.index, e)">{{ e }}</span>
      </div>
    </transition>
    <div v-if="reaccionMenu" class="emoji-backdrop" @click="reaccionMenu = null"></div>

    <ion-header class="ion-no-border">
      <ion-toolbar class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>

        <!-- ✅ HEADER CONTACTO -->
        <div class="header-center" @click="navegar('/PerfilInvitado')">
          <div class="header-avatar-wrap">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" class="header-avatar" />
            <span class="header-status-dot" :class="contactoConectado ? 'online' : 'offline'"></span>
          </div>
          <div class="header-info">
            <div class="header-name-row">
              <span class="header-name">Dani</span>
              <ion-icon v-if="esFavorito" :icon="starOutline" class="fav-star"></ion-icon>
              <ion-icon v-if="silenciado" :icon="volumeMuteOutline" class="mute-icon"></ion-icon>
            </div>
            <span class="header-sub" :class="{ 'online-text': contactoConectado }">
              {{ contactoConectado ? 'Conectado ahora' : 'Última vez hace 2h' }}
            </span>
          </div>
        </div>

        <ion-buttons slot="end">
          <!-- Lupa: toggle búsqueda -->
          <ion-button @click="buscando = !buscando" :class="{ 'btn-active': buscando }">
            <ion-icon slot="icon-only" :icon="searchOutline" class="black-icon"></ion-icon>
          </ion-button>
          <ion-button id="chat-menu-trigger">
            <ion-icon slot="icon-only" :icon="ellipsisHorizontalOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-popover trigger="chat-menu-trigger" trigger-action="click" :dismiss-on-select="true" class="chat-popover">
          <div class="menu">
            <button class="menu-item" @click="marcarFavorito">
              {{ esFavorito ? '✖ Quitar favorito' : '⭐ Marcar como favorito' }}
            </button>
            <button class="menu-item" @click="silenciarChat">
              {{ silenciado ? '🔔 Activar conversación' : '🔕 Silenciar conversación' }}
            </button>
            <button class="menu-item danger" @click="eliminarChat">🗑️ Eliminar chat</button>
            <button class="menu-item danger" @click="bloquearChat">🚫 Bloquear</button>
          </div>
        </ion-popover>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="chat-content" ref="contentRef">

      <!-- Chat vacío tras eliminar -->
      <div v-if="messages.length === 0" class="empty-chat">
        <p>No hay mensajes en esta conversación.</p>
      </div>

      <div class="messages-container">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :ref="el => { if (el) msgRefs[index] = el as HTMLElement }"
          :class="['message-wrapper', msg.side, { 'search-highlight': esResultadoActivo(index) }]"
          @contextmenu.prevent="abrirReaccionMenu($event, index)"
          @touchstart="onTouchStart($event, index)"
          @touchend="onTouchEnd"
        >
          <ion-avatar v-if="msg.side === 'left'" class="chat-avatar" @click="navegar('/PerfilInvitado')">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" />
          </ion-avatar>

          <div class="bubble-content">
            <img v-if="msg.type === 'image'" :src="msg.text" class="message-image" />
            <div
              v-else
              :class="['message-bubble', msg.side === 'right' ? 'dark' : 'light',
                       { 'search-match': resultadosBusqueda.includes(index) }]"
              v-html="resaltarTexto(msg.text)"
            ></div>

            <div v-if="msg.reacciones && msg.reacciones.length" class="reacciones-row">
              <span v-for="(r, ri) in msg.reacciones" :key="ri" class="reaccion-badge" @click="quitarReaccion(index, ri)">{{ r }}</span>
            </div>

            <div class="msg-footer" :class="msg.side">
              <span class="message-time">{{ msg.time }}</span>
              <span v-if="msg.side === 'right'" class="tick" :class="msg.estado">
                {{ msg.estado === 'enviando' ? '🕐' : msg.estado === 'enviado' ? '✓' : '✓✓' }}
              </span>
            </div>
          </div>

          <ion-avatar v-if="msg.side === 'right'" class="chat-avatar" @click="navegar('/Perfil')">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" />
          </ion-avatar>
        </div>

        <div v-if="isTyping" class="message-wrapper left">
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" />
          </ion-avatar>
          <div class="bubble-content">
            <div class="message-bubble light typing-bubble">
              <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

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
  IonPage, IonHeader, IonToolbar, IonContent, IonButtons,
  IonButton, IonIcon, IonFooter, IonAvatar, IonInput, IonPopover, useIonRouter
} from '@ionic/vue'
import {
  chevronBackOutline, imageOutline, micOutline, arrowUpOutline,
  ellipsisHorizontalOutline, searchOutline, starOutline, volumeMuteOutline
} from 'ionicons/icons'
import { ref, computed, nextTick, watch } from 'vue'

const ionRouter    = useIonRouter()
const navegarAtras = () => ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainLogged', 'back', 'replace')
const navegar      = (ruta: string) => ionRouter.navigate(ruta, 'forward', 'replace')

const contentRef    = ref()
const photoInputRef = ref<HTMLInputElement | null>(null)
const inputText     = ref('')
const isTyping      = ref(false)
const msgRefs       = ref<Record<number, HTMLElement>>({})

// ── Estado contacto ───────────────────────────────────────────
const contactoConectado = ref(true)

// ── Toast ─────────────────────────────────────────────────────
const toastMsg     = ref('')
const toastVisible = ref(false)
const mostrarToast = (msg: string) => {
  toastMsg.value = msg; toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2500)
}

// ── Estado del chat ───────────────────────────────────────────
const esFavorito    = ref(false)
const silenciado    = ref(false)
const confirmDialog = ref<{ tipo: 'eliminar' | 'bloquear' } | null>(null)

const marcarFavorito = () => {
  esFavorito.value = !esFavorito.value
  mostrarToast(esFavorito.value ? '⭐ Chat marcado como favorito' : '✖ Favorito eliminado')
}
const silenciarChat = () => {
  silenciado.value = !silenciado.value
  mostrarToast(silenciado.value ? '🔕 Conversación silenciada' : '🔔 Conversación activada')
}
const eliminarChat = () => { confirmDialog.value = { tipo: 'eliminar' } }
const bloquearChat = () => { confirmDialog.value = { tipo: 'bloquear' } }

const confirmarAccion = () => {
  if (confirmDialog.value?.tipo === 'eliminar') {
    messages.value = []
    mostrarToast('🗑️ Chat eliminado')
  } else {
    mostrarToast('🚫 Usuario bloqueado')
    setTimeout(() => ionRouter.navigate('/MainLogged', 'back', 'replace'), 1800)
  }
  confirmDialog.value = null
}

// ── Búsqueda ──────────────────────────────────────────────────
const buscando       = ref(false)
const textoBusqueda  = ref('')
const indiceBusqueda = ref(0)

const resultadosBusqueda = computed(() => {
  const q = textoBusqueda.value.trim().toLowerCase()
  if (!q) return []
  return messages.value
    .map((m, i) => ({ i, m }))
    .filter(({ m }) => m.type !== 'image' && m.text.toLowerCase().includes(q))
    .map(({ i }) => i)
})

watch(resultadosBusqueda, () => { indiceBusqueda.value = 0; scrollAResultado() })

const navBusqueda = (dir: number) => {
  const len = resultadosBusqueda.value.length
  if (!len) return
  indiceBusqueda.value = (indiceBusqueda.value + dir + len) % len
  scrollAResultado()
}
const scrollAResultado = async () => {
  await nextTick()
  const idx = resultadosBusqueda.value[indiceBusqueda.value]
  if (idx !== undefined && msgRefs.value[idx])
    msgRefs.value[idx].scrollIntoView({ behavior: 'smooth', block: 'center' })
}
const cerrarBusqueda = () => { buscando.value = false; textoBusqueda.value = '' }
const esResultadoActivo = (index: number) =>
  resultadosBusqueda.value.length > 0 &&
  resultadosBusqueda.value[indiceBusqueda.value] === index

const resaltarTexto = (texto: string) => {
  const q = textoBusqueda.value.trim()
  if (!q || !buscando.value) return texto
  const regex = new RegExp(`(${q})`, 'gi')
  return texto.replace(regex, '<mark class="hl">$1</mark>')
}

// ── Reacciones ────────────────────────────────────────────────
const emojis = ['👍','❤️','😂','😮','😢','🔥','👏','🤔']
interface ReaccionMenu { index: number; x: number; y: number }
const reaccionMenu = ref<ReaccionMenu | null>(null)

let longPressTimer: ReturnType<typeof setTimeout>
const onTouchStart = (e: TouchEvent, index: number) => {
  longPressTimer = setTimeout(() => {
    const t = e.touches[0]
    reaccionMenu.value = { index, x: Math.min(t.clientX - 20, window.innerWidth - 280), y: t.clientY - 70 }
  }, 500)
}
const onTouchEnd = () => clearTimeout(longPressTimer)
const abrirReaccionMenu = (e: MouseEvent, index: number) => {
  reaccionMenu.value = { index, x: Math.min(e.clientX - 20, window.innerWidth - 280), y: e.clientY - 70 }
}
const agregarReaccion = (index: number, emoji: string) => {
  const msg = messages.value[index]
  if (!msg.reacciones) msg.reacciones = []
  if (!msg.reacciones.includes(emoji)) msg.reacciones.push(emoji)
  reaccionMenu.value = null
}
const quitarReaccion = (index: number, ri: number) => { messages.value[index].reacciones?.splice(ri, 1) }

// ── Mensajes ──────────────────────────────────────────────────
interface Message {
  side: 'left' | 'right'; text: string; time: string
  type?: 'text' | 'image'; estado?: 'enviando' | 'enviado' | 'leido'; reacciones?: string[]
}

const getTime = () => {
  const now = new Date()
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
}

const messages = ref<Message[]>([
  { side: 'left',  text: 'Hola Porrino, ¿qué tal?', time: '14:02' },
  { side: 'right', text: 'Hola Dani, bien gracias. Sobreviviendo a la semana... 😅', time: '14:05', estado: 'leido' },
  { side: 'left',  text: 'Oye, quería compartir una receta contigo. El secreto es la bechamel de mi abuela.', time: '14:06' },
  { side: 'right', text: '¿Llevan cebolla? No quiero abrir un debate nacional pero... 🧐', time: '14:08', estado: 'leido' },
  { side: 'left',  text: '¡Cebolla siempre! Si no, es solo pollo frito con cosas. ¿Mañana te pasas y las catas?', time: '14:10' },
  { side: 'right', text: '¿A qué hora? Iría ahora mismo pero estoy en el gimnasio fingiendo que entreno. 🏋️‍♂️', time: '14:12', estado: 'leido' },
  { side: 'left',  text: 'Vente sobre las 14:00. Trae hambre y una Coca-Cola fría. ¡Nos vemos!', time: '14:15' },
  { side: 'right', text: 'Trato hecho. ¡Mañana nos vemos, chef! 👨‍🍳', time: '14:16', estado: 'leido' },
])

const scrollAbajo = async () => { await nextTick(); contentRef.value?.$el?.scrollToBottom(300) }

const respuestas = [
  '¡Qué buena pinta! 😄','Jajaja sí sí','¿En serio? 😂','Totalmente de acuerdo',
  'Madre mía...','¡Venga va!','Me parece bien','Oye pues sí 🤔',
  '😂😂😂','Eso tiene sentido','¡Dale!','Buenas noticias 🙌',
  'Cuéntame más','No me lo puedo creer 😅','¡Qué fuerte!','Ok ok, entendido'
]
const respuestasImagen = ['¡Qué foto más chula! 📸','Jaja esto es muy bueno 😂','¿Dónde es eso?','Me encanta 😍','¡Wow!','Qué buena pinta tiene eso 👀']

const enviarRespuesta = async (esImagen = false) => {
  if (silenciado.value) return // Si silenciado no "responde" (simulación)
  isTyping.value = true
  await scrollAbajo()
  setTimeout(async () => {
    isTyping.value = false
    const pool = esImagen ? respuestasImagen : respuestas
    messages.value.push({ side: 'left', text: pool[Math.floor(Math.random() * pool.length)], time: getTime() })
    const propios = messages.value.filter(m => m.side === 'right')
    if (propios.length) propios[propios.length - 1].estado = 'leido'
    await scrollAbajo()
  }, 1000 + Math.random() * 1500)
}

const enviarMensaje = async () => {
  const texto = inputText.value.trim()
  if (!texto) return
  const msg: Message = { side: 'right', text: texto, time: getTime(), type: 'text', estado: 'enviando' }
  messages.value.push(msg)
  inputText.value = ''
  await scrollAbajo()
  setTimeout(() => { msg.estado = 'enviado' }, 600)
  await enviarRespuesta(false)
}

const onPhotoSelected = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  const file = input.files[0]
  const reader = new FileReader()
  reader.onload = async (e) => {
    if (e.target?.result) {
      const msg: Message = { side: 'right', text: e.target.result as string, time: getTime(), type: 'image', estado: 'enviando' }
      messages.value.push(msg)
      await scrollAbajo()
      setTimeout(() => { msg.estado = 'enviado' }, 600)
      await enviarRespuesta(true)
    }
  }
  reader.readAsDataURL(file)
  input.value = ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap');

.chat-content { --background: #f7f7f7; font-family: 'Jost', sans-serif; }
.white-toolbar { --background: #ffffff; border-bottom: 1px solid #f2f2f2; }
.black-icon { color: #000; font-size: 22px; }
.btn-active { opacity: 0.5; }

/* ── Toast ───────────────────────────────────────────────── */
.toast-msg {
  position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
  background: rgba(0,0,0,0.82); color: #fff; padding: 10px 20px;
  border-radius: 20px; font-size: 0.88rem; font-weight: 600; z-index: 9999;
  white-space: nowrap; box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
.toast-fade-enter-active, .toast-fade-leave-active { transition: all 0.3s ease; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateX(-50%) translateY(10px); }

/* ── Confirm dialog ──────────────────────────────────────── */
.confirm-overlay {
  position: fixed; inset: 0; z-index: 9998;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; padding: 24px;
}
.confirm-card {
  background: #fff; border-radius: 22px; padding: 24px 20px;
  max-width: 320px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  animation: popIn 0.3s cubic-bezier(0.34,1.4,0.64,1) both;
}
.confirm-card h3 { margin: 0 0 10px; font-size: 1.05rem; font-weight: 700; color: #000; }
.confirm-card p  { margin: 0 0 20px; font-size: 0.88rem; color: #666; line-height: 1.5; }
.confirm-btns    { display: flex; gap: 10px; }
.confirm-cancel  {
  flex: 1; padding: 11px; border-radius: 14px; border: 1.5px solid #e0e0e0;
  background: #fff; font-family: 'Jost', sans-serif; font-size: 0.9rem;
  font-weight: 600; cursor: pointer; color: #555;
}
.confirm-ok {
  flex: 1; padding: 11px; border-radius: 14px; border: none;
  background: #000; color: #fff; font-family: 'Jost', sans-serif;
  font-size: 0.9rem; font-weight: 700; cursor: pointer;
}
.confirm-ok.danger { background: #d10000; }
@keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

/* ── Header ──────────────────────────────────────────────── */
.header-center {
  display: flex; align-items: center; gap: 10px;
  justify-content: center; cursor: pointer; flex: 1;
}
.header-avatar-wrap { position: relative; flex-shrink: 0; }
.header-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
.header-status-dot {
  position: absolute; bottom: 0; right: 0;
  width: 10px; height: 10px; border-radius: 50%; border: 2px solid #fff;
}
.header-status-dot.online  { background: #34c759; }
.header-status-dot.offline { background: #ccc; }
.header-info { display: flex; flex-direction: column; line-height: 1.2; }
.header-name-row { display: flex; align-items: center; gap: 5px; }
.header-name { font-weight: 700; font-size: 1rem; color: #000; }
.fav-star   { font-size: 14px; color: #f5a623; }
.mute-icon  { font-size: 14px; color: #aaa; }
.header-sub { font-size: 0.72rem; color: #aaa; }
.header-sub.online-text { color: #34c759; font-weight: 600; }

/* ── Búsqueda ────────────────────────────────────────────── */
.search-panel {
  display: flex; align-items: center; gap: 8px;
  background: #fff; padding: 8px 14px; border-bottom: 1px solid #f0f0f0;
}
.search-input-wrap {
  flex: 1; display: flex; align-items: center; gap: 8px;
  background: #f4f4f6; border-radius: 14px; padding: 6px 12px;
}
.s-icon { color: #aaa; font-size: 18px; flex-shrink: 0; }
.search-input { border: none; background: transparent; flex: 1; font-family: 'Jost', sans-serif; font-size: 0.9rem; outline: none; color: #000; }
.search-count { font-size: 0.72rem; color: #aaa; font-weight: 600; flex-shrink: 0; }
.search-count.no-res { color: #f87171; }
.search-nav { display: flex; gap: 4px; }
.snav-btn {
  width: 30px; height: 30px; border-radius: 8px; border: 1px solid #e0e0e0;
  background: #fff; cursor: pointer; font-size: 14px;
  display: flex; align-items: center; justify-content: center; font-family: 'Jost', sans-serif;
}
.close-btn { background: #000; color: #fff; border-color: #000; }
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.22s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Mensajes ────────────────────────────────────────────── */
.messages-container { padding: 16px; display: flex; flex-direction: column; gap: 18px; }
.empty-chat { display: flex; align-items: center; justify-content: center; padding: 60px 20px; color: #bbb; font-size: 0.9rem; }

.message-wrapper { display: flex; align-items: flex-end; gap: 8px; max-width: 88%; }
.left  { align-self: flex-start; }
.right { align-self: flex-end; flex-direction: row-reverse; }
.search-highlight { background: rgba(255,214,0,0.15); border-radius: 16px; padding: 2px; }

.chat-avatar { width: 30px; height: 30px; flex-shrink: 0; cursor: pointer; }
.chat-avatar img { border-radius: 50%; object-fit: cover; width: 100%; height: 100%; }

.bubble-content { display: flex; flex-direction: column; gap: 3px; }
.left  .bubble-content { align-items: flex-start; }
.right .bubble-content { align-items: flex-end; }

.message-bubble {
  padding: 11px 15px; font-size: 0.92rem; line-height: 1.45;
  border-radius: 18px; max-width: 260px; word-break: break-word;
}
.message-bubble.light {
  background: #fff; color: #1a1a1a;
  border-bottom-left-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,0.07);
}
.message-bubble.dark {
  background: linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%);
  color: #fff; border-bottom-right-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
}
.message-bubble.search-match { outline: 2px solid #ffd600; }
:deep(.hl) { background: #ffd600; color: #000; border-radius: 3px; padding: 0 2px; }

.message-image { max-width: 200px; border-radius: 16px; object-fit: cover; display: block; }

.reacciones-row { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 2px; }
.reaccion-badge {
  background: #fff; border: 1px solid #e0e0e0; border-radius: 20px;
  padding: 2px 8px; font-size: 0.85rem; cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08); transition: transform 0.15s;
}
.reaccion-badge:active { transform: scale(1.2); }

.msg-footer { display: flex; align-items: center; gap: 4px; }
.msg-footer.right { flex-direction: row-reverse; }
.message-time { font-size: 0.62rem; color: #bbb; font-weight: 500; }
.tick { font-size: 0.7rem; }
.tick.enviando { color: #bbb; }
.tick.enviado  { color: #bbb; }
.tick.leido    { color: #34c759; }

/* ── Picker emojis ───────────────────────────────────────── */
.emoji-backdrop { position: fixed; inset: 0; z-index: 99; }
.emoji-picker {
  position: fixed; z-index: 100; background: #fff; border-radius: 20px;
  padding: 10px 12px; display: flex; gap: 8px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.18); border: 1px solid #f0f0f0;
}
.emoji-opt { font-size: 1.4rem; cursor: pointer; transition: transform 0.15s; }
.emoji-opt:active { transform: scale(1.3); }
.emoji-pop-enter-active { animation: popIn 0.2s cubic-bezier(0.34,1.56,0.64,1); }
.emoji-pop-leave-active { transition: opacity 0.15s; }
.emoji-pop-leave-to { opacity: 0; }

/* ── Typing ──────────────────────────────────────────────── */
.typing-bubble { display: flex; align-items: center; gap: 5px; padding: 14px 18px; min-width: 60px; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: #aaa; animation: bounce 1.2s infinite ease-in-out; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%,80%,100%{transform:scale(0.8);opacity:0.5} 40%{transform:scale(1.2);opacity:1} }

/* ── Footer ──────────────────────────────────────────────── */
.chat-footer { background: #fff; padding: 10px 16px 30px; border-top: 1px solid #f0f0f0; }
.input-area  { display: flex; align-items: center; gap: 10px; }
.input-container-modern {
  flex: 1; background: #f8f8f8; border-radius: 24px;
  padding: 4px 16px; display: flex; align-items: center; border: 1px solid #eee;
}
.custom-input { --padding-start: 0; font-size: 0.95rem; --color: #000; color: #000; }
.input-actions { display: flex; gap: 12px; color: #888; font-size: 20px; cursor: pointer; }
.send-btn-modern {
  --background: #000; --color: #fff; --border-radius: 50%;
  width: 40px; height: 40px; margin: 0; --padding-start: 0; --padding-end: 0;
}

/* ── Popover ─────────────────────────────────────────────── */
.chat-popover { --width: 240px; }
.menu { padding: 8px; background: #fff; }
.menu-item {
  width: 100%; text-align: left; padding: 12px 10px; border: none;
  background: transparent; font-family: 'Jost', sans-serif;
  font-size: 0.9rem; color: #111; border-radius: 10px; cursor: pointer;
  transition: background 0.15s;
}
.menu-item:active { background: #f3f3f3; }
.menu-item.danger { color: #d10000; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
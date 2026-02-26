<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-back-button default-href="/MainLogged" text="" :icon="chevronBackOutline" class="custom-back" />
        </ion-buttons>
        <ion-title class="custom-title">Actividad</ion-title>
        <ion-buttons slot="end">
          <ion-button v-if="noLeidas > 0" fill="clear" class="mark-read-btn" @click="marcarTodasLeidas">
            Leer todas
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <!-- ✅ TABS INTERNOS -->
      <div class="inner-tabs">
        <button
          v-for="tab in ['Notificaciones', 'Amigos', 'Solicitudes']"
          :key="tab"
          class="inner-tab"
          :class="{ active: tabActivo === tab }"
          @click="tabActivo = tab"
        >
          {{ tab }}
          <span v-if="tab === 'Solicitudes' && noLeidas > 0" class="tab-pill">{{ noLeidas }}</span>
        </button>
      </div>
    </ion-header>

    <ion-content :fullscreen="true" class="page-bg">
      <div class="main-container">

        <!-- ══════════════ TAB: NOTIFICACIONES ══════════════ -->
        <template v-if="tabActivo === 'Notificaciones'">
          <template v-if="hoy.length">
            <h2 class="time-label">Hoy</h2>
            <div class="alerts-grid-inner">
              <div
                v-for="(a, i) in hoy" :key="a.id"
                class="alert-card" :class="{ read: a.leida }"
                :style="{ animationDelay: i * 60 + 'ms' }"
                @click="marcarLeida(a)"
              >
                <div
                  class="swipe-wrapper"
                  @touchstart="onTouchStart($event, a)"
                  @touchmove="onTouchMove($event, a)"
                  @touchend="onTouchEnd(a)"
                  :style="{ transform: `translateX(${a.swipeX ?? 0}px)`, transition: a.swiping ? 'none' : 'transform 0.3s ease' }"
                >
                  <div class="status-indicator" v-if="!a.leida"></div>
                  <div class="avatar-notif">
                    <img :src="a.avatar" />
                    <div class="type-badge" :style="{ background: tipoBadge(a.tipo).color }">
                      <ion-icon :icon="tipoBadge(a.tipo).icon" class="type-icon"></ion-icon>
                    </div>
                  </div>
                  <div class="alert-content">
                    <p class="alert-text">{{ a.texto }}</p>
                    <span class="alert-time">{{ timeAgo(a.ts) }}</span>
                  </div>
                </div>
                <div class="delete-bg"><ion-icon :icon="trashOutline" class="delete-icon"></ion-icon></div>
              </div>
            </div>
          </template>

          <template v-if="semana.length">
            <h2 class="time-label">Esta semana</h2>
            <div class="alerts-grid-inner">
              <div
                v-for="(a, i) in semana" :key="a.id"
                class="alert-card read"
                :style="{ animationDelay: (hoy.length + i) * 60 + 'ms' }"
                @click="marcarLeida(a)"
              >
                <div
                  class="swipe-wrapper"
                  @touchstart="onTouchStart($event, a)"
                  @touchmove="onTouchMove($event, a)"
                  @touchend="onTouchEnd(a)"
                  :style="{ transform: `translateX(${a.swipeX ?? 0}px)`, transition: a.swiping ? 'none' : 'transform 0.3s ease' }"
                >
                  <div class="avatar-notif">
                    <img :src="a.avatar" />
                    <div class="type-badge" :style="{ background: tipoBadge(a.tipo).color }">
                      <ion-icon :icon="tipoBadge(a.tipo).icon" class="type-icon"></ion-icon>
                    </div>
                  </div>
                  <div class="alert-content">
                    <p class="alert-text">{{ a.texto }}</p>
                    <span class="alert-time">{{ timeAgo(a.ts) }}</span>
                  </div>
                </div>
                <div class="delete-bg"><ion-icon :icon="trashOutline" class="delete-icon"></ion-icon></div>
              </div>
            </div>
          </template>

          <transition name="empty-fade">
            <div v-if="todas.length === 0" class="empty-state">
              <div class="empty-bell">
                <ion-icon :icon="notificationsOffOutline" class="empty-icon"></ion-icon>
              </div>
              <h3>Sin notificaciones</h3>
              <p>Cuando alguien interactúe con tus recetas lo verás aquí.</p>
            </div>
          </transition>
        </template>

        <!-- ══════════════ TAB: AMIGOS ══════════════ -->
        <template v-if="tabActivo === 'Amigos'">
          <div v-if="amigos.length === 0" class="empty-state">
            <div class="empty-bell">
              <ion-icon :icon="peopleOutline" class="empty-icon"></ion-icon>
            </div>
            <h3>Sin amigos aún</h3>
            <p>Envía solicitudes desde la pestaña "Solicitudes".</p>
          </div>

          <template v-else>
            <!-- Conectados -->
            <h2 class="time-label">
              <span class="dot-online"></span> Conectados ({{ amigosOnline.length }})
            </h2>
            <div class="friends-list">
              <div v-for="a in amigosOnline" :key="a.id" class="friend-card">
                <div class="friend-avatar-wrap">
                  <img :src="a.avatar" class="friend-avatar" />
                  <span class="online-dot"></span>
                </div>
                <div class="friend-info">
                  <p class="friend-name">{{ a.nombre }}</p>
                  <span class="friend-status online-text">Conectado ahora</span>
                </div>
                <ion-icon :icon="chatbubbleOutline" class="chat-icon"></ion-icon>
              </div>
            </div>

            <!-- Desconectados -->
            <h2 class="time-label" style="margin-top:24px">
              <span class="dot-offline"></span> Desconectados ({{ amigosOffline.length }})
            </h2>
            <div class="friends-list">
              <div v-for="a in amigosOffline" :key="a.id" class="friend-card offline">
                <div class="friend-avatar-wrap">
                  <img :src="a.avatar" class="friend-avatar" />
                  <span class="offline-dot"></span>
                </div>
                <div class="friend-info">
                  <p class="friend-name">{{ a.nombre }}</p>
                  <span class="friend-status">Última vez {{ a.ultimaVez }}</span>
                </div>
                <ion-icon :icon="chatbubbleOutline" class="chat-icon muted"></ion-icon>
              </div>
            </div>
          </template>
        </template>

        <!-- ══════════════ TAB: SOLICITUDES ══════════════ -->
        <template v-if="tabActivo === 'Solicitudes'">
          <h2 class="time-label">Sugerencias para ti</h2>

          <div class="suggestions-list">
            <div
              v-for="u in sugeridos"
              :key="u.id"
              class="suggestion-card"
              :class="{ 'sent': u.estado === 'pendiente', 'accepted': u.estado === 'aceptado', 'denied': u.estado === 'denegado' }"
            >
              <img :src="u.avatar" class="sug-avatar" />
              <div class="sug-info">
                <p class="sug-name">{{ u.nombre }}</p>
                <span class="sug-mutual">{{ u.mutual }} amigos en común</span>
              </div>

              <!-- Botón / estado -->
              <div class="sug-action">
                <!-- Sin enviar -->
                <button
                  v-if="!u.estado"
                  class="btn-add"
                  @click="enviarSolicitud(u)"
                >
                  <ion-icon :icon="personAddOutline"></ion-icon>
                  Añadir
                </button>

                <!-- Pendiente (pensando...) -->
                <div v-else-if="u.estado === 'pendiente'" class="estado-pendiente">
                  <div class="spinner"></div>
                  <span>Pensando…</span>
                </div>

                <!-- Aceptado -->
                <div v-else-if="u.estado === 'aceptado'" class="estado-badge accepted-badge">
                  <ion-icon :icon="checkmarkCircleOutline"></ion-icon>
                  Aceptado
                </div>

                <!-- Denegado -->
                <div v-else-if="u.estado === 'denegado'" class="estado-badge denied-badge">
                  <ion-icon :icon="closeCircleOutline"></ion-icon>
                  Denegado
                </div>
              </div>
            </div>
          </div>
        </template>

        <div class="bottom-spacer"></div>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button @click="navegar('/Perfil')">
          <div class="avatar-wrapper">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" />
          </div>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/Chat')">
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button @click="navegar('/MainLogged')">
          <div class="home-indicator">
            <ion-icon :icon="homeOutline"></ion-icon>
          </div>
        </ion-tab-button>
        <ion-tab-button><ion-icon :icon="addCircleOutline"></ion-icon></ion-tab-button>
        <ion-tab-button class="tab-active">
          <div class="tab-badge-wrap">
            <ion-icon :icon="alertCircle"></ion-icon>
            <span v-if="noLeidas > 0" class="notif-badge">{{ noLeidas > 9 ? '9+' : noLeidas }}</span>
          </div>
        </ion-tab-button>
        <ion-tab-button><ion-icon :icon="searchOutline"></ion-icon></ion-tab-button>
      </ion-tab-bar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton,
  IonTitle, IonContent, IonFooter, IonTabBar, IonTabButton,
  IonIcon, useIonRouter
} from '@ionic/vue';
import {
  paperPlaneOutline, homeOutline, addCircleOutline,
  alertCircle, searchOutline, chevronBackOutline,
  heart, chatbubbleOutline, personAddOutline, trophyOutline,
  trashOutline, notificationsOffOutline, peopleOutline,
  checkmarkCircleOutline, closeCircleOutline
} from 'ionicons/icons';
import { ref, computed } from 'vue';

const router  = useIonRouter();
const navegar = (ruta: string) => router.navigate(ruta, 'forward', 'replace');

const tabActivo = ref('Notificaciones');

// ── Tipos notificación ────────────────────────────────────────
type TipoNotif = 'like' | 'comentario' | 'follow' | 'logro';
const tipoBadge = (tipo: TipoNotif) => {
  switch (tipo) {
    case 'like':       return { icon: heart,             color: '#ff2d55' };
    case 'comentario': return { icon: chatbubbleOutline, color: '#007aff' };
    case 'follow':     return { icon: personAddOutline,  color: '#34c759' };
    case 'logro':      return { icon: trophyOutline,     color: '#ff9500' };
  }
};

// ── Notificaciones ────────────────────────────────────────────
const now   = new Date();
const mins  = (m: number) => new Date(now.getTime() - m * 60000);
const hours = (h: number) => new Date(now.getTime() - h * 3600000);
const days  = (d: number) => new Date(now.getTime() - d * 86400000);

interface Notif {
  id: number; texto: string; avatar: string; tipo: TipoNotif;
  ts: Date; leida: boolean; seccion: 'hoy' | 'semana';
  swipeX?: number; swiping?: boolean; touchStartX?: number;
}

const todas = ref<Notif[]>([
  { id: 1, texto: '¡Dani le dio like a tu receta!',    avatar: 'https://i.pravatar.cc/80?img=3',  tipo: 'like',       ts: mins(5),  leida: false, seccion: 'hoy'   },
  { id: 2, texto: 'Carlos comentó: "¡Qué pintaza!"',   avatar: 'https://i.pravatar.cc/80?img=7',  tipo: 'comentario', ts: mins(22), leida: false, seccion: 'hoy'   },
  { id: 3, texto: '¡Fede te ha empezado a seguir!',    avatar: 'https://i.pravatar.cc/80?img=12', tipo: 'follow',     ts: hours(1), leida: false, seccion: 'hoy'   },
  { id: 4, texto: '🏆 Tu receta llegó a 100 likes',    avatar: 'https://i.pravatar.cc/80?img=15', tipo: 'logro',      ts: hours(3), leida: false, seccion: 'hoy'   },
  { id: 5, texto: '¡Porrino le dio like!',             avatar: 'https://i.pravatar.cc/80?img=20', tipo: 'like',       ts: days(1),  leida: true,  seccion: 'semana' },
  { id: 6, texto: 'Luis Ela comentó: "Receta top 🔥"', avatar: 'https://i.pravatar.cc/80?img=25', tipo: 'comentario', ts: days(2),  leida: true,  seccion: 'semana' },
  { id: 7, texto: '¡Messi te ha empezado a seguir!',   avatar: 'https://i.pravatar.cc/80?img=33', tipo: 'follow',     ts: days(3),  leida: true,  seccion: 'semana' },
  { id: 8, texto: '🏆 Tu receta llegó a 1000 likes',   avatar: 'https://i.pravatar.cc/80?img=40', tipo: 'logro',      ts: days(4),  leida: true,  seccion: 'semana' },
]);

const hoy    = computed(() => todas.value.filter(a => a.seccion === 'hoy'));
const semana = computed(() => todas.value.filter(a => a.seccion === 'semana'));
const noLeidas = computed(() => todas.value.filter(a => !a.leida).length);

const marcarLeida      = (a: Notif) => { a.leida = true; };
const marcarTodasLeidas = () => { todas.value.forEach(a => a.leida = true); };

const timeAgo = (date: Date): string => {
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60)    return 'Hace un momento';
  if (diff < 3600)  return `Hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)}h`;
  const d = Math.floor(diff / 86400);
  return d === 1 ? 'Ayer' : `Hace ${d} días`;
};

// Swipe
const SWIPE_THRESHOLD = 80;
const onTouchStart = (e: TouchEvent, a: Notif) => { a.touchStartX = e.touches[0].clientX; a.swiping = true; };
const onTouchMove  = (e: TouchEvent, a: Notif) => {
  if (a.touchStartX === undefined) return;
  a.swipeX = Math.min(0, e.touches[0].clientX - a.touchStartX);
};
const onTouchEnd = (a: Notif) => {
  a.swiping = false;
  if ((a.swipeX ?? 0) < -SWIPE_THRESHOLD) todas.value = todas.value.filter(n => n.id !== a.id);
  else a.swipeX = 0;
};

// ── Amigos ────────────────────────────────────────────────────
interface Amigo { id: number; nombre: string; avatar: string; online: boolean; ultimaVez?: string; }

const amigos = ref<Amigo[]>([
  { id: 101, nombre: 'Dani García',   avatar: 'https://i.pravatar.cc/80?img=3',  online: true  },
  { id: 102, nombre: 'Carlos López',  avatar: 'https://i.pravatar.cc/80?img=7',  online: false, ultimaVez: 'hace 2h'  },
  { id: 103, nombre: 'Fede Ruiz',     avatar: 'https://i.pravatar.cc/80?img=12', online: true  },
  { id: 104, nombre: 'Laura Martín',  avatar: 'https://i.pravatar.cc/80?img=47', online: false, ultimaVez: 'ayer'     },
]);

const amigosOnline  = computed(() => amigos.value.filter(a => a.online));
const amigosOffline = computed(() => amigos.value.filter(a => !a.online));

// ── Solicitudes / Sugeridos ───────────────────────────────────
type EstadoSolicitud = undefined | 'pendiente' | 'aceptado' | 'denegado';
interface Sugerido { id: number; nombre: string; avatar: string; mutual: number; estado?: EstadoSolicitud; }

const sugeridos = ref<Sugerido[]>([
  { id: 201, nombre: 'Porrino Chef',    avatar: 'https://i.pravatar.cc/80?img=20', mutual: 3 },
  { id: 202, nombre: 'Luis Ela',        avatar: 'https://i.pravatar.cc/80?img=25', mutual: 1 },
  { id: 203, nombre: 'Messi',           avatar: 'https://i.pravatar.cc/80?img=33', mutual: 7 },
  { id: 204, nombre: 'Julia Fernández', avatar: 'https://i.pravatar.cc/80?img=49', mutual: 2 },
  { id: 205, nombre: 'Marco Rossi',     avatar: 'https://i.pravatar.cc/80?img=52', mutual: 0 },
  { id: 206, nombre: 'Ana Belén',       avatar: 'https://i.pravatar.cc/80?img=44', mutual: 4 },
]);

// Delay aleatorio entre 1.5s y 4s para simular "pensar"
const enviarSolicitud = (u: Sugerido) => {
  u.estado = 'pendiente';
  const delay = 1500 + Math.random() * 2500;
  setTimeout(() => {
    const acepta = Math.random() > 0.35; // 65% acepta
    u.estado = acepta ? 'aceptado' : 'denegado';

    if (acepta) {
      // Añadir a la lista de amigos automáticamente
      amigos.value.push({
        id: u.id,
        nombre: u.nombre,
        avatar: u.avatar,
        online: Math.random() > 0.5,
        ultimaVez: 'hace un momento',
      });
    }
  }, delay);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

.page-bg { --background: #f7f7f7; font-family: 'Jost', sans-serif; }

/* ── Header ──────────────────────────────────────────────── */
.custom-toolbar { --background: #ffffff; --padding-top: 10px; --padding-bottom: 4px; }
.custom-title   { font-weight: 700; font-size: 1.2rem; letter-spacing: -0.5px; text-align: center; color: #000; }
.custom-back    { color: #000 !important; }
.mark-read-btn  { --color: #007aff; font-size: 0.85rem; font-weight: 600; }

/* ── Tabs internos ───────────────────────────────────────── */
.inner-tabs {
  display: flex;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 16px;
  gap: 4px;
}
.inner-tab {
  flex: 1; background: none; border: none; padding: 12px 4px;
  font-family: 'Jost', sans-serif; font-size: 0.9rem; font-weight: 600;
  color: #aaa; cursor: pointer; position: relative;
  transition: color 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 6px;
}
.inner-tab.active { color: #000; }
.inner-tab.active::after {
  content: ''; position: absolute; bottom: 0; left: 10%; right: 10%;
  height: 2px; background: #000; border-radius: 2px;
}
.tab-pill {
  background: #ff3b30; color: #fff; font-size: 0.62rem;
  font-weight: 700; padding: 2px 6px; border-radius: 10px; min-width: 18px;
  text-align: center;
}

/* ── Container ───────────────────────────────────────────── */
.main-container { max-width: 900px; margin: 0 auto; padding: 10px 16px; }
.time-label {
  font-size: 0.82rem; text-transform: uppercase; letter-spacing: 1.5px;
  color: #888; font-weight: 700; margin: 20px 0 12px 4px;
  display: flex; align-items: center; gap: 8px;
}

/* ── Notificaciones ──────────────────────────────────────── */
.alerts-grid-inner { display: grid; grid-template-columns: 1fr; gap: 10px; }
@media (min-width: 768px) { .alerts-grid-inner { grid-template-columns: 1fr 1fr; } }

.alert-card {
  position: relative; border-radius: 18px; overflow: hidden;
  border: 1px solid #ececec; background: #fff;
  animation: slideIn 0.4s ease both;
}
.alert-card.read { opacity: 0.65; background: #fafafa; border-color: transparent; }
@keyframes slideIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

.swipe-wrapper {
  display: flex; align-items: center; padding: 14px;
  background: #fff; position: relative; z-index: 1;
  border-radius: 18px; gap: 14px;
}
.alert-card.read .swipe-wrapper { background: #fafafa; }

.delete-bg {
  position: absolute; right: 0; top: 0; bottom: 0; width: 80px;
  background: #ff3b30; display: flex; align-items: center;
  justify-content: center; z-index: 0; border-radius: 0 18px 18px 0;
}
.delete-icon { color: #fff; font-size: 22px; }

.status-indicator {
  position: absolute; left: 6px; top: 50%; transform: translateY(-50%);
  width: 6px; height: 6px; background: #007aff; border-radius: 50%;
}

.avatar-notif { position: relative; width: 46px; height: 46px; flex-shrink: 0; }
.avatar-notif img { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 1.5px solid #f0f0f0; }
.type-badge {
  position: absolute; bottom: -2px; right: -4px;
  width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; border: 2px solid #fff;
}
.type-icon { font-size: 11px; color: #fff; }

.alert-content { display: flex; flex-direction: column; flex: 1; }
.alert-text  { margin: 0; font-size: 0.93rem; font-weight: 500; color: #1a1a1a; line-height: 1.3; }
.alert-time  { font-size: 0.75rem; color: #aaa; margin-top: 3px; }

/* ── Amigos ──────────────────────────────────────────────── */
.friends-list { display: flex; flex-direction: column; gap: 10px; }
.friend-card {
  display: flex; align-items: center; gap: 14px;
  background: #fff; border-radius: 18px; padding: 14px;
  border: 1px solid #ececec;
  animation: slideIn 0.35s ease both;
}
.friend-card.offline { opacity: 0.7; }

.friend-avatar-wrap { position: relative; flex-shrink: 0; }
.friend-avatar { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 1.5px solid #f0f0f0; }

.online-dot {
  position: absolute; bottom: 1px; right: 1px;
  width: 11px; height: 11px; background: #34c759;
  border-radius: 50%; border: 2px solid #fff;
}
.offline-dot {
  position: absolute; bottom: 1px; right: 1px;
  width: 11px; height: 11px; background: #ccc;
  border-radius: 50%; border: 2px solid #fff;
}

.friend-info { flex: 1; }
.friend-name   { margin: 0; font-size: 0.95rem; font-weight: 700; color: #1a1a1a; }
.friend-status { font-size: 0.75rem; color: #aaa; }
.online-text   { color: #34c759; font-weight: 600; }

.chat-icon      { font-size: 22px; color: #007aff; cursor: pointer; }
.chat-icon.muted { color: #ccc; }

.dot-online  { display: inline-block; width: 8px; height: 8px; background: #34c759; border-radius: 50%; }
.dot-offline { display: inline-block; width: 8px; height: 8px; background: #ccc; border-radius: 50%; }

/* ── Solicitudes / Sugeridos ─────────────────────────────── */
.suggestions-list { display: flex; flex-direction: column; gap: 10px; }
.suggestion-card {
  display: flex; align-items: center; gap: 14px;
  background: #fff; border-radius: 18px; padding: 14px;
  border: 1px solid #ececec;
  animation: slideIn 0.35s ease both;
  transition: opacity 0.3s;
}
.suggestion-card.accepted { border-color: #34c759; background: #f0fff4; }
.suggestion-card.denied   { border-color: #f0f0f0; opacity: 0.55; }

.sug-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 1.5px solid #f0f0f0; flex-shrink: 0; }
.sug-info   { flex: 1; }
.sug-name   { margin: 0; font-size: 0.95rem; font-weight: 700; color: #1a1a1a; }
.sug-mutual { font-size: 0.75rem; color: #aaa; }

.sug-action { flex-shrink: 0; }

.btn-add {
  display: flex; align-items: center; gap: 6px;
  background: #000; color: #fff;
  border: none; border-radius: 20px;
  padding: 8px 16px; font-size: 0.85rem; font-weight: 700;
  font-family: 'Jost', sans-serif; cursor: pointer;
  transition: opacity 0.2s;
}
.btn-add:active { opacity: 0.75; }
.btn-add ion-icon { font-size: 16px; }

/* Spinner */
.estado-pendiente {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.82rem; color: #aaa; font-weight: 600;
}
.spinner {
  width: 18px; height: 18px; border: 2.5px solid #e0e0e0;
  border-top-color: #000; border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.estado-badge {
  display: flex; align-items: center; gap: 5px;
  font-size: 0.82rem; font-weight: 700; border-radius: 20px; padding: 6px 12px;
}
.accepted-badge { background: #e8faf0; color: #34c759; }
.denied-badge   { background: #f5f5f5; color: #bbb; }
.estado-badge ion-icon { font-size: 16px; }

/* ── Estado vacío ────────────────────────────────────────── */
.empty-state {
  display: flex; flex-direction: column; align-items: center;
  padding: 80px 20px; text-align: center; color: #bbb;
  animation: fadeIn 0.5s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.empty-bell {
  width: 90px; height: 90px; background: #f5f5f5;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
  animation: wiggle 1.8s ease-in-out infinite;
}
@keyframes wiggle { 0%,100%{transform:rotate(0)} 20%{transform:rotate(-12deg)} 40%{transform:rotate(12deg)} 60%{transform:rotate(-6deg)} 80%{transform:rotate(6deg)} }
.empty-icon   { font-size: 42px; color: #ccc; }
.empty-state h3 { margin: 0 0 8px; font-size: 1.1rem; font-weight: 700; color: #999; }
.empty-state p  { margin: 0; font-size: 0.88rem; color: #bbb; max-width: 240px; line-height: 1.5; }
.empty-fade-enter-active { transition: opacity 0.4s; }
.empty-fade-enter-from   { opacity: 0; }

/* ── Tab bar ─────────────────────────────────────────────── */
.custom-tab-bar { --background: #ffffff; height: 85px; border-top: 1px solid #f5f5f5; }
.custom-tab-bar ion-icon { color: #000; font-size: 24px; }
.home-indicator {
  background: #000; width: 48px; height: 48px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}
.home-indicator ion-icon { color: #fff !important; }
.tab-active ion-icon { color: #007aff !important; }
.avatar-wrapper { width: 32px; height: 32px; border-radius: 50%; overflow: hidden; border: 1.5px solid #000; }
.avatar-wrapper img { width: 100%; height: 100%; object-fit: cover; }

.tab-badge-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
.notif-badge {
  position: absolute; top: -8px; right: -10px;
  background: #ff3b30; color: #fff; font-size: 0.6rem; font-weight: 700;
  min-width: 16px; height: 16px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px; border: 1.5px solid #fff;
}

.bottom-spacer { height: 120px; }
</style>
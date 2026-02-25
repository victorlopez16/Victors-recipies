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
          <ion-button>
            <ion-icon slot="icon-only" :icon="ellipsisHorizontalOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="chat-content">
      <div class="messages-container">
        
        <div class="message-wrapper left">
          <ion-avatar class="chat-avatar" @click="navegar('/Perfil')">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" />
          </ion-avatar>
          <div class="bubble-content">
            <div class="message-bubble">Hola Porrino, ¿qué tal?</div>
            <span class="message-time">14:02</span>
          </div>
        </div>

        <div class="message-wrapper right">
          <div class="bubble-content">
            <div class="message-bubble dark">Hola Dani, bien gracias. Sobreviviendo a la semana... 😅</div>
            <span class="message-time">14:05</span>
          </div>
          <ion-avatar class="chat-avatar" @click="navegar('/PerfilInvitado')">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" />
          </ion-avatar>
        </div>

        <div class="message-wrapper left">
          <ion-avatar class="chat-avatar" @click="navegar('/Perfil')">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" />
          </ion-avatar>
          <div class="bubble-content">
            <div class="message-bubble">Oye, quería compartir una receta contigo. El secreto es la bechamel de mi abuela.</div>
            <span class="message-time">14:06</span>
          </div>
        </div>

        <div class="message-wrapper right">
          <div class="bubble-content">
            <div class="message-bubble dark">¿Llevan cebolla? No quiero abrir un debate nacional pero... 🧐</div>
            <span class="message-time">14:08</span>
          </div>
          <ion-avatar class="chat-avatar" @click="navegar('/PerfilInvitado')">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" />
          </ion-avatar>
        </div>

        <div class="message-wrapper left">
          <ion-avatar class="chat-avatar" @click="navegar('/Perfil')">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" />
          </ion-avatar>
          <div class="bubble-content">
            <div class="message-bubble">¡Cebolla siempre! Si no, es solo pollo frito con cosas. ¿Mañana te pasas y las catas?</div>
            <span class="message-time">14:10</span>
          </div>
        </div>

        <div class="message-wrapper right">
          <div class="bubble-content">
            <div class="message-bubble dark">¿A qué hora? Iría ahora mismo pero estoy en el gimnasio fingiendo que entreno. 🏋️‍♂️</div>
            <span class="message-time">14:12</span>
          </div>
          <ion-avatar class="chat-avatar" @click="navegar('/PerfilInvitado')">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" />
          </ion-avatar>
        </div>

        <div class="message-wrapper left">
          <ion-avatar class="chat-avatar" @click="navegar('/Perfil')">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" />
          </ion-avatar>
          <div class="bubble-content">
            <div class="message-bubble">Vente sobre las 14:00. Trae hambre y una Coca-Cola fría. ¡Nos vemos!</div>
            <span class="message-time">14:15</span>
          </div>
        </div>

        <div class="message-wrapper right">
          <div class="bubble-content">
            <div class="message-bubble dark">Trato hecho. ¡Mañana nos vemos, chef! 👨‍🍳</div>
            <span class="message-time">14:16</span>
          </div>
          <ion-avatar class="chat-avatar" @click="navegar('/PerfilInvitado')">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" />
          </ion-avatar>
        </div>

      </div>
    </ion-content>

    <ion-footer class="ion-no-border chat-footer">
      <div class="input-area">
        <div class="input-container-modern">
          <ion-input 
            placeholder="Escribe un mensaje..." 
            class="custom-input"
            mode="md"
          ></ion-input>
          <div class="input-actions">
            <ion-icon :icon="imageOutline"></ion-icon>
            <ion-icon :icon="micOutline"></ion-icon>
          </div>
        </div>
        <ion-button fill="clear" class="send-btn-modern">
          <ion-icon slot="icon-only" :icon="arrowUpOutline"></ion-icon>
        </ion-button>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonButton, IonIcon, IonFooter, IonAvatar, IonInput, useIonRouter 
} from '@ionic/vue';
import { 
  chevronBackOutline, imageOutline, micOutline, arrowUpOutline, ellipsisHorizontalOutline 
} from 'ionicons/icons';

const ionRouter = useIonRouter();
const navegarAtras = () => ionRouter.canGoBack() ? ionRouter.back() : ionRouter.navigate('/MainLogged', 'back', 'replace');
const navegar = (ruta: string) => ionRouter.navigate(ruta, 'forward', 'replace');
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

.message-bubble.dark {
  background: #000;
  color: #fff;
}

.message-time { font-size: 0.65rem; color: #bbb; margin-top: 4px; font-weight: 500; }

/* FOOTER Y INPUT AREA */
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

/* Fuerza el texto en negro cuando el usuario escribe */
.custom-input { 
  --padding-start: 0; 
  font-size: 0.95rem; 
  --color: #000000 !important; 
  color: #000000 !important;
}

.input-actions { display: flex; gap: 12px; color: #888; font-size: 20px; }

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
</style>
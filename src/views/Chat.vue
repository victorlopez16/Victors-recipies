<template>
  <ion-page>
    <ion-header class="ion-no-border custom-header">
      <ion-toolbar mode="md" class="white-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="navegarAtras">
            <ion-icon slot="icon-only" :icon="chevronBackOutline" class="black-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="chat-title">Chat</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="chat-content">
      <div class="messages-container">
        <div class="message-wrapper left">
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" alt="Dani" />
          </ion-avatar>
          <div class="bubble-container">
            <div class="message-bubble">Hola Porrino que tal?</div>
          </div>
        </div>

        <div class="message-wrapper right">
          <div class="bubble-container">
            <div class="message-bubble">Hola Dani, bien gracias. Sobreviviendo a la semana... 😅</div>
          </div>
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" alt="Porrino" />
          </ion-avatar>
        </div>

        <div class="message-wrapper left">
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" alt="Dani" />
          </ion-avatar>
          <div class="bubble-container">
            <div class="message-bubble">Oye, quería compartir una receta contigo.</div>
          </div>
        </div>

        <div class="message-wrapper right">
          <div class="bubble-container">
            <div class="message-bubble">Que bien! Soy todo oídos.</div>
          </div>
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" alt="Porrino" />
          </ion-avatar>
        </div>

        <div class="message-wrapper left">
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" alt="Dani" />
          </ion-avatar>
          <div class="bubble-container">
            <div class="message-bubble">Son unas croquetas de pollo increíbles. El secreto es la bechamel de mi abuela.</div>
          </div>
        </div>

        <div class="message-wrapper right">
          <div class="bubble-container">
            <div class="message-bubble">¿Llevan cebolla? No quiero abrir un debate nacional pero... 🧐</div>
          </div>
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" alt="Porrino" />
          </ion-avatar>
        </div>

        <div class="message-wrapper left">
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" alt="Dani" />
          </ion-avatar>
          <div class="bubble-container">
            <div class="message-bubble">¡Cebolla siempre! Si no, es solo pollo frito con cosas. ¿Mañana te pasas y las catas?</div>
          </div>
        </div>

        <div class="message-wrapper right">
          <div class="bubble-container">
            <div class="message-bubble">¿A qué hora? Iría ahora mismo pero estoy en el gimnasio fingiendo que entreno. 🏋️‍♂️</div>
          </div>
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" alt="Porrino" />
          </ion-avatar>
        </div>

        <div class="message-wrapper left">
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" alt="Dani" />
          </ion-avatar>
          <div class="bubble-container">
            <div class="message-bubble">Vente sobre las 14:00. Trae hambre y una Coca-Cola fría. ¡Nos vemos!</div>
          </div>
        </div>

        <div class="message-wrapper right">
          <div class="bubble-container">
            <div class="message-bubble">Trato hecho. ¡Mañana nos vemos, chef! 👨‍🍳</div>
          </div>
          <ion-avatar class="chat-avatar">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150" alt="Porrino" />
          </ion-avatar>
        </div>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border chat-footer">
      <div class="input-container">
        <div class="input-top">
          <ion-input placeholder="Escribe algo en el chat..." class="custom-input"></ion-input>
        </div>
        <div class="input-bottom">
          <div class="bottom-icons">
            <ion-icon :icon="imageOutline"></ion-icon>
            <ion-icon :icon="codeOutline"></ion-icon>
            <ion-icon :icon="micOutline"></ion-icon>
          </div>
          <ion-button fill="clear" class="send-btn">
            <ion-icon slot="icon-only" :icon="arrowUpOutline"></ion-icon>
          </ion-button>
        </div>
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
  chevronBackOutline, imageOutline, codeOutline, micOutline, arrowUpOutline 
} from 'ionicons/icons';

const ionRouter = useIonRouter();

// Redirigir a MainLogged si falla el historial
const navegarAtras = () => {
  if (ionRouter.canGoBack()) {
    ionRouter.back();
  } else {
    ionRouter.navigate('/MainLogged', 'back', 'push');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&display=swap');

ion-content { --background: #ffffff; font-family: 'Jost', sans-serif; }

.white-toolbar { --background: #ffffff; --color: #000; }
.chat-title { font-weight: 700; font-size: 1.4rem; text-align: center; }
.black-icon { color: #000; }

.messages-container { 
  padding: 20px; 
  display: flex; 
  flex-direction: column; 
  gap: 20px;
  padding-bottom: 60px; 
}

.message-wrapper { display: flex; align-items: flex-end; gap: 10px; max-width: 85%; }
.left { align-self: flex-start; }
.right { align-self: flex-end; }

.chat-avatar { width: 45px; height: 45px; flex-shrink: 0; }
.chat-avatar img { border-radius: 50%; object-fit: cover; }

.message-bubble {
  background: #000;
  color: #fff;
  padding: 12px 18px;
  border-radius: 18px;
  font-size: 0.95rem;
  line-height: 1.4;
}

.left .message-bubble { border-bottom-left-radius: 2px; }
.right .message-bubble { border-bottom-right-radius: 2px; }

.chat-footer { background: #fff; padding: 10px 15px 25px; }
.input-container {
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 10px 15px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.custom-input { --padding-start: 5px; font-size: 1rem; color: #000; }
.input-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
.bottom-icons { display: flex; gap: 18px; color: #333; font-size: 22px; }
.send-btn {
  --background: #f0f0f0;
  --color: #000;
  --border-radius: 50%;
  width: 36px;
  height: 36px;
  margin: 0;
}
</style>
<template>
  <ion-page>
    <ion-content :fullscreen="true" class="start-content">
      <div class="start-bg">
        <div class="brand">
          <!-- LogoCubiertos SIN círculo negro -->
          <img :src="logoCubiertos" alt="Logo cubiertos" class="logo-img" />
          
          <div class="script">Victor's Recipies</div>
        </div>

        <ion-button class="btn jost-font" expand="block" @click="goNext">
          Acceder
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { useRouter } from 'vue-router'

// Importa tu logo PNG
import logoCubiertos from '@/assets/LogoCubiertos.png'

const router = useRouter()
function goNext() {
  router.push('/Presentacion1') 
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Jost:wght@600&display=swap');

.start-content{ --background: transparent; }

.start-bg{
  min-height: 100%;
  background: linear-gradient(180deg, #1d22ff 0%, #6f73ff 35%, #c7c9ff 65%, #ffffff 100%);
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center; 
  padding: 72px 22px 40px;
  position: relative; 
}

.brand{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap: 14px;
  margin-top: -40px; 
}

.logo-img{
  width: 90px;
  height: 90px;
  object-fit: contain;
}

.script{
  font-size: 34px;
  color:#111;
  font-weight: 700;
  font-family: 'Dancing Script', cursive;
}

.btn.jost-font{
  --background: #000;
  --color:#fff;
  --border-radius: 10px;
  height: 52px;
  width: 100%;
  max-width: 340px;
  text-transform: none;
  font-weight: 600;
  position: absolute; 
  bottom: 40px; 
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Jost', sans-serif;
}

.btn.jost-font::part(native){
  font-family: 'Jost', sans-serif;
}
</style>

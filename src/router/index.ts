import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import InitialLoading from '../views/InitialLoading.vue';
import Presentacion1 from '../views/Presentacion1.vue';
import Presentacion2 from '../views/Presentacion2.vue';
import LoginPage from '../views/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/initial-loading'
  },
  {
    path: '/initial-loading',
    name: 'InitialLoading',
    component: InitialLoading
  },
  {
    path: '/presentacion1',
    name: 'Presentacion1',
    component: Presentacion1
  },
  {
    path: '/presentacion2',
    name: 'Presentacion2',
    component: Presentacion2
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
  path: '/MainNoLogged',
  name: 'MainNoLogged',
  component: () => import('@/views/MainNoLogged.vue')
}, 
{
  path: '/Pleaselogin',
  name: 'Pleaselogin',
  component: () => import('@/views/Pleaselogin.vue')
}, 
{
  path: '/Register',
  name: 'Register',
  component: () => import('@/views/Register.vue')
}, 
{
  path: '/Register2',
  name: 'Register2',
  component: () => import('@/views/Register2.vue')
}, 
{
  path: '/MainLogged',
  name: 'MainLogged',
  component: () => import('@/views/MainLogged.vue')
},
{
    path: '/EntradaReceta',
    component: () => import('@/views/EntradaReceta.vue')
  },
  {
    path: '/EntradaReceta2',
    component: () => import('@/views/EntradaReceta2.vue')
  },
  {
    path: '/Chat',
    component: () => import('@/views/Chat.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

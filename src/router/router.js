import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/Register.vue';

const routes = [
  { path: '/', component: Register }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

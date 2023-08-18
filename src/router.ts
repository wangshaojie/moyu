import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/home.vue')
  },
  {
    path: '/snake-game',
    name: 'SnakeGame',
    component: () => import('./pages/snake-game.vue')
  },
  {
    path: '/fpyx',
    name: 'Fpyx',
    component: () => import('./pages/fpyx.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

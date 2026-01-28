import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Juego from '../views/Game.vue'
import Winner from '../views/Winner.vue'
import Loser from '../views/Loser.vue'

const routes = [
  {
    path: '/juego/:juego',
    name: 'Juego',
    component: Juego,
    props: true
  },
  {
    path: '/winner',
    name: 'Winner',
    component: Winner,
  },
  {
    path: '/loser',
    name: 'Loser',
    component: Loser,
  }, {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHashHistory(), // Ideal para GitHub Pages
  routes
})

export default router
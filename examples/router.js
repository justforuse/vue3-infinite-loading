import { createWebHashHistory, createRouter } from 'vue-router'

import StartWithHn from './pages/start-with-hn.vue'

const routes = [
  // { path: '/', component: HomeView },
  { path: '/start-with-hn', component: StartWithHn }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

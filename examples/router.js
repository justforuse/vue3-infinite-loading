import { createWebHashHistory, createRouter } from 'vue-router'

import StartWithHn from './pages/start-with-hn.vue'
import LoadMsg from './pages/load-msg.vue'
import UseELement from './pages/use-element.vue'

const routes = [
  // { path: '/', component: HomeView },
  { path: '/start-with-hn', component: StartWithHn },
  { path: '/load-msg', component: LoadMsg },
  { path: '/use-element', component: UseELement },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

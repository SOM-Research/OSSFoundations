import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import AddFoundation from '../views/AddFoundation.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/add',
    name: 'Add',
    component: AddFoundation
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import AddFoundation from '../views/AddFoundation.vue'
import {firebase} from "@/firebase.js";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
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

// router.beforeEach(async (to, from, next) => {
//   const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
//   if (requiresAdmin && !await firebase.getCurrentUser()) {
//     next('/');
//   } else if (requiresAdmin && await firebase.getCurrentUser()){
//     firebase
//       .auth()
//       .currentUser.getIdTokenResult()
//       .then((idTokenResult) => {
//         if (idTokenResult.claims.admin === true) {
//           next();
//         } 
//       });
//   } else {
//     next('/')
//   }
// });

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !await firebase.getCurrentUser()) {
    next('/');
  } else {
    next();
  }
});

export default router

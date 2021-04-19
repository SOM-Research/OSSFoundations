import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import AddFoundation from '../views/AddFoundation.vue'
import { firebase } from "@/firebase.js";

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
      requiresAdmin: true
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
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
//   }
// });

// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth && !await firebase.getCurrentUser()) {
//     next('/');
//   } else {
//     next();
//   }
// });

//Checks the routes with the meta "requiresAdmin" to only allow admins to access to restricted pages
router.beforeEach(async (to, from, next) => {
  //Matches if the route has "requiresADmin"
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  //Step 1: If the route has "requires admin" but there is not a user logged in
  if (requiresAdmin && !await firebase.getCurrentUser()) {
    next('/');
    //Step 2: If the route has "requires admin" and there is a user logged in
  } else if (requiresAdmin && await firebase.getCurrentUser()) {
    //Looks if the user token has an "admin" claim
    console.log("paso 2.1");
    firebase.auth()
      .currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        if (idTokenResult.claims.admin == true) {
          console.log("paso 2.2");
          next();
        } else {
          next('/');
        }
      })
    //Step 3: If not of all above, the route is free to access
  } else {
    console.log("paso 3");
    next();
  }
});

export default router

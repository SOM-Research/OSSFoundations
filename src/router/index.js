import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import AddFoundation from '../views/AddFoundation.vue'
import { firebase } from "@/firebase.js";
import { trackRouter } from "vue-gtag-next";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "OSS Foundations"
    }
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
    name: 'Add Foundation',
    component: AddFoundation
  }
]


const router = createRouter({
  history: createWebHashHistory('/OSSFoundations/'),
  routes,
  //linkActiveClass: 'text-dark',
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash }
    }
    // else if (savedPosition) {
    //   return savedPosition;
    // }
    return { left: 0, top: 0 }
  }

})


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
    firebase.auth()
      .currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        if (idTokenResult.claims.admin == true) {
          next();
        } else {
          next('/');
        }
      })
    //Step 3: If not of all above, the route is free to access
  } else {
    next();
  }
});

trackRouter(router); //Tracks the router for Google Analytics

export default router

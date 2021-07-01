<template>
  <header>
    <nav class="first-line menu-desktop d-none d-lg-flex">
      <h1 class="logo"><router-link to="/">OSSFoundations</router-link></h1>
      <router-link
        to="/"
        class="item-header"
        :class="{ 'text-dark': isCurrentRoute('/') }"
        >Home</router-link
      >
      <router-link :to="{ path: '/', hash: '#what-we-did' }" class="item-header"
        >What we did</router-link
      >
      <router-link :to="{ path: '/', hash: '#chart' }" class="item-header"
        >Search</router-link
      >

      <router-link
        to="/add"
        class="item-header"
        :class="{ 'text-dark': isCurrentRoute('/add') }"
        >Add foundation</router-link
      >
      <div class="auth item-header">
        <auth />
      </div>
    </nav>
    <nav class="navbar nav-mobile d-lg-none row" aria-hidden="true">
      <h1 class="logo h2">
        <router-link to="/">OSSFoundations</router-link>
      </h1>
      <button
        class="navbar-toggler toggler-example"
        type="button"
        data-toggle="collapse"
        data-target="#navCollapseMobile"
        aria-controls="#navCollapseMobile"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>

      <div class="collapse navbar-collapse align-items-start" id="navCollapseMobile">
        <ul>
          <li>
            <router-link
              to="/"
              class="item-header pb-2"
              :class="{ 'text-dark': isCurrentRoute('/') }"
              ><font-awesome-icon :icon="['fas', 'home']" class="mr-2" />Home</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/', hash: '#what-we-did' }"
              class="item-header pb-2"
              ><font-awesome-icon :icon="['fas', 'book']" class="mr-3" />What we
              did</router-link
            >
          </li>
          <li>
            <router-link :to="{ path: '/', hash: '#chart' }" class="item-header pb-2"
              ><font-awesome-icon
                :icon="['fas', 'search']"
                class="mr-3"
              />Search</router-link
            >
          </li>
          <li>
            <router-link
              to="/add"
              class="item-header pb-2"
              :class="{ 'text-dark': isCurrentRoute('/add') }"
              ><font-awesome-icon :icon="['fas', 'plus']" class="mr-3" />Add
              foundation</router-link
            >
          </li>
          <li>
            <div class="auth item-header pb-2">
              <auth />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import Auth from "./Auth.vue";

export default {
  components: { Auth },
  name: "AppHeader",
  created() {},
  data() {
    return {
      actualRoute: "",
    };
  },
  props: {},
  mounted() {},
  methods: {
    //Return if an HTML tag is the current route in order to modify CSS
    isCurrentRoute(path) {
      if (path == this.$route.path) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
header {
  -webkit-box-shadow: 0px 1px 28px -6px rgba(0, 0, 0, 0.27);
  -moz-box-shadow: 0px 1px 28px -6px rgba(0, 0, 0, 0.27);
  box-shadow: 0px 1px 28px -6px rgba(0, 0, 0, 0.27);
  padding: 20px 10px 20px 10px;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.97);
}

.first-line {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
}
.menu-desktop .item-header {
  margin-left: 1.5em;
  margin-right: 0.5em;
}
.item-header {
  color: #397c89;
  text-decoration: none;
}
.item-header:hover {
  color: rgb(66, 66, 66);
}
.navbar-expand-lg {
  justify-content: flex-end !important;
}
.featured {
  text-decoration: underline;
}

.logo {
  align-self: flex-start;
  margin-right: auto;
  font-size: 2em;
  vertical-align: middle;
  margin-block-end: 0px !important;
}

.logo:hover,
.svg-inline--fa:hover {
  filter: brightness(1.2);
}

.logo a {
  text-decoration: none;
  color: #397c89;
}

.nav-mobile {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.svg-inline--fa {
  /* Font awersome class */
  font-size: 1.5em;
  color: #397c89;
}

.nav-mobile li {
  border-bottom: 1px solid rgb(209, 209, 209);
  font-size: 1.1em;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
}
.nav-mobile ul {
  list-style-type: none;
  padding: 0 !important;
}
</style>

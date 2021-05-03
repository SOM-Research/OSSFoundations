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
    <nav class="navbar nav-mobile d-lg-none row">
      <h1 class="logo"><router-link to="/">OSSFoundations</router-link></h1>
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
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/', hash: '#what-we-did' }"
              class="item-header pb-2"
              >What we did</router-link
            >
          </li>
          <li>
            <router-link :to="{ path: '/', hash: '#chart' }" class="item-header pb-2"
              >Search</router-link
            >
          </li>
          <li>
            <router-link
              to="/add"
              class="item-header pb-2"
              :class="{ 'text-dark': isCurrentRoute('/add') }"
              >Add foundation</router-link
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
  padding: 10px 10px 10px 10px;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 10000;
  background-color: rgba(255, 255, 255, 0.9);
}
header::after {
  height: 1000px;
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
  font-weight: bold;
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
  border-top: 1px solid #eee;
  border-bottom: 1px solid #efefef;
  font-size: 1.1em;
  width: 100%;
  padding: 5px;
}
.nav-mobile ul {
  list-style-type: none;
  padding: 0 !important;
}
</style>

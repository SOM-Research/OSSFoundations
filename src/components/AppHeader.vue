<template>
  <header>
    <nav class="first-line">
      <h1 class="logo"><router-link to="/">OSSFoundations</router-link></h1>
      <router-link
        to="/"
        class="item-header"
        :class="{ featured: isCurrentRoute() == '/' }"
        >Home</router-link
      >
      <a href="#what-we-did" class="item-header">What we did</a>
      <router-link :to="{ path: '/', hash: '#search-form' }" class="item-header"
        >Search</router-link
      >
      <router-link
        to="/add"
        class="item-header"
        :class="{ featured: isCurrentRoute('/add') }"
        >Add foundation</router-link
      >
      <div class="auth item-header">
        <auth />
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
    return {};
  },
  props: {},
  mounted() {
    this.isCurrentRoute();
  },
  methods: {
    //Return if an HTML tag is the current route in order to modify CSS
    isCurrentRoute() {
      return this.$router.currentRoute._rawValue.path;
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

.item-header {
  margin-left: 1.5em;
  margin-right: 0.5em;
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

.logo:hover {
  filter: brightness(1.2);
}

.logo a {
  text-decoration: none;
  color: #397c89;
}
</style>

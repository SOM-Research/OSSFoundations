<template>
  <header class="row">
    <h1 class="">
      <router-link to="/">Analysis of Foundations in Open Source Projects</router-link>
    </h1>
    <div class="auth">
      <auth />
    </div>
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
  methods: {},
};
</script>

<style scoped>
header {
  -webkit-box-shadow: 0px 1px 28px -6px rgba(0, 0, 0, 0.27);
  -moz-box-shadow: 0px 1px 28px -6px rgba(0, 0, 0, 0.27);
  box-shadow: 0px 1px 28px -6px rgba(0, 0, 0, 0.27);
  padding: 10px 10px 10px 10px;
  align-items: center;
  margin-bottom: 15px;
  margin-left: 0px !important;
  margin-right: 0px !important;
  justify-content: space-between;
}
h1 {
  color: #397c89;
  font-size: 2em;
  font-family: "Merriweather Sans", Courier, monospace;
}

.auth {
  text-align: right;
}

h1 a {
  color: inherit;
  text-decoration: none;
}
h1 a:hover {
  filter: brightness(1.25);
}
</style>

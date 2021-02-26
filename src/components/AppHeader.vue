<template>
  <header class="row">
    <h1 class="col-8">Analysis of Foundations in Open Source Projects</h1>
    <div class="col-4 auth">
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
}
h1 {
  color: #397c89;
  font-size: 2em;
  font-family: "Merriweather Sans", Courier, monospace;
}

.auth {
  margin: auto;
  text-align: right;
}
</style>

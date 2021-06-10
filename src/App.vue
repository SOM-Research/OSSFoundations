<template>
  <app-header />
  <router-view />
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1ss;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

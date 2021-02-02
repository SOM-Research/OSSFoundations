<template>
  <div class="black-screen d-flex justify-content-center">
    <div class="spinner-border text-light" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.black-screen {
  background-color: black;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.5;
  z-index: 6000;
}
</style>

<template>
  <form>
    <label for="name">Name</label>
    <input type="text" />
    <label for="url">URL</label>
    <input type="text" />
    <label for="rq1Inter">rq1Inter</label>
    <input type="text" />
    <label for="rq1Indep">rq1Indep</label>
    <input type="text" />
    <label for="rq1Open">rq1Open</label>
    <input type="text" />
    <label for="SD">SD</label>
    <input type="text" />
    <label for="rq3rq4">rq3rq4</label>
    <input type="text" />
    <label for="legal">legal</label>
    <input type="text" />
    <label for="topics">topics</label>
    <input type="text" />
  </form>
</template>

<script>
import API from "@/data/api.js";

export default {
  name: "NewFoundation",
  created() {},
  data() {
    return {
      name: "",
      URL: "",
      rq1Inter: "",
      rq1Indep: "",
      rq1Open: "",
      SD: "",
      rq3rq4: "",
      legal: "",
      topics: "",
    };
  },
  props: {},
  methods: {
    sendNewFoundation() {
      var newJson = JSON.stringify({
        name: this.name,
        URL: this.URL,
        rq1Inter: this.rq1Inter,
        rq1Indep: this.rq1Indep,
        rq1Open: this.rq1Open,
        SD: this.SD,
        rq3rq4: this.rq3rq4,
        legal: this.legal,
        topics: this.topics,
      });
      API.sendFoundation(newJson);
    },
  },
};
</script>

<style lang="scss" scoped></style>

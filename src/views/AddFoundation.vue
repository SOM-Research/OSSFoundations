<template>
  <div class="container">
    <h5>Add a new foundation</h5>
    <new-edit-foundation
      :selectedFoundation="selectedFoundation"
      @update-selected-foundation="updateSelectedFoundation"
    />
  </div>
</template>

<script>
import NewEditFoundation from "@/components/NewEditFoundation.vue";

export default {
  components: { NewEditFoundation },
  name: "AddFoundation",
  created() {},
  data() {
    return {
      selectedFoundation: {
        //The fields of data to send to the form component
        id: "",
        name: "",
        url: "",
        rq1Inter: "",
        rq1Indep: "",
        rq1Open: "",
        SD: "",
        rq3rq4: "",
        legal: "",
        topics: [],
        topicsString: "",
      },
    };
  },
  props: {},
  methods: {
    //Sends the data from the new-edit-foundation component this comopnent
    updateSelectedFoundation(f) {
      this.selectedFoundation = f;
    },
  },
};
</script>

<style lang="scss" scoped></style>

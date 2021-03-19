<template>
  <form v-on:change="$emit('update-selected-foundation', selectedFoundationForm)">
    <div class="form-group">
      <label for="name">Name:</label>
      <input class="form-control" type="text" v-model="selectedFoundationForm.name" />
    </div>
    <div class="form-group">
      <label for="url">Website:</label>
      <input class="form-control" type="text" v-model="selectedFoundationForm.url" />
    </div>
    <div class="form-group">
      <label for="legal">Status Form:</label>
      <input class="form-control" type="text" :value="selectedFoundationForm.legal" />
    </div>
    <hr class="mt-2 mb-3" />
    <label for="topics" class="font-weight-bold">Dimension</label>
    <div class="form-group">
      <label for="rq1Inter">Does it have an international scope?</label>
      <div class="form-group">
        <input
          class="btn-check"
          type="radio"
          name="rq1Inter"
          value="Y"
          v-model="selectedFoundationForm.rq1Inter"
          id="rq1InterY"
        />
        <label class="btn btn-secondary button-form" for="rq1InterY">Yes</label>
        <input
          class="btn-check"
          type="radio"
          name="rq1Inter"
          value="N"
          v-model="selectedFoundationForm.rq1Inter"
          id="rq1InterN"
        />
        <label class="btn btn-secondary button-form" for="rq1InterN">No</label>
      </div>
    </div>
    <label for="rq1Indep">Is it independent?</label>
    <div class="form-group">
      <input
        class="btn-check"
        type="radio"
        name="rq1Indep"
        value="Y"
        v-model="selectedFoundationForm.rq1Indep"
        id="rq1IndepY"
      />
      <label class="btn btn-secondary button-form" for="rq1IndepY">Yes</label>
      <input
        class="btn-check"
        type="radio"
        name="rq1Indep"
        value="N"
        v-model="selectedFoundationForm.rq1Indep"
        id="rq1IndepN"
      />
      <label class="btn btn-secondary button-form" for="rq1IndepN">No</label>
    </div>
    <label for="rq1Open">Is it transparent enough?</label>
    <div class="form-group">
      <input
        class="btn-check"
        type="radio"
        name="rq1Open"
        value="Y"
        v-model="selectedFoundationForm.rq1Open"
        id="rq1OpenY"
      />
      <label class="btn btn-secondary button-form" for="rq1OpenY">Yes</label>
      <input
        class="btn-check"
        type="radio"
        name="rq1Open"
        value="N"
        v-model="selectedFoundationForm.rq1Open"
        id="rq1OpenN"
      />
      <label class="btn btn-secondary button-form" for="rq1OpenN">No</label>
    </div>
    <label for="SD">Does it directly support software products?</label>
    <div class="form-group">
      <input
        class="btn-check"
        type="radio"
        name="SD"
        value="Y"
        v-model="selectedFoundationForm.SD"
        @click="toggleSD(true)"
        id="SDY"
      />
      <label class="btn btn-secondary button-form" for="SDY">Yes</label>
      <input
        class="btn-check"
        type="radio"
        name="SD"
        value="N"
        @click="toggleSD(false)"
        v-model="selectedFoundationForm.SD"
        id="SDN"
      />
      <label class="btn btn-secondary button-form" for="SDN">No</label>
    </div>
    <hr class="mt-2 mb-3" />
    <label for="topics" class="font-weight-bold">Topics</label>
    <div
      v-for="topic in selectedFoundationForm.topics"
      v-bind:key="topic.name"
      class="form-check"
    >
      <input
        class="form-check-input"
        :name="topic.name"
        type="checkbox"
        v-model="topic.checked"
        @click="toggleSDinCheckform(topic.name)"
      />
      <label class="form-check-label" :for="topic.name">{{ topic.name }}</label
      ><br />
    </div>
  </form>
</template>

<script>
export default {
  name: "NewEditFoundation",
  created() {},
  data() {
    return {
      selectedFoundationForm: this.selectedFoundation,
      topicSD: false, //Auxiliary variable to bind selectedFoundation.SD and selectedFoundation.topics.SD;
    };
  },
  props: ["selectedFoundation"],
  watch: {
    //Watches if the variable topicSD has changed to bind selectedFoundationForm.SD and selectedFoundationForm.topics.SD;
    topicSD: {
      deep: false,
      handler() {
        for (var i = 0; i < this.selectedFoundationForm.topics.length; i++) {
          if (this.selectedFoundationForm.topics[i].name == "Software-Development") {
            break;
          }
        }
        // var index = this.selectedFoundationForm.topics.indexOf("Software-Development");
        if (this.topicSD) {
          this.selectedFoundationForm.SD = "Y";
          this.selectedFoundationForm.topics[i].checked = true;
        } else {
          this.selectedFoundationForm.SD = "N";
          this.selectedFoundationForm.topics[i].checked = false;
        }
      },
    },
  },
  methods: {
    //Toggles the topicSD variable to bind the selectedFoundationForm.SD and selectedFoundationForm.topics.SD
    toggleSD(answer) {
      this.topicSD = answer;
    },
    toggleSDinCheckform(name) {
      if (name == "Software-Development") {
        this.toggleSD(!this.topicSD);
      }
    },
  },
};
</script>

<style scoped>
h5,
label {
  color: #212529;
}

.action-form {
  margin-bottom: 10px;
}

.btn-check {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}
.button-form {
  color: white;
  margin-right: 10px;
}

.btn-check:active + .btn-secondary,
.btn-check:checked + .btn-secondary,
.btn-secondary.active,
.btn-secondary:active,
.show > .btn-secondary.dropdown-toggle {
  color: #fff !important;
  background-color: #5a97a2;
  border-color: #3a656d;
}
</style>

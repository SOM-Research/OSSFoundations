<template>
  <form
    id="new-edit-foundation"
    v-on:change="$emit('update-selected-foundation', selectedFoundationForm)"
  >
    <h2>Main information</h2>
    <div class="mb-3 row">
      <label for="name" class="col-sm-2 col-form-label"
        >Name <span class="text-danger">*</span></label
      >
      <div class="col-sm-10">
        <input
          class="form-control"
          type="text"
          v-model="selectedFoundationForm.name"
          placeholder="Write here Foundation's name"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="url" class="col-sm-2 col-form-label"
        >Website <span class="text-danger">*</span></label
      >
      <div class="col-sm-10">
        <input
          class="form-control"
          type="text"
          v-model="selectedFoundationForm.url"
          placeholder="Write here the URL to the Foundation's website"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="legal" class="col-sm-2 col-form-label">Status Form</label>
      <div class="col-sm-10">
        <input
          class="form-control"
          type="text"
          v-model="selectedFoundationForm.legal"
          placeholder="United States 501(c)(3), United States 501(c)(6)..."
        />
      </div>
    </div>

    <hr class="mt-2 mb-3" />

    <h2>Dimensions</h2>
    <div class="feature form-group">
      <h4>International Scope</h4>
      <div class="row">
        <div class="col-sm-10">
          This dimension studies the distribution of the foundations from a geographical
          point of view (i.e., whether the foundation has a international or local
          character). Is the foundation aimed at supporting projects world-wide?
        </div>
        <div class="col-sm-2">
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
      </div>
    </div>
    <div class="feature form-group">
      <h4>Independence</h4>
      <div class="row">
        <div class="col-sm-10">
          Foundations can either serve a specific project, a set of projects or provide an
          umbrella foundations that use it to simplify its own creation, management and
          legal processes. Does your foundation have free of action (i.e., it is
          independent)?
        </div>
        <div class="col-sm-2">
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
      </div>
    </div>
    <div class="feature form-group">
      <h4>Transparency</h4>
      <div class="row">
        <div class="col-sm-10">
          Foundations may aim to help the project on several aspects, like nurturing the
          community or facilitating the creation of new related projects. Are these goals
          clearly stated as part of the foundations' mission or website?
        </div>
        <div class="col-sm-2">
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
      </div>
    </div>
    <div class="feature form-group">
      <h4>Software Development Aim</h4>
      <div class="row">
        <div class="col-sm-10">
          Foundations may have as main goal to support the development of software
          projects. Other goals could include: training, certification or evangelization
          of open source in general. Does your foundation support the development of
          projects?
        </div>
        <div class="col-sm-2">
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
      </div>
    </div>
    <hr class="mt-2 mb-3" />

    <h2>Topics</h2>
    <p>Select at least one topic:</p>
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

    <hr class="mt-2 mb-3" />
    <h2>Contact</h2>
    <p>
      If possible, we would like to have your contact details just in case we need to
      review some information.
    </p>
    <div class="mb-3 row">
      <label for="contactName" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input
          class="form-control"
          type="text"
          placeholder="Your name"
          v-model="selectedFoundationForm.authorName"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="contactEmail" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input
          class="form-control"
          type="email"
          placeholder="Your email"
          v-model="selectedFoundationForm.authorMail"
        />
      </div>
    </div>
  </form>
</template>

<script>
import topicsJson from "@/data/topics.json";
export default {
  name: "NewEditFoundation",
  mounted() {
    this.createTopicsInForm(); //Creates the topics in the form
  },
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
    //Creates the topics in the form
    createTopicsInForm() {
      for (var i = 0; i < topicsJson.length; i++) {
        var tempFoundation = { name: topicsJson[i].name, selected: false };
        this.selectedFoundationForm.topics.push(tempFoundation);
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
  color: #5a97a2 !important;
  background-color: rgb(238, 238, 238);
  border-color: white;
}
.feature {
  background-color: #5a97a2 !important;
  padding: 15px;
  border-radius: 5px;
}

.feature h4 {
  font-weight: bold;
}
</style>

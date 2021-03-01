<template>
  <div class="app-container container-xl">
    {{ selectedFoundation.SD }}
    <div>
      <button
        class="action-form btn btn-info float-right"
        v-on:click="
          textModal = 'New foundation';
          isNewFoundationForm = true;
          emptyFormData();
        "
        data-toggle="modal"
        data-target="#newEditFoundationForm"
      >
        New foundation
      </button>
      <table class="table table-hover">
        <thead class="">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Foundation name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="foundation in foundations" v-bind:key="foundation.id">
            <th scope="row">{{ foundation.id }}</th>
            <td>{{ foundation.name }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="
                  isNewFoundationForm = false;
                  textModal = 'Edit ' + foundation.name;
                  loadFormData(foundation.id);
                "
                data-toggle="modal"
                data-target="#newEditFoundationForm"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                class="btn btn-danger"
                data-toggle="modal"
                data-target="#modalConfirmAction"
                v-on:click="loadFormData(foundation.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <modal-confirm-action
      :foundation="selectedFoundation"
      @confirmed-action="deleteFoundation(selectedFoundation.id)"
    />
    <div
      class="modal fade"
      id="newEditFoundationForm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{{ textModal }}</h5>
          </div>
          <div class="modal-body">
            <form v-on:change="topicsToString()">
              <div class="form-group">
                <label for="name">Name:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="selectedFoundation.name"
                />
              </div>
              <div class="form-group">
                <label for="url">Website:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="selectedFoundation.url"
                />
              </div>
              <div class="form-group">
                <label for="legal">Status Form:</label>
                <input
                  class="form-control"
                  type="text"
                  :value="selectedFoundation.legal"
                />
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
                    v-model="selectedFoundation.rq1Inter"
                    id="rq1InterY"
                  />
                  <label class="btn btn-secondary button-form" for="rq1InterY">Yes</label>
                  <input
                    class="btn-check"
                    type="radio"
                    name="rq1Inter"
                    value="N"
                    v-model="selectedFoundation.rq1Inter"
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
                  v-model="selectedFoundation.rq1Indep"
                  id="rq1IndepY"
                />
                <label class="btn btn-secondary button-form" for="rq1IndepY">Yes</label>
                <input
                  class="btn-check"
                  type="radio"
                  name="rq1Indep"
                  value="N"
                  v-model="selectedFoundation.rq1Indep"
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
                  v-model="selectedFoundation.rq1Open"
                  id="rq1OpenY"
                />
                <label class="btn btn-secondary button-form" for="rq1OpenY">Yes</label>
                <input
                  class="btn-check"
                  type="radio"
                  name="rq1Open"
                  value="N"
                  v-model="selectedFoundation.rq1Open"
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
                  v-model="selectedFoundation.SD"
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
                  v-model="selectedFoundation.SD"
                  id="SDN"
                />
                <label class="btn btn-secondary button-form" for="SDN">No</label>
              </div>
              <hr class="mt-2 mb-3" />
              <label for="topics" class="font-weight-bold">Topics</label>
              <div
                v-for="topic in selectedFoundation.topics"
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
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button
              v-if="!isNewFoundationForm"
              @click="editFoundation(selectedFoundation.id, selectedFoundation)"
              @submit.prevent
              class="btn btn-success"
              data-dismiss="modal"
            >
              Submit
            </button>
            <button
              v-if="isNewFoundationForm"
              @click="newFoundation(selectedFoundation)"
              @submit.prevent
              class="btn btn-success"
              data-dismiss="modal"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/data/api.js";
import ModalConfirmAction from "../components/ModalConfirmAction.vue";
//import FoundationsList from "@/components/FoundationsList.vue";

export default {
  components: { ModalConfirmAction },
  name: "Admin",

  data() {
    return {
      foundations: "",
      allTopics: [],
      loading: true,
      textModal: "",
      isNewFoundationForm: false,
      topicSD: false, //Auxiliary variable to bind the selectedFoundation's "SD" and topics.SD;
      selectedFoundation: {
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
  created: function () {
    this.loadFoundations();
  },
  watch: {
    //Watches if the foundations data has been changed and updates the value
    loading: {
      deep: false,
      handler() {
        if (this.loading == false) {
          this.mapFoundations();
        }
      },
    },
    topicSD: {
      deep: false,
      handler() {
        for (var i = 0; i < this.selectedFoundation.topics.length; i++) {
          if (this.selectedFoundation.topics[i].name == "Software-Development") {
            break;
          }
        }
        // var index = this.selectedFoundation.topics.indexOf("Software-Development");
        if (this.topicSD) {
          this.selectedFoundation.SD = "Y";
          this.selectedFoundation.topics[i].checked = true;
        } else {
          this.selectedFoundation.SD = "N";
          this.selectedFoundation.topics[i].checked = false;
        }
      },
    },
  },
  methods: {
    //Loads the foundation data
    loadFoundations() {
      this.foundations = "";
      this.loading = true;
      return (
        API.getFoundations()
          .then((response) => ((this.foundations = response), (this.loading = false)))
          //If error
          .catch((err) => console.log(err))
      );
    },
    //Maps the JSON of the foundations data to get the listed topics
    mapFoundations: function () {
      var self = this;
      self.foundations.map(function (foundation) {
        var foundationTopics = foundation.topics;
        if (foundationTopics != "") {
          var topicArray = foundationTopics.split(",");
          topicArray.map(function (topic) {
            if (self.allTopics.indexOf(topic) == -1) {
              self.allTopics.push(topic);
            }
          });
        }
      });
      //Loads the topics name in the selected foundations
      this.selectedFoundation.topics = [];
      for (var i = 0; i < self.allTopics.length; i++) {
        var tempFoundation = { name: this.allTopics[i], selected: false };
        this.selectedFoundation.topics.push(tempFoundation);
      }
    },
    //Send a request to the server to edit a selected foundation
    editFoundation(id, selectedFoundation) {
      return API.editFoundation(id, selectedFoundation)
        .then(() => this.loadFoundations())
        .catch((err) => console.log(err));
    },
    //Send a request to the server to create a new foundation
    newFoundation(foundation) {
      return API.newFoundation(foundation)
        .then(() => this.loadFoundations())
        .catch((err) => console.log(err));
    },
    //Send a request to the server to delete a selected foundation
    deleteFoundation(foundationId) {
      return API.deleteFoundation(foundationId)
        .then(() => this.loadFoundations())
        .catch((err) => console.log(err));
    },
    //Fills the form with the info of the selected foundation by using its ID
    loadFormData(id) {
      for (var x in this.foundations) {
        if (this.foundations[x].id == id) {
          this.selectedFoundation.id = this.foundations[x].id;
          this.selectedFoundation.name = this.foundations[x].name;
          this.selectedFoundation.id = this.foundations[x].id;
          this.selectedFoundation.url = this.foundations[x].url;
          this.selectedFoundation.rq1Inter = this.foundations[x].rq1Inter;
          this.selectedFoundation.rq1Indep = this.foundations[x].rq1Indep;
          this.selectedFoundation.rq1Open = this.foundations[x].rq1Open;
          this.selectedFoundation.SD = this.foundations[x].SD;
          if (this.selectedFoundation.SD == "Y") {
            this.topicSD = true;
          } else {
            this.topic = false;
          }
          this.selectedFoundation.rq3rq4 = this.foundations[x].rq3rq4;
          this.selectedFoundation.legal = this.foundations[x].legal;
          //Loads the selected topics
          for (var i = 0; i < this.selectedFoundation.topics.length; i++) {
            if (
              this.foundations[x].topics.includes(this.selectedFoundation.topics[i].name)
            ) {
              this.selectedFoundation.topics[i].checked = true;
            } else {
              this.selectedFoundation.topics[i].checked = false;
            }
          }
        }
      }
    },
    //Empties the data of the form
    emptyFormData() {
      for (var x in this.selectedFoundation) {
        this.selectedFoundation[x] = "";
      }
      this.mapFoundations();
    },
    //Convers the checked topics to a string value when submit
    topicsToString() {
      this.selectedFoundation.topicsString = "";
      for (var i = 0; i < this.selectedFoundation.topics.length; i++) {
        if (this.selectedFoundation.topics[i].checked) {
          this.selectedFoundation.topicsString += this.selectedFoundation.topics[i].name;
          this.selectedFoundation.topicsString += ",";
        }
      }
      //Replace the last comma and if it has any white space after it
      this.selectedFoundation.topicsString = this.selectedFoundation.topicsString.replace(
        /,\s*$/,
        ""
      );
    },
    //Toggles the topicSD variable to bind the selectedFoundation.SD and selectedFoundation.topics.SD
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
thead {
  background-color: #397c89;
  color: white;
}
tbody {
  color: #5a97a2;
}
tbody tr:hover {
  color: grey !important;
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
  margin-right: 10px;
}

.btn-check:active + .btn-secondary,
.btn-check:checked + .btn-secondary,
.btn-secondary.active,
.btn-secondary:active,
.show > .btn-secondary.dropdown-toggle {
  color: #fff;
  background-color: #5a97a2;
  border-color: #3a656d;
}
</style>

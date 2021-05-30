<template>
  <div class="app-container container-xl first">
    <div>
      <div class="d-flex justify-content-end">
        <button
          class="action-form btn btn-info"
          v-on:click="
            textModalForm = 'New foundation';
            isNewFoundationForm = true;
            emptyFormData();
          "
          data-toggle="modal"
          data-target="#newEditFoundationForm"
        >
          New foundation
        </button>
      </div>
      <loading v-if="loading && !isError" />
      <p v-if="isError" class="text-danger">{{ errorMsg }}</p>
      <h5>New foundations pending approval</h5>
      <table class="table table-hover table-fixed">
        <thead class="">
          <tr class="">
            <th
              v-for="(column, index) in columns"
              v-bind:key="column"
              :class="{ 'w-50': index === 2 }"
            >
              <div
                href="#"
                v-on:click="sortPendingFoundations(column)"
                v-bind:class="{ active: sortKey == column }"
              >
                {{ column[0].toUpperCase() + column.slice(1) }}
              </div>
            </th>
            <th scope="col" class=""></th>
            <th scope="col" class=""></th>
            <th scope="col" class=""></th>
            <th scope="col" class=""></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="foundation in foundationsPending" v-bind:key="foundation.id">
            <th scope="row">{{ foundation.id }}</th>
            <td>{{ formatDate(foundation.creationDate) }}</td>
            <td>{{ foundation.name }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="
                  isNewFoundationForm = false;
                  textModalForm = 'Edit ' + foundation.name;
                  loadFormData(foundation.id, foundationsPending);
                "
                data-toggle="modal"
                data-target="#newEditFoundationForm"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                class="btn btn-success"
                data-toggle="modal"
                data-target="#modalConfirmActionApprove"
                @click="
                  isNewFoundationForm = false;
                  textModalForm =
                    'Are you sure you want to approve the foundation' +
                    foundation.name +
                    ' ?';
                  loadFormData(foundation.id, foundationsPending);
                "
              >
                Approve
              </button>
            </td>
            <td>
              <button class="btn btn-dark" @click="createIssue(foundation.name)">
                Issue
                <font-awesome-icon :icon="['fab', 'github']" class="d-inline ml-1" />
              </button>
            </td>
            <td>
              <button
                class="btn btn-danger"
                data-toggle="modal"
                data-target="#modalConfirmActionDelete"
                v-on:click="loadFormData(foundation.id, foundationsPending)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <h5>Foundations in the database</h5>
      <table class="table table-hover">
        <thead class="">
          <tr>
            <th
              v-for="(column, index) in columns"
              v-bind:key="column"
              :class="{ 'w-50': index === 2 }"
            >
              <div
                href="#"
                v-on:click="sortFoundations(column)"
                v-bind:class="{ active: sortKey == column }"
              >
                {{ column[0].toUpperCase() + column.slice(1) }}
              </div>
            </th>

            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="foundation in foundations" v-bind:key="foundation.id">
            <th scope="row">{{ foundation.id }}</th>
            <td>{{ formatDate(foundation.creationDate) }}</td>
            <td>{{ foundation.name }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="
                  isNewFoundationForm = false;
                  textModalForm = 'Edit ' + foundation.name;
                  loadFormData(foundation.id, foundations);
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
                data-target="#modalConfirmActionDelete"
                v-on:click="loadFormData(foundation.id, foundations)"
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
      :id="'modalConfirmActionDelete'"
      :textToShow="'Are you sure you want to delete this foundation?'"
      @confirmed-action="deleteFoundation(selectedFoundation.id)"
    />
    <modal-confirm-action
      :foundation="selectedFoundation"
      :id="'modalConfirmActionApprove'"
      :textToShow="'Are you sure you want to approve this foundation?'"
      @confirmed-action="approveFoundation(selectedFoundation.id, selectedFoundation)"
    />
    <modal-response :responseAction="responseAction" />
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
            <h5 class="modal-title" id="exampleModalLongTitle">{{ textModalForm }}</h5>
          </div>
          <div class="modal-body">
            <new-edit-foundation
              :selectedFoundation="selectedFoundation"
              @update-selected-foundation="updateSelectedFoundation"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button
              v-if="!isNewFoundationForm"
              @click="
                topicsToString(),
                  editFoundation(selectedFoundation.id, selectedFoundation)
              "
              @submit.prevent
              class="btn btn-success"
              data-dismiss="modal"
            >
              Submit
            </button>
            <button
              v-if="isNewFoundationForm"
              @click="topicsToString(), newFoundation(selectedFoundation)"
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
import ModalResponse from "../components/ModalResponse.vue";
import $ from "jquery";
import _ from "lodash";
import NewEditFoundation from "../components/NewEditFoundation.vue";
import Loading from "@/components/Loading.vue";

export default {
  components: { ModalConfirmAction, ModalResponse, NewEditFoundation, Loading },
  name: "Admin",

  data() {
    return {
      foundations: "", //Current foundations in database
      foundationsPending: "", //Foundations pending to Pending
      isFoundationsOrPendingList: true, //True if the main foundations database, False if the foundations Pending list
      allTopics: [],
      loading: true,
      isError: false,
      errorMsg: "",
      textModalForm: "", //Displays "New" or "Edit" depending on the user actions
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
        authorName: "",
        authorMail: "",
        status: "",
        creationDate: "",
      },
      responseAction: "", //Shows the message of an error or success of an action
      ///ORDERING
      columns: ["id", "creationDate", "name"], // Columns of the table
      sortKey: "", // Order
      reverse: false, // If we have to reverse the order
    };
  },
  props: {},
  mounted: function () {
    this.loadAllFoundations();
  },
  watch: {
    //Watches if the foundations data has been changed and updates the value
    loading: {
      deep: false,
      handler() {
        if (this.loading == false) {
          this.mapFoundations();
        }
        this.sortFoundations("name");
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
    //Loads all the foundations
    loadAllFoundations() {
      this.loadFoundations();
      this.loadFoundationsPending();
    },
    //Loads the foundation data
    loadFoundations() {
      //Loads the main foundations database
      this.foundations = "";
      this.loading = true;
      return (
        API.getFoundations()
          .then((response) => ((this.foundations = response), (this.loading = false)))
          //If error
          .catch(
            (err) => (console.log(err), (this.isError = true), (this.errorMsg = err))
          )
      );
    },
    //Loads the Pending foundations database
    loadFoundationsPending() {
      this.foundationsPending = "";
      // this.loading = true;
      return (
        API.getFoundationsPending()
          .then((response) => (this.foundationsPending = response))
          //If error
          .catch((err) => console.log(err))
      );
    },
    //Maps the JSON of the foundations data to get the listed topics
    mapFoundations: function () {
      var self = this;
      this.foundations.map(function (foundation) {
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
        .then(
          (res) => (
            this.loadAllFoundations(), this.showModalWithResponse(res.data.message)
          )
        )
        .catch((err) => (console.log(err), this.showModalWithResponse(err.message)));
    },
    //Send a request to the server to make an issue in the Github repo
    createIssue(foundationName) {
      var issue = {
        title: "Request to add " + foundationName + " into the database",
        body: "Pending to revise and approve/reject the request",
      };
      return API.createIssue(issue)
        .then((res) => this.showModalWithResponse(res.data.message))
        .catch((err) => (console.log(err), this.showModalWithResponse(err.message)));
    },
    //Approve a foundation by changing its status to "final"
    approveFoundation(id, selectedFoundation) {
      selectedFoundation.status = "final";
      this.editFoundation(id, selectedFoundation);
    },
    //Send a request to the server to create a new foundation
    newFoundation(foundation) {
      return API.newFoundation(foundation)
        .then(
          (res) => (
            this.loadAllFoundations(), this.showModalWithResponse(res.data.message)
          )
        )
        .catch((err) => (console.log(err), this.showModalWithResponse(err.message)));
    },
    //Send a request to the server to delete a selected foundation
    deleteFoundation(foundationId) {
      //Delete from the main foundations database

      return API.deleteFoundation(foundationId)
        .then(
          (res) => (
            this.loadAllFoundations(), this.showModalWithResponse(res.data.message)
          )
        )
        .catch((err) => (console.log(err), this.showModalWithResponse(err.message)));
    },

    //Fills the form with the info of the selected foundation by using its ID
    loadFormData(id, foundationsList) {
      for (var x in foundationsList) {
        if (foundationsList[x].id == id) {
          this.selectedFoundation.id = foundationsList[x].id;
          this.selectedFoundation.name = foundationsList[x].name;
          this.selectedFoundation.id = foundationsList[x].id;
          this.selectedFoundation.url = foundationsList[x].url;
          this.selectedFoundation.rq1Inter = foundationsList[x].rq1Inter;
          this.selectedFoundation.rq1Indep = foundationsList[x].rq1Indep;
          this.selectedFoundation.rq1Open = foundationsList[x].rq1Open;
          this.selectedFoundation.SD = foundationsList[x].SD;
          if (this.selectedFoundation.SD == "Y") {
            this.topicSD = true;
          } else {
            this.topic = false;
          }
          this.selectedFoundation.rq3rq4 = foundationsList[x].rq3rq4;
          this.selectedFoundation.legal = foundationsList[x].legal;
          //Loads the selected topics
          for (var i = 0; i < this.selectedFoundation.topics.length; i++) {
            if (
              foundationsList[x].topics.includes(this.selectedFoundation.topics[i].name)
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
        this.selectedFoundation.status = "final";
      }
      this.mapFoundations();
    },
    //Converts the checked topics to a string value when submit
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
    //Shows a modal with a message when user makes any change (success / error)
    showModalWithResponse(res) {
      this.responseAction = res; //Save the response in the variable
      $("#modalResponse").modal("show"); //Triggers the modal "modalResponse"
    },
    //Passes the data from the new-edit-foundation component into the parent component
    updateSelectedFoundation(f) {
      this.selectedFoundation = f;
    },

    //Sorts the foundations table alphabetically
    sortFoundations: function (sortKey) {
      this.reverse = this.sortKey == sortKey ? !this.reverse : false;
      this.sortKey = sortKey;
      this.foundations = _.orderBy(
        this.foundations,
        this.sortKey,
        this.reverse ? "desc" : "asc"
      );
    },
    //Sorts the foundations (pending) table alphabetically
    sortPendingFoundations: function (sortKey) {
      this.reverse = this.sortKey == sortKey ? !this.reverse : false;
      this.sortKey = sortKey;
      this.foundationsPending = _.orderBy(
        this.foundationsPending,
        this.sortKey,
        this.reverse ? "desc" : "asc"
      );
    },
    formatDate(time) {
      var date_ob = new Date(time);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

      let hour = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return date + "/" + month + "/" + year + "-" + hour + ":" + minutes;
    },
  },
  computed: {},
};
</script>

<style scoped>
.first {
  margin-top: 6em;
}
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

button {
  display: flex;
  align-items: center;
  justify-content: center;
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

/* Spinner */
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

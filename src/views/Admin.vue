<template>
  <div class="app-container container-xl first">
    <loading v-if="loadingMsg" />
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

      <div class="admin-tabs">
        <ul class="nav nav-pills row" id="pills-tab" role="tablist">
          <li class="nav-item col-md-6 col-xl-3" role="presentation">
            <a
              class="nav-link active"
              id="pills-foundations-request-tab"
              data-toggle="pill"
              href="#pills-foundations-request"
              role="tab"
              aria-controls="pills-foundations-request"
              aria-selected="true"
            >
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12">
                      <p class="pill-title text-right">Foundation requests<br /></p>
                    </div>
                    <div class="icon col-3 justify-content-center">
                      <font-awesome-icon
                        :icon="['fa', 'file-upload']"
                        class="align-middle text-warning"
                      />
                    </div>
                    <span
                      v-if="foundationsStatusPending"
                      class="text-right pill-number col-9"
                    >
                      {{ foundationsStatusPending.length }}
                    </span>
                  </div>
                  <hr />
                  <div v-if="foundationsStatusPending != null" class="pill-detail">
                    <span v-if="foundationsStatusPending.length > 0">
                      <font-awesome-icon :icon="['fa', 'calendar-alt']" />
                      {{
                        formatDate(
                          Math.max.apply(
                            Math,
                            foundationsStatusPending.map(function (o) {
                              return o.creationDate;
                            })
                          )
                        )
                      }}
                    </span>
                    <span v-else>No requests</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="nav-item col-md-6 col-xl-3" role="presentation">
            <a
              class="nav-link"
              id="pills-edition-request-tab"
              data-toggle="pill"
              href="#pills-edition-request"
              role="tab"
              aria-controls="pills-edition-request"
              aria-selected="false"
            >
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12">
                      <p class="pill-title text-right">Edition requests<br /></p>
                    </div>
                    <div class="icon col-3 justify-content-center">
                      <font-awesome-icon
                        :icon="['fa', 'pen']"
                        class="align-middle text-danger"
                      />
                    </div>
                    <span
                      v-if="foundationsStatusEdition"
                      class="text-right pill-number col-9"
                    >
                      {{ foundationsStatusEdition.length }}
                    </span>
                  </div>
                  <hr />
                  <div v-if="foundationsStatusEdition != null" class="pill-detail">
                    <span v-if="foundationsStatusEdition.length > 0">
                      <font-awesome-icon :icon="['fa', 'calendar-alt']" />
                      {{
                        formatDate(
                          Math.max.apply(
                            Math,
                            foundationsStatusEdition.map(function (o) {
                              return o.creationDate;
                            })
                          )
                        )
                      }}
                    </span>
                    <span v-else>No requests</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="nav-item col-md-6 col-xl-3" role="presentation">
            <a
              class="nav-link"
              id="pills-all-foundations-tab"
              data-toggle="pill"
              href="#pills-all-foundations"
              role="tab"
              aria-controls="pills-all-foundations"
              aria-selected="false"
            >
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12">
                      <p class="pill-title text-right">All foundations<br /></p>
                    </div>
                    <div class="icon col-3 justify-content-center">
                      <font-awesome-icon
                        :icon="['fa', 'file-upload']"
                        class="align-middle text-info"
                      />
                    </div>
                    <span
                      v-if="foundationsStatusFinal"
                      class="text-right pill-number col-9"
                    >
                      {{ foundationsStatusFinal.length }}
                    </span>
                  </div>
                  <hr />
                  <div v-if="foundationsStatusFinal != null" class="pill-detail">
                    <span v-if="foundationsStatusFinal.length > 0">
                      <font-awesome-icon :icon="['fa', 'calendar-alt']" />
                      {{
                        formatDate(
                          Math.max.apply(
                            Math,
                            foundationsStatusFinal.map(function (o) {
                              return o.creationDate;
                            })
                          )
                        )
                      }}
                    </span>
                    <span v-else>No foundations</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="nav-item col-md-6 col-xl-3" role="presentation">
            <a
              class="nav-link"
              id="pills-users-tab"
              data-toggle="pill"
              href="#pills-users"
              role="tab"
              aria-controls="pills-users"
              aria-selected="false"
            >
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12">
                      <p class="pill-title text-right">Users<br /></p>
                    </div>
                    <div class="icon col-3 justify-content-center">
                      <font-awesome-icon
                        :icon="['fa', 'users']"
                        class="align-middle text-dark"
                      />
                    </div>
                    <span v-if="usersListUoc" class="text-right pill-number col-9">
                      {{ usersListUoc.length }}
                    </span>
                  </div>
                  <hr />
                  <div v-if="usersListUoc != null" class="pill-detail">
                    <span>Updated</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade active show"
            id="pills-foundations-request"
            role="tabpanel"
            aria-labelledby="pills-foundations-request-tab"
          >
            <h5>Foundation requests pending approval</h5>
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
                <tr
                  v-for="foundation in foundationsStatusPending"
                  v-bind:key="foundation.id"
                >
                  <th scope="row">{{ foundation.id }}</th>
                  <td>{{ formatDate(foundation.creationDate) }}</td>
                  <td>{{ foundation.name }}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      @click="
                        isNewFoundationForm = false;
                        textModalForm = 'Edit ' + foundation.name;
                        loadFormData(foundation.id, foundationsStatusPending);
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
                        loadFormData(foundation.id, foundationsStatusPending);
                      "
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-dark" @click="createIssue(foundation)">
                      Issue
                      <font-awesome-icon
                        :icon="['fab', 'github']"
                        class="d-inline ml-1"
                      />
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#modalConfirmActionDelete"
                      v-on:click="loadFormData(foundation.id, foundationsStatusPending)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="tab-pane fade"
            id="pills-edition-request"
            role="tabpanel"
            aria-labelledby="pills-edition-request-tab"
          >
            <h5>Requests to modify a foundation</h5>
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
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="foundation in foundationsStatusEdition"
                  v-bind:key="foundation.id"
                >
                  <th scope="row">{{ foundation.id }}</th>
                  <td>{{ formatDate(foundation.creationDate) }}</td>
                  <td>{{ foundation.name }}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      @click="
                        isNewFoundationForm = false;
                        textModalForm = 'Edit ' + foundation.name;
                        loadFormData(foundation.id, foundationsStatusEdition);
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
                      data-target="#modalConfirmActionApproveEdition"
                      @click="
                        isNewFoundationForm = false;
                        textModalForm =
                          'Are you sure you want to accept the changes for the foundation' +
                          foundation.name +
                          ' ?';
                        loadFormData(foundation.id, foundationsStatusEdition);
                      "
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#modalConfirmActionDelete"
                      v-on:click="loadFormData(foundation.id, foundationsStatusEdition)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="tab-pane fade"
            id="pills-all-foundations"
            role="tabpanel"
            aria-labelledby="pills-all-foundations-tab"
          >
            <h5>All foundations in the database</h5>
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
                <tr
                  v-for="foundation in foundationsStatusFinal"
                  v-bind:key="foundation.id"
                >
                  <th scope="row">{{ foundation.id }}</th>
                  <td>{{ formatDate(foundation.creationDate) }}</td>
                  <td>{{ foundation.name }}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      @click="
                        isNewFoundationForm = false;
                        textModalForm = 'Edit ' + foundation.name;
                        loadFormData(foundation.id, foundationsStatusFinal);
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
                      v-on:click="loadFormData(foundation.id, foundationsStatusFinal)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="tab-pane fade"
            id="pills-users"
            role="tabpanel"
            aria-labelledby="pills-users-tab"
          >
            <h5>Users</h5>
            <table class="table table-hover users">
              <thead>
                <tr>
                  <th></th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Buttons</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in usersListUoc" v-bind:key="user.uid">
                  <td>
                    <img :src="user.photoURL" :alt="'Picture of ' + user.displayName" />
                  </td>
                  <td>{{ user.email }}</td>
                  <td v-if="user.customClaims">
                    <span class="text-danger" v-if="user.customClaims.admin">Admin</span>
                    <span v-if="!user.customClaims.admin">N/A</span>
                  </td>
                  <td v-if="!user.customClaims">N/A</td>
                  <td v-if="!user.customClaims">
                    <button class="btn btn-success" @click="makeUserAdmin(user)">
                      Make admin
                    </button>
                  </td>
                  <td v-if="user.customClaims && user.customClaims.admin == false">
                    <button class="btn btn-success" @click="makeUserAdmin(user)">
                      Make admin
                    </button>
                  </td>
                  <td v-if="user.customClaims && user.customClaims.admin">
                    <button class="btn btn-danger" @click="revokeUserAdmin(user)">
                      Revoke admin
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
    <modal-confirm-action
      :foundation="selectedFoundation"
      :id="'modalConfirmActionApproveEdition'"
      :textToShow="'Are you sure you want to approve the changes for this foundation?'"
      @confirmed-action="
        approveEditProposal(selectedFoundation.idLinkedFoundation, selectedFoundation)
      "
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
            <h5 class="modal-title" id="exampleModalLongTitle">
              {{ textModalForm }}
            </h5>
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
import ModalResponse from "../components/ModalResponse.vue";
import { selectedFoundation } from "@/mixins/SelectedFoundation.js";
import $ from "jquery";
import _ from "lodash";
import NewEditFoundation from "../components/NewEditFoundation.vue";
import Loading from "@/components/Loading.vue";

export default {
  mixins: [selectedFoundation],
  components: { ModalConfirmAction, ModalResponse, NewEditFoundation, Loading },
  name: "Admin",

  data() {
    return {
      foundations: "", //Current foundations in database
      allTopics: [],
      loading: true,
      isError: false,
      loadingMsg: false,
      errorMsg: "",
      textModalForm: "", //Displays "New" or "Edit" depending on the user actions
      isNewFoundationForm: false,
      topicSD: false, //Auxiliary variable to bind the selectedFoundation's "SD" and topics.SD;
      responseAction: "", //Shows the message of an error or success of an action
      ///ORDERING
      columns: ["id", "creationDate", "name"], // Columns of the table
      sortKey: "", // Order
      reverse: false, // If we have to reverse the order

      //USERS
      usersList: "", //A list of users in firebase
      usersListLoaded: false,
    };
  },
  props: {},
  mounted: function () {
    this.loadAllFoundations();
    this.getUsers();
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
    },
    //Loads the foundation data
    loadFoundations() {
      //Loads the main foundations database
      this.foundations = "";
      this.loading = true;
      return (
        API.getAllFoundations()
          .then((response) => ((this.foundations = response), (this.loading = false)))
          //If error
          .catch(
            (err) => (console.log(err), (this.isError = true), (this.errorMsg = err))
          )
      );
    },
    //Send a request to the server to modify a foundation
    loadFoundationsStatusEdition() {
      return API.getFoundationsStatusEdition()
        .then((res) => this.showModalWithResponse(res.data.message))
        .catch((err) => (console.log(err), this.showModalWithResponse(err.message)));
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
      this.topicsToString();
      this.loadingMsg = true;
      return API.editFoundation(id, selectedFoundation)
        .then(
          (res) => (
            this.loadAllFoundations(),
            this.showModalWithResponse(res.data.message),
            (this.loadingMsg = false)
          )
        )
        .catch(
          (err) => (
            console.log(err),
            this.showModalWithResponse(err.message),
            (this.loadingMsg = false)
          )
        );
    },
    //Send a request to the server to make an issue in the Github repo
    createIssue(foundation) {
      this.loadingMsg = true;
      var issue = {
        title: "Request to add " + foundation.name + " into the database",
        body:
          "Pending to revise and approve/reject the request \n ```\nName: " +
          foundation.name +
          "\nURL: " +
          foundation.url +
          "\nInternational: " +
          foundation.rq1Inter +
          "\nIndependent: " +
          foundation.rq1Indep +
          "\nOpen: " +
          foundation.rq1Open +
          "\nSD: " +
          foundation.SD +
          "\nLegal: " +
          foundation.legal +
          "\nTopics: " +
          foundation.topics +
          "\nCreation date: " +
          this.formatDate(foundation.creationDate) +
          "\n```",
      };
      return API.createIssue(issue)
        .then(
          (res) => (
            this.showModalWithResponse(res.data.message), (this.loadingMsg = false)
          )
        )
        .catch(
          (err) => (
            console.log(err),
            this.showModalWithResponse(err.message),
            (this.loadingMsg = false)
          )
        );
    },
    //Approve a foundation by changing its status to "final"
    approveFoundation(id, selectedFoundation) {
      selectedFoundation.status = "final";
      this.editFoundation(id, selectedFoundation);
    },
    //Accept edit proposal of a foundation"
    approveEditProposal(idParentFoundation, selectedFoundation) {
      selectedFoundation.status = "final";
      this.editFoundation(idParentFoundation, selectedFoundation);
      //And deletes the foundation proposal
      this.deleteFoundation(selectedFoundation.id);
    },
    //Send a request to the server to create a new foundation
    newFoundation(foundation) {
      this.topicsToString();
      this.loadingMsg = true;
      return API.newFoundation(foundation)
        .then(
          (res) => (
            this.loadAllFoundations(),
            this.showModalWithResponse(res.data.message),
            (this.loadingMsg = false)
          )
        )
        .catch(
          (err) => (
            console.log(err),
            this.showModalWithResponse(err.message),
            (this.loadingMsg = false)
          )
        );
    },
    //Send a request to the server to delete a selected foundation
    deleteFoundation(foundationId) {
      //Delete from the main foundations database
      this.loadingMsg = true;
      return API.deleteFoundation(foundationId)
        .then(
          (res) => (
            this.loadAllFoundations(),
            this.showModalWithResponse(res.data.message),
            (this.loadingMsg = false)
          )
        )
        .catch(
          (err) => (
            console.log(err),
            this.showModalWithResponse(err.message),
            (this.loadingMsg = false)
          )
        );
    },
    //Empties the data of the form
    emptyFormData() {
      for (var x in this.selectedFoundation) {
        this.selectedFoundation[x] = "";
        this.selectedFoundation.status = "final";
      }
      this.mapFoundations();
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

    //USERS
    getUsers() {
      this.usersList = "";
      return API.getUsers()
        .then(
          (res) => (
            console.log(res), (this.usersList = res.data), (this.usersListLoaded = true)
          )
        )
        .catch((err) => console.log(err));
    },
    makeUserAdmin(user) {
      this.loadingMsg = true;
      return API.makeUserAdmin(user)
        .then(
          (res) => (
            this.getUsers(),
            (this.loadingMsg = false),
            this.showModalWithResponse(res.data.message)
          )
        )
        .catch((err) => this.showModalWithResponse(err));
    },
    revokeUserAdmin(user) {
      this.loadingMsg = false;
      return API.revokeUserAdmin(user)
        .then(
          (res) => (
            this.getUsers(),
            (this.loadingMsg = false),
            this.showModalWithResponse(res.data.message)
          )
        )
        .catch((err) => this.showModalWithResponse(err));
    },
  },
  computed: {
    //Return the users list only with UOC mails
    usersListUoc() {
      if (this.usersListLoaded == true) {
        return this.usersList.filter((user) => user.email.includes("uoc"));
      }
      return null;
    },
    foundationsStatusFinal() {
      if (this.loading == false) {
        return this.foundations.filter((foundation) =>
          foundation.status.includes("final")
        );
      }
      return null;
    },
    foundationsStatusEdition() {
      if (this.loading == false) {
        return this.foundations.filter((foundation) =>
          foundation.status.includes("edition")
        );
      }
      return null;
    },
    foundationsStatusPending() {
      if (this.loading == false) {
        return this.foundations.filter((foundation) =>
          foundation.status.includes("pending")
        );
      }
      return null;
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
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
.users img {
  max-width: 30px;
  border-radius: 50%;
}

/* Tabs */

#pills-tabContent h5 {
  color: grey;
  margin-bottom: 1em;
}

.admin-tabs ul {
  margin-top: 2px;
  margin-bottom: 1.5em;
}

.admin-tabs li {
  margin-bottom: 5px;
}

.admin-tabs a {
  color: grey !important;
  background-color: transparent !important;
  -webkit-box-shadow: 1px 3px 4px 1px #d8d8d8;
  box-shadow: 1px 3px 4px 1px #d8d8d8;
  padding: 0;
  filter: opacity(40%);
}

.admin-tabs a.active {
  filter: opacity(100%);
}
.admin-tabs .icon {
  font-size: 3em;
}

.admin-tabs .row {
  align-items: center;
}

.admin-tabs .card {
  border: none;
}

.admin-tabs .card-body {
  padding: 1em;
}

.admin-tabs .pill-title {
  font-size: 1em;
  margin-bottom: 0;
}

.admin-tabs .pill-number {
  font-size: 3em;
}

.admin-tabs .pill-detail {
  font-size: 0.8em;
}

.admin-tabs hr {
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}
</style>

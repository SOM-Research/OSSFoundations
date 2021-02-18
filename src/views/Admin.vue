<template>
  <div class="app-container container-xl">
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
            <form>
              <label for="name">Name</label>
              <input class="form-control" type="text" v-model="selectedFoundation.name" />

              <label for="url">URL</label>
              <input class="form-control" type="text" v-model="selectedFoundation.url" />
              <div class="form-group">
                <label for="rq1Inter">rq1Inter</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="rq1Inter"
                    value="Y"
                    v-model="selectedFoundation.rq1Inter"
                  />
                  <label class="form-check-label" for="rq1InterY">Yes</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="rq1Inter"
                    value="N"
                    v-model="selectedFoundation.rq1Inter"
                  />
                  <label class="form-check-label" for="rq1InterY">No</label>
                </div>
              </div>
              <label for="rq1Indep">rq1Indep</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="rq1Indep"
                  value="Y"
                  v-model="selectedFoundation.rq1Indep"
                />
                <label class="form-check-label" for="rq1InterY">Yes</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="rq1Indep"
                  value="N"
                  v-model="selectedFoundation.rq1Indep"
                />
                <label class="form-check-label" for="rq1InterY">No</label>
              </div>
              <label for="rq1Open">rq1Open</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="rq1Open"
                  value="Y"
                  v-model="selectedFoundation.rq1Open"
                />
                <label class="form-check-label" for="rq1InterY">Yes</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="rq1Open"
                  value="N"
                  v-model="selectedFoundation.rq1Open"
                />
                <label class="form-check-label" for="rq1InterY">No</label>
              </div>
              <label for="SD">SD</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="SD"
                  value="Y"
                  v-model="selectedFoundation.SD"
                />
                <label class="form-check-label" for="rq1InterY">Yes</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="SD"
                  value="N"
                  v-model="selectedFoundation.SD"
                />
                <label class="form-check-label" for="rq1InterY">No</label>
              </div>
              <label for="rq3rq4">rq3rq4</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="rq3rq4"
                  value="Y"
                  v-model="selectedFoundation.rq3rq4"
                />
                <label class="form-check-label" for="rq1InterY">Yes</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="rq3rq4"
                  value="N"
                  v-model="selectedFoundation.rq3rq4"
                />
                <label class="form-check-label" for="rq1InterY">No</label>
              </div>
              <label for="legal">legal</label>
              <input class="form-control" type="text" :value="selectedFoundation.legal" />
              <label for="topics">topics</label>
              <input
                class="form-control"
                type="text"
                :value="selectedFoundation.topics"
              />
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
  created: function () {
    this.loadFoundations();
  },
  data() {
    return {
      foundations: "",
      loading: true,
      textModal: "",
      isNewFoundationForm: false,
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
        topics: "",
      },
    };
  },
  props: {},
  methods: {
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
    editFoundation(id, selectedFoundation) {
      return API.editFoundation(id, selectedFoundation)
        .then(() => this.loadFoundations())
        .catch((err) => console.log(err));
    },
    newFoundation(foundation) {
      return API.newFoundation(foundation)
        .then(() => this.loadFoundations())
        .catch((err) => console.log(err));
    },
    deleteFoundation(foundationId) {
      return API.deleteFoundation(foundationId)
        .then(() => this.loadFoundations())
        .catch((err) => console.log(err));
    },
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
          this.selectedFoundation.rq3rq4 = this.foundations[x].rq3rq4;
          this.selectedFoundation.legal = this.foundations[x].legal;
          this.selectedFoundation.topics = this.foundations[x].topics;
        }
      }
    },
    emptyFormData() {
      for (var x in this.selectedFoundation) {
        this.selectedFoundation[x] = "";
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
tr:hover {
  color: grey !important;
}

.action-form {
  margin-bottom: 10px;
}
</style>

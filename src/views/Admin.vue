<template>
  <div class="app-container container-xl" :class="{ row: buttonFormActive }">
    <div :class="{ 'col-8': buttonFormActive, 'col-12': !buttonFormActive }">
      <button
        class="action-form btn btn-info float-right"
        v-on:click="buttonFormActive = true"
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
                  buttonFormActive = true;
                  loadFormData(foundation.id);
                "
              >
                Edit
              </button>
            </td>
            <td>
              <button
                class="btn btn-danger"
                v-on:click="deleteFoundation(foundation.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="newFoundation col-4" v-if="buttonFormActive">
      <button
        class="action-form btn btn-info float-right"
        v-on:click="buttonFormActive = false"
      >
        Exit Form
      </button>
      <form>
        <label for="name">Name</label>
        <input type="text" :value="selectedFoundation.name" />
        <label for="url">URL</label>
        <input type="text"  :value="selectedFoundation.url" />
        <label for="rq1Inter">rq1Inter</label>
        <input type="text"  :value="selectedFoundation.rq1Inter" />
        <label for="rq1Indep">rq1Indep</label>
        <input type="text"  :value="selectedFoundation.rq1Indep" />
        <label for="rq1Open">rq1Open</label>
        <input type="text"  :value="selectedFoundation.rq1Open"/>
        <label for="SD" >SD</label>
        <input type="text"  :value="selectedFoundation.SD"/>
        <label for="rq3rq4">rq3rq4</label>
        <input type="text" :value="selectedFoundation.rq3rq4" />
        <label for="legal">legal</label>
        <input type="text"  :value="selectedFoundation.legal"/>
        <label for="topics">topics</label>
        <input type="text" :value="selectedFoundation.topics" />
      </form>
    </div>
  </div>
</template>

<script>
import API from "@/data/api.js";
//import FoundationsList from "@/components/FoundationsList.vue";

export default {
  //components: { FoundationsList },
  name: "Admin",
  created: function () {
    this.loadFoundations();
  },
  data() {
    return {
      foundations: "",
      loading: true,
      buttonFormActive: false,
      selectedFoundation: {
        name: "f",
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
      return (
        API.getFoundations()
          .then(
            (response) => (
              (this.foundations = response), (this.loading = false)
            )
          )
          //If error
          .catch((err) => console.log(err))
      );
    },
    deleteFoundation(id) {
      //this.loading = true;
      API.deleteFoundation(id);
      // .then(this.loadFoundations(), (this.loading = false))
      // //If error
      // .catch((err) => console.log(err));
    },
    loadFormData(id) {
      for (var x in this.foundations) {
        if (this.foundations[x].id == id) {
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

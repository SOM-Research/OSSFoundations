<template>
  <table class="table table-sm table-hover">
    <thead>
      <tr>
        <th v-for="column in columns" v-bind:key="column">
          <div
            href="#"
            v-on:click="sortBy(column)"
            v-bind:class="{ active: sortKey == column }"
          >
            {{ column[0].toUpperCase() + column.slice(1) }}
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="foundation in foundations" v-bind:key="foundation.id">
        <td>
          <a
            data-toggle="collapse"
            v-bind:href="
              '#' +
              foundation.name
                .replace(/ /g, '')
                .replace(/\./g, '')
                .replace(/'/g, '')
                .replace('(', '')
                .replace(')', '')
                .replace('#', '')
            "
            role="button"
            aria-expanded="false"
            aria-controls="collapseTable"
          >
            {{ foundation.name }}
          </a>
          <div
            class="collapse collapse-foundation"
            v-bind:id="
              foundation.name
                .replace(/ /g, '')
                .replace(/\./g, '')
                .replace(/'/g, '')
                .replace('(', '')
                .replace(')', '')
                .replace('#', '')
            "
          >
            <div class="card card-body">
              <span class="card-item">Website:</span>
              <a v-bind:href="foundation.url" target="_blank">{{ foundation.url }}</a>
              <span class="card-item">Status Form:</span>
              {{ foundation.legal }}
              <table class="table table-sm">
                <tr>
                  <th>Dimension</th>
                  <th>Result</th>
                </tr>
                <tr>
                  <td>Does it have an international scope?</td>
                  <td>{{ foundation.rq1Inter }}</td>
                </tr>
                <tr>
                  <td>Is it independent?</td>
                  <td>{{ foundation.rq1Indep }}</td>
                </tr>
                <tr>
                  <td>Is it transparent enough?</td>
                  <td>{{ foundation.rq1Open }}</td>
                </tr>
                <tr>
                  <td>Does it directly support software products?</td>
                  <td>{{ foundation.SD }}</td>
                </tr>
              </table>
              <div>
                <span>Something is wrong or missing?</span>
                <button
                  class="btn btn-sm btn-secondary ml-1"
                  data-toggle="modal"
                  data-target="#modalSuggestChanges"
                  @click="loadFormData(foundation.id, foundations)"
                >
                  Suggest a change
                </button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- Modal suggest changes -->
  <div
    class="modal fade"
    id="modalSuggestChanges"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalSuggestChanges"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalSuggestChanges">Suggest changes</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <new-edit-foundation :selectedFoundation="selectedFoundation" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            @click="editionProposal(selectedFoundation.id, selectedFoundation)"
          >
            Send changes
          </button>
        </div>
      </div>
    </div>
  </div>
  <modal-response :responseAction="responseAction" />
  <loading v-if="loading" />
</template>

<script>
//Import lodash
import _ from "lodash";
import $ from "jquery";
import NewEditFoundation from "@/components/NewEditFoundation.vue";
import API from "@/data/api.js";
import ModalResponse from "@/components/ModalResponse.vue";
import Loading from "@/components/Loading.vue";

export default {
  components: { NewEditFoundation, ModalResponse, Loading },
  name: "FoundationsList",
  props: ["foundationsProp"],
  data() {
    return {
      ///ORDERING
      columns: ["name"], // Columns of the table
      sortKey: "", // Order
      reverse: false, // If we have to reverse the order

      //DATA
      foundations: this.foundationsProp,
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
      loading: false, //Indicates if a task is loading
    };
  },
  mounted() {},

  watch: {
    //Watches if the foundations data has been changed and updates the value
    foundationsProp: {
      deep: true,
      handler(value) {
        this.foundations = value;
        this.sortBy(this.columns);
      },
    },
  },
  methods: {
    //Sorts the table alphabetically
    sortBy: function (sortKey) {
      this.reverse = this.sortKey == sortKey ? !this.reverse : false;
      this.sortKey = sortKey;
      this.foundations = _.orderBy(
        this.foundations,
        this.sortKey,
        this.reverse ? "desc" : "asc"
      );
    },
    //Fills the form with the info of the selected foundation by using its ID
    loadFormData(id, foundationsList) {
      for (var x in foundationsList) {
        if (foundationsList[x].id == id) {
          this.selectedFoundation.name = foundationsList[x].name;
          this.selectedFoundation.id = foundationsList[x].id;
          this.selectedFoundation.url = foundationsList[x].url;
          this.selectedFoundation.rq1Inter = foundationsList[x].rq1Inter;
          this.selectedFoundation.rq1Indep = foundationsList[x].rq1Indep;
          this.selectedFoundation.rq1Open = foundationsList[x].rq1Open;
          this.selectedFoundation.SD = foundationsList[x].SD;
          // this.selectedFoundation.authorMail = foundationsList[x].author.mail;
          // this.selectedFoundation.authorName = foundationsList[x].author.name;
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
    validateFormBeforeSubmit() {
      this.topicsToString(); // Converts the object of topics into a string
      var textValidation = "";
      var isError = false;
      if (this.selectedFoundation.name == "") {
        textValidation = textValidation.concat("The field 'Name' is required. \n");
        isError = true;
      }
      if (this.selectedFoundation.url == "") {
        textValidation = textValidation.concat("The field 'Website' is required. \n");
        isError = true;
      }
      if (this.selectedFoundation.topicsString == "") {
        textValidation = textValidation.concat(
          "You have to select at least one topic from the list. \n"
        );
        isError = true;
      }

      //Shows modal if error or submit form if correct
      if (isError) {
        this.showModalWithResponse(textValidation);
        return false;
      } else {
        return true;
      }
    },
    //Send a request to the server to modify a foundation
    editionProposal(id, foundation) {
      if (this.validateFormBeforeSubmit() == true) {
        this.loading = true;
        //Close the previous modal
        $("#modalSuggestChanges").modal("hide");
        return API.editFoundationProposal(id, foundation)
          .then(
            (res) => (
              (this.loading = false), this.showModalWithResponse(res.data.message)
            )
          )
          .catch(
            (err) => (
              (this.loading = false),
              console.log(err),
              this.showModalWithResponse(err.message)
            )
          );
      }
    },
    //Shows a modal with a message when user makes any change (success / error)
    showModalWithResponse(res) {
      this.responseAction = res; //Save the response in the variable

      $("#modalResponse").modal("show"); //Triggers the modal "modalResponse"
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  background-color: #397c89;
  border-radius: 5px;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.card.card-body table {
  background-color: #397c89;
}

.card-item {
  font-weight: bold;
  margin-right: 5px;
}

.card * {
  word-break: break-all;
}
h5 {
  color: #212529 !important;
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

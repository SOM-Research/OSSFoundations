<template>
  <div class="container first">
    <h1>Add a new foundation</h1>
    <hr class="mt-2 mb-3" />
    <new-edit-foundation
      :selectedFoundation="selectedFoundation"
      @update-selected-foundation="updateSelectedFoundation"
    />
    <button
      @click="validateFormBeforeSubmit()"
      @submit.prevent
      class="btn btn-success float-right"
      data-dismiss="modal"
    >
      Submit
    </button>
  </div>
  <modal-response :responseAction="responseAction" />
  <div
    class="modal fade"
    id="modalResponseSuccess"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalResponse"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <p>{{ responseAction }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            <router-link to="/">OK</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewEditFoundation from "@/components/NewEditFoundation.vue";
import ModalResponse from "../components/ModalResponse.vue";
import { selectedFoundation } from "@/mixins/SelectedFoundation.js";
import API from "@/data/api.js";
import $ from "jquery";

export default {
  mixins: [selectedFoundation],
  components: { NewEditFoundation, ModalResponse },
  name: "AddFoundation",
  created() {},
  data() {
    return {
      responseAction: "", //Shows the message of an error or success of an action
    };
  },
  props: {},
  methods: {
    //Send a request to the server to create a new foundation
    newFoundation(foundation) {
      return API.newFoundationPending(foundation)
        .then((res) => this.showModalWithResponseSuccess(res.data.message))
        .catch((err) => (console.log(err), this.showModalWithResponse(err.message)));
    },
    //Shows a modal with a message when user makes any change (error)
    showModalWithResponse(res) {
      this.responseAction = null;
      this.responseAction = res; //Save the response in the variable
      $("#modalResponse").modal("show"); //Triggers the modal "modalResponse"
    },
    //Shows a modal with a message when sends a new foundation request
    showModalWithResponseSuccess(res) {
      this.responseAction = null;
      this.responseAction = res; //Save the response in the variable
      $("#modalResponseSuccess").modal("show"); //Triggers the modal "modalResponse"
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
        this.newFoundation(this.selectedFoundation);
        return true;
      }
    },
  },
};
</script>

<style scoped>
.first {
  margin-top: 5em;
}
h1 {
  color: #5a97a2;
}
.btn-success {
  margin-bottom: 30px;
}

.btn a {
  text-decoration: none;
  color: white;
}
</style>

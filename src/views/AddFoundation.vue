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
</template>

<script>
import NewEditFoundation from "@/components/NewEditFoundation.vue";
import ModalResponse from "../components/ModalResponse.vue";
import API from "@/data/api.js";
import $ from "jquery";

export default {
  components: { NewEditFoundation, ModalResponse },
  name: "AddFoundation",
  created() {},
  data() {
    return {
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
        status: "pending", //In this form, the status always will be "pending"
      },
      responseAction: "", //Shows the message of an error or success of an action
    };
  },
  props: {},
  methods: {
    //Sends the data from the new-edit-foundation component this comopnent
    updateSelectedFoundation(f) {
      this.selectedFoundation = f;
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
    //Send a request to the server to create a new foundation
    newFoundation(foundation) {
      return API.newFoundationPending(foundation)
        .then((res) => this.showModalWithResponse(res.data.message))
        .catch((err) => (console.log(err), this.showModalWithResponse(err.message)));
    },
    //Shows a modal with a message when user makes any change (success / error)
    showModalWithResponse(res) {
      this.responseAction = null;
      this.responseAction = res; //Save the response in the variable
      $("#modalResponse").modal("show"); //Triggers the modal "modalResponse"
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
      } else {
        this.newFoundation(this.selectedFoundation);
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
</style>

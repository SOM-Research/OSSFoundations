<template>
  <button v-if="!loggedIn" class="btn btn-dark" @click="signInWithPopup()">
    <font-awesome-icon :icon="['fab', 'google']" />
    Sign in with Google
  </button>
  <div
    class="user-logged-in"
    type="button"
    id="dropdownMenuButton"
    data-toggle="dropdown"
    aria-haspopup="true"
    v-if="loggedIn"
  >
    <span class="align-middle">{{ user.displayName }}</span>
    <img :src="user.photoURL" :alt="user.displayName + ' picture'" />
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <button class="dropdown-item" @click="logout()">Sign off</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { provider } from "../firebase";

export default {
  name: "Auth",
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.user = user;
        this.loggedIn = true;
        this.token = user.getIdToken();
      } else {
        this.loggedIn = false;
        this.user = "";
      }
    });
  },
  data() {
    return {
      loggedIn: false,
      //Google
      credential: "",
      token: "",
      user: "Federica",
      //Errors
      errorCode: "",
      errorMessage: "",
      errorMail: "",
    };
  },
  async mounted() {},
  props: {},
  methods: {
    signInWithPopup() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          this.credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          this.token = this.credential.accessToken;
          // The signed-in user info.
          this.user = result.user;
          this.loggedIn = true;
          this.$router.push("/admin");
        })
        .catch((error) => {
          // Handle Errors here.
          this.errorCode = error.code;
          this.errorMessage = error.message;
          // The email of the user's account used.
          this.errorMail = error.email;
          // The firebase.auth.AuthCredential type that was used.
          this.credential = error.credential;
          // ...
        });
    },
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(
          //If session ends successfully
          (this.loggedIn = false),
          this.$router.push("/", () => {}) //Go to home page
        )
        .catch((err) => {
          this.errorMessage = err.message;
        });
    },
  },
};
</script>

<style scoped>
.user-logged-in {
  align-items: center;
  border-radius: 10%;
  align-items: center;
  padding: 5px 10px 5px 10px;
}
.user-logged-in:hover {
  background-color: #dddddd55;
  cursor: pointer;
}
.user-logged-in span {
  margin-right: 10px;
  font-weight: bold;
}
.user-logged-in img {
  max-width: 50px;
  border-radius: 50%;
  border: 0.5px solid #eeeeee;
}
</style>

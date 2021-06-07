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
    <img
      v-bind:class="{ 'border-admin': isAdmin }"
      :src="user.photoURL"
      :alt="user.displayName + ' picture'"
    />
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <button v-if="isAdmin" class="dropdown-item">
        <router-link to="/admin">Admin panel</router-link>
      </button>
      <button class="dropdown-item" @click="logout()">Log out</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { provider } from "../firebase";
import API from "@/data/api.js";

export default {
  name: "Auth",
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.user = user;
        this.loggedIn = true;
        this.token = user.getIdToken();
        //Prints if user is admin
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((idTokenResult) => {
            if (idTokenResult.claims.admin === true) {
              this.isAdmin = true;
            } else {
              this.isAdmin = false;
            }
          });
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
      user: "",
      isAdmin: false,
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
    //Makes an user "admin" passing its Firebase UID
    makeUserAdmin(userId) {
      console.log(userId);
      return API.makeUserAdmin(userId)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      /*Button to make admin:
      <button class="dropdown-item" @click="makeUserAdmin(user)">
        Make this user admin
      </button> */
    },
  },
};
</script>

<style scoped>
.user-logged-in {
  border-radius: 10%;
  align-items: center;
}
.user-logged-in:hover {
  cursor: pointer;
}
.user-logged-in span {
  margin-right: 10px;
  font-weight: bold;
}
.user-logged-in img {
  max-width: 2em;
  max-height: 2em;
  border-radius: 50%;
  border: 0.5px solid #eeeeee;
}
.border-admin {
  border: 1px solid #af56b3 !important;
}
</style>

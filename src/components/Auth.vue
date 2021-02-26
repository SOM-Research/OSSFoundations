<template>
  <button v-if="!loggedIn" class="btn btn-dark" @click="signInWithPopup()">
    <font-awesome-icon :icon="['fab', 'google']" />
    Sign in with Google
  </button>
  <div class="user-logged-in" v-if="loggedIn">
    <span class="align-middle">{{ user.displayName }}</span>
    <img :src="user.photoURL" :alt="user.displayName + ' picture'" />
    <p>{{ token }}</p>
  </div>
</template>

<script>
import firebase from "firebase";
var provider = new firebase.auth.GoogleAuthProvider();
export default {
  name: "Test",
  created() {},
  data() {
    return {
      loggedIn: false,
      //Google
      credential: "",
      token: "",
      user: "",
      //Errors
      errorCode: "",
      errorMessage: "",
      errorMail: "",
    };
  },
  props: {},
  methods: {
    signInWithPopup() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
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
  },
};
</script>

<style scoped>
.user-logged-in {
  align-items: center;
  border-radius: 5%;
  align-items: center;
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

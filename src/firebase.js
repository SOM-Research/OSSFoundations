import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAzq2N_QevTcEMZUgXoqdyKI7q7fIbrvKM",
  authDomain: "oss-foundations.firebaseapp.com",
  projectId: "oss-foundations",
  storageBucket: "oss-foundations.appspot.com",
  messagingSenderId: "1097494485325",
  appId: "1:1097494485325:web:2b2a3ee7517ff21f537f04"
};

firebase.initializeApp(firebaseConfig);
//const db = app.database();
//Google auth
var provider = new firebase.auth.GoogleAuthProvider();


//Gets the current user
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};

//Gets if an user is admin
firebase.getIfAdmin = () => {
  firebase.auth()
    .currentUser.getIdTokenResult()
    .then((idTokenResult) => {
      return idTokenResult.claims.admin;
    })
}
//Export

export { firebase, provider };


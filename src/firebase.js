import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAzq2N_QevTcEMZUgXoqdyKI7q7fIbrvKM",
    authDomain: "oss-foundations.firebaseapp.com",
    projectId: "oss-foundations",
    storageBucket: "oss-foundations.appspot.com",
    messagingSenderId: "1097494485325",
    appId: "1:1097494485325:web:2b2a3ee7517ff21f537f04"
  };

 const app = firebase.initializeApp(firebaseConfig);
 const db = app.database();
 //Google auth
 var provider = new firebase.auth.GoogleAuthProvider();
 provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


 //Export

export {db, provider};


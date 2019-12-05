import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyALAMOZcTwMiq8UjT4fPKJ5uAeTHelSXro",
    authDomain: "santa-burga.firebaseapp.com",
    databaseURL: "https://santa-burga.firebaseio.com",
    projectId: "santa-burga",
    storageBucket: "santa-burga.appspot.com",
    messagingSenderId: "873522135358",
    appId: "1:873522135358:web:06c0c25c45d8f1ab98ec6f",
    measurementId: "G-2SHNN6FSGS",
  });
}

export default firebase;

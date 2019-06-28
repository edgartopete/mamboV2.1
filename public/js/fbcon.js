// Initialize Firebase
var config = {
  apiKey: "AIzaSyBEJRfBSbC2vnJu7T-GLa8B-X3wMcr4hTg",
  authDomain: "mambo-ab916.firebaseapp.com",
  databaseURL: "https://mambo-ab916.firebaseio.com",
  projectId: "mambo-ab916",
  storageBucket: "mambo-ab916.appspot.com",
  messagingSenderId: "978683882765"
};
firebase.initializeApp(config);

var sotorageRef = firebase.storage().ref('/servicesImages/');
//var authService = firebase.auth();

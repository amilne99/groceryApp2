const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {apiKey: "AIzaSyD5HioxYJ82pfLWaL6Ek484ceIDxNc9Jp0",
authDomain: "kiei-451-d1d71.firebaseapp.com",
projectId: "kiei-451-d1d71",
storageBucket: "kiei-451-d1d71.appspot.com",
messagingSenderId: "170317851474",
appId: "1:170317851474:web:8a8d2a61b579ff67b6688b"} // replaced

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase
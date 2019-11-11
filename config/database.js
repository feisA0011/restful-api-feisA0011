const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyDP5WLOzwXdaD3ysgT2BXLLfvVtIRzPedA",
    authDomain: "feisalostebik.firebaseapp.com",
    databaseURL: "https://feisalostebik.firebaseio.com",
    projectId: "feisalostebik",
    storageBucket: "feisalostebik.appspot.com",
    messagingSenderId: "917688306321",
    appId: "1:917688306321:web:3cadfdf48853a11b7fcd30"
};

const db = firebase.initializeApp(firebaseConfig);

module.exports = db;

db.collection
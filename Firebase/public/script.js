// import dotenv from 'dotenv'
// dotenv.config();
// import { initializeApp } from '/firebase/app';
// import { getAuth } from './node_modules/firebase/auth';
// import { getFirestore } from "./node_modules/firebase/firestore"

// const firebaseConfig = {
//     apiKey: "AIzaSyDEJODyMvCo7aM4p8tAn6airixMi4R6M30",
//     authDomain: "geekfest-bell.firebaseapp.com",
//     projectId: "geekfest-bell",
//     messagingSenderId: "196409459993",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// console.log("Auth Domain", firebaseConfig.authDomain)

// function validerConnexion(event){
//     let form = document.forms["log-in"];
//     event.preventDefault()
//     console.log(form)
// }
document.querySelector('#log-in-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents form submission
    let form = document.forms["log-in"];
    let email = form["email"].value
    let password = form["password"].value
    console.log(email+"\n"+password)
});
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

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import { getFirestore, collection, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDEJODyMvCo7aM4p8tAn6airixMi4R6M30",
    authDomain: "geekfest-bell.firebaseapp.com",
    projectId: "geekfest-bell",
    messagingSenderId: "196409459993",
};

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const COLLECTION_USERS = collection(db, 'users');
const signWithGoogleButton = document.getElementById('log-in-connect-google')


console.log("Auth Domain", firebaseConfig.authDomain)

async function login(email, password) {
    try {
        let response = await signInWithEmailAndPassword(auth, email, password)
        getUser(response.user)
    } catch (e) {
        alert('Courriel et/ou mot de passe invalide')
    }

}

function logout() {
    auth.signOut()
}

async function createUser(email, password, familyName, name, gender) {
    createUserWithEmailAndPassword(auth, email, password).then(cred => {
        setDoc(doc(COLLECTION_USERS, cred.user.uid), {
            email: email,
            family_name: familyName,
            name: name,
            gender: gender
        })
    })
}

console.log("Good morning.")

export async function submitLogIn() {
    console.log('allo')
    let form = document.forms["log-in"];
    let email = form["email"].value
    let password = form["password"].value
    login(email, password)
}

export function submitSignUp() {
    let form = document.forms["sign-up"];
    let email = form["email"].value
    let password = form["password"].value
    let familyName = form["familyName"].value
    let name = form["name"].value
    let gender = form["gender"].value
    createUser(email, password, familyName, name, gender)
}

async function getUser(authUser) {
    const docSnap = await getDoc(doc(COLLECTION_USERS, authUser.uid))
    let userData = null;

    if (docSnap.exists()) {
        userData = docSnap.data()
    }
    alert(`Bienvenue ${userData.name}`)
}

signWithGoogleButton.addEventListener('click', signInWithGoogle)

function signInWithGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
}
/* document.querySelector('#log-in-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents form submission
    let form = document.forms["log-in"];
    let email = form["email"].value
    let password = form["password"].value
    console.log(email+"\n"+password)
}); */
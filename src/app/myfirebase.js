import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyA1HeIfFWfPLaODBCepSyb7C472gxaDcy0",
    authDomain: "test-1d0f3.firebaseapp.com",
    databaseURL: "https://test-1d0f3.firebaseio.com",
    projectId: "test-1d0f3",
    storageBucket: "test-1d0f3.appspot.com",
    messagingSenderId: "1001130440934",
    appId: "1:1001130440934:web:f614427fe75b3217116327",
    measurementId: "G-HR79WSEZR0"
};
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()
// class Firebase {
//     constructor() {
//         app.initializeApp(firebaseConfig);
//         this.auth = app.auth();
//     }
//
//
//     doCreateUserWithEmailAndPassword = (email, password) =>
//         this.auth.createUserWithEmailAndPassword(email, password);
//
//     doSignInWithEmailAndPassword = (email, password) =>
//         this.auth.signInWithEmailAndPassword(email, password);
//
//     doSignOut = () => this.auth.signOut();
//
//     doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
//
//     doPasswordUpdate = password =>
//         this.auth.currentUser.updatePassword(password);
// }

export  {db,auth} ;

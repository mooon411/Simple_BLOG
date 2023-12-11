import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNEXnX2kzPXc_moPrnGD7tgc4WhsgOI3k",
  authDomain: "zeroai-c5e02.firebaseapp.com",
  projectId: "zeroai-c5e02",
  storageBucket: "zeroai-c5e02.appspot.com",
  messagingSenderId: "889879605351",
  appId: "1:889879605351:web:3b57b1c26f0b4a3296a4c2",
  measurementId: "G-H90PRFPHDR",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

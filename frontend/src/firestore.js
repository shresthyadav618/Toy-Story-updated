// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import "firebase/app"
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo3cz2DAYKx07zB2WDgFKCabUygaCUZZQ",
  authDomain: "movie-favorites-a16ea.firebaseapp.com",
  projectId: "movie-favorites-a16ea",
  storageBucket: "movie-favorites-a16ea.appspot.com",
  messagingSenderId: "292649801632",
  appId: "1:292649801632:web:5684464ecd4b737dcfb6c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const xx=getFirestore();
export default xx;

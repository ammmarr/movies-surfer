// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTZAL74VqT3oj3b06c5bcyIEpnjxUFJWg",
  authDomain: "movie-surfer.firebaseapp.com",
  projectId: "movie-surfer",
  storageBucket: "movie-surfer.appspot.com",
  messagingSenderId: "83193479758",
  appId: "1:83193479758:web:2ffe3ccb270322af4db91f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth()


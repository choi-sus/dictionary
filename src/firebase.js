// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1C-ZNCogAFPU6PISRDOUaz7Axe3IE2hM",
  authDomain: "react-dictionary-895b6.firebaseapp.com",
  projectId: "react-dictionary-895b6",
  storageBucket: "react-dictionary-895b6.appspot.com",
  messagingSenderId: "974337348431",
  appId: "1:974337348431:web:54e87fe3de6c397479eb3a",
  measurementId: "G-W1DFY4G3N3"
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();
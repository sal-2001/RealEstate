// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestatory.firebaseapp.com",
  projectId: "realestatory",
  storageBucket: "realestatory.appspot.com",
  messagingSenderId: "471992831537",
  appId: "1:471992831537:web:cf0cc94fa9c4536f0fcf10"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
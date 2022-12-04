// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6yIkQlJYfBo_g5GjcycbW5-v0hZ99YeE",
  authDomain: "todo-list-itc.firebaseapp.com",
  projectId: "todo-list-itc",
  storageBucket: "todo-list-itc.appspot.com",
  messagingSenderId: "806044664855",
  appId: "1:806044664855:web:4b0fa40260928ec23b4852",
  measurementId: "G-M1XDPE1YKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStoreInstance = getFirestore(app);
const analytics = getAnalytics(app);
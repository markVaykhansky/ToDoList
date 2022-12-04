import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6yIkQlJYfBo_g5GjcycbW5-v0hZ99YeE",
  authDomain: "todo-list-itc.firebaseapp.com",
  projectId: "todo-list-itc",
  storageBucket: "todo-list-itc.appspot.com",
  messagingSenderId: "806044664855",
  appId: "1:806044664855:web:4b0fa40260928ec23b4852",
  measurementId: "G-M1XDPE1YKJ"
};

export const firebaseApp = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAELjRqjydreURX9kzlDTm0gf0au-0jH0",
  authDomain: "controle-financie.firebaseapp.com",
  projectId: "controle-financie",
  storageBucket: "controle-financie.firebasestorage.app",
  messagingSenderId: "192829543713",
  appId: "1:192829543713:web:c42a279df84c2f9503da60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


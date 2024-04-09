// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_4WD2Q8-HBT2yOk-2w4i9Vz8etHbMBls",
  authDomain: "e-commerce2-417619.firebaseapp.com",
  projectId: "e-commerce2-417619",
  storageBucket: "e-commerce2-417619.appspot.com",
  messagingSenderId: "2543557359",
  appId: "1:2543557359:web:8d809018b03f1d5c82991a",
  measurementId: "G-2WGXP2TQCB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };

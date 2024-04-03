// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbIxzxcoiU1Xbk1uS_N6sG8dOPgTzZ16I",
  authDomain: "tokenautasautenticacion.firebaseapp.com",
  projectId: "tokenautasautenticacion",
  storageBucket: "tokenautasautenticacion.appspot.com",
  messagingSenderId: "647222765450",
  appId: "1:647222765450:web:251e1f2b3e3e002a910a73",
  measurementId: "G-VG8GC3FJ58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
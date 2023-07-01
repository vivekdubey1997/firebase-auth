// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1H7N7Cq9wHcSXnbhC_5-nUS6y0m_BT58",
  authDomain: "otp-app-demo-a1c29.firebaseapp.com",
  projectId: "otp-app-demo-a1c29",
  storageBucket: "otp-app-demo-a1c29.appspot.com",
  messagingSenderId: "868928219139",
  appId: "1:868928219139:web:23dd819bf5d33e9bd44636"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpnm_Yz9xDgrED9E0U-OA8kepS0psmRH4",
  authDomain: "stock-portfolio-tracker-5d6f1.firebaseapp.com",
  projectId: "stock-portfolio-tracker-5d6f1",
  storageBucket: "stock-portfolio-tracker-5d6f1.firebasestorage.app",
  messagingSenderId: "611036840863",
  appId: "1:611036840863:web:c42a4522f36356e08133aa",
  measurementId: "G-T4L1X3042Z"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 
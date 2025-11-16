// firebaseAPIConfig.js

// Import Firebase CDN modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase web config (NOT using Vite .env anymore)
const firebaseConfig = {
  apiKey: "AIzaSyDHllYmCeeArjh1wOnKa_bgpp4_rSCTiM4",
  authDomain: "lecturebingo-8c039.firebaseapp.com",
  projectId: "lecturebingo-8c039",
  appId: "1:782774792964:web:513eb91e5d7d7839781651"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

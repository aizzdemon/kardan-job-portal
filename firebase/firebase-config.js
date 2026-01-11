// Firebase ke required functions import kar rahe hain
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Tumhare Firebase project ka config
const firebaseConfig = {
  apiKey: "AIzaSyBeGZBE1u1-y1hDWbRouchgwkgp89D973I",
  authDomain: "kar-kardan.firebaseapp.com",
  projectId: "kar-kardan",
  storageBucket: "kar-kardan.firebasestorage.app",
  messagingSenderId: "554147696994",
  appId: "1:554147696994:web:221dcb883e3b65dcea5c3b"
};

// Firebase app initialize ho raha hai
const app = initializeApp(firebaseConfig);

// Authentication service ko use karne ke liye
const auth = getAuth(app);

// Auth ko export kar rahe hain taa ki dusri files me use ho sake
export { auth };

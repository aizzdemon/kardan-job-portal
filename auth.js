// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeGZBE1u1-y1hDWbRouchgwkgp89D973I",
    authDomain: "kar-kardan.firebaseapp.com",
    projectId: "kar-kardan",
    storageBucket: "kar-kardan.appspot.com",
    messagingSenderId: "554147696994",
    appId: "1:554147696994:web:221dcb883e3b65dcea5c3b",
    measurementId: "G-RRC3X485KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup function
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent default form submission
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Signup successful! ✅");
            console.log("User signed up:", userCredential.user);
        })
        .catch((error) => {
            alert("Error: " + error.message);
            console.error("Signup error:", error);
        });
});

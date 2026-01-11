// Firebase auth import kar rahe hain
import { auth } from "../firebase/firebase-config.js";

// Firebase ke auth functions
import {
  onAuthStateChanged, // check karta hai user logged in hai ya nahi
  signOut             // logout ke liye
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// 1️⃣ Navbar HTML file ko load kar rahe hain
fetch("/components/navbar.html")
  .then(response => response.text()) // HTML ko text me convert
  .then(data => {
    // Navbar ka HTML page me inject kar diya
    document.getElementById("navbar").innerHTML = data;

    // Ab navbar ka logic start karo
    navbarLogic();
  });


// 2️⃣ Navbar logic function
function navbarLogic() {

  // Navbar ke right side ka div
  const navLinks = document.getElementById("nav-links");

  // Firebase check karega: user logged in hai ya nahi
  onAuthStateChanged(auth, (user) => {

    // Agar user logged in hai
    if (user) {

      // Logged-in user ke liye navbar
      navLinks.innerHTML = `
        <a href="jobs.html">Jobs</a>
        <a href="dashboard.html">Dashboard</a>
        <button id="logoutBtn">Logout</button>
      `;

      // Logout button pe click event
      document.getElementById("logoutBtn").addEventListener("click", () => {

        // Firebase se logout
        signOut(auth).then(() => {

          // Logout ke baad login page pe bhejo
          window.location.href = "login.html";
        });
      });

    } 
    // Agar user logged in nahi hai
    else {

      // Guest user ke liye navbar
      navLinks.innerHTML = `
        <a href="jobs.html">Jobs</a>
        <a href="login.html">Login</a>
        <a href="signup.html">Join Now</a>
      `;
    }
  });
}


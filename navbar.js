// navbar.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBeGZBE1u1-y1hDWbRouchgwkgp89D973I",
  authDomain: "kar-kardan.firebaseapp.com",
  projectId: "kar-kardan",
  storageBucket: "kar-kardan.firebasestorage.app",
  messagingSenderId: "554147696994",
  appId: "1:554147696994:web:221dcb883e3b65dcea5c3b",
  measurementId: "G-RRC3X485KQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Navbar container
const navbarContainer = document.getElementById("navbar");

// Basic navbar HTML structure
navbarContainer.innerHTML = `
<nav class="bg-white border-b border-gray-200 shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16 items-center">
      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center">
        <img class="h-10 w-10 mr-2" src="https://img.icons8.com/color/96/rocket.png" alt="BooterSpace">
        <span class="font-bold text-xl text-blue-600">BooterSpace</span>
      </div>

      <!-- Links -->
      <div class="hidden md:flex space-x-6 items-center text-gray-700 font-medium">
        <a href="index.html" class="flex items-center hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
          </svg>
          Home
        </a>
        <a href="jobs.html" class="flex items-center hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7V3H8v4M5 21h14v-2H5v2zM7 11h10v6H7v-6z" />
          </svg>
          Jobs
        </a>
        <a href="by-books.html" class="flex items-center hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2" />
          </svg>
          Books
        </a>
      </div>

      <!-- Auth Buttons / Profile -->
      <div class="flex items-center space-x-4">
        <button id="login-btn" class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 hidden">Login</button>
        <div id="user-section" class="flex items-center space-x-2 hidden">
          <img id="user-pic" class="h-8 w-8 rounded-full border border-gray-200" src="" alt="Profile">
          <span id="user-name" class="text-gray-700 font-medium"></span>
          <button id="logout-btn" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200">Logout</button>
        </div>
      </div>
    </div>
  </div>
</nav>
`;

// DOM elements
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userSection = document.getElementById("user-section");
const userPic = document.getElementById("user-pic");
const userName = document.getElementById("user-name");

// Show login button if user not logged in
loginBtn.onclick = () => {
  window.location.href = "login.html";
};

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User logged in
    loginBtn.classList.add("hidden");
    userSection.classList.remove("hidden");
    userPic.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "U")}&background=random`;
    userName.textContent = user.displayName || "User";
  } else {
    // User logged out
    loginBtn.classList.remove("hidden");
    userSection.classList.add("hidden");
  }
});

// Logout functionality
logoutBtn.onclick = () => {
  if (confirm("Are you sure you want to logout?")) {
    signOut(auth)
      .then(() => {
        window.location.href = "login.html"; // Redirect after logout
      })
      .catch((err) => {
        alert("Logout failed: " + err.message);
      });
  }
};

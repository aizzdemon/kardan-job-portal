// ===== Import Firebase modular v10 =====
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Tumhara Firebase config file (auth export) 
import { auth } from "./firebase/firebase-config.js";

// Navbar ke div ko pakad rahe hain
const navLinks = document.getElementById("nav-links");

// ===== Listen: User login hai ya nahi =====
onAuthStateChanged(auth, (user) => {

  // ===== Agar user logged in hai =====
  if(user){
    navLinks.innerHTML = `
      <!-- Public links left -->
      <a href="index.html" class="text-gray-700 font-medium hover:text-blue-600">Home</a>
      <a href="jobs.html" class="text-gray-700 font-medium hover:text-blue-600">Jobs</a>
      <a href="govt.html" class="text-gray-700 font-medium hover:text-blue-600">Govt. Jobs</a>

      <!-- Right side user profile + logout -->
      <div class="ml-auto flex items-center gap-3">

        <!-- Profile Picture -->
        <img src="${user.photoURL || 'https://img.icons8.com/ios-filled/50/user.png'}" 
          class="w-8 h-8 rounded-full border border-gray-200" 
          alt="Profile Picture" 
          title="${user.displayName || user.email}">

        <!-- Logout Button -->
        <button id="logoutBtn" 
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    `;

    // ===== Logout button action =====
    document.getElementById("logoutBtn").addEventListener("click", () => {
      signOut(auth).then(() => {
        window.location.href = "index.html"; // Logout ke baad redirect
      });
    });

  } else {
    // ===== Agar user NOT logged in =====
    navLinks.innerHTML = `
      <!-- Public links left -->
      <a href="index.html" class="text-gray-700 font-medium hover:text-blue-600">Home</a>
      <a href="jobs.html" class="text-gray-700 font-medium hover:text-blue-600">Jobs</a>
      <a href="govt.html" class="text-gray-700 font-medium hover:text-blue-600">Govt. Jobs</a>

      <!-- Right side login button -->
      <div class="ml-auto">
        <a href="login.html" 
           class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Login
        </a>
      </div>
    `;
  }

});

// navbar.js
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// DOM Elements
const authLinks = document.getElementById("authLinks");
const userDropdown = document.getElementById("userDropdown");
const mobileAuthLinks = document.getElementById("mobileAuthLinks");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

// Mobile menu toggle
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Initialize Firebase Auth
const auth = getAuth();

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const photoURL = user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}`;

    // Desktop User Dropdown
    userDropdown.innerHTML = `
      <div class="relative group">
        <img src="${photoURL}" alt="Profile" class="w-10 h-10 rounded-full cursor-pointer border border-gray-200">
        <div class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-100 py-2 hidden group-hover:block z-50">
          <a href="profile.html" class="block px-4 py-2 text-gray-700 hover:bg-blue-50">Profile</a>
          <button id="logoutBtnDesktop" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50">Logout</button>
        </div>
      </div>
    `;
    userDropdown.classList.remove("hidden");
    authLinks.innerHTML = "";

    // Mobile Auth Links
    mobileAuthLinks.innerHTML = `
      <a href="profile.html" class="block px-6 py-3 text-gray-700 hover:bg-blue-50">Profile</a>
      <button id="logoutBtnMobile" class="block w-full text-left px-6 py-3 text-gray-700 hover:bg-red-50">Logout</button>
    `;

    // Logout buttons
    document.getElementById("logoutBtnDesktop").addEventListener("click", logoutUser);
    document.getElementById("logoutBtnMobile").addEventListener("click", logoutUser);

  } else {
    // User is NOT signed in
    userDropdown.classList.add("hidden");
    authLinks.innerHTML = `
      <a href="login.html" class="text-gray-700 hover:text-blue-600 font-medium">Login</a>
      <a href="signup.html" class="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 font-medium">Join Now</a>
    `;
    mobileAuthLinks.innerHTML = `
      <a href="login.html" class="block px-6 py-3 text-gray-700 hover:bg-blue-50">Login</a>
      <a href="signup.html" class="block px-6 py-3 bg-blue-600 text-white rounded-xl text-center hover:bg-blue-700">Join Now</a>
    `;
  }
});

// Logout function
function logoutUser() {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      // Optional: redirect to homepage
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
}

// navbar.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

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

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Navbar container
const navbarContainer = document.getElementById("navbar");

// Inject navbar HTML
navbarContainer.innerHTML = `
<nav class="bg-white border-b border-gray-200 shadow-sm">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between h-16 items-center">

      <div class="flex items-center space-x-2">
        <img src="https://img.icons8.com/color/96/rocket.png" class="h-9 w-9"/>
        <span class="font-bold text-xl text-blue-600">BooterSpace</span>
      </div>

      <div class="hidden md:flex space-x-6 font-medium text-gray-700">
        <a href="index.html" class="hover:text-blue-600">Home</a>
        <a href="jobs.html" class="hover:text-blue-600">Jobs</a>
        <a href="by-books.html" class="hover:text-blue-600">Books</a>

        <a id="profileBtn" href="profile.html" class="hover:text-blue-600 hidden">Profile</a>
        <a id="dashboardBtn" href="dashboard.html" class="hover:text-blue-600 hidden">Dashboard</a>
      </div>

      <div class="flex items-center space-x-3">
        <button id="login-btn" class="px-3 py-1 bg-blue-600 text-white rounded text-sm hidden">Login</button>

        <div id="user-section" class="flex items-center space-x-2 hidden">
          <img id="user-pic" class="h-8 w-8 rounded-full border"/>
          <span id="user-name" class="text-sm font-semibold"></span>
          <button id="logout-btn" class="px-3 py-1 bg-gray-200 rounded text-sm">Logout</button>
        </div>
      </div>

    </div>
  </div>
</nav>
`;

// DOM
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userSection = document.getElementById("user-section");
const userPic = document.getElementById("user-pic");
const userName = document.getElementById("user-name");
const profileBtn = document.getElementById("profileBtn");
const dashboardBtn = document.getElementById("dashboardBtn");

// Login button
loginBtn.onclick = () => {
  window.location.href = "login.html";
};

// Auth state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginBtn.classList.add("hidden");
    userSection.classList.remove("hidden");
    profileBtn.classList.remove("hidden");

    userPic.src =
      user.photoURL ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "U")}`;

    userName.textContent = user.displayName || "User";

    // 🔥 Get role from Firestore
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const role = snap.data().role;

      // Show dashboard only for job providers
      if (role === "jobprovider") {
        dashboardBtn.classList.remove("hidden");
      } else {
        dashboardBtn.classList.add("hidden");
      }
    }

  } else {
    loginBtn.classList.remove("hidden");
    userSection.classList.add("hidden");
    profileBtn.classList.add("hidden");
    dashboardBtn.classList.add("hidden");
  }
});

// Logout
logoutBtn.onclick = () => {
  if (confirm("Are you sure you want to logout?")) {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  }
};

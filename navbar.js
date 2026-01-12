import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeGZBE1u1-y1hDWbRouchgwkgp89D973I",
  authDomain: "kar-kardan.firebaseapp.com",
  projectId: "kar-kardan",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ADMIN_EMAIL = "aizzdemon@gmail.com";   // 👈 change to your login email

// Elements
const guestLinks = document.getElementById("guestLinks");
const userLinks = document.getElementById("userLinks");
const navName = document.getElementById("navName");
const navPhoto = document.getElementById("navPhoto");
const adminLink = document.getElementById("adminLink");
const logoutBtn = document.getElementById("logoutBtn");

const mobileBtn = document.getElementById("mobileBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileGuest = document.getElementById("mobileGuest");
const mobileUser = document.getElementById("mobileUser");
const mobileName = document.getElementById("mobileName");
const mobilePhoto = document.getElementById("mobilePhoto");
const mobileAdmin = document.getElementById("mobileAdmin");
const mobileLogout = document.getElementById("mobileLogout");

// Toggle mobile
mobileBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Desktop
    guestLinks.classList.add("hidden");
    userLinks.classList.remove("hidden");

    navName.textContent = user.displayName || "User";
    navPhoto.src = user.photoURL || "https://i.pravatar.cc/150";

    // Mobile
    mobileGuest.classList.add("hidden");
    mobileUser.classList.remove("hidden");

    mobileName.textContent = user.displayName || "User";
    mobilePhoto.src = user.photoURL || "https://i.pravatar.cc/150";

    // Admin check
    if (user.email === ADMIN_EMAIL) {
      adminLink.classList.remove("hidden");
      mobileAdmin.classList.remove("hidden");
    }

  } else {
    guestLinks.classList.remove("hidden");
    userLinks.classList.add("hidden");

    mobileGuest.classList.remove("hidden");
    mobileUser.classList.add("hidden");
  }
});

// Logout
logoutBtn?.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "index.html");
});

mobileLogout?.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "index.html");
});

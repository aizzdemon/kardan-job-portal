import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const auth = window.firebaseAuth;

// Desktop
const profileBtn = document.getElementById("profileBtn");
const profilePic = document.getElementById("profilePic");
const profileName = document.getElementById("profileName");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Mobile
const mProfileBtn = document.getElementById("mProfileBtn");
const mProfilePic = document.getElementById("mProfilePic");
const mProfileName = document.getElementById("mProfileName");
const mLoginBtn = document.getElementById("mLoginBtn");
const mLogoutBtn = document.getElementById("mLogoutBtn");

// Menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Auth state
onAuthStateChanged(auth, (user) => {
  if (user && !user.isAnonymous) {

    // Desktop
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    profileBtn.classList.remove("hidden");

    profileName.textContent = user.displayName || "User";
    profilePic.src = user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`;

    // Mobile
    mLoginBtn.classList.add("hidden");
    mLogoutBtn.classList.remove("hidden");
    mProfileBtn.classList.remove("hidden");

    mProfileName.textContent = user.displayName || "User";
    mProfilePic.src = user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`;

  } else {
    // Desktop
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    profileBtn.classList.add("hidden");

    // Mobile
    mLoginBtn.classList.remove("hidden");
    mLogoutBtn.classList.add("hidden");
    mProfileBtn.classList.add("hidden");
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

mLogoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

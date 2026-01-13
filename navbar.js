// navbar.js  (Firebase v10 compatible)

// Import Firebase auth functions
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// Get auth instance from window (set in index.html or firebase.js)
const auth = window.auth;

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Listen to login state
onAuthStateChanged(auth, (user) => {

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const profileBtn = document.getElementById("profileBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const adminBtn = document.getElementById("adminBtn");
  const userName = document.getElementById("userName");
  const userPhoto = document.getElementById("userPhoto");

  const mLoginBtn = document.getElementById("mLoginBtn");
  const mSignupBtn = document.getElementById("mSignupBtn");
  const mProfileBtn = document.getElementById("mProfileBtn");
  const mLogoutBtn = document.getElementById("mLogoutBtn");

  if (user) {
    // Desktop
    loginBtn?.classList.add("hidden");
    signupBtn?.classList.add("hidden");
    profileBtn?.classList.remove("hidden");
    logoutBtn?.classList.remove("hidden");

    // Mobile
    mLoginBtn?.classList.add("hidden");
    mSignupBtn?.classList.add("hidden");
    mProfileBtn?.classList.remove("hidden");
    mLogoutBtn?.classList.remove("hidden");

    // User Info
    if (userName) {
      userName.innerText = user.displayName || "User";
      userName.classList.remove("hidden");
    }

    if (userPhoto) {
      userPhoto.src = user.photoURL || "https://ui-avatars.com/api/?name=User";
      userPhoto.classList.remove("hidden");
    }

    // Logout
    logoutBtn && (logoutBtn.onclick = () => signOut(auth));
    mLogoutBtn && (mLogoutBtn.onclick = () => signOut(auth));

    // Admin
    if (user.email === "admin@gmail.com") {
      adminBtn?.classList.remove("hidden");
    }

  } else {
    // Desktop
    loginBtn?.classList.remove("hidden");
    signupBtn?.classList.remove("hidden");
    profileBtn?.classList.add("hidden");
    logoutBtn?.classList.add("hidden");
    adminBtn?.classList.add("hidden");

    // Mobile
    mLoginBtn?.classList.remove("hidden");
    mSignupBtn?.classList.remove("hidden");
    mProfileBtn?.classList.add("hidden");
    mLogoutBtn?.classList.add("hidden");

    userName?.classList.add("hidden");
    userPhoto?.classList.add("hidden");
  }
});

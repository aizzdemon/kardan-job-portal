// navbar.js
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
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

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  // Toggle mobile menu
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Check user login state
  if (!window.auth) {
    console.error("Firebase auth not initialized! Make sure you set window.auth in index.html");
    return;
  }

  window.auth.onAuthStateChanged(user => {
    if (user) {
      // Logged-in
      loginBtn.classList.add("hidden");
      signupBtn.classList.add("hidden");
      profileBtn.classList.remove("hidden");
      logoutBtn.classList.remove("hidden");
      userName.textContent = user.displayName || "User";
      userName.classList.remove("hidden");
      userPhoto.src = user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || "User"}`;
      userPhoto.classList.remove("hidden");

      // Mobile menu
      mLoginBtn.classList.add("hidden");
      mSignupBtn.classList.add("hidden");
      mProfileBtn.classList.remove("hidden");
      mLogoutBtn.classList.remove("hidden");

      // Admin check (replace with your UID)
      const adminUID = "nkXAUBb7ffZQ5CtyShWl6YcQ39t2";
      if (user.uid === adminUID) {
        adminBtn.classList.remove("hidden");
      } else {
        adminBtn.classList.add("hidden");
      }
    } else {
      // Logged-out
      loginBtn.classList.remove("hidden");
      signupBtn.classList.remove("hidden");
      profileBtn.classList.add("hidden");
      logoutBtn.classList.add("hidden");
      userName.classList.add("hidden");
      userPhoto.classList.add("hidden");
      adminBtn.classList.add("hidden");

      // Mobile menu
      mLoginBtn.classList.remove("hidden");
      mSignupBtn.classList.remove("hidden");
      mProfileBtn.classList.add("hidden");
      mLogoutBtn.classList.add("hidden");
    }
  });

  // Logout action
  logoutBtn.addEventListener("click", () => {
    window.auth.signOut().then(() => {
      location.reload();
    });
  });

  mLogoutBtn.addEventListener("click", () => {
    window.auth.signOut().then(() => {
      location.reload();
    });
  });
});

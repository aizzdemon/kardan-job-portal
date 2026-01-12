// navbar.js (GitHub Pages compatible)

const auth = firebase.auth();

auth.onAuthStateChanged(user => {

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const profileBtn = document.getElementById("profileBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const adminBtn = document.getElementById("adminBtn");
  const userName = document.getElementById("userName");
  const userPhoto = document.getElementById("userPhoto");

  if (user) {
    // Logged in
    loginBtn?.classList.add("hidden");
    signupBtn?.classList.add("hidden");

    profileBtn?.classList.remove("hidden");
    logoutBtn?.classList.remove("hidden");

    if (userName) userName.innerText = user.displayName || "User";
    if (userPhoto) userPhoto.src = user.photoURL || "https://ui-avatars.com/api/?name=User";

    // Admin example (email based)
    if (user.email === "admin@gmail.com") {
      adminBtn?.classList.remove("hidden");
    }

    logoutBtn?.addEventListener("click", () => auth.signOut());

  } else {
    // Guest
    loginBtn?.classList.remove("hidden");
    signupBtn?.classList.remove("hidden");

    profileBtn?.classList.add("hidden");
    logoutBtn?.classList.add("hidden");
    adminBtn?.classList.add("hidden");
  }

});

import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const auth = window.auth;
const db = getFirestore(window.app);

// Desktop elements
const profileBtn = document.getElementById("profileBtn");
const profilePic = document.getElementById("profilePic");
const profileName = document.getElementById("profileName");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Mobile elements
const mProfileBtn = document.getElementById("mProfileBtn");
const mProfilePic = document.getElementById("mProfilePic");
const mProfileName = document.getElementById("mProfileName");
const mLoginBtn = document.getElementById("mLoginBtn");
const mLogoutBtn = document.getElementById("mLogoutBtn");

// Auth listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Hide login, show profile + logout
    loginBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    profileBtn.classList.remove("hidden");

    mLoginBtn.classList.add("hidden");
    mLogoutBtn.classList.remove("hidden");
    mProfileBtn.classList.remove("hidden");

    // Fetch user profile
    const snap = await getDoc(doc(db, "users", user.uid));

    let name = "User";
    let photo = "https://api.dicebear.com/7.x/thumbs/svg?seed=" + user.uid;

    if (snap.exists()) {
      const data = snap.data();
      name = data.name || name;
      photo = data.photoURL || photo;
    }

    // Desktop
    profileName.textContent = name;
    profilePic.src = photo;

    // Mobile
    mProfileName.textContent = name;
    mProfilePic.src = photo;

  } else {
    // Logged out
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    profileBtn.classList.add("hidden");

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

// Mobile menu toggle
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.toggle("hidden");
});

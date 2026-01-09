// Phosphor Icons Module Import
import { House, Briefcase, Book, SignOut } from "https://unpkg.com/@phosphor-icons/web@2.1.2/dist/index.esm.js";

// Render icons
document.getElementById("home-icon").appendChild(House({ size: 20, weight: "bold" }));
document.getElementById("jobs-icon").appendChild(Briefcase({ size: 20, weight: "bold" }));
document.getElementById("books-icon").appendChild(Book({ size: 20, weight: "bold" }));
document.getElementById("logout-icon").appendChild(SignOut({ size: 20, weight: "bold" }));

// Firebase Auth
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
const auth = getAuth();

onAuthStateChanged(auth, user => {
  const img = document.getElementById("profile-pic");
  const logoutBtn = document.getElementById("logout-btn");

  if (user) {
    img.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "U")}`;
    logoutBtn.style.display = "flex";
  } else {
    img.src = "https://ui-avatars.com/api/?name=Guest";
    logoutBtn.style.display = "none";
  }

  logoutBtn.onclick = () => {
    if(confirm("Are you sure you want to logout?")) {
      signOut(auth).then(() => {
        window.location.href = "login.html";
      }).catch(err => alert(err.message));
    }
  };
});

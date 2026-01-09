// Firebase config (your real project)
const firebaseConfig = {
  apiKey: "AIzaSyBeGZBE1u1-y1hDWbRouchgwkgp89D973I",
  authDomain: "kar-kardan.firebaseapp.com",
  projectId: "kar-kardan",
  storageBucket: "kar-kardan.firebasestorage.app",
  messagingSenderId: "554147696994",
  appId: "1:554147696994:web:221dcb883e3b65dcea5c3b"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(async (user) => {
  const userBox = document.getElementById("userBox");
  const loginBtn = document.getElementById("loginBtn");
  const dashboard = document.getElementById("dashboardLink");

  if (user) {
    userBox.classList.remove("hidden");
    loginBtn.classList.add("hidden");

    try {
      const doc = await db.collection("users").doc(user.uid).get();
      if (doc.exists) {
        const data = doc.data();

        document.getElementById("navName").innerText =
          data.name || user.displayName || "User";

        document.getElementById("navAvatar").src =
          data.photoURL ||
          user.photoURL ||
          `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`;

        if (data.role === "job_provider") {
          dashboard.classList.remove("hidden");
        } else {
          dashboard.classList.add("hidden");
        }
      }
    } catch (err) {
      console.error("Navbar user fetch error:", err);
    }
  } else {
    userBox.classList.add("hidden");
    loginBtn.classList.remove("hidden");
    dashboard.classList.add("hidden");
  }
});

// Login redirect
document.addEventListener("click", (e) => {
  if (e.target.id === "loginBtn") {
    window.location.href = "login.html";
  }

  if (e.target.id === "logoutBtn") {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  }
});

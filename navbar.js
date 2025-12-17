<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>BooterSpace</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-50">

<!-- Navbar mount point -->
<div id="navbar"></div>

<!-- Page Content -->
<main class="max-w-7xl mx-auto p-6">
  <h1 class="text-2xl font-bold text-gray-800">
    Welcome to BooterSpace 🚀
  </h1>
</main>

<!-- ================= SCRIPT ================= -->
<script type="module">
  /* ---------------- Firebase Imports ---------------- */
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
  import {
    getFirestore,
    collection,
    query,
    orderBy,
    startAt,
    endAt,
    getDocs
  } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

  /* Lucide Icons */
  import "https://unpkg.com/lucide@0.230.0/dist/lucide.min.js";

  /* ---------------- Load Navbar HTML ---------------- */
  // components/navbar.js
fetch('./components/navbar.html')
  .then(res => {
    if (!res.ok) throw new Error('Navbar not found');
    return res.text();
  })
  .then(html => {
    document.getElementById('navbar').innerHTML = html;

    // Lucide icons init
    if (window.lucide) {
      lucide.createIcons();
    }
  })
  .catch(err => {
    console.error('Navbar load error:', err);
  });


  function initNavbar() {

    /* ---------------- Firebase Init ---------------- */
    const firebaseConfig = JSON.parse(__firebase_config || "{}");
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const usersRef = collection(db, "users");

    /* ---------------- Elements ---------------- */
    const searchInput   = document.getElementById("searchInput");
    const searchSuggest = document.getElementById("searchSuggest");
    const mobileSearch  = document.getElementById("mobileSearch");
    const mobileSuggest = document.getElementById("mobileSuggest");
    const menuBtn       = document.getElementById("menuBtn");
    const mobileMenu    = document.getElementById("mobileMenu");

    /* ---------------- Auth UI Toggle ---------------- */
    onAuthStateChanged(auth, user => {
      toggle("loginBtn", !user);
      toggle("signupBtn", !user);
      toggle("dashboardBtn", user);
      toggle("profileBtn", user);
      toggle("logoutBtn", user);

      toggle("mLoginBtn", !user);
      toggle("mSignupBtn", !user);
      toggle("mDashboardBtn", user);
      toggle("mProfileBtn", user);
      toggle("mLogoutBtn", user);
    });

    function toggle(id, show) {
      const el = document.getElementById(id);
      if (el) el.classList.toggle("hidden", !show);
    }

    /* ---------------- People Search ---------------- */
    async function searchPeople(text, box) {
      box.innerHTML = "";

      if (!text || text.length < 2) {
        box.classList.add("hidden");
        return;
      }

      box.classList.remove("hidden");

      const q = query(
        usersRef,
        orderBy("nameLower"),
        startAt(text.toLowerCase()),
        endAt(text.toLowerCase() + "\uf8ff")
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        box.innerHTML = `
          <div class="p-3 text-sm text-gray-500">
            No users found
          </div>`;
        return;
      }

      snap.forEach(doc => {
        const u = doc.data();
        const div = document.createElement("div");

        div.className =
          "p-3 flex gap-3 items-center hover:bg-blue-50 cursor-pointer";

        div.innerHTML = `
          <img src="${u.photoURL || "https://placehold.co/40"}"
            class="w-10 h-10 rounded-full object-cover">
          <div>
            <div class="font-semibold text-sm">${u.name}</div>
            <div class="text-xs text-gray-500">@${u.username}</div>
          </div>
        `;

        div.onclick = () => {
          window.location.href = `/profile.html?uid=${doc.id}`;
        };

        box.appendChild(div);
      });
    }

    /* ---------------- Events ---------------- */
    searchInput?.addEventListener("input", e =>
      searchPeople(e.target.value, searchSuggest)
    );

    mobileSearch?.addEventListener("input", e =>
      searchPeople(e.target.value, mobileSuggest)
    );

    menuBtn?.addEventListener("click", () =>
      mobileMenu.classList.toggle("hidden")
    );

    document.addEventListener("click", e => {
      if (!e.target.closest("#searchInput")) {
        searchSuggest?.classList.add("hidden");
      }
      if (!e.target.closest("#mobileSearch")) {
        mobileSuggest?.classList.add("hidden");
      }
    });
  }
</script>

</body>
</html>

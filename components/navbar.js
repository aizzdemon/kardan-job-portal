<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, query, orderBy, startAt, endAt, getDocs } from
  "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import "https://unpkg.com/lucide@0.230.0/dist/lucide.min.js";

/* Load navbar HTML */
fetch("/components/navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;
    lucide.createIcons();
    initNavbar();
  });

function initNavbar() {

  /* Firebase */
  const firebaseConfig = JSON.parse(__firebase_config || "{}");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const usersRef = collection(db, "users");

  /* Elements */
  const searchInput = document.getElementById("searchInput");
  const searchSuggest = document.getElementById("searchSuggest");
  const mobileSearch = document.getElementById("mobileSearch");
  const mobileSuggest = document.getElementById("mobileSuggest");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  /* Auth UI */
  onAuthStateChanged(auth, user => {
    toggle("loginBtn", !user);
    toggle("signupBtn", !user);
    toggle("dashboardBtn", user);
    toggle("profileBtn", user);
    toggle("mDashboardBtn", user);
    toggle("mProfileBtn", user);
    toggle("mLoginBtn", !user);
    toggle("mSignupBtn", !user);
  });

  function toggle(id, show) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("hidden", !show);
  }

  /* Search */
  async function searchPeople(text, box) {
    box.innerHTML = "";
    if (text.length < 2) return box.classList.add("hidden");

    box.classList.remove("hidden");

    const q = query(
      usersRef,
      orderBy("nameLower"),
      startAt(text.toLowerCase()),
      endAt(text.toLowerCase() + "\uf8ff")
    );

    const snap = await getDocs(q);

    if (snap.empty) {
      box.innerHTML = `<div class="p-3 text-gray-500">No users found</div>`;
      return;
    }

    snap.forEach(doc => {
      const u = doc.data();
      const div = document.createElement("div");
      div.className = "p-3 flex gap-3 hover:bg-blue-50 cursor-pointer";
      div.innerHTML = `
        <img src="${u.photoURL || 'https://placehold.co/40'}"
          class="w-10 h-10 rounded-full">
        <div>
          <div class="font-semibold">${u.name}</div>
          <div class="text-xs text-gray-500">@${u.username}</div>
        </div>
      `;
      div.onclick = () => location.href = `/profile.html?uid=${doc.id}`;
      box.appendChild(div);
    });
  }

  searchInput?.addEventListener("input", e => searchPeople(e.target.value, searchSuggest));
  mobileSearch?.addEventListener("input", e => searchPeople(e.target.value, mobileSuggest));

  menuBtn?.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
}
</script>

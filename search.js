import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, startAt, endAt, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeGZBE1u1-y1hDWbRouchgwkgp89D973I",
  authDomain: "kar-kardan.firebaseapp.com",
  projectId: "kar-kardan",
  storageBucket: "kar-kardan.appspot.com",
  messagingSenderId: "554147696994",
  appId: "1:554147696994:web:221dcb883e3b65dcea5c3b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const searchInput = document.getElementById("searchUser");
const suggestions = document.getElementById("suggestions");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    searchInput.disabled = true;
    searchInput.placeholder = "Login to search users";
  }
});

searchInput.addEventListener("input", async () => {
  const searchText = searchInput.value.toLowerCase().trim();
  suggestions.innerHTML = "";
  suggestions.classList.add("hidden");

  if (searchText.length === 0) return;

  const usersRef = collection(db, "users");
  const q = query(usersRef, orderBy("nameLower"), startAt(searchText), endAt(searchText + "\uf8ff"));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      const user = doc.data();
      const li = document.createElement("li");
      li.textContent = user.name;
      li.className = "p-2 hover:bg-gray-100 cursor-pointer";
      li.addEventListener("click", () => {
        searchInput.value = user.name;
        suggestions.innerHTML = "";
        suggestions.classList.add("hidden");
        window.location.href = `profile.html?uid=${doc.id}`;
      });
      suggestions.appendChild(li);
    });
    suggestions.classList.remove("hidden");
  }
});

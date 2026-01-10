// navbar.js  (Firebase v10 – FULL WORKING)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeGZBE1u1-y1hDWbRouchgwkgp89D973I",
  authDomain: "kar-kardan.firebaseapp.com",
  projectId: "kar-kardan",
  storageBucket: "kar-kardan.firebasestorage.app",
  messagingSenderId: "554147696994",
  appId: "1:554147696994:web:221dcb883e3b65dcea5c3b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ---------------- DOM WAIT ---------------- */
function ready(fn){
  if(document.readyState!="loading"){ fn(); }
  else{ document.addEventListener("DOMContentLoaded", fn); }
}

ready(()=>{

const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userSection = document.getElementById("user-section");
const userPic = document.getElementById("user-pic");
const userName = document.getElementById("user-name");
const profileBtn = document.getElementById("profileBtn");
const dashboardBtn = document.getElementById("dashboardBtn");

loginBtn.onclick = () => location.href="login.html";

onAuthStateChanged(auth, async (user) => {

  if(user){

    // show user area
    loginBtn.classList.add("hidden");
    userSection.classList.remove("hidden");

    // name + photo
    userName.textContent = user.displayName || "User";
    userPic.src = user.photoURL || 
      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "U")}&background=random`;

    // show profile
    profileBtn.classList.remove("hidden");

    // role from firestore
    const snap = await getDoc(doc(db,"users",user.uid));
    if(snap.exists()){
      const role = snap.data().role;
      if(role === "jobprovider"){
        dashboardBtn.classList.remove("hidden");
      } else {
        dashboardBtn.classList.add("hidden");
      }
    }

  } else {

    // logged out
    loginBtn.classList.remove("hidden");
    userSection.classList.add("hidden");
    profileBtn.classList.add("hidden");
    dashboardBtn.classList.add("hidden");
  }

});

/* -------- LOGOUT -------- */
logoutBtn.onclick = ()=>{
  if(confirm("Logout from BooterSpace?")){
    signOut(auth).then(()=>{
      window.location.href="login.html";
    });
  }
};

});

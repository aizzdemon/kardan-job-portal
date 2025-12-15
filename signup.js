// signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

/* 🔥 FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyBeGZBE1u1-y1hDWbRouchgwkgp89D973I",
  authDomain: "kar-kardan.firebaseapp.com",
  projectId: "kar-kardan",
  storageBucket: "kar-kardan.appspot.com",
  messagingSenderId: "554147696994",
  appId: "1:554147696994:web:221dcb883e3b65dcea5c3b"
};

/* INIT */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

/* UTIL: username generator */
function generateUsername(name) {
  return name.replace(/\s+/g, "").toLowerCase();
}

window.onload = () => {
  const form = document.getElementById("signup-form");
  const googleBtn = document.getElementById("googleSignInBtn");

  /* ================= EMAIL / PASSWORD SIGNUP ================= */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const mobile = document.getElementById("mobile").value.trim();
    const profilePicInput = document.getElementById("profile-pic");

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      let photoURL = "";

      /* 📤 UPLOAD PROFILE PIC */
      if (profilePicInput?.files?.length > 0) {
        const file = profilePicInput.files[0];
        const imgRef = ref(storage, `profile_pictures/${uid}`);
        await uploadBytes(imgRef, file);
        photoURL = await getDownloadURL(imgRef);
      }

      const username = generateUsername(name);

      /* 💾 SAVE USER (SEARCH READY) */
      await setDoc(doc(db, "users", uid), {
        name,
        username,
        email,
        mobile,
        gender,
        photoURL,

        /* 🔑 SEARCH FIELDS */
        nameLower: name.toLowerCase(),
        usernameLower: username,
        emailLower: email.toLowerCase(),

        createdAt: serverTimestamp()
      });

      alert("Signup successful ✅");
      window.location.href = "home.html";

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  });

  /* ================= GOOGLE SIGNUP ================= */
  googleBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const username = generateUsername(user.displayName || "user");

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        username,
        email: user.email,
        photoURL: user.photoURL,

        /* 🔑 SEARCH FIELDS */
        nameLower: user.displayName.toLowerCase(),
        usernameLower: username,
        emailLower: user.email.toLowerCase(),

        createdAt: serverTimestamp()
      }, { merge: true });

      alert(`Welcome ${user.displayName} ✅`);
      window.location.href = "home.html";

    } catch (err) {
      console.error(err);
      alert("Google sign-in failed");
    }
  });
};

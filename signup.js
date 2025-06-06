// signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeGZBE1u1-y1hDWbRouchgwkgp89D973I",
  authDomain: "kar-kardan.firebaseapp.com",
  projectId: "kar-kardan",
  storageBucket: "kar-kardan.appspot.com",
  messagingSenderId: "554147696994",
  appId: "1:554147696994:web:221dcb883e3b65dcea5c3b",
  measurementId: "G-RRC3X485KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

window.onload = function () {
  const form = document.getElementById("signup-form");
  const googleBtn = document.getElementById("googleSignInBtn");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const mobile = document.getElementById("mobile").value;
    const profilePicInput = document.getElementById("profile-pic");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      let profilePicURL = "";

      if (profilePicInput.files.length > 0) {
        const profilePic = profilePicInput.files[0];
        const storageRef = ref(storage, `profile_pictures/${userId}`);
        await uploadBytes(storageRef, profilePic);
        profilePicURL = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, "users", userId), {
        name, gender, email, mobile, profilePicURL
      });

      alert("Sign-up successful! ✅ Redirecting...");
      window.location.href = "home.html";
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup Failed: " + error.message);
    }
  });

  googleBtn.addEventListener("click", async function () {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
        timestamp: new Date()
      });

      alert(`Welcome, ${user.displayName}! ✅ Redirecting...`);
      window.location.href = "home.html";
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Sign-in failed. Try again.");
    }
  });
};

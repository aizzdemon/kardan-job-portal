(function waitForFirebase() {

  if (!window.firebase || !firebase.auth) {
    setTimeout(waitForFirebase, 200);
    return;
  }

  firebase.auth().onAuthStateChanged(user => {

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const avatar = document.getElementById("avatar");

    if (!loginBtn || !logoutBtn) {
      setTimeout(waitForFirebase, 200);
      return;
    }

    if (user) {
      loginBtn.classList.add("hidden");
      logoutBtn.classList.remove("hidden");

      firebase.firestore().collection("users").doc(user.uid).get().then(doc => {
        if (doc.exists && doc.data().photoURL) {
          avatar.src = doc.data().photoURL;
          avatar.classList.remove("hidden");
        }
      });

    } else {
      loginBtn.classList.remove("hidden");
      logoutBtn.classList.add("hidden");
      avatar.classList.add("hidden");
    }
  });

  document.addEventListener("click", e => {
    if (e.target.id === "logoutBtn") {
      firebase.auth().signOut().then(() => {
        location.href = "login.html";
      });
    }
  });

})();

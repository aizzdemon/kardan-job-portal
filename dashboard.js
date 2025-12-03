// Firebase SDKs
document.write(`
<script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore-compat.js"></script>
`);

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBeGZBE1u1-y1hDWbRouchgwkgp89D973I",
    authDomain: "kar-kardan.firebaseapp.com",
    projectId: "kar-kardan",
    storageBucket: "kar-kardan.firebasestorage.app",
    messagingSenderId: "554147696994",
    appId: "1:554147696994:web:221dcb883e3b65dcea5c3b",
    measurementId: "G-RRC3X485KQ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let lastVisible = null;
let remainingJobs = 0;

// -------------------------------
// AUTH LISTENER
// -------------------------------
auth.onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Display user email
    document.getElementById("userEmail").textContent = user.email;

    // Load user name
    const userDoc = await db.collection("users").doc(user.uid).get();
    if (userDoc.exists) {
        document.getElementById("userName").textContent =
            userDoc.data().fullName || "User";
    }

    loadPostedJobs(user.uid);
});

// -------------------------------
// LOAD FIRST BATCH
// -------------------------------
async function loadPostedJobs(uid) {
    const list = document.getElementById("jobsList");
    list.innerHTML = "<p class='text-gray-500 text-center py-8'>Loading...</p>";

    const query = db.collection("jobs")
        .where("postedBy", "==", uid)
        .orderBy("timestamp", "desc")
        .limit(5);

    const snap = await query.get();

    if (snap.empty) {
        list.innerHTML = "<p class='text-gray-500 text-center py-8'>You haven't posted any jobs yet.</p>";
        return;
    }

    list.innerHTML = "";
    snap.forEach(doc => list.appendChild(jobCard(doc)));

    lastVisible = snap.docs[snap.docs.length - 1];

    const total = await db.collection("jobs")
        .where("postedBy", "==", uid)
        .get();

    remainingJobs = total.size - snap.docs.length;
    updateLoadMoreButton();
}

// -------------------------------
// LOAD MORE
// -------------------------------
async function loadMoreJobs() {
    if (!lastVisible) return;

    const btn = document.getElementById("loadMoreBtn");
    btn.textContent = "Loading...";

    const query = db.collection("jobs")
        .where("postedBy", "==", auth.currentUser.uid)
        .orderBy("timestamp", "desc")
        .startAfter(lastVisible)
        .limit(5);

    const snap = await query.get();

    snap.forEach(doc =>
        document.getElementById("jobsList").appendChild(jobCard(doc))
    );

    lastVisible = snap.docs[snap.docs.length - 1];
    remainingJobs -= snap.docs.length;

    updateLoadMoreButton();
}

// -------------------------------
// LOAD MORE BUTTON UPDATER
// -------------------------------
function updateLoadMoreButton() {
    const box = document.getElementById("loadMoreContainer");
    const btn = document.getElementById("loadMoreBtn");

    if (remainingJobs > 0) {
        box.classList.remove("hidden");
        btn.textContent = `Load More Jobs (${remainingJobs} remaining)`;
    } else {
        box.classList.add("hidden");
    }
}

// -------------------------------
// JOB CARD UI
// -------------------------------
function jobCard(doc) {
    const d = doc.data();

    const div = document.createElement("div");
    div.className = "border p-4 rounded-xl shadow bg-white";

    div.innerHTML = `
        <h3 class="font-bold text-lg">${d.title}</h3>
        <p class="text-gray-600">${d.companyName}</p>
        <p class="text-gray-500 text-sm">${d.location}</p>

        <div class="flex gap-3 mt-3">
            <button onclick="editJob('${doc.id}')"
                class="bg-blue-600 text-white px-3 py-1 rounded-lg">Edit</button>

            <button onclick="deleteJob('${doc.id}')"
                class="bg-red-600 text-white px-3 py-1 rounded-lg">Delete</button>
        </div>
    `;
    return div;
}

// -------------------------------
// DELETE JOB
// -------------------------------
async function deleteJob(id) {
    await db.collection("jobs").doc(id).delete();
    location.reload();
}

// -------------------------------
// LOGOUT
// -------------------------------
function logout() {
    auth.signOut().then(() => window.location.href = "login.html");
}

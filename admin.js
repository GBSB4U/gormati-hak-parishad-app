import { db } from "./src/config.js";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔐 Temporary Founder Admin Key
const ADMIN_SECRET = "GBSB4U-FOUNDER-ONLY";

window.loadSubmissions = async function () {
  const key = document.getElementById("adminKey").value;

  if (key !== ADMIN_SECRET) {
    alert("Unauthorized Access");
    return;
  }

  const container = document.getElementById("submissions");
  container.innerHTML = "<p>Loading submissions...</p>";

  try {
    const snapshot = await getDocs(collection(db, "hak_submissions"));
    container.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      const block = document.createElement("div");
      block.style.border = "1px solid #ccc";
      block.style.padding = "10px";
      block.style.marginBottom = "10px";

      block.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Issue:</strong> ${data.description}</p>
        <p><strong>Status:</strong> ${data.status}</p>
        ${data.evidence ? `<p><a href="${data.evidence}" target="_blank">View Evidence</a></p>` : ""}
        <button onclick="updateStatus('${docSnap.id}', 'Under Review')">Under Review</button>
        <button onclick="updateStatus('${docSnap.id}', 'Resolved')">Resolved</button>
      `;

      container.appendChild(block);
    });

  } catch (err) {
    alert("Error loading submissions");
    console.error(err);
  }
};

window.updateStatus = async function (id, status) {
  try {
    const ref = doc(db, "hak_submissions", id);
    await updateDoc(ref, { status });
    alert("Status Updated Successfully");
  } catch (err) {
    alert("Failed to update status");
    console.error(err);
  }
};

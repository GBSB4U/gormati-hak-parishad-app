import { db } from "./src/config.js";
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const container = document.getElementById("noticeList");

async function loadNotices() {
  container.innerHTML = "<p>Loading notices...</p>";

  try {
    const q = query(
      collection(db, "hak_submissions"),
      where("status", "in", ["Under Review", "Resolved"])
    );

    const snapshot = await getDocs(q);
    container.innerHTML = "";

    if (snapshot.empty) {
      container.innerHTML = "<p>No public notices available yet.</p>";
      return;
    }

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      const block = document.createElement("div");
      block.style.border = "1px solid #ddd";
      block.style.padding = "10px";
      block.style.marginBottom = "10px";

      block.innerHTML = `
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Issue Summary:</strong> ${data.description}</p>
      `;

      container.appendChild(block);
    });

  } catch (err) {
    container.innerHTML = "<p>Error loading notices.</p>";
    console.error(err);
  }
}

loadNotices();

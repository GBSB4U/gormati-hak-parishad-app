async function generateNotice() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const content = document.getElementById("content").value;

  if (!title || !date || !content) {
    alert("All fields are required");
    return;
  }

  let existingData = { notices: [] };

  try {
    const response = await fetch("data.json");
    if (response.ok) {
      existingData = await response.json();
    }
  } catch (e) {
    console.warn("No existing data found, creating new.");
  }

  const newNotice = {
    id: Date.now(),
    title: title,
    date: date,
    content: content
  };
const pass = prompt("Enter Admin Key");
if (pass !== "GBSB4U-FOUNDER") {
  alert("Unauthorized access");
  window.location.href = "index.html";
}
  existingData.notices.unshift(newNotice); // latest on top

  const jsonString = JSON.stringify(existingData, null, 2);

  document.getElementById("output").textContent = jsonString;

  const blob = new Blob([jsonString], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json";
  link.click();
}

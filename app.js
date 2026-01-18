if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

document.getElementById("hakForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Your Hak has been submitted. (Demo Mode)");
});

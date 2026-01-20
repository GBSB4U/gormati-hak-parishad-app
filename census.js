function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      document.getElementById("latitude").value = pos.coords.latitude;
      document.getElementById("longitude").value = pos.coords.longitude;
      alert("लोकेशन सेव हो गई");
    });
  } else {
    alert("लोकेशन सपोर्ट उपलब्ध नहीं");
  }
}

document.getElementById("censusForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const issues = [];
  document.querySelectorAll('input[type="checkbox"]:checked')
    .forEach(cb => issues.push(cb.value));

  const data = {
    name: name.value,
    mobile: mobile.value,
    familyCount: familyCount.value,
    state: state.value,
    district: district.value,
    tehsil: tehsil.value,
    tanda: tanda.value,
    latitude: latitude.value,
    longitude: longitude.value,
    issues: issues,
    problem: problem.value,
    duration: duration.value,
    affected: affected.value,
    timestamp: new Date().toISOString()
  };

  console.log("FORM DATA:", data);

  alert("फॉर्म सफलतापूर्वक जमा हुआ।\nहकपरिषद द्वारा समीक्षा की जाएगी।");

  this.reset();
});

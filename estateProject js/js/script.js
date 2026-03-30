// =======================
// GET HOUSE FROM URL
// =======================
var urlParams = new URLSearchParams(window.location.search);
var houseParam = urlParams.get("house") || "Not selected";

// =======================
// EMAILJS INIT
// =======================
emailjs.init("KGrXAoAritEMy3Wos");

// =======================
// FORM SUBMISSION
// =======================
var form = document.getElementById("rentForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    var fileEl = document.getElementById("fileUpload");
    var fileName = "No file uploaded";
    if (fileEl && fileEl.files && fileEl.files[0]) {
      fileName = fileEl.files[0].name;
    }

    var data = {
      houseChoice:    houseParam,
      fullName:       document.getElementById("fullName").value,
      email:          document.getElementById("email").value,
      carType:        document.getElementById("carType").value,
      currentAddress: document.getElementById("currentAddress").value,
      phone:          document.getElementById("phone").value,
      occupation:     document.getElementById("occupation").value,
      pets:           (document.querySelector('input[name="pets"]:checked') || {}).value || "N/A",
      paymentMethod:  document.getElementById("paymentMethod").value,
      married:        (document.querySelector('input[name="married"]:checked') || {}).value || "N/A",
      brokenLease:    (document.querySelector('input[name="brokenLease"]:checked') || {}).value || "N/A",
      felony:         (document.querySelector('input[name="felony"]:checked') || {}).value || "N/A",
      numMoving:      document.getElementById("numMoving").value,
      lockout:        (document.querySelector('input[name="lockout"]:checked') || {}).value || "N/A",
      otherApplicant: document.getElementById("otherApplicant").value,
      alcohol:        (document.querySelector('input[name="alcohol"]:checked') || {}).value || "N/A",
      smoke:          (document.querySelector('input[name="smoke"]:checked') || {}).value || "N/A",
      moveDate:       document.getElementById("moveDate").value,
      suing:          (document.querySelector('input[name="suing"]:checked') || {}).value || "N/A",
      prevLandlord:   document.getElementById("prevLandlord").value,
      tenancyLength:  document.getElementById("tenancyLength").value,
      income:         document.getElementById("income").value,
      otherIncome:    document.getElementById("otherIncome").value,
      fileUpload:     fileName
    };

    // SAVE TO LOCALSTORAGE FIRST
    try {
      var apps = JSON.parse(localStorage.getItem("rentApplications") || "[]");
      if (apps.length >= 20) apps.shift();
      apps.push(data);
      localStorage.setItem("rentApplications", JSON.stringify(apps));
      console.log("Saved to localStorage");
    } catch(err) {
      console.error("localStorage error:", err);
    }

    // THEN SEND EMAIL
    emailjs.send("service_3u5ld0m", "template_1mrwsuu", data)
      .then(function() {
        alert("Application submitted successfully!");
        window.location.href = "thanks.html";
        form.reset();
      })
      .catch(function(err) {
        alert("Saved! But email failed.");
        console.error("EmailJS error:", err);
        window.location.href = "thanks.html";
        form.reset();
      });
  });
}

// LISTINGS AUTO FILL
try {
  var savedApps = JSON.parse(localStorage.getItem("rentApplications") || "[]");
  console.log("Apps in storage:", savedApps.length);

  savedApps.forEach(function(app, index) {
    var card = document.getElementById("house-" + (index + 1));
    if (card) {
      card.innerHTML =
        '<img src="images/house' + (index + 1) + '.jpg" alt="House ' + (index + 1) + '">' +
        '<h3>' + app.fullName + '</h3>' +
        '<p><strong>Email:</strong> ' + app.email + '</p>' +
        '<p><strong>Phone:</strong> ' + app.phone + '</p>' +
        '<p><strong>Income:</strong> $' + app.income + '/mo</p>' +
        '<p><strong>Move-in:</strong> ' + app.moveDate + '</p>' +
        '<p><strong>House:</strong> ' + app.houseChoice + '</p>';
    }
  });
} catch(err) {
  console.error("Listings error:", err);
}
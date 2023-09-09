var firebaseConfig = {
  apiKey: "AIzaSyBOmau3db_qSGOvepId6SJlorZQq3Naccg",
  authDomain: "solar-monitoring-110.firebaseapp.com",
  databaseURL: "https://solar-monitoring-110-default-rtdb.firebaseio.com",
  projectId: "solar-monitoring-110",
  storageBucket: "solar-monitoring-110.appspot.com",
  messagingSenderId: "468140008482",
  appId: "1:468140008482:web:958520ed9f4e419289d67b",
  measurementId: "G-G8DB9QKQHE",
};
firebase.initializeApp(firebaseConfig);

const beepSound = new Audio("beep-01a.mp3");

// Get a reference to the database service
var database = firebase.database();

// Function to update the webpage with the retrieved data
function updateData(data) {
  document.getElementById("light").innerText = data.Light + " %";
  document.getElementById("temperature").innerText = data.Temperature + " °C";
  document.getElementById("humidity").innerText = data.Humidity + " %";
  document.getElementById("current").innerText = data.Current + " mA";
  document.getElementById("voltage").innerText = data.Voltage + " V";
  document.getElementById("power").innerText = data.Power + " mW";

  if (data.Light < 20) {
    document.getElementById("sl").style.display = "flex";
  } else {
    document.getElementById("sl").style.display = "none";
  }
  if (data.Voltage < 1 && data.Light > 20) {
    document.getElementById("sc").style.display = "flex";
  } else {
    document.getElementById("sc").style.display = "none";
  }

  if (data.Current < 1 && data.Light > 20) {
    document.getElementById("oc").style.display = "flex";
  } else {
    document.getElementById("oc").style.display = "none";
  }

  if ((data.Voltage < 1 && data.Light > 20) || (data.Current < 1 && data.Light > 20)) {
    startBeep();
  } else {
    stopBeep();
  }
}

function startBeep() {
  beepSound.loop = true;
  beepSound.play();
}

function stopBeep() {
  beepSound.pause();
  beepSound.currentTime = 0;
}

// Function to listen for data changes in Firebase database
function startListening() {
  firebase
    .database()
    .ref("/Data")
    .on("value", function (snapshot) {
      var data = snapshot.val();
      updateData(data);
    });
}

// Start listening for data changes when the webpage loads
window.onload = function () {
  startListening();
};

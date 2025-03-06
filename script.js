// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase Configuration (Replace with your own Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyAcJ-CMXya5pIwRieScZkmtbooGtRekKkI",
    authDomain: "creativechitta-23080.firebaseapp.com",
    databaseURL: "https://creativechitta-23080-default-rtdb.firebaseio.com",
    projectId: "creativechitta-23080",
    storageBucket: "creativechitta-23080.firebasestorage.app",
    messagingSenderId: "619962842683",
    appId: "1:619962842683:web:c82f496009934b51e4661e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to update the displayed slider value
window.updateSliderValue = function(value) {
    document.getElementById("sliderValue").textContent = `${value}°`;
};

// Function to set the servo angle in Firebase
window.setServoAngle = function() {
    const angle = document.getElementById("servoAngle").value;
    if (angle >= 0 && angle <= 180) {
        set(ref(database, "servo/angle"), Number(angle))
            .then(() => console.log("Servo angle set to " + angle))
            .catch(error => console.log("Error: " + error.message));
    } else {
        console.log("Please enter an angle between 0 and 180!");
    }
};

// Function to read the servo angle in real-time from Firebase
const angleRef = ref(database, "servo/angle");
onValue(angleRef, (snapshot) => {
    if (snapshot.exists()) {
        document.getElementById("currentAngle").innerText = snapshot.val() + "°";
    } else {
        document.getElementById("currentAngle").innerText = "No data available";
    }
});

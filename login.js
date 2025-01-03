// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEOPGBqQQxm-CEFUp4i2K7jXlMv_Ao8C0",
  authDomain: "expensetracker-1d3fc.firebaseapp.com",
  projectId: "expensetracker-1d3fc",
  storageBucket: "expensetracker-1d3fc.firebaseapp.com",
  messagingSenderId: "158482361291",
  appId: "1:158482361291:web:9c4caf963cfda8ff19a44e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app); 

// Submit button
const submit = document.getElementById('login-btn');
submit.addEventListener("click", function(event) {
    event.preventDefault();
    
    // Inputs
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Log in successful!");
            window.location.href = "tracker.html"; 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`); 
        });
});

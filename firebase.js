<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBP39ndlacf8B2PeqDI-xNrOQEFWJRycBI",
    authDomain: "leardbord-55d8e.firebaseapp.com",
    projectId: "leardbord-55d8e",
    storageBucket: "leardbord-55d8e.firebasestorage.app",
    messagingSenderId: "755628346020",
    appId: "1:755628346020:web:00d121f294a4db4769f431",
    measurementId: "G-Y35G48SKDT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

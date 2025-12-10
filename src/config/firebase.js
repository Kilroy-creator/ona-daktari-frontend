import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeDKhSVi57QS4BzqaRvAMT8hI_TntFoKc",
  authDomain: "ona-daktari.firebaseapp.com",
  projectId: "ona-daktari",
  storageBucket: "ona-daktari.firebasestorage.app",
  messagingSenderId: "803388115508",
  appId: "1:803388115508:web:c741683a5de72198a39861",
  measurementId: "G-D8M6D1GH0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

// Use emulator in development
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export default app;
// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBKin7JaD-R8FKE5MV79XKzC5UoYksC3s8",
  authDomain: "saferide-88d4c.firebaseapp.com",
  projectId: "saferide-88d4c",
  storageBucket: "saferide-88d4c.firebasestorage.app",
//   storageBucket: "saferide-88d4c.appspot.com",  // Corrected this line
  messagingSenderId: "546030206899",
  appId: "1:546030206899:web:253da2aef6860941ce55c6",
  measurementId: "G-YCJ1B3XWXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZVf3CFcPEYPMgLSRPG8MEONHaJEjgYtw",
  authDomain: "forest-creations-c738b.firebaseapp.com",
  projectId: "forest-creations-c738b",
  storageBucket: "forest-creations-c738b.appspot.com",
  messagingSenderId: "846313686012",
  appId: "1:846313686012:web:79942ebf74688292eb2879",
  measurementId: "G-77X7SJ2QQM",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Create auth instance
export const auth = getAuth(app);

// Create a provider
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider);
};
export { signOut };

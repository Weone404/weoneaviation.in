// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDqJwOhNXnsRbSwTXIhgnfNMXU4dslGBms",
    authDomain: "test-fb763.firebaseapp.com",
    projectId: "test-fb763",
    storageBucket: "test-fb763.firebasestorage.app",
    messagingSenderId: "540874522913",
    appId: "1:540874522913:web:35b3929f4927d03c98be60",
};

// Prevent re-initializing on Next.js hot reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ── Auth helpers ──────────────────────────────────────────────

export async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
}

export async function loginWithEmail(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
}

export async function registerWithEmail(email, password) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
}

export async function logout() {
    // Clear session cookie
    await fetch("/api/auth/session", { method: "DELETE" });
    await signOut(auth);
}

// Subscribe to auth state changes — returns unsubscribe function
export function onAuth(callback) {
    return onAuthStateChanged(auth, callback);
}
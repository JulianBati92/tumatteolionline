// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-functions.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf9kPs2so_VFyMelCKXvFhEs3A4-xMbvQ",
  authDomain: "tumatteolionline.firebaseapp.com",
  projectId: "tumatteolionline",
  storageBucket: "tumatteolionline.appspot.com",
  messagingSenderId: "621581841999",
  appId: "1:621581841999:web:a0840941af57f63ee89c3a",
  measurementId: "G-WDG0ZRM9HF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export async function saveOrder(data) {
  const ordersCol = collection(db, 'orders');
  await addDoc(ordersCol, data);
}

export const functions = getFunctions(app);
export const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');


// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBsyhzThUOr7wlLGx3SYGNW21En3EMi5i4",
    authDomain: "mytwitter-39bde.firebaseapp.com",
    projectId: "mytwitter-39bde",
    storageBucket: "mytwitter-39bde.appspot.com",
    messagingSenderId: "732843233838",
    appId: "1:732843233838:web:abe8cdde1b74a64b8405bf"
  };


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
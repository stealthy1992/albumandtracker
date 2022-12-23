// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF7zks0EG0gt1glrxbYxZ3mscbYUi1jiY",
  authDomain: "image-gallery-c30ec.firebaseapp.com",
  projectId: "image-gallery-c30ec",
  storageBucket: "image-gallery-c30ec.appspot.com",
  messagingSenderId: "1057528790766",
  appId: "1:1057528790766:web:9925689942b615232cbdff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app)
const storage = getStorage(app)

export {db, storage}
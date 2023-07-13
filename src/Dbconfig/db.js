// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from 'firebase/app';
import {getFirestore
} from 'firebase/firestore';
import {getStorage} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyA0GAsh2PgKQCv98mWZlxsK0d4OEJ7M4c0",
    authDomain: "hotelapp-33937.firebaseapp.com",
    projectId: "hotelapp-33937",
    storageBucket: "hotelapp-33937.appspot.com",
    messagingSenderId: "997129004210",
    appId: "1:997129004210:web:9e8489ee5c234ccf1655ab",
    measurementId: "G-3LD8MSMR9V"
  };
  const app= initializeApp(firebaseConfig);
  export const db=getFirestore(app);
  export const storage=getStorage(app);




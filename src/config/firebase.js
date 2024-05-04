
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA0J72p8dvUZBmKP5B9sZ7ZoV3mX7Hffr0",
  authDomain: "it-sysarch32-store-heredia.firebaseapp.com",
  projectId: "it-sysarch32-store-heredia",
  storageBucket: "it-sysarch32-store-heredia.appspot.com",
  messagingSenderId: "882099312031",
  appId: "1:882099312031:web:dfa85189e8f1209a7819aa",
  measurementId: "G-WDD9GKMQ4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)



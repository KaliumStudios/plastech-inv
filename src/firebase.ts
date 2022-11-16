import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQceyBg1YS4ctBiwCTS_pNmY0sQyOtttA",
  authDomain: "plastech-inv.firebaseapp.com",
  projectId: "plastech-inv",
  storageBucket: "plastech-inv.appspot.com",
  messagingSenderId: "837325819210",
  appId: "1:837325819210:web:dfc8409aee6f9c671e05b3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

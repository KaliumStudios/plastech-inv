import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQceyBg1YS4ctBiwCTS_pNmY0sQyOtttA",
  authDomain: "plastech-inv.firebaseapp.com",
  projectId: "plastech-inv",
  storageBucket: "plastech-inv.appspot.com",
  messagingSenderId: "837325819210",
  appId: "1:837325819210:web:dfc8409aee6f9c671e05b3",
};

export async function getDefects() {
  const db = getFirestore(initializeApp(firebaseConfig));

  console.log("lol");

  const querySnapshot = await getDocs(collection(db, "defects"));
  return querySnapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
}

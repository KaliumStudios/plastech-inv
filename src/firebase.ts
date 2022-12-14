import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection as firestoreCollection,
} from "firebase/firestore";
import { collection } from "rxfire/firestore";
import { PlastechDataType } from "./utils/databaseTypes";

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
export const firestore = getFirestore(app);

export const defects = firestoreCollection(firestore, "defects");
export const production = firestoreCollection(firestore, "production");
export const inventory = firestoreCollection(firestore, "inventory");

export const productionCollection = collection(production);
export const inventoryCollection = collection(inventory);
export const defectsCollection = collection(defects);

export const gridCollections = {
  [PlastechDataType.production]: productionCollection,
  [PlastechDataType.inventory]: inventoryCollection,
  [PlastechDataType.defects]: defectsCollection,
};

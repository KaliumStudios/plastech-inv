import { FirebaseApp, initializeApp } from "firebase/app";

async function firebaseInit(): Promise<FirebaseApp> {
  const response = await fetch("/__/firebase/init.json");
  return initializeApp(await response.json());
}

export const firebaseApp = new Promise<FirebaseApp>((resolve) => {
  resolve(firebaseInit());
});

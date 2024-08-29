import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCd4_9e9hokQzglZxGLrLXZeSMkBd2pZtY",
  authDomain: "organicfitcestas-30b58.firebaseapp.com",
  projectId: "organicfitcestas-30b58",
  storageBucket: "organicfitcestas-30b58.appspot.com",
  messagingSenderId: "667649906113",
  appId: "1:667649906113:web:8b63831534a258cf258b40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp } from"firebase/app";
import { getAuth } from"firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjOv_VVKNgyLOORgSMRhUDPXsSIO4OcFQ",
  authDomain: "cestasorganicfit.firebaseapp.com",
  projectId: "cestasorganicfit",
  storageBucket: "cestasorganicfit.appspot.com",
  messagingSenderId: "284682722433",
  appId: "1:284682722433:web:3e15ed22194241803b0180"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

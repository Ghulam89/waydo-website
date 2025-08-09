import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARyZKiJ5jdPIUsN5HupJSXASIw2G_rnTw",
  authDomain: "mynextapp-ebe81.firebaseapp.com",
  projectId: "mynextapp-ebe81",
  storageBucket: "mynextapp-ebe81.firebasestorage.app",
  messagingSenderId: "1096305537053",
  appId: "1:1096305537053:web:913213f3f8a710f18d96f4",
  measurementId: "G-0534D5BGJM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
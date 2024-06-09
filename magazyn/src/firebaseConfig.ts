import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyCzlQNupt55sRfyVEZdscTr-4Ql9-kA7No",
    authDomain: "sklepksiazki-441fd.firebaseapp.com",
    databaseURL: "https://sklepksiazki-441fd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sklepksiazki-441fd",
    storageBucket: "sklepksiazki-441fd.appspot.com",
    messagingSenderId: "1027652616714",
    appId: "1:1027652616714:web:305b4e485546c1780795f3",
    measurementId: "G-90X5YF1RF6"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
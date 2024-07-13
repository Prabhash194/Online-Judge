// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCfEe8iNQZuo_0zRjgo-4Exawu-p9uq11Y",
  authDomain: "online-judge-25a0e.firebaseapp.com",
  projectId: "online-judge-25a0e",
  storageBucket: "online-judge-25a0e.appspot.com",
  messagingSenderId: "1043204563288",
  appId: "1:1043204563288:web:1980e02d5bd6915de0052d",
  measurementId: "G-GZB7WSKEB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider=new GoogleAuthProvider();
export {auth,provider};

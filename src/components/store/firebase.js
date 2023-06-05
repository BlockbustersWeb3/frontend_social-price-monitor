import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_aqjmvlLJjPHj6_07rHpctUj-VjffmEA",
  authDomain: "socialpricemonitor.firebaseapp.com",
  projectId: "socialpricemonitor",
  storageBucket: "socialpricemonitor.appspot.com",
  messagingSenderId: "284980640714",
  appId: "1:284980640714:web:797c4aff94598585922d33"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
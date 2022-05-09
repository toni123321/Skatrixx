// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage' //service, accepts the application and use the storage in the app

const firebaseConfig = {
  apiKey: "AIzaSyD9JSu7qrOO-a039OKgLSNfZr8Cc_i_usg",
  authDomain: "uploadingfile-e864d.firebaseapp.com",
  projectId: "uploadingfile-e864d",
  storageBucket: "uploadingfile-e864d.appspot.com",
  messagingSenderId: "1030848844163",
  appId: "1:1030848844163:web:7101be1b355a77e860a6b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app) //access everywhere in our app 
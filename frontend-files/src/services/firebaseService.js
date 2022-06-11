import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import {getStorage} from 'firebase/storage' //service, accepts the application and use the storage in the app;

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase 
const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app) //access everywhere in our app 

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const finishSignIn = () => {
  window.location.reload()
}

export const signInWithGoogle = async () => {
  await auth.signInWithPopup(provider)
  setTimeout(() => {
    finishSignIn()
  }, 500);
}
export default firebase;
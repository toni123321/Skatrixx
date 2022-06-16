import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import {getStorage} from 'firebase/storage' //service, accepts the application and use the storage in the app;

var environment = process.env

// Firebase Config
const firebaseConfig = {
  apiKey: environment.REACT_APP_FIREBASE_API_KEY,
  authDomain: environment.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: environment.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: environment.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: environment.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: environment.REACT_APP_FIREBASE_APP_ID,
  measurementId: environment.REACT_APP_FIREBASE_MEASUREMENT_ID
};

console.log(process.env.FIREBASE_API_KEY)

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
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import {getStorage} from 'firebase/storage' //service, accepts the application and use the storage in the app;

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDTkCkGpdK-_bYWHPv9jas1WNvw3gYbsj8",
  authDomain: "skatrixx2-3f452.firebaseapp.com",
  projectId: "skatrixx2-3f452",
  storageBucket: "skatrixx2-3f452.appspot.com",
  messagingSenderId: "421567122012",
  appId: "1:421567122012:web:230bd02dadfdb12e63b499",
  measurementId: "G-97GHQW9WF2"
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
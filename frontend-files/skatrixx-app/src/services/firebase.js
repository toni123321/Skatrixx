import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCadauMqTk6KDL18v0gfYEyrMPFeadTIyM",

  authDomain: "skatrixx-8f268.firebaseapp.com",

  projectId: "skatrixx-8f268",

  storageBucket: "skatrixx-8f268.appspot.com",

  messagingSenderId: "1017155773610",

  appId: "1:1017155773610:web:3e64f1ab1e7097c507dcd3",

  measurementId: "G-NCCCTV8NV6"

};

// Initialize Firebase 
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
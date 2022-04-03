import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCadauMqTk6KDL18v0gfYEyrMPFeadTIyM",

//   authDomain: "skatrixx-8f268.firebaseapp.com",

//   projectId: "skatrixx-8f268",

//   storageBucket: "skatrixx-8f268.appspot.com",

//   messagingSenderId: "1017155773610",

//   appId: "1:1017155773610:web:3e64f1ab1e7097c507dcd3",

//   measurementId: "G-NCCCTV8NV6"

// };

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
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const finishSignIn = () => {
  window.location.reload()
}

export const signInWithGoogle = async () => {
  await auth.signInWithPopup(provider)
  finishSignIn()
}
export default firebase;
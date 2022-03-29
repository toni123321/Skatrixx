import React from 'react';

import { auth } from '../services/firebase'


const Success = ({ user }) => {

const signout = () => {
    console.log("Click")
    auth.signOut()
}
  return (
    <div className="welcome-message">
      <h1>Hello, <span></span>{user.displayName}</h1>
      <img src={user.photoURL} alt="" />
      <button onClick={signout}>Sign out</button>
    </div>  
  )
}

export default Success;
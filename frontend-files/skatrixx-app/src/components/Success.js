import React from 'react';

import { auth } from '../services/firebase'


const Success = ({ user }) => {

const signout = () => {
    console.log("Click")
    localStorage.removeItem("userId")
    localStorage.removeItem("profileURL")
    auth.signOut()

}
  return (
    <div className="welcome-message-sign-out">
      <button onClick={signout}>Sign out</button>
    </div>  
  )
}

export default Success;

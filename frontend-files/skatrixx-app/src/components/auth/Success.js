import React from 'react';
import { auth } from '../../services/firebaseService'
import LogOut from "../../images/Logout.png"

const Success = ({ user }) => {

const signout = () => {
    console.log("Click")
    localStorage.removeItem("userId")
    localStorage.removeItem("profileURL")
    auth.signOut()

}
  return (
    <div className="welcome-message-sign-out">
      <img src={LogOut} onClick={signout} id="logout" alt='' /> 
    </div>  
  )
}

export default Success;

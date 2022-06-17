import {React, useEffect} from 'react'
import Login from '../auth/Login'
import '../../stylesheets/auth/LogInScreen.css'

import backgroundImage from '../../images/background_image.png'
import Logo from '../../images/logo-06.png'
import firebase from '../../services/firebaseService'
import { url } from '../../services/friendsConnectionService'
import axios from 'axios'

function LogInScreen() {

    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        validateUser(user.displayName,user.photoURL,user.email)
      })
    }, [])


    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {},
        };

    const validateUser = async (displName,photoURL,email) =>{

        axios.get(`${url}users/search/${displName}`)
            .then((response) => {
                    if (response.status === 200) {    
                        const obj=Object.assign({}, response.data)
                        if( Object.keys(obj).length !== 0){   
                        localStorage.setItem("userId",obj[0]._id)
                            if(localStorage.getItem("userId")!==null){
                                localStorage.setItem("profileURL",photoURL)
                            } 
                        }
                        else{
                           axios
                            .post(`${url}users`, JSON.stringify({
                                username: displName,
                                email: email,
                                password: "",
                                image : photoURL,
                                level: "beginner",
                                xp : 0,
                           }),config)
                             .then((response) => {
                                 if(response.status===201){
                                    localStorage.setItem("userId",response.data._id)
                                 }
                            });
                    }                          
            }    
            });    

      }
  return (
    <div>
      <img id='background-image' src={backgroundImage} alt=''/>
      <div id="log-container">
        <h1>Skatrixx</h1>
      <form className="logInForm">
        <div className="inputs">
        <label for="pwd"><i class="fa-regular fa-envelope"></i></label>
        <input type="email" id="email" name="email" placeholder='Email address'></input>
        </div>
        <br></br>
        <div className="inputs">
        <label for="pwd"><i class="fa-solid fa-lock"></i></label>
        <input type="password" id="pwd" name="pwd" placeholder='Password'></input>
        </div>
      </form>
      <p id="fpas">Forgot password? <a href='' className="links">Recover here</a></p>
      <button id="log">Log In</button>
      <p id="acount">Don't have an account? <a href='' className="links">Register here</a> </p>
      <div id="option">
        <hr id="leftLine"></hr>
        <p id="or">OR</p>
        <hr id="rightLine"></hr>
      </div>
        <Login/>
      </div>
     
    </div>
  )
}

export default LogInScreen
import {React, useState, useEffect} from 'react'
import Login from './Login'
import '../stylesheets/LogInScreen.css'

import backgroundImage from '../images/background_image.png'
import firebase from '../services/firebase'
import { url } from '../services/connection'
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
        <Login/>
    </div>
  )
}

export default LogInScreen
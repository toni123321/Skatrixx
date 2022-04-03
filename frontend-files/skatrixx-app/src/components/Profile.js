import {React, useState, useEffect} from 'react'
import axios from 'axios'

import "../stylesheets/Profile.css"
import LogIn from "./Login"
import Success from './Success'
import firebase from '../services/firebase'
import { url } from '../services/connection'

import userTabImg from "../images/Person.png"
import friendTabImg from "../images/Friends.png"
import skateTabImg from "../images/Skateboard.png"
import defaultImg from "../images/default-image.png"

import ProgressBar from './ProgressBar'
import ProfileRankings from './ProfileRankings'
import Achievements from './Achievements'
import FriendList from './FriendList'
import Gallery from './Gallery'

function Profile(props) {

    const [openedTab, setOpenedTab] = useState('Me');
    

    const handleTabChange = (tab) => {
        if(tab === 'Me') {
            document.getElementById('tabs-me').style.backgroundColor = '#CF2121';
            document.getElementById('tabs-friends').style.backgroundColor = '#1E1E1E';
            document.getElementById('tabs-gallery').style.backgroundColor = '#1E1E1E';
            setOpenedTab('Me')
        }
        else if(tab === 'Friends') {
            document.getElementById('tabs-me').style.backgroundColor = '#1E1E1E';
            document.getElementById('tabs-friends').style.backgroundColor = '#CF2121';
            document.getElementById('tabs-gallery').style.backgroundColor = '#1E1E1E';
            setOpenedTab('Friends')
        }
        else if(tab === 'Gallery') {
            document.getElementById('tabs-me').style.backgroundColor = '#1E1E1E';
            document.getElementById('tabs-friends').style.backgroundColor = '#1E1E1E';
            document.getElementById('tabs-gallery').style.backgroundColor = '#CF2121';
            setOpenedTab('Gallery')
        }
    }

    const [user, setUser] = useState(null)
    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {

         console.log(user)
          setUser(user)
          validateUser(user.displayName,user.photoURL,user.email)
          
      })
    }, [])

    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {},
        };

    const validateUser = (displName,photoURL,email) =>{

        axios.get(`${url}users/search/${displName}`)
            .then((response) => {
                    if (response.status === 200) {    
                        console.log(response.data)
                        const obj=Object.assign({}, response.data)
                        if( Object.keys(obj).length != 0){   
                        localStorage.setItem("userId",obj[0]._id)
                            // if(localStorage.getItem("userId")!==null){
                            //     localStorage.setItem("profileURL",photoURL)
                            // }  /---- POD VUPROS :) ----\
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
   

    const displayOpenedTab = () => {
        if(openedTab === 'Me') {
            return(
                <div className='me-tab'>
                    <ProfileRankings/>
                    <Achievements/>
                </div>
            )
        }
        else if(openedTab === 'Friends') {
            return(
                <div className='friends-tab'>
                    <FriendList/>
                </div>
            )
        }
        else if(openedTab === 'Gallery') {
            return(
                <div className='gallery-tab'>
                    <Gallery/>
                </div>
            )
        }
    }

    return (
        <div className='profile'>
            <div id='profile-card'>
                <img src={props.img !== undefined ? props.img : defaultImg} alt='' />
                <div id='additional-information'>
                <p>{props.name}</p>
                    <ProgressBar level={props.level} xp={props.xp}/>
                </div>
            </div>
            <div id='tabs'>
                <button onClick={() => {handleTabChange('Me')}} id='tabs-me'>
                    <img src={userTabImg} alt=''/>
                </button>
                <button onClick={() => {handleTabChange('Friends')}} id='tabs-friends'>
                    <img src={friendTabImg}alt=''/>
                </button>
                <button onClick={() => {handleTabChange('Gallery')}} id='tabs-gallery'>
                <img src={skateTabImg}alt=''/>
                </button>
                {user ? <Success user={user}/>  : <LogIn/>}
            </div>
<br/>
            {displayOpenedTab()}
        </div>
    )
}

export default Profile

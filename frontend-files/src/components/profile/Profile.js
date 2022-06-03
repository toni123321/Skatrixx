import {React, useState} from 'react'

import "../../stylesheets/profile/Profile.css"

import userTabImg from "../../images/Person.png"
import friendTabImg from "../../images/Friends.png"
import skateTabImg from "../../images/Skateboard.png"
import defaultImg from "../../images/default-image.png"

import ProgressBar from '../profile/ProgressBar'
import Success from '../auth/Success'
import ProfileRankings from '../profile/ProfileRankings'
import Achievements from '../achievements/Achievements'
import FriendList from '../friends/FriendList'
import Gallery from '../gallery/Gallery'
import CameraComponent from '../gallery/CameraComponent'

function Profile(props) {

    const [openedTab, setOpenedTab] = useState('Gallery');

    const handleTabChange = (tab) => {
        let tabs = ['Me', 'Friends', 'Gallery']
        tabs.includes(tab) ? setOpenedTab(tab) : setOpenedTab('')
        
    }

    const displayOpenedTab = () => {
        if(openedTab === 'Me') {
            return(
                <div className='me-tab'>
                    <ProfileRankings/>
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
             <Success className='log-out'/>
            <div id='profile-card'>
                <img src={props.img !== undefined ? props.img : defaultImg}  referrerPolicy='no-referrer' alt='' id="profile-image" />
                <div id='additional-information'>
                <p>{props.name}</p>
                    <ProgressBar level={props.level} xp={props.xp}/>
                </div>
            </div>
            <div id='tabs'>
                <p  id='tabs-gallery'  
                    class={openedTab === "Gallery"? "openedTab" : ""}
                    onClick={() => {handleTabChange('Gallery')}} >Gallery</p>
                <p  id='tabs-me' 
                    class={openedTab === "Me"? "openedTab" : ""}
                    onClick={() => {handleTabChange('Me')}}>Profile</p>
                <p  id='tabs-friends'
                    class={openedTab === "Friends"? "openedTab" : ""}
                    onClick={() => {handleTabChange('Friends')}}>Friends</p>
            </div>
            <br/>
            {displayOpenedTab()}
        </div>
    )
}

export default Profile

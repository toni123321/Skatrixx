import {React, useState} from 'react'

import "../stylesheets/Profile.css"

import userTabImg from "../images/Person.png"
import friendTabImg from "../images/Friends.png"
import skateTabImg from "../images/Skateboard.png"
import defaultImg from "../images/default-image.png"

import ProgressBar from './ProgressBar'
import Success from './Success'
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
             <Success className='log-out'/>
            <div id='profile-card'>
                <img src={props.img !== undefined ? props.img : defaultImg} alt='' id="profile-image" />
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
            </div>
<br/>
            {displayOpenedTab()}
        </div>
    )
}

export default Profile

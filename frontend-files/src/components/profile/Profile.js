import {React, useState} from 'react'
import "../../stylesheets/profile/Profile.css"
import defaultImg from "../../images/default-image.png"
import Success from '../auth/Success'
import ProfileRankings from '../profile/ProfileRankings'
import FriendList from '../friends/FriendList'
import Gallery from '../gallery/Gallery'

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
                <p>{props.name && props.name.split(' ')[0]}</p>
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

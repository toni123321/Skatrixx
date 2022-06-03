import React, { useState, useEffect } from 'react'
import { getUserConnections } from '../../services/userService'
import '../../stylesheets/lobby/InviteToLobby.css'
import InviteFriendContainer from '../friends/InviteFriendContainer'

function InviteToLobby(props) {

    const [friends, setFriends] = useState(undefined)

    const loadFriends = async () => {
        setFriends(await getUserConnections())
      }

      useEffect(() => {
        loadFriends()
      }, [])


  return (
    <div className='invite-popup'>
        
          
          <i onClick={props.close} class="fa-solid fa-xmark"></i>
          <p id="popup-title">Add new friend</p>
        {friends && friends.map(friend => (
            <InviteFriendContainer connection={friend} lobby={props.lobby}/>
        ))}
    </div>
  )
}

export default InviteToLobby
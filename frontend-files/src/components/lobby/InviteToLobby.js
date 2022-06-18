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
    <div id="invite-popup" className='popup-container'>
          <i onClick={props.close} class="fa-solid fa-xmark"></i>
          <p id="popup-title">Invite a friend</p>
          <div className='invite-popup-list'>
            {friends && friends.map(friend => (
              <InviteFriendContainer connection={friend} lobby={props.lobby}/>
            ))}
          </div>
    </div>
  )
}

export default InviteToLobby
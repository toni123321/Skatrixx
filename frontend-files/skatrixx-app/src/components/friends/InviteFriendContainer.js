import React, { useEffect, useState } from 'react'
import { friendInvited } from '../../App';
import { loggedUser } from '../../services/api_client';
import { inviteFriend } from '../../services/lobbyService';
import { getUser } from '../../services/userService';

import '../../stylesheets/friends/InviteFriendContainer.css'

function InviteFriendContainer(props) {

    const [friend, setFriend] = useState();

    const loadFriend = async () => {
      if(loggedUser !== props.connection.sender_id) {
        setFriend(await getUser(props.connection.sender_id))
      }
      else {setFriend(await getUser(props.connection.reciever_id))}
    }

    const sendInvite = async () => {
        if(inviteFriend(props.lobby._id, friend._id) !== null) {
            friendInvited(friend.username)
        }
    }
  
    useEffect(() => {
      loadFriend()
    }, [])

    if(friend !== undefined) {
        return (
            <div className='invite-friend-container'>
                <img id='invite-friend-image' src={friend.image} alt=''/>    
                <p id='invite-friend-username'>{friend.username}</p>    
                <i className="fa-solid fa-user-plus" onClick={sendInvite}></i>   
            </div>
          )
    }
    else {return(<>Loading..</>)}
}

export default InviteFriendContainer
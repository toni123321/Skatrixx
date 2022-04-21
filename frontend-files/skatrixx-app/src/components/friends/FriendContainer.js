import React, { useState, useEffect } from 'react'

import "../../stylesheets/friends/FriendList.css"
import backgroundImg from  "../../images/skate1 2.png"
import defaultImg from "../../images/default-image.png"
import { loggedUser } from '../../services/api_client'
import { getUser} from '../../services/userService';
import { acceptFriendRequest, cancelFriendRequest } from '../../services/friendsConnectionService';
import {friendRequsetAccepted, friendRequsetCancelled } from '../../App';
 
function FriendContainer(props) {

  const [friend, setFriend] = useState();

  const loadFriend = async () => {
    if(loggedUser !== props.connection.sender_id) {
      setFriend(await getUser(props.connection.sender_id))
    }
    else {setFriend(await getUser(props.connection.reciever_id))}
  }

  useEffect(() => {
    loadFriend()
  }, [])

  const handleCancelRequest = async () => {
      await cancelFriendRequest(props.connection._id)
      window.location.reload();
      friendRequsetCancelled();
  }

  const handleAcceptRequest = async () => {
    await acceptFriendRequest(props.connection._id)
    window.location.reload();
    friendRequsetAccepted();
  }
  
  if(friend !== undefined) {
  return (
    <div className='friend-container'>
      {props.connection.accepted ? '' : 
            <div className='pending-request'>
              {props.connection.sender_id === loggedUser ? 
              <div id='waiting-request'>
                <p>Pending...</p>
                <button id='deny-request-button' onClick={handleCancelRequest}><i className="fa-solid fa-circle-xmark"></i></button>
              </div> : 
              <div id='accept-request'>
                <button id='accept-request-button' onClick={handleAcceptRequest}><i className="fa-solid fa-circle-check"></i></button>
                <button id='deny-request-button' onClick={handleCancelRequest}><i className="fa-solid fa-circle-xmark"></i></button>
              </div>}
            </div>}
        <div id='friend-info'>
            <img id='friend-img' src={friend.image !== undefined ? friend.image : defaultImg} alt=''/>
            <p id='friend-name'>{friend.username}</p>
        </div>
        <img id='bg-img' src={backgroundImg} alt=''/>
    </div>
  )
  }
  return (<></>)
}

export default FriendContainer
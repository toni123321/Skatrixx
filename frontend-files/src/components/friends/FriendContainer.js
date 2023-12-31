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
    <div className='friend-container container-border'>
              <div className='default-container'></div>
      {props.connection.accepted ? '' : 
            <div className='pending-request'>
              {props.connection.sender_id === loggedUser ? 
              <div id='waiting-request'>
                <i className="fa-solid fa-circle-xmark" id='deny-request-button' onClick={handleCancelRequest}></i>
              </div> : 
              <div id='accept-request'>
                <i className='fa-solid fa-circle-check' id='accept-request-button' onClick={handleAcceptRequest}></i>
                <i className="fa-solid fa-circle-xmark" id='deny-request-button' onClick={handleCancelRequest}></i>
              </div>}
            </div>}
        <div id='friend-info'>
            <img id='friend-img' src={friend.image !== undefined ? friend.image : defaultImg} alt=''/>
            <p id='friend-name'>{!props.connection.accepted ? "Pending..." : friend.username.split(' ')[0]}</p>
        </div>
    </div>
  )
  }
  return (<></>)
}

export default FriendContainer
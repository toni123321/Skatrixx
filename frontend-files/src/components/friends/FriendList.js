import React, { useState, useEffect } from 'react'
import { getUserConnections } from '../../services/userService';

import "../../stylesheets/friends/FriendList.css"
import AddFriendPopUp from './AddFriendPopUp';
import FriendContainer from './FriendContainer';
import addFriend from "../../images/Add User Group Man Man.png"
import Loading from '../Loading';

function FriendList(props) {

  const [friends, setFriends] = useState([]);
  const [addFriendPopup, setAddFriendPopup] = useState(false);

  const loadFriends = async () => {
    setFriends(await getUserConnections())
  }

  useEffect(() => {
    loadFriends()
  }, [])
  

  const toggleAddFriendPopup = (state) => {
    setAddFriendPopup(state);
  } 

  return (
    <div className='friend-list'>
      <div id="add-container">
      <div onClick={() => {toggleAddFriendPopup(true)}} id='add-friend'><p>Add</p></div>
      </div>
      {friends.length > 0 ? friends.map(friend=> (
            <FriendContainer connection={friend}/>
        )) : <Loading/>}
        {addFriendPopup ? <AddFriendPopUp open={toggleAddFriendPopup}/> : ''}
    </div>
  )
}

export default FriendList;

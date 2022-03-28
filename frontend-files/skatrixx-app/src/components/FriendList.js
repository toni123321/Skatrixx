import React, { useState, useEffect } from 'react'
import { getUserConnections } from '../services';

import "../stylesheets/FriendList.css"
import AddFriendPopUp from './AddFriendPopUp';
import FriendContainer from './FriendContainer';

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
      <div onClick={() => {toggleAddFriendPopup(true)}} id='add-friend'>+</div>
      {friends !== undefined ? friends.map(friend=> (
            <FriendContainer connection={friend}/>
        )) : ''}
        {addFriendPopup ? <AddFriendPopUp open={toggleAddFriendPopup}/> : ''}
    </div>
  )
}

export default FriendList;

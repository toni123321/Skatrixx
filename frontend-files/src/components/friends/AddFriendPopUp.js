import React, { useState } from 'react'

import "../../stylesheets/friends/AddFreindPopUp.css";

import QrIcon from "../../images/qr.png"
import {sendFriendRequestByUsername } from '../../services/friendsConnectionService';
import { searchUserByUsername } from '../../services/userService'
import { friendRequestSent } from '../../App';
import AddWithQR from './AddWithQR';

function AddFriendPopUp(props) {

  const [addOption, setAddOption] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const changeAddOption = (option) => {
    setAddOption(option);
  }

  const handleSearchByUsername = async (e) => {
      if(e.target.value.length > 2) {
          setSearchResults(await searchUserByUsername(e.target.value))
      }
      if(e.target.value.length === 0) {setSearchResults([])}
  }

  const handleSendFriendRequest = async (username) => {
    if(sendFriendRequestByUsername(username) !== null) {
      friendRequestSent()
    }
  }


  const loadAddFriened = () => {
    if (addOption === '') {
      return (
        <div>
          <div className='username' onClick={() => { changeAddOption('username') }}>
            <i className='fas fa-user-alt'></i>
            <p>Add with Username</p>
          </div>
          <div id='line'></div>
          <div className='qr' onClick={() => { changeAddOption('qr') }}>
            <img src={QrIcon} alt='' />
            <p>Add with QR</p>
          </div>
        </div>
      )
    }
    else if (addOption === 'username') {
      return (
        <div className='search-username'>
          <div onClick={() => {changeAddOption('')}} id='back'><p>&lt;</p></div>
          <div className='search-form'>
            <input type='text'  onChange={handleSearchByUsername}/>
            <div className='search-results'>
              {searchResults.length > 0 ? searchResults.map(result => (
                <div key={result._id} className='search-result' onClick={() => {handleSendFriendRequest(result.username)}}>
                  <img src={result.image} alt=''/>
                  <p>{result.username}</p>
                  <i className="fa-solid fa-user-plus"></i>
                </div>
              )): ''}
            </div>
          </div>
        </div>
      )
    }
    else if (addOption === 'qr') {
      return (
        <AddWithQR changeAddOption={changeAddOption}/>
      )
    }
  }

  return (
    <div className='add-friend-popup'>
      <p onClick={() => { props.open(false) }} id='close'>X</p>
      <div id='options'>
        {loadAddFriened()}
      </div>
    </div>
  )
}

export default AddFriendPopUp
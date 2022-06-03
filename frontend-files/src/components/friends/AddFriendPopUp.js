import React, { useState } from 'react'

import "../../stylesheets/friends/AddFreindPopUp.css";

import QrIcon from "../../images/qr.png"
import {sendFriendRequestByUsername } from '../../services/friendsConnectionService';
import { searchUserByUsername } from '../../services/userService'
import { friendRequestSent } from '../../App';
import AddWithQR from './AddWithQR';
import searchIcon from '../../images/Search.png';
import { seededRandom } from 'three/src/math/MathUtils';

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
      <div id="title-container">
      <p id="title-add">Add a friend by <i>name</i> or <i>QR</i></p>
      {/* <div onClick={() => {changeAddOption('')}} id='back'><p>   <i class="fa-solid fa-angle-left"></i></p></div> */}
      </div>
    
         <div id="modal-container">
           <div className='search-form'>
              <div className='search-username'>
                  <input type='text'  onChange={handleSearchByUsername} placeholder="username"/>
                  <img src={searchIcon} id="search" alt=""></img>
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
          <div className='qr' onClick={() => { changeAddOption('qr') }}>
            <img src={QrIcon} alt='' />
          </div>
        </div>   
</div>
      )
    }
    // else if (addOption === 'username') {
    //   return (
      
    //   )
    // }
    else if (addOption === 'qr') {
      return (
        <AddWithQR changeAddOption={changeAddOption}/>
      )
    }
  }

  return (
    <div className='add-friend-popup'>
      <p onClick={() => { props.open(false) }} id='close'><i class="fa-solid fa-xmark"></i></p>
      <div id='options'>
        {loadAddFriened()}
      </div>
    </div>
  )
}

export default AddFriendPopUp
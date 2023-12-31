import React, { useState } from 'react'

import "../../stylesheets/friends/AddWithQR.css"

import QRCode from "react-qr-code";
import { QrReader } from 'react-qr-reader';

import { loggedUser } from '../../services/api_client';
import { sendFriendRequestQR } from '../../services/friendsConnectionService';
import { friendRequestSent } from '../../App';

function AddWithQR(props) {

    const [qrTab, setQrTab] = useState('my');
    var constraints={facingMode : 'environment'}




    const handleTabChange = (tab) => {
      var my = document.getElementById('qr-tabs-my')
      var scan = document.getElementById('qr-tabs-scan')
      if(tab === 'my') {
          my.style.borderColor = '#219EBC'
          scan.style.borderColor = 'transparent'
          
      }
      else if (tab === 'scan') {
          scan.style.borderColor = '#219EBC'
          my.style.borderColor = 'transparent'
         
      }
      setQrTab(tab);
    }

    const addFriendWithQR = (id) => {
      sendFriendRequestQR(id);
      friendRequestSent()
    }

    const displayQRTabs = () => {
      if(qrTab === 'my') {
        return (
          <div className='my-qr-tab'>
            <QRCode size={256} className='qr-code' value={loggedUser} bgColor={"#CF2121"}/>
          </div>
        )
      }
      else if (qrTab === 'scan') {
        return (
          <div className='scan-qr-tab'>
            <QrReader className='qr-code-reader' constraints={constraints}
        onResult={(result, error) => {
          if (!!result) {
            addFriendWithQR(result?.text);
          }
        }}
      />
          </div>
        )
      }
    }

  return (
    <div className='add-with-qr'>
      <div onClick={() => {props.changeAddOption('')}} id='back'>  <p><i class="fa-solid fa-angle-left"></i></p></div>
        <div className='qr-tabs'>
          <button className='default-button' onClick={() => {handleTabChange('my')}} id='qr-tabs-my'>MY CODE</button>
          <button className='default-button' onClick={() => {handleTabChange('scan')}} id='qr-tabs-scan'>SCAN CODE</button>
        </div>
        {displayQRTabs()}
    </div>
  )
}

export default AddWithQR
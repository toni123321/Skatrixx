import React, { useState } from 'react'

import "../stylesheets/AddWithQR.css"

import QRCode from "react-qr-code";
import { QrReader } from 'react-qr-reader';

import { loggedUser, sendFriendRequestQR } from '../services';
import { friendRequestSent } from '../App';

function AddWithQR(props) {

    const [qrTab, setQrTab] = useState('my');
    var constraints={facingMode : 'environment'}




    const handleTabChange = (tab) => {
      var my = document.getElementById('qr-tabs-my')
      var scan = document.getElementById('qr-tabs-scan')
      if(tab === 'my') {
          my.style.backgroundColor = '#CF2121'
          scan.style.backgroundColor = '#1E1E1E'
      }
      else if (tab === 'scan') {
          scan.style.backgroundColor = '#CF2121'
          my.style.backgroundColor = '#1E1E1E'
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
      <div onClick={() => {props.changeAddOption('')}} id='back'><p>&lt;</p></div>
        <div className='qr-tabs'>
          <button onClick={() => {handleTabChange('my')}} id='qr-tabs-my'>MY CODE</button>
          <button onClick={() => {handleTabChange('scan')}} id='qr-tabs-scan'>SCAN CODE</button>
        </div>
        {displayQRTabs()}
    </div>
  )
}

export default AddWithQR
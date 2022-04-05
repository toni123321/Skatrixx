import React, { useState, useEffect } from 'react'
import "../stylesheets/LobbyMembers.css"

import LobbyParticipant from './LobbyParticipant'

function LobbyMembers(props) {
  if(props.members !== undefined) {
  return (
    <div className='lobbyMembers'>
        <button id='invite-to-lobby-button'>+</button>
        <div id='lobby-member-list'>
          {props.members.map(member => (
              <LobbyParticipant member={member}/>
          ))}
        </div>
    </div>
  )
}
else{return (<>test</>)}
}

export default LobbyMembers
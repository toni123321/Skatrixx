import React, { useState, useEffect } from 'react'
import "../stylesheets/LobbyMembers.css"

import loggedUser from "../services/api_client"
import LobbyParticipant from './LobbyParticipant'

function LobbyMembers() {

    const [lobbyMembers, setLobbyMembers] = useState([])

    useEffect(() => {
        console.log(loggedUser)
        let arr = []
        arr.push(loggedUser)
      setLobbyMembers(arr)
    }, [])
    

  return (
    <div className='lobbyMembers'>
        <button id='invite-to-lobby-button'>+</button>
        {lobbyMembers.map(member => (
            <LobbyParticipant member={member}/>
        ))}
    </div>
  )
}

export default LobbyMembers
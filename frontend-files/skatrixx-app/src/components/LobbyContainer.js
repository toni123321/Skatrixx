import React, { useState, useEffect } from 'react'
import { getUser } from '../services/user'

import '../stylesheets/LobbyContainer.css'

function LobbyContainer(props) {

    const [lobbyLeader, setLobbyLeader] = useState({})
    const [secondLobbyLeader, setSecondLobbyLeader] = useState({})
    const [thirdLobbyLeader, setThirdLobbyLeader] = useState({})

    const loadLobbyLeader = async () => {
        setLobbyLeader(await getUser(props.lobby.members[0]))
        if(Object.keys(props.lobby.members).length === 2) {
            setSecondLobbyLeader(await getUser(props.lobby.members[1]))
        }
        if(Object.keys(props.lobby.members).length > 2) {
            setThirdLobbyLeader(await getUser(props.lobby.members[2]))
        }
    }

    useEffect(() => {
      loadLobbyLeader()
    })
    

  return (
    <div className='lobby-container'>
        <div id='lobby-container-information'>
          <p id='lobby-container-owner'>{lobbyLeader.username}'s lobby {Object.keys(props.lobby.members).length}/{props.lobby.limit}</p>
          <div id='lobby-container-images'>
            <img id='lobby-container-image' src={lobbyLeader.image} alt=''/>
            <img id='lobby-container-image' src={secondLobbyLeader.image} alt=''/>
            {thirdLobbyLeader !== undefined ? <img id='lobby-container-image' src={thirdLobbyLeader.image} alt=''/> : ''}
            <p>+4</p>
        </div>
        <div id='lobby-container-controls'>
          <button id='lobby-container-join'>Join</button>
        </div>
        </div>
    </div>
  )
}

export default LobbyContainer
import React, { useState, useEffect } from 'react'
import { getLobbies, joinLobby } from '../../services/lobbyService'
import LobbyContainer from './LobbyContainer'
import '../../stylesheets/lobby/JoinSkateLobby.css'

function JoinSkateLobby() {

  const [lobbies, setLobbies] = useState([])

  const loadLobbies = async () => {
    setLobbies(await getLobbies())
  }

  useEffect(() => {
    loadLobbies()
  }, [])
  

  return (
    <div className='join-skate-lobby'>
        <div id='public-skate-lobbies'>
        {lobbies.map(lobby => (
            <LobbyContainer lobby={lobby}/>
        ))}
        </div>
    </div>
  )
}

export default JoinSkateLobby
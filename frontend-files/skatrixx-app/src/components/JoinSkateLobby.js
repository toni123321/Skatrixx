import React, { useState, useEffect } from 'react'
import { getLobbies } from '../services/lobby'
import LobbyContainer from './LobbyContainer'
import '../stylesheets/JoinSkateLobby.css'

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
        <div id='join-lobby-code'>
          <input type={'text'}/>
          <button id='lobby-container-join-button'>Join</button>
        </div>
    </div>
  )
}

export default JoinSkateLobby
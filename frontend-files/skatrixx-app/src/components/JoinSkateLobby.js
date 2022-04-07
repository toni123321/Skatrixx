import React, { useState, useEffect } from 'react'
import { getLobbies, joinLobby } from '../services/lobby'
import LobbyContainer from './LobbyContainer'
import '../stylesheets/JoinSkateLobby.css'
import { faCode } from '@fortawesome/free-solid-svg-icons'

function JoinSkateLobby() {

  const [lobbies, setLobbies] = useState([])
  const [lobbyCode, setLobbyCode] = useState('')

  const loadLobbies = async () => {
    setLobbies(await getLobbies())
  }

  const handleCodeChange = (e) => {
      setLobbyCode(e.target.value)
  }

  const joinLobbyWithCode = async () => {
    if(lobbyCode.length === 6) {
      await joinLobby(lobbyCode, localStorage.getItem('userId'))
    }
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
          <input type={'text'} onChange={handleCodeChange}/>
          <button id='lobby-container-join-button' onClick={() => {joinLobbyWithCode()}}>Join</button>
        </div>
    </div>
  )
}

export default JoinSkateLobby
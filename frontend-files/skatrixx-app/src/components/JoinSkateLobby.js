import React, { useState, useEffect } from 'react'
import { getLobbies } from '../services/lobby'
import LobbyContainer from './LobbyContainer'

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
        {lobbies.map(lobby => (
          <div>
            <LobbyContainer lobby={lobby}/>
          </div>
        ))}
    </div>
  )
}

export default JoinSkateLobby
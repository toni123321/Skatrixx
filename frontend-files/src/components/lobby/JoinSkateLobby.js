import React, { useState, useEffect } from 'react'
import { getLobbies, joinLobby } from '../../services/lobbyService'
import LobbyContainer from './LobbyContainer'
import '../../stylesheets/lobby/JoinSkateLobby.css'
import CityMap from '../Location/CityMap'
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { acceptInvite } from '../../websockets/lobbyWS'
import { lobbyNotFound } from '../../App'

function JoinSkateLobby() {

  const [mapmode, setMapmode] = useState('Join')

  const handleMapmode = (mapmode) => {
      setMapmode(mapmode)
  }

  const loadMapmode = () => {
    if (mapmode === 'Join') {
      return ( <div className='join-skate-lobby'>
      <div className='cityMapButton' onClick={() => {handleMapmode('Map')}}>
      {/* <Route component={CityMap} /> */}
        <p className='cityMapTitle'>City Map</p>
        <i className="fa-solid fa-arrow-right-long fa-lg"></i>
      </div>
        <div id='public-skate-lobbies'>
        {lobbies.map(lobby => (
            <LobbyContainer lobby={lobby}/>
        ))}
        </div>
        <div id='join-lobby-code'>
          <input type={'text'} onChange={handleCodeChange}/>
          <button id='lobby-container-join-button' onClick={() => {joinLobbyWithCode()}}>Join</button>
        </div>
    </div>)
    } else if (mapmode === "Map"){
      return ( <CityMap/>)
    }
  }


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
      const resp = await joinLobby(lobbyCode, localStorage.getItem('userId'))
      if(resp) {acceptInvite()}
      else {lobbyNotFound()}
      }
    }

  useEffect(() => {
    loadLobbies()
  }, [])
  

  return (
    <>{loadMapmode()}</>
  
  )
}

export default JoinSkateLobby
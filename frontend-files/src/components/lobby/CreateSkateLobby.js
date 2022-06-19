import React, { useState, useEffect } from 'react'
import { changeVisibility, createLobby, kickPlayer, startLobby } from '../../services/lobbyService';
import { socket } from '../../websockets/ws_client';

import "../../stylesheets/lobby/CreateSkateLobby.css"

import LobbyMembers from './LobbyMembers';
import { loggedUser } from '../../services/api_client';
import Loading from '../Loading';
import { kicked, startGameRedirect, startLobbyWS } from '../../websockets/lobbyWS';

function CreateSkateLobby() {

    const [lobby, setLobby] = useState({})
    
    const loadContent = async () => {
       setLobby(await createLobby(localStorage.getItem('userId')))
    }

    const startButtonClicked = () => {
        if(loggedUser === lobby.members[0]) {
            startLobby(lobby)
            startLobbyWS(lobby)
            startGameRedirect(lobby._id)
        }
    }
    
    useEffect(() => {
        loadContent()  
    }, [])
    
    const handleLobbyVisibilityChange = (visibility) => {
        if(visibility === 'private') {
            document.getElementById('private-lobby-visibility').style.borderBottom = '2px solid white'
            document.getElementById('public-lobby-visibility').style.borderBottom = 'none'
            changeVisibility(lobby._id, 'true');
        }
        else if(visibility === 'public') {
            document.getElementById('private-lobby-visibility').style.borderBottom = 'none'
            document.getElementById('public-lobby-visibility').style.borderBottom = '2px solid white'
            changeVisibility(lobby._id, 'false')
        }
    }

    const leaveLobby = () => {
        kickPlayer(lobby._id, loggedUser)
        window.location.replace('/join')
    }

    socket.on(lobby._id,  newLobby => {
        setLobby(newLobby)
      })

  if(lobby !== {} && lobby.limit !== undefined) {
  return (
    <div className='create-skate-lobby'>
        <p
        className="back-button"
        onClick={() => {leaveLobby()}}>
        <i className="fa-solid fa-angle-left"></i>
      </p>
        <div id='lobby-settings'>
        {loggedUser !== lobby.members[0] ? 
            <div id='lobby-settings-block'>
                <p>Only the lobby leader can change the settings of the lobby</p>
            </div>
             : ''
        }
            <div id='visibility-switch'>
                <p onClick={() => handleLobbyVisibilityChange('private')} style={{borderBottom : lobby.isPrivate ? "2px solid white" : "none"}} id='private-lobby-visibility'>Private</p>
                <p onClick={() => handleLobbyVisibilityChange('public')} style={{borderBottom : !lobby.isPrivate ? "2px solid white" : "none"}} id='public-lobby-visibility'>Public</p>
            </div>
        </div>
        <div id='lobby-members'>
            <LobbyMembers members={lobby.members} pending={lobby.invitations} lobby={lobby}/>
        </div>
        <button className='default-button start-lobby-button' onClick={() => {startButtonClicked()}}>Start</button>
        {kicked()}
    </div>
  )
}
else {return (
<Loading/>)}
}

export default CreateSkateLobby
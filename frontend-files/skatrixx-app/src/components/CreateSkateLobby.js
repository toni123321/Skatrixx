import React, { useState, useEffect } from 'react'
import { changeLimit, changeVisibility, createLobby } from '../services/lobby';
import { socket } from '../websockets/ws_client';

import "../stylesheets/CreateSkateLobby.css"

import LobbyMembers from './LobbyMembers';

function CreateSkateLobby() {

    const [lobby, setLobby] = useState({})
    const [maxPlayerCount, setMaxPlayerCount] = useState(undefined)
    const [lobbyVisibility, setLobbyVisibility]  = useState(undefined)
    
    const loadContent = async () => {
       setLobby(await createLobby(localStorage.getItem('userId')))
    }

    const loadLobbyData = () => {
        setMaxPlayerCount(lobby.limit)
    }
    
    useEffect(() => {
        loadContent()     
    }, [])
    

    const handleChangeMaxPlayerCount = async (position) => {
        if(position === 'up' && maxPlayerCount< 10) {
            const newCount = maxPlayerCount + 1
            setMaxPlayerCount(newCount)
            changeLimit(lobby._id, newCount)
        }
        else if (position === 'down' && (maxPlayerCount > 2 && maxPlayerCount > lobby.members.length)) {
            const newCount = maxPlayerCount - 1
            setMaxPlayerCount(newCount)
            changeLimit(lobby._id, newCount)
        }
    }

    const handleLobbyVisibilityChange = (visibility) => {
        setLobbyVisibility(visibility)
        if(visibility === 'private') {
            document.getElementById('private-lobby-visibility').style.backgroundColor = '#CF2121'
            document.getElementById('public-lobby-visibility').style.backgroundColor = '#1e1e1e'
            changeVisibility(lobby._id, 'true');
        }
        else if(visibility === 'public') {
            document.getElementById('public-lobby-visibility').style.backgroundColor = '#CF2121'
            document.getElementById('private-lobby-visibility').style.backgroundColor = '#1e1e1e'
            changeVisibility(lobby._id, 'false')
        }
    }

    socket.on(lobby._id,  newLobby => {
        setLobby(newLobby)
      })

  if(lobby !== {} && lobby.limit !== undefined) {
  return (
    <div className='create-skate-lobby'> 
        <div id='lobby-settings'>
        {localStorage.getItem('userId') !== lobby.members[0] ? 
            <div id='lobby-settings-block'>
                <p>Only the lobby leader can change the settings of the lobby</p>
            </div>
             : ''}
            <div id='visibility-switch'>
                <p onClick={() => handleLobbyVisibilityChange('private')} id='private-lobby-visibility' style={{backgroundColor : lobby.isPrivate ? '#CF2121' : '#1e1e1e'}}>Private</p>
                <p onClick={() => handleLobbyVisibilityChange('public')} id='public-lobby-visibility' style={{backgroundColor : !lobby.isPrivate ? '#CF2121' : '#1e1e1e'}}>Public</p>
            </div>
            <div id='player-limit'>
                <p>Max. players:</p>
                <div id='player-limit-control'>
                <button onClick={() => handleChangeMaxPlayerCount('down')} style={{opacity : maxPlayerCount>2 && maxPlayerCount !== lobby.members.length  ? 1 : .5}} id='player-limit-decrease'>-</button>
                   
                    <p id='player-limit-current'>{maxPlayerCount !== undefined ? maxPlayerCount : loadLobbyData()}</p>
                    <button onClick={() => handleChangeMaxPlayerCount('up')} style={{opacity : maxPlayerCount<10 ? 1 : .5}} id='player-limit-increase'>+</button>
                </div>
            </div>
            <p id='lobby-code-text'>ACCESS CODE</p>
            <p id='lobby-code'>{lobby.accessCode}</p>
        </div>
        <div id='line'></div>
        <div id='lobby-members'>
            <LobbyMembers members={lobby.members} pending={lobby.invitations} lobby={lobby}/>
        </div>
    </div>
  )
}
else {return (
<div>
    <p>Ne</p>
</div>)}
}

export default CreateSkateLobby
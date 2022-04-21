import React, { useState, useEffect } from 'react'
import { getUser } from '../services/userService'

import { acceptInvite, denyInvite } from '../websockets/lobbyWS'

import '../stylesheets/LobbyInvitePopUp.css'
import { acceptAndJoinLobby, denyAndLeaveLobby } from '../services/lobbyService'

function LobbyInvitePopUp(props) {

  const [invUser, setInvUser] = useState(undefined)

  const loadUser = async () => {
    setInvUser(await getUser(props.lobby.members[0]))
}

  const acceptLobbyInvite = async () => {
    await acceptAndJoinLobby(props.lobby._id, localStorage.getItem('userId'))
    acceptInvite()
  }

  const denyLobbyInvite = async () => {
    await denyAndLeaveLobby(props.lobby._id, localStorage.getItem('userId'))
    denyInvite()
  }

useEffect(() => {
  loadUser()
}, [])

if(invUser !== undefined)
{
  return (
    <div className='lobby-invite-pop-up'>
      <p>{invUser.username} has invited you to a game of SKATE</p>
      <div id='lobby-invite-buttons'>
        <button id='lobby-invite-deny' onClick={() => denyLobbyInvite()}>DENY</button>
        <button id='lobby-invite-accept' onClick={() => acceptLobbyInvite()}>ACCEPT</button>
      </div>
    </div>
  )
}else {return (<>Loading..</>)}
}

export default LobbyInvitePopUp
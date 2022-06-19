import React, { useState, useEffect } from 'react'

import { getUser } from "../../services/userService"
import leaderIcon from "../../images/lobby-leader.png"
import kickIcon from "../../images/kick-player-button.png"
import blankIcon from "../../images/blank-image.png"
import '../../stylesheets/lobby/LobbyParticipant.css'
import { kickPlayer } from '../../services/lobbyService'
import { loggedUser } from '../../services/api_client'


function LobbyParticipant(props) {

    const [user, setUser] = useState(getUser(props.member))
    const [pending, setPending] = useState(props.pending)

    const loadUser = async () => {
        setUser(await getUser(props.member))
    }

    const kickUser = () => {
      if(loggedUser === props.lobby.members[0])
      {kickPlayer(props.lobby._id, user._id)}
    }

    const doNothing = () => {}

    useEffect(() => {
      loadUser()
    }, [])
    
    if(user.image !== undefined) {
      return (
        <div className='lobby-participant container-border'>
          <div className='lobby-participant-info' style={{opacity : pending ? .65 : 1}}>
            <img id='lobby-participant-image' src={user.image}  referrerPolicy='no-referrer' alt='Loading...'/>
            <p>{user.username.split(' ')[0]}</p>
            <img onClick={ () => {props.kickable ? kickUser() : doNothing()}} 
            id={props.memberNr === 0 ? 'lobby-leader-icon' : ''} 
            className='lobby-participant-action' 
            src={props.memberNr === 0 ? leaderIcon : props.kickable ? kickIcon : blankIcon} 
            alt='' style={{cursor : "pointer"}}/>
          </div>
          { pending ? <p id='lobby-participant-pending'>Pending...</p> : ''}
          <div className='default-container'></div>
        </div>
      )
    }
    else {return (<></>)}
}

export default LobbyParticipant
import React, { useState, useEffect } from 'react'

import { getUser } from "../../services/userService"
import leaderIcon from "../../images/lobby-leader.png"
import '../../stylesheets/lobby/LobbyParticipant.css'


function LobbyParticipant(props) {

    const [user, setUser] = useState(getUser(props.member))
    const [pending, setPending] = useState(props.pending)

    const loadUser = async () => {
        setUser(await getUser(props.member))
    }

    useEffect(() => {
      loadUser()
    }, [])
    
    if(user.image !== undefined) {
      return (
        <div className='lobby-participant container-border'>
          <div className='lobby-participant-info' style={{opacity : pending ? .65 : 1}}>
            <img src={user.image}  referrerPolicy='no-referrer' alt='Loading...'/>
            <p>{user.username.split(' ')[0]}</p>
            <img className='lobby-participant-action' src={props.memberNr === 0 ? leaderIcon : ''} alt=''/>
          </div>
          { pending ? <p id='lobby-participant-pending'>Pending...</p> : ''}
          <div className='default-container'></div>
        </div>
      )
    }
    else {return (<></>)}
}

export default LobbyParticipant
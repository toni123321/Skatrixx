import React, { useState, useEffect } from 'react'

import { getUser } from "../../services/userService"
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
        <div className='lobby-participant'>
          <div className='lobby-participant-info' style={{opacity : pending ? .65 : 1}}>
            <img src={user.image}  referrerPolicy='no-referrer' alt='Loading...'/>
            <p>{user.username.split(' ')[0]}</p>
          </div>
          { pending ? <p id='lobby-participant-pending'>Pending...</p> : ''}
          <div className='default-container'></div>
        </div>
      )
    }
    else {return (<></>)}
}

export default LobbyParticipant
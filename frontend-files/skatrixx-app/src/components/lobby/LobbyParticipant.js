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
          { pending ? <p style={{backgroundColor : '#1e1e1e'}} id='lobby-participant-pending'>Pending</p> : ''}
          <div style={{opacity : pending ? .65 : 1}}>
            <img src={user.image}  referrerPolicy='no-referrer' alt='Loading...'/>
            <p>{user.username}</p>
          </div>
        </div>
      )
    }
    else {return (<></>)}
}

export default LobbyParticipant
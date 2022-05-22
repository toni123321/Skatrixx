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
          
          <div>
            <img src={user.image}  referrerPolicy='no-referrer' alt='Loading...'/>
            <p>{pending ? "Pending..." : user.username}</p>
          </div>
        </div>
      )
    }
    else {return (<></>)}
}

export default LobbyParticipant
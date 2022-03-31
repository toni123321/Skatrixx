import React, { useState, useEffect } from 'react'

import { getUser } from "../services/user"
import '../stylesheets/LobbyParticipant.css'

function LobbyParticipant(props) {

    const [user, setUser] = useState(getUser(props.member))

    const loadUser = async () => {
        setUser(await getUser(props.member))
    }

    useEffect(() => {
    }, [])
    

  return (
    <div>
        
    </div>
  )
}

export default LobbyParticipant
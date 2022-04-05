import React, { useState, useEffect } from 'react'

import { getUser } from "../services/user"
import '../stylesheets/LobbyParticipant.css'

function LobbyParticipant(props) {

    const [user, setUser] = useState(getUser(props.member))
    const [userImg, setUserImg] = useState(null)

    const loadUser = async () => {
        setUser(await getUser(props.member))
    }

    useEffect(() => {
      loadUser()
    }, [])
    

  return (
    <div className='lobby-participant'>
      <img src={user.image} alt='Loading...'/>
      <p>{user.username}</p>
    </div>
  )
}

export default LobbyParticipant
import React, { useEffect, useState } from 'react'
import { getUser } from "../../services/userService"
import "../../stylesheets/skateGame/SkateGameParticipant.css"

function SkateGameParticipant(props) {

    const [user, setUser] = useState()

    const loadUser = async () => {
        setUser(await getUser(props.userId))
    }

    useEffect(() => {
        loadUser()
      }, [])
    if(user !== undefined) {
  return (
    <div className='skate-game-participant container-border'>
        <div className='default-container'></div>
        <img className='skate-game-participant-image' src={user.image} alt=''/>
        <div className='skate-game-participant-info'>
            <p className='skate-game-participant-name'>{user.username.split(' ')[0]}</p>
            <p className='skate-game-score'>S.K.A.T.E</p>
        </div>
    </div>
  )
}
}

export default SkateGameParticipant
import React, { useState, useEffect } from 'react'
import { getProfileRanking } from '../services/userService'

import "../stylesheets/ProfileRankings.css"

function ProfileRankings(props) {  

  const [ranks, setRanks] = useState(getProfileRanking)

  

  return (
    <div className='profile-rankings'>
        <p id='rank-title'>Your Ranking</p>
        <div className='rankings'>
        <div className='ranking'>
            <p className='position'>#{ranks.frRank}</p>
            <p className='category'>Friends</p>
        </div>
        <div className='ranking'>
            <p className='position'>#{ranks.conRank}</p>
            <p className='category'>Netherlands</p>
        </div>
        <div className='ranking'>
            <p className='position'>#{ranks.wrRank}</p>
            <p className='category'>World</p>
        </div>
        </div>
    </div>
  )
}

export default ProfileRankings
import React from 'react'
import "../../stylesheets/achievements/Achievements.css"
import AchievementContainer from './AchievementContainer'

import trickMasterIcon from '../../images/badges/Trick Master.png' 
import comunityIcon from '../../images/badges/Community.png'
import competitiveIcon from '../../images/badges/Competitive.png'
import consistencyIcon from '../../images/badges/Consistency.png'

function Achievements(props) {


  return (
    <div className='achievements'>
        <h4 className='pageTitleAchievements'>Achievements</h4>
        <div className='achievement-container-category'>
          <AchievementContainer max={8} name={"Trick Master"} image={trickMasterIcon}/>
          <AchievementContainer max={4} name={"Consistency"} image={consistencyIcon}/>
          <AchievementContainer max={7} name={"Competitive"} image={competitiveIcon}/>
          <AchievementContainer max={3} name={"Community"} image={comunityIcon}/>
        </div>
    </div>
  )
}

export default Achievements

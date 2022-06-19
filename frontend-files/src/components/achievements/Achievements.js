import React, { useState } from 'react'
import "../../stylesheets/achievements/Achievements.css"
import AchievementContainer from './AchievementContainer'

import trickMasterIcon from '../../images/badges/Trick Master.png' 
import comunityIcon from '../../images/badges/Community.png'
import competitiveIcon from '../../images/badges/Competitive.png'
import consistencyIcon from '../../images/badges/Consistency.png'
import AchievementCategory from './AchievementCategory'

function Achievements() {

  const [openedCategory, setOpenedCategory] = useState(null)

  const closeCategory = () => {
    setOpenedCategory(null)
  }

  if(openedCategory === null) {
  return (
    <div className='achievements'>
        <h4 className='pageTitleAchievements'>Achievements</h4>
        <div className='achievement-container-category'>
          <AchievementContainer max={8} name={"Trick Master"} image={trickMasterIcon} openCategory={setOpenedCategory}/>
          <AchievementContainer max={4} name={"Consistency"} image={consistencyIcon} openCategory={setOpenedCategory}/>
          <AchievementContainer max={7} name={"Competitive"} image={competitiveIcon} openCategory={setOpenedCategory}/>
          <AchievementContainer max={3} name={"Community"} image={comunityIcon} openCategory={setOpenedCategory}/>
        </div>
    </div>
  )} else {
    return (
      <AchievementCategory category={openedCategory} back={() => {closeCategory()}}/>
    )
  }

}

export default Achievements

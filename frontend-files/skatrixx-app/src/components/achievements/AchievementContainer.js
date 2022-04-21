import React, { useState } from 'react'


import "../../stylesheets/achievements/AchievementContainer.css"

function AchievementContainer(props) {

  if(props.img !== undefined) {
    return (
      <div className='achievement-container'>
          <img src={props.img} alt=''/>
      </div>
    )
  }
  else {return(<></>)}
}

export default AchievementContainer

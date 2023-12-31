import React, { useState } from 'react'
import "../../stylesheets/achievements/AchievementContainer.css"

function AchievementContainer(props) {

    return (
      <div className='achievement-container container-border'>
        <div className='default-container'></div>
        <p>{props.name}</p>
        <img src={props.image} alt=''/>
        <p>0/{props.max} collected</p>
        <button className={'achievementsBtn default-button'} onClick={() => {props.openCategory(props.name)}}>View</button>
      </div>
    )
  }

export default AchievementContainer

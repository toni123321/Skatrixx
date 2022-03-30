import React, { useState, useEffect } from 'react'
import "../stylesheets/LevelContainer.css"
import PlayIcon from "../images/Play.svg"

function LevelContainer(props) {  
  return (
    <div id='trickList'> 
    <div className='trick'>
      <p id="trickName">{props.trick.name}</p> 
      <p id="trickXp">{props.trick.xp}</p>
      <img src={PlayIcon} id="play"/> 
    </div>
    </div>
  )
}

export default LevelContainer
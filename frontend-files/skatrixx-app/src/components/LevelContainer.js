import React, { useState, useEffect } from 'react'
import "../stylesheets/LevelContainer.css"
import PlayIcon from "../images/Play.svg"

function LevelContainer(props) {  
 
  const openTrick = () => {
    props.handlePlay(props.trick)
    console.log("Here")
  }

  return (
      
      <div id='trickList'> 
      <div className='trick'>
        <p id="trickName">{props.trick.name}</p> 
        <p id="trickXp">{props.trick.xp}</p>
        <img onClick={openTrick} src={PlayIcon} id="play"/> 
      </div>
      </div>
      
  )
}

export default LevelContainer
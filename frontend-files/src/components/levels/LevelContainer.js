import React, { useState, useEffect } from 'react'
import "../../stylesheets/levels/LevelContainer.css"
import PlayIcon from "../../images/Play.png"

function LevelContainer(props) {  
 
  const openTrick = () => {
    props.handlePlay(props.trick)
    console.log("Here")
  }

  return (
      
      <div id='trick'>
        <p id="trickName">{props.trick.name}</p> 
        <div className='trick-right'>
        <p id="trickXp">{props.trick.xp}xp</p>
        <i className="material-icons play-trick-arrow" onClick={openTrick}>keyboard_arrow_right</i>
        </div>
      </div>
      
  )
}

export default LevelContainer
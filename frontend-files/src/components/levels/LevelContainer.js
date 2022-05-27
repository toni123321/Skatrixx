import React, { useState, useEffect } from 'react'
import "../../stylesheets/levels/LevelContainer.css"
import TrickPage from './TrickPage'

function LevelContainer(props) {  

  const [opened, setOpened] = useState(true)
 
  const openTrick = () => {
    setOpened(!opened)
    var containers = document.getElementsByClassName("trick-content")
    var container = containers[props.nr]
    container.style.display = opened ? "block" : "none"
    container.style.maxHeight = opened ? "100%" : "0px"
   }
  

  return (
      <div className='trick'>
        <div id='trick-header' onClick={() => {openTrick()}}>
        <p id="trickName">{props.trick.name}</p> 
        <div className='trick-right'>
        <p id="trickXp">{props.trick.xp}xp</p>
        <i className="material-icons play-trick-arrow">keyboard_arrow_right</i>
        </div>
        </div>
        <div className='trick-content'>
          <TrickPage trick={props.trick}/>
        </div>
      </div>
      
  )
}

export default LevelContainer
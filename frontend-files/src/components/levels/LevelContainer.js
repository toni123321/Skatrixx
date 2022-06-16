import React, { useState, useEffect } from 'react'
import "../../stylesheets/levels/LevelContainer.css"


function LevelContainer(props) {  

  const [opened, setOpened] = useState(true)
 
  const openTrick = () => {
    setOpened(!opened)
    var containers = document.getElementsByClassName("trick-content")
    var container = containers[props.nr]
    container.style.display = opened ? "block" : "none"
    container.style.maxHeight = opened ? "100%" : "0px"
   }

   const startTrick = () => {
    props.handlePlay(props.trick)
  }

  useEffect(() => {
    var line = document.getElementsByClassName("trick-line-colored")
    for(var i = 0; i < line.length; i++)
    if(props.difficulty === "beginner") {
      line[i].style.color = "green"
    }
    else if(props.difficulty === "intermediate") {
      line[i].style.color = "blue"
    }
    else if(props.difficulty === "master") {
      line[i].style.color = "red"
    }
}, [])
  

   

  return (
      <div className='trick container-border'>
        <div className='default-container'></div>
        <div id='trick-header' onClick={openTrick}>
          <p className='trick-line-colored'>|</p>
        <p id="trickName">{props.trick.name} - {props.trick.xp}XP</p> 
        <div className='trick-right'>
        <i className="material-icons play-trick-arrow">keyboard_arrow_right</i>
        </div>
        </div>
        <div className='trick-container-detail'>
          <p className='trick-minutes'>2,4 mins</p>
          <p className='trick-avarge-scoretext'>Based on avarge score</p>
        </div>
        <div className='trick-content'>
          <div id="VideoDiv">
            <iframe
              id="videoFrame"
              src={props.trick.videoLink}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
          </div>
          <button type="button" id="trickBtn" onClick={startTrick}>Start</button>
        </div>
      </div>
      
  )
}

export default LevelContainer
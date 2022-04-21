import React, { useState, useEffect } from 'react'
import { getProfileLevel } from '../services/userService'

import "../stylesheets/ProgressBar.css"

function ProgressBar(props) {

  const [xp, setXp] = useState(props.xp)

  useEffect(() => {
    var progress = document.getElementById("red");
    let percentage = xp / 10
    progress.style.width = `${percentage}%`;
  }, [])
  

  return (
    <div className='progress-bar'>
        <p>{props.level}</p>
        <div className="light-grey">
        <div id="red" ></div>
        </div><br></br>
    </div>
  )
}

export default ProgressBar

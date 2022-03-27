import React, { useState, useEffect } from 'react'
import { getProfileLevel } from '../services'

import "../stylesheets/ProgressBar.css"

function ProgressBar(props) {

  const [level, setLevel] = useState(getProfileLevel)

  useEffect(() => {
    var progress = document.getElementById("red");
    progress.style.width = `${level.progressToNexLvl}%`;
  }, [])
  

  return (
    <div className='progress-bar'>
        <p>Lvl. {level.level}</p>
        <div className="light-grey">
        <div id="red" ></div>
        </div><br></br>
    </div>
  )
}

export default ProgressBar

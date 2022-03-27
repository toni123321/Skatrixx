import React, { useState, useEffect } from 'react'
import "../stylesheets/LevelContainer.css"
import PlayIcon from "../images/Play.svg"
import SkatePage from './SkatePage';

function LevelContainer(props) {  
  const [gamemode, setGamemode] = useState('Menu');

  const handleGamemode = (gamemode) => {
      setGamemode(gamemode);
  }
  useEffect(() => {}, [])
  const loadGamemode = () => {
    if(gamemode === 'Menu') {
      return (
        <div>
         
      <img onClick={() => {handleGamemode('tutorial')}} src={PlayIcon} alt=''  id= "PlayIcon"/>
      </div>
      )
    }else if(gamemode === 'tutorial') {
      return (<SkatePage back={handleGamemode}/>)
    }
  }

  return (
    <>{loadGamemode()}</>
  )
  // return (
  //   <div id='trickList'> 
  //   <div className='trick'>
  //     <p id="trickName">{props.trick.name}</p> 
  //     <p id="trickXp">{props.trick.xp}</p>
  //     <img src={PlayIcon} id="play"/> 
  //   </div>
  //   </div>
  // )
}

export default LevelContainer
import React, { useState, useEffect } from 'react'

import "../stylesheets/Loby.css"

import LevelMenu from './LevelMenu'
import SIcon from "../images/s-1 1.svg"
import SoloIcon from "../images/Account.svg"
import VersusIcon from "../images/Head to Head.svg"

function Loby() {

  const [gamemode, setGamemode] = useState('Menu');

  const handleGamemode = (gamemode) => {
      setGamemode(gamemode);
  }

  useEffect(() => {
    
  }, [])
  
  
  const loadGamemode = () => {
    if(gamemode === 'Menu') {
      return (
        <div>
          <img src={SIcon} alt='' id= "Sicon" />
        <div><img onClick={() => {handleGamemode('solo')}} src={SoloIcon} alt=''  id= "soloIcon"/>
        <h4>Solo</h4></div>
        <div><img onClick={() => {handleGamemode('skate')}} src={VersusIcon} alt=''  id= "vsIcon"/>
        <h4>S.K.A.T.E</h4></div>
        </div>
      )
    }
    else if(gamemode === 'solo') {
      return (<LevelMenu back={handleGamemode}/>)
    }
    else if(gamemode === 'skate') {
        return (<>ok brat</>)
    }
  }

  return (
    <>{loadGamemode()}</>
  )
}

export default Loby
import React, { useState, useEffect } from 'react'

import "../../stylesheets/lobby/Loby.css"

import LevelMenu from '../levels/LevelMenu'
// import SIcon from "../images/s-1 1.svg"
import SoloIcon from "../../images/Account.svg"
import VersusIcon from "../../images/Head to Head.svg"
import { Link } from 'react-router-dom'

function Loby() {

  const [gamemode, setGamemode] = useState('Menu')
  const [skatePopup, setSkatePopup] = useState(false)

  const handleGamemode = (gamemode) => {
      setGamemode(gamemode);
  }

  const toggleSkatePopup = () => {
    setSkatePopup(!skatePopup)
  }


  useEffect(() => {
    
  }, [])
  
  
  const loadGamemode = () => {
    if(gamemode === 'Menu') {
      return (

        <div>

          <div className='mainLobyContainer' id="Sicon" > 

            <div className='squareContainer' id="solo">
              <div className='squareContainerInfo'>
              <h4 className='lobbyContainerHeader'>SOLO</h4>
              <p className='GameInfoText'>Challenge yorself, learn how to skate improve records</p>
              </div>
              <div className='buttonStyling' onClick={() => {handleGamemode('solo')}} >
            <img src={SoloIcon} alt=''  id= "soloIcon"/>
            <i className="fa-solid fa-arrow-right-long fa-2xl"></i>
            </div>
            </div>

            <div className='squareContainer' id="solo">
              <div className='squareContainerInfo'>
              <h4 className='lobbyContainerHeader' id='skateTitle'>S.K.A.T.E</h4>
              <p className='GameInfoText'>Play with your team and see who does the trick better</p>
              </div>
              <div className='buttonStyling' onClick={toggleSkatePopup}>
              <img src={VersusIcon} alt=''  id= "vsIcon"/>
            <i className="fa-solid fa-arrow-right-long fa-2xl"></i>
            </div>
            </div>

        </div>

        
        
        
        
        {skatePopup ?         
        <div id='SKATE-Popup'>
          <div id='SKATE-options'>
            <p id='SKATE-close' onClick={toggleSkatePopup}><i class="fa-solid fa-xmark"></i></p>
            <Link to={'/create'} style={{ textDecoration: 'none' }}><button className='skate-btn'>Create Lobby</button></Link>
            <p id="or">OR</p>
            <Link to={'/join'} style={{ textDecoration: 'none' }}><button className='skate-btn' id="join">Join Lobby</button></Link> 
          </div>
        </div>
         : ''}
        </div>
        
      )
    }
    else if(gamemode === 'solo') {
      return (<LevelMenu back={handleGamemode}/>)
    }
  }

  return (
    <>{loadGamemode()}</>
  )
}

export default Loby
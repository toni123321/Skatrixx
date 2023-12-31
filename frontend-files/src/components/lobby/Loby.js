import React, { useState, useEffect } from 'react'

import "../../stylesheets/lobby/Loby.css"

import LevelMenu from '../levels/LevelMenu'
import SoloIcon from "../../images/Skateboarding.svg"
import VersusIcon from "../../images/Head to Head.svg"
import { Link } from 'react-router-dom'

function Loby() {
  const [skatePopup, setSkatePopup] = useState(false)

  const toggleSkatePopup = () => {
    setSkatePopup(!skatePopup)
  }

  const loadGamemode = () => {
    return (
      <div>
        <div className='mainLobyContainer' id="Sicon" >
          <Link to={'/solo-game'} id="soloGameLink">
          <div className='soloContainer container-border' id="solo">
            <div className='default-container'></div>
            <h4 className='lobbyContainerHeader'>SOLO</h4>
            <div className='soloContainerInfo'>
              <p className='soloGameInfo'>Challenge yorself,
                learn how to skate
                improve records</p>
                <img src={SoloIcon} alt='' id="soloIcon" />
            </div>
            <div className='buttonStyling'>
              <i className="fa-solid fa-arrow-right-long fa-2xl"></i>
            </div>
          </div>
          </Link>
          <div className='skateContainer container-border' onClick={() => {toggleSkatePopup()}}>
          <div className='default-container'></div>
          <h4 className='lobbyContainerHeader'>S.K.A.T.E</h4>
            <div className='soloContainerInfo'>
              <p className='soloGameInfo'>Play with you team
              and see who does
              the trick better</p>
                <img src={VersusIcon} alt='' id="soloIcon" />
            </div>
            <div className='buttonStyling'>
              <i className="fa-solid fa-arrow-right-long fa-2xl"></i>
            </div>
          </div>
        </div>
        {skatePopup ?
          <div id='SKATE-Popup'>
            <div className='popup-container' id='SKATE-options'>
              <p id='SKATE-close' onClick={toggleSkatePopup}><i className="fa-solid fa-xmark"></i></p>
              <Link to={'/create'} style={{ textDecoration: 'none' }}><button className='skate-btn default-button'>Create Lobby</button></Link>
              <p id="or">OR</p>
              <Link to={'/join'} style={{ textDecoration: 'none' }}><button className='skate-btn default-button' id="join">Join Lobby</button></Link>
            </div>
          </div>
          : ''}
      </div>

    )
  }

  return (
    <>{loadGamemode()}</>
  )
}

export default Loby
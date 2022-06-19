
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import "../stylesheets/NavBar.css";
import skateIcon from "../images/nav-icons/skate.png";
import swordIcon from "../images/nav-icons/Battle.png";
import profileIcon from "../images/nav-icons/profile.png";
import achievementIcon from "../images/nav-icons/award.png";

function NavBar() {

    useEffect(() => {
        setActiveBtn();
    }, []);

    const resetBtns = () => {
      document.getElementById("skate").style.backgroundColor = "#101010"
      document.getElementById("trophy").style.backgroundColor = "#101010"
      document.getElementById("profile").style.backgroundColor = "#101010"
      document.getElementById("game").style.backgroundColor = "#101010"
      document.getElementById("link-skate").style.color = "#FFFFFF"
      document.getElementById("link-trophy").style.color = "#FFFFFF"
      document.getElementById("link-profile").style.color = "#FFFFFF"
      document.getElementById("link-game").style.color = "#FFFFFF"
    }

    const setActiveBtn = (button) => {
      resetBtns()
      if (button === 'Game') {
        document.getElementById("game").style.backgroundColor = "#CF2121"
        document.getElementById("link-game").style.color = "#CF2121"
      }
      else if(button === 'Profile') {
          document.getElementById("profile").style.backgroundColor = "#CF2121"
          document.getElementById("link-profile").style.color = "#CF2121"
      }
      else if (button === 'Trophy') {
        document.getElementById("trophy").style.backgroundColor = "#CF2121"
        document.getElementById("link-trophy").style.color = "#CF2121"
      }
      else if (button === 'Skate') {
        document.getElementById("skate").style.backgroundColor = "#CF2121"
        document.getElementById("link-skate").style.color = "#CF2121"
      }
  }

  return (
    <div className='nav'>
        <Link className='nav-link' id='link-game' to={"/game"} onClick={() => setActiveBtn('Game')} ><img id="game" className='nav-icon' src={swordIcon} alt=''/>GAME</Link>
        <Link className='nav-link' id='link-trophy' to={"/trophy"} onClick={() => setActiveBtn('Trophy')}><img id="trophy" className={'nav-icon'} src={achievementIcon} alt=''/>ACHIEVEMENTS</Link>
        <Link className='nav-link' id='link-skate' to={"/skate"} onClick={() => setActiveBtn('Skate')}><img id="skate" className={'nav-icon'} src={skateIcon} alt=''/>MY SKATE</Link>
        <Link className='nav-link' id='link-profile' to={"/"} onClick={() => setActiveBtn('Profile')}><img id="profile" className='fas fa-user-alt nav-icon active' src={profileIcon} alt=''/>PROFILE</Link>
    </div>
  )
}

export default NavBar
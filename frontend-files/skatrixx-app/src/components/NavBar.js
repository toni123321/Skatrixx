
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import "../stylesheets/NavBar.css";
import skateIcon from "../images/skate-icon.png";
import swordIcon from "../images/swords-icon.png";

function NavBar() {

    useEffect(() => {
        setActiveBtn2();
    }, []);

    const setActiveBtn2 = (button) => {
      if (button === 'Game') {
        document.getElementById("game").style.filter = "invert(23%) sepia(87%) saturate(1813%) hue-rotate(346deg) brightness(102%) contrast(99%)"
        document.getElementById("profile").style.color = "white"
        document.getElementById("trophy").style.color = "white"
        document.getElementById("skate").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
        document.getElementById("link-skate").style.color = "white"
        document.getElementById("link-trophy").style.color = "white"
        document.getElementById("link-game").style.color = "#CF2121"
        document.getElementById("link-profile").style.color = "white"
      }
      else if(button === 'Profile') {
          document.getElementById("game").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
          document.getElementById("trophy").style.color = "white"
          document.getElementById("profile").style.color = "#CF2121"
          document.getElementById("skate").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
          document.getElementById("link-skate").style.color = "white"
          document.getElementById("link-trophy").style.color = "white"
          document.getElementById("link-game").style.color = "white"
          document.getElementById("link-profile").style.color = "#CF2121"
      }
      else if (button === 'Trophy') {
        document.getElementById("game").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
        document.getElementById("trophy").style.color = "#CF2121"
        document.getElementById("profile").style.color = "white"
        document.getElementById("skate").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
        document.getElementById("link-skate").style.color = "white"
        document.getElementById("link-trophy").style.color = "#CF2121"
        document.getElementById("link-game").style.color = "white"
        document.getElementById("link-profile").style.color = "white"
      }
      else if (button === 'Skate') {
        document.getElementById("game").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
        document.getElementById("trophy").style.color = "white"
        document.getElementById("profile").style.color = "white"
        document.getElementById("skate").style.filter = "invert(23%) sepia(87%) saturate(1813%) hue-rotate(346deg) brightness(102%) contrast(99%)"
        document.getElementById("link-skate").style.color = "#CF2121"
        document.getElementById("link-trophy").style.color = "white"
        document.getElementById("link-game").style.color = "white"
        document.getElementById("link-profile").style.color = "white"
      }
  }

  return (
    <div className='nav'>
        <Link className='nav-link' id='link-game' to={"/game"} onClick={() => setActiveBtn2('Game')} ><img id="game" className='nav-icon' src={swordIcon} alt=''/>GAME</Link>
        <Link className='nav-link' id='link-trophy' to={"/trophy"} onClick={() => setActiveBtn2('Trophy')}><i id="trophy" className='fas fa-trophy nav-icon'></i>ACHIEVEMENTS</Link>
        <Link className='nav-link' id='link-skate' to={"/skate"} onClick={() => setActiveBtn2('Skate')}><img id="skate" className={'nav-icon-center'} src={skateIcon} alt=''/>MY SKATE</Link>
        <Link className='nav-link' id='link-profile' to={"/"} onClick={() => setActiveBtn2('Profile')}><i id="profile" className='fas fa-user-alt nav-icon active'></i>PROFILE</Link>
    </div>
  )
}

export default NavBar
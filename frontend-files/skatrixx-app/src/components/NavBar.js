
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import "../stylesheets/NavBar.css";
import skateIcon from "../images/skate-icon.png";
import swordIcon from "../images/swords-icon.png";

function NavBar() {
    var btns = document.getElementsByClassName("nav-icon");

    useEffect(() => {
        setActiveBtn2();
    }, []);


    const setActiveBtn = () => {
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
              var current = document.getElementsByClassName("active");
              current[0].className = current[0].className.replace(" active", "");
              this.className += " active";
            });
          }
    }

    const setActiveBtn2 = (button) => {
      if (button === 'Game') {
        document.getElementById("game").style.filter = "invert(23%) sepia(87%) saturate(1813%) hue-rotate(346deg) brightness(102%) contrast(99%)"
        document.getElementById("profile").style.color = "white"
        document.getElementById("trophy").style.color = "white"
        document.getElementById("skate").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
      }
      else if(button === 'Profile') {
          document.getElementById("game").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
          document.getElementById("trophy").style.color = "white"
          document.getElementById("profile").style.color = "#CF2121"
          document.getElementById("skate").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
      }
      else if (button === 'Trophy') {
        document.getElementById("game").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
        document.getElementById("trophy").style.color = "#CF2121"
        document.getElementById("profile").style.color = "white"
        document.getElementById("skate").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
      }
      else if (button === 'Skate') {
        document.getElementById("game").style.filter = "invert(92%) sepia(0%) saturate(7469%) hue-rotate(108deg) brightness(115%) contrast(98%)"
        document.getElementById("trophy").style.color = "white"
        document.getElementById("profile").style.color = "white"
        document.getElementById("skate").style.filter = "invert(23%) sepia(87%) saturate(1813%) hue-rotate(346deg) brightness(102%) contrast(99%)"
      }
  }

  return (
    <div className='nav'>
        <Link to={"/game"}><img onClick={() => setActiveBtn2('Game')} id="game" className='nav-icon' src={swordIcon} alt=''/></Link>
        <Link to={"/trophy"}><i onClick={() => setActiveBtn2('Trophy')} id="trophy" className='fas fa-trophy nav-icon'></i></Link>
        <Link to={"/skate"}><img onClick={() => setActiveBtn2('Skate')} id="skate" className={'nav-icon-center'} src={skateIcon} alt=''/></Link>
        <Link to={"/"}><i onClick={() => setActiveBtn2('Profile')} id="profile" className='fas fa-user-alt nav-icon active'></i></Link>
    </div>
  )
}

export default NavBar
import React from 'react'
import "../../stylesheets/skateGame/SkateGameVote.css"
import yesButton from "../../images/Yes.png"
import noButton from "../../images/No.png"

function SkateGameVote() {
  return (
    <div className='skate-game-vote-popup popup-container'>
        <p>Did Eric perform <br/> the Ollie correctly?</p>
        <div className="skate-game-vote-popup-buttons">
            <img src={yesButton} alt=''/>
            <img src={noButton} alt=''/>
        </div>
    </div>
  )
}

export default SkateGameVote
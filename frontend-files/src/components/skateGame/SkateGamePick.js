import React from 'react'
import "../../stylesheets/skateGame/SkateGamePick.css"

function SkateGamePick() {

    var tricks = [
        "Ollie",
        "Heelflip",
        "Nollie",
        "Kickflip"
    ]

  return (
    <div className='skate-game-pick popup-container'>
        <p>You are now picking a trick</p>
        <div className='skate-game-pick-tricks'>
            {tricks.map((trick, index) => (
                <p>{trick}</p>
            ))}
        </div>
    </div>
  )
}

export default SkateGamePick
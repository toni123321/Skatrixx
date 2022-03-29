import React from 'react'
import LevelList from './LevelList'
import "../stylesheets/LevelMenu.css"


function LevelMenu(props) {
    // Use state (hooks)

    // Use effect - load levels

    // Functions - levels logic
  
    return ( <div className='level-menu'>
        <p id='back' onClick={() => {props.back('Menu')}}>&lt;</p>
            {/* <h3>Beginner</h3>
            <LevelList/>
            <h3>Intermediate</h3>
            <LevelList/>
            <h3>Master</h3>
            <LevelList/> */}
            <LevelList difficulty = {'master'} alley={"Beginner's Alley"}/>
        </div>
    )
}

export default LevelMenu
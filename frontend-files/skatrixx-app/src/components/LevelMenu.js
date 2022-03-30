import React, {useState} from 'react'
import LevelList from './LevelList'
import "../stylesheets/LevelMenu.css"


function LevelMenu(props) {
    // Use state (hooks)
    const [difficultyOpened, setDificultyOpened] = useState('');
    // Use effect - load levels

    // Functions - levels logic
  
    const handleDifficultyChange = (dif) => {
        setDificultyOpened(dif)
    }

    if(difficultyOpened === '') {
    return ( <div className='level-menu'>
        <p id='back' onClick={() => {props.back('Menu')}}>&lt;</p>
        <h3 onClick={() => {handleDifficultyChange('rookie')}}>Rookie Park</h3>
        <h3 onClick={() => {handleDifficultyChange('amateur')}}>amateur Park</h3>
        <h3 onClick={() => {handleDifficultyChange('pro')}}>pro Park</h3>
        </div>
    )
    }
    else {
            return (<LevelList difficulty = {'beginner'} alley={"Beginner's Alley"} back={}/>)
    }
}

export default LevelMenu
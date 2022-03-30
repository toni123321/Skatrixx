import React from 'react'
import LevelContainer from './LevelContainer'


const LevelList = () => {
  

  return (
    <div>
        {beginnerTricks.map((trick,i)=> (
                <LevelContainer trick={trick} key={i}/> 
        ))}
    </div>
  )
}

export default LevelList
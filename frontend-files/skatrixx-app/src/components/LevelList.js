import React from 'react'
import LevelContainer from './LevelContainer'


const LevelList = () => {
    const beginnerTricks = [
        {
        id: 1,
        trickName:"Ollie", 
        level: "beginner",
        xp:500
    }, {
        id: 2,
        trickName:"Pop-Shuvit",
        level: "beginner",
        xp:530
    }, {
        id: 3,
        trickName:"Frontside Pop-shuvit",
        level: "beginner",
        xp:560
    },{
        id: 4,
        trickName:"Frontside Pop-shuvit",
        level: "beginner",
        xp:580
    },{
        id: 5,
        trickName:"Heelflip",
        level: "beginner",
        xp:600
    }
    ,{
        id: 6,
        trickName:"Varial Kickflip ",
        level: "intermediate",
        xp:600
    },{
        id: 7,
        trickName:"Inward Kickflip",
        level: "intermediate",
        xp:600
    }]

  return (
    <div>
        {beginnerTricks.map((trick,i)=> (
                <LevelContainer trick={trick} key={i}/> 
        ))}
    </div>
  )
}

export default LevelList
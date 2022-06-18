import React, { useState, useEffect } from "react";
import LevelList from "./LevelList";
import "../../stylesheets/levels/LevelMenu.css";
import RookieRamp from "../../images/RookieRamp.png";
import IntermediateRamp from "../../images/IntermediateRamp.png";
import ProsRamp from "../../images/ProsRamp.png";

function LevelMenu(props) {

  const difficulties = [{
    name : "Rookie Ramp",
    trickNr : "10",
    diff: "rookie",
    image: RookieRamp
  },
  {
    name : "Amateur Ramp",
    trickNr : "20",
    diff: "amateur",
    image: IntermediateRamp
},
{
name : "Pro Ramp",
    trickNr : "25",
    diff: "pro",
    image: ProsRamp
  }
];

  // Use state (hooks)
  const [difficultyOpened, setDificultyOpened] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Use effect - load levels
  useEffect(() => {
    var containers = document.getElementsByClassName("difficulty-container")
    //containers[0].classList.add("selected")
  }, [])
  

  // Functions - levels logic
  const handleDifficultyChange = (dif) => {
    setDificultyOpened(dif);
  };

  if (difficultyOpened === "") {
    return (
      <div className="level-menu">
      <p
        className="back-button"
        onClick={() => {
          props.back("Menu");
        }}>
        <i className="fa-solid fa-angle-left"></i>
      </p>
      <div className='level-menu-swipe'>
        {difficulties.map(difficulty => (
          <div className="difficulty-container">
          <img src={difficulty.image} onClick={() => {
              handleDifficultyChange(difficulty.diff);
            }} alt=''/>
          <h3>{difficulty.name}</h3>
          <h5>{difficulty.trickNr} tricks</h5>
        </div>
        ))}
      </div>
    </div>
    );
  } else if(difficultyOpened==="rookie"){
    return (<LevelList difficulty={"beginner"} alley={"Rookie Ramp"} handleDifficultyChange={handleDifficultyChange} />);
  } else if (difficultyOpened==="amateur"){
    return (<LevelList difficulty={"intermediate"} alley={"Amateur Ramp"} handleDifficultyChange={handleDifficultyChange}/>)
  }else if (difficultyOpened==="pro"){
    return (<LevelList difficulty={"master"} alley={"Pro Ramp"} handleDifficultyChange={handleDifficultyChange}/>)
  }
}

export default LevelMenu;
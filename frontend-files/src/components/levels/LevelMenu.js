import React, { useState } from "react";
import LevelList from "./LevelList";
import "../../stylesheets/levels/LevelMenu.css";
import RookieRamp from "../../images/RookieRamp.png";
import IntermediateRamp from "../../images/IntermediateRamp.png";
import ProsRamp from "../../images/ProsRamp.png";

function LevelMenu(props) {
  // Use state (hooks)
  const [difficultyOpened, setDificultyOpened] = useState("");
  // Use effect - load levels

  // Functions - levels logic

  const handleDifficultyChange = (dif) => {
    setDificultyOpened(dif);
  };

  if (difficultyOpened === "") {
    return (
      <div className="level-menu">
      <p
        id="back"
        onClick={() => {
          props.back("Menu");
        }}
      >&lt;
      </p>
      <div className='LevelMenuSwipe'>
      <div className="beginner">
        <img src={RookieRamp} onClick={() => {
            handleDifficultyChange("rookie");
          }} id="RookieRamp" />
        <h3>
          Rookie's Park
        </h3>
        <h5>10 Tricks</h5>
      </div>
      <div className="intermediate">
        <img src={IntermediateRamp} onClick={() => {
            handleDifficultyChange("amateur");
          }} id="IntermediateRamp" />
        <h3>
          Amateur's Park
        </h3>
        <h5>20 Tricks</h5>
      </div>
      <div className="master">
        <img src={ProsRamp} onClick={() => {
            handleDifficultyChange("pro");
          }} id="ProsRamp" />
        <h3>
          Pro's Park
        </h3>
        <h5>25 Tricks</h5>
      </div>
      </div>
    </div>
    );
  } else if(difficultyOpened==="rookie"){
    return (<LevelList difficulty={"beginner"} alley={"Beginner's Alley"} handleDifficultyChange={handleDifficultyChange} />);
  } else if (difficultyOpened==="amateur"){
    return (<LevelList difficulty={"intermediate"} alley={"Bkjj's Alley"} handleDifficultyChange={handleDifficultyChange}/>)
  }else if (difficultyOpened==="pro"){
    return (<LevelList difficulty={"master"} alley={"Tony's Alley"} handleDifficultyChange={handleDifficultyChange}/>)
  }
}

export default LevelMenu;

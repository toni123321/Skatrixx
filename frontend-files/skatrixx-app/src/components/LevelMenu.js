import React, { useState } from "react";
import LevelList from "./LevelList";
import "../stylesheets/LevelMenu.css";
import RookieRamp from "../images/RookieRamp.png";
import IntermediateRamp from "../images/IntermediateRamp.png";
import ProsRamp from "../images/ProsRamp.png";

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
        >
          &lt;
        </p>
        <div className="beginner">
          <img src={RookieRamp} id="RookieRamp" />
          <h3>
            Rookie's Park
          </h3>
          <h5>10 Tricks</h5>
          <button type="button" onClick={() => {
              handleDifficultyChange("rookie");
            }} id="RookieButton">
        Go →
      </button>
        </div>
        <div className="intermediate">
          <img src={IntermediateRamp} id="IntermediateRamp" />
          <h3>
            Amateur's Park
          </h3>
          <h5>20 Tricks</h5>
          <button type="button"  onClick={() => {
              handleDifficultyChange("amateur");
            }} id="IntermediateButton">
        Go →
      </button>
        </div>
        <div className="master">
          <img src={ProsRamp} id="ProsRamp" />
          <h3
            onClick={() => {
              handleDifficultyChange("pro");
            }}
          >
            Pro's Park
          </h3>
          <h5>25 Tricks</h5>
          <button type="button" onclick="" id="ProsButton">
        Go →
      </button>
        </div>
      </div>
    );
  } else if(dif==="rookie"){
    return <LevelList difficulty={"beginner"} alley={"Beginner's Alley"} />;
  } else if (dif==="amateur"){
    return <LevelList difficulty={"intermidiate"} alley={"Bkjj's Alley"} />;
  }
}

export default LevelMenu;

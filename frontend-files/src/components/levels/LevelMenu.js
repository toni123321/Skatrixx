import React, { useState, useEffect } from "react";
import LevelList from "./LevelList";
import "../../stylesheets/levels/LevelMenu.css";
import RookieRamp from "../../images/RookieRamp.png";
import IntermediateRamp from "../../images/IntermediateRamp.png";
import ProsRamp from "../../images/ProsRamp.png";
import SoonRamp from "../../images/ComingSoonRamp.png"

const difficulties = [
  {
    name: "Rookie Ramp",
    trickNr: "10",
    diff: "rookie",
    image: RookieRamp
  },
  {
    name: "Amateur Ramp",
    trickNr: "20",
    diff: "amateur",
    image: IntermediateRamp
  },
  {
    name: "Pro Ramp",
    trickNr: "25",
    diff: "pro",
    image: ProsRamp
  },
  {
    name: "Coming Soon",
    trickNr: "?",
    diff: "none",
    image: SoonRamp
  }
];

function LevelMenu(props) {

  // Use state (hooks)
  const [difficultyOpened, setDificultyOpened] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(3);
  const [nextIndex, setNextIndex] = useState(1)


  const changeIndex = (dir) => {
    if(dir === "f") {
      setPreviousIndex(selectedIndex)
      if(selectedIndex === difficulties.length-1) {
        setSelectedIndex(0);
        setNextIndex(1)
      }
      else if(selectedIndex === difficulties.length-2){
        setSelectedIndex(selectedIndex + 1)
        setNextIndex(0)
      }
      else {
        setSelectedIndex(selectedIndex + 1)
        setNextIndex(nextIndex + 1)
      }
    }
    if(dir === "b") {
      setNextIndex(selectedIndex)
      if(selectedIndex === 0) {
        setSelectedIndex(difficulties.length - 1)
        setPreviousIndex(difficulties.length - 2)
      }
      else if(selectedIndex === 1) {
        setSelectedIndex(selectedIndex - 1)
        setPreviousIndex(difficulties.length - 1)
      }
      else {
        setSelectedIndex(selectedIndex - 1)
        setPreviousIndex(previousIndex - 1)
      }
    }
  }

  // Functions - levels logic
  const handleDifficultyChange = (dif) => {
    if(dif === "none") {return}
    setDificultyOpened(dif);
  };

  if (difficultyOpened === "") {
    return (
      <div className="level-menu" >
        <p
          className="back-button"
          onClick={() => {
            window.history.back();
          }}>
          <i className="fa-solid fa-angle-left"></i>
        </p>
        <div className='level-menu-swipe'>
        <div className="level-previous" onClick={() => {changeIndex("b")}}><i class="fa-solid fa-caret-left"></i></div>
        <div className="difficulty-container">
            <img src={difficulties[previousIndex].image} alt='' />
            <h3>-</h3>
            <h5>{difficulties[previousIndex].trickNr} tricks</h5>
          </div>
          <div className="difficulty-container middle-difficulty-container">
            <img src={difficulties[selectedIndex].image} onClick={() => {
              handleDifficultyChange(difficulties[selectedIndex].diff);
            }} alt='' />
            <h3>{difficulties[selectedIndex].name}</h3>
            <h5>{difficulties[selectedIndex].trickNr} tricks</h5>
          </div>
          <div className="difficulty-container">
            <img src={difficulties[nextIndex].image} alt='' />
            <h3>-</h3>
            <h5>{difficulties[nextIndex].trickNr} tricks</h5>
          </div>
          <div className="level-next" onClick={() => {changeIndex("f")}}><i class="fa-solid fa-caret-right"></i></div>
        </div>
      </div>
    );
  } else if (difficultyOpened === "rookie") {
    return (<LevelList difficulty={"beginner"} alley={"Rookie Ramp"} handleDifficultyChange={handleDifficultyChange} />);
  } else if (difficultyOpened === "amateur") {
    return (<LevelList difficulty={"intermediate"} alley={"Amateur Ramp"} handleDifficultyChange={handleDifficultyChange} />)
  } else if (difficultyOpened === "pro") {
    return (<LevelList difficulty={"master"} alley={"Pro Ramp"} handleDifficultyChange={handleDifficultyChange} />)
  }
}

export default LevelMenu;
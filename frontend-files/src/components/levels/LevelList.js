import { React, useState, useEffect } from 'react'
import LevelContainer from './LevelContainer'
import tricksDataService from '../../services/tricksDataService'
import TrickPage from './TrickPage'
import "../../stylesheets/levels/LevelList.css";

import RookieRamp from "../../images/RookieRamp.png";
import IntermediateRamp from "../../images/IntermediateRamp.png";
import ProsRamp from "../../images/ProsRamp.png";



const LevelList = (props) => {
  const [trickData, setTrickData] = useState([]) // trickData useState
  const [loading, setLoading] = useState(true) //for  Loading
  const [error, setError] = useState("") // for Error
  const [play, setPlay] = useState(false) //state if you are in the list or no
  const [ramp, setRamp] = useState()

  const initialCurrTrickState = {
    name: "",
    xp: null,
    videoLink: "",
    difficulty: "",
  }
  const [currTrick, setCurrTrick] = useState(initialCurrTrickState)

  // the function change the state play
  const handlePlay = (trick) => {
    setCurrTrick(trick)
    setPlay(!play)
  }

  const handleGoBack = () => {
    setPlay(false)
  }


  //  update Data on component reload
  // on react component loading
  useEffect(() => {
    retrieveTrickData(props.difficulty)
    if (props.difficulty === "beginner") {
      setRamp(RookieRamp)
    }
    else if (props.difficulty === "intermediate") {
      setRamp(IntermediateRamp)
    }
    else if (props.difficulty === "master") {
      setRamp(ProsRamp)
    }
  }, [])

  // Get skate data (async await axiox data retrieving)
  const retrieveTrickData = async (difficulty) => {
    setLoading(true)
    try {
      const res = await tricksDataService.getTricksByDifficulty(difficulty)
      setTrickData(res.data)
    }
    catch (err) {
      // console.log(err.message)
      setError("Error occurs while retrieving trick data!")
    }
    setLoading(false)
  }
  return (
    !play ?
      (
        <div >
          <p
            className="back-button"
            onClick={() => {
              props.handleDifficultyChange("");
            }}
          >
            <i class="fa-solid fa-angle-left"></i>
          </p>
          {/*if the data is loading too long*/}
          {loading && <div>Loading...</div>}
          {!loading && (
            !error ? (
              <div id="tricks">
                <img className='level-ramp-image' src={ramp} alt='' />
                <h3>{props.alley}</h3>
                <div className='tricks-list'>
                  {/* displaying the data from the API */}
                  {trickData && trickData.map((trick, i) =>
                  (
                    // render LevelContainer and send the trick and the handlePlay function
                    <LevelContainer trick={trick} key={trick._id} handlePlay={handlePlay} nr={i} difficulty={props.difficulty} />
                  )
                  )}
                </div>
              </div>
            )
              :
              (
                /* if there is some error, to inform the user */
                <div>{error}</div>
              )

          )}
        </div>
      )
      :
      (
        <TrickPage trick={currTrick} handleGoBack={handleGoBack} />
      )
  )
}

export default LevelList

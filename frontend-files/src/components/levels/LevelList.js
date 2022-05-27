import {React, useState, useEffect} from 'react'
import LevelContainer from './LevelContainer'
import tricksDataService from '../../services/tricksDataService'
import TrickPage from './TrickPage'
import "../../stylesheets/levels/LevelList.css";



const LevelList = (props) => {
  const [trickData, setTrickData] = useState([]) // trickData useState
  const [loading, setLoading] = useState(true) //for  Loading
  const [error, setError] = useState("") // for Error

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
  }


  //  update Data on component reload
  // on react component loading
  useEffect(() => {
    retrieveTrickData(props.difficulty)
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
      <div>
      <p  id="back" onClick={() => { props.handleDifficultyChange(""); }}>
        &lt;
      </p>
        {/*if the data is loading too long*/}
      {loading && <div>Loading...</div>}
      {!loading && (
        !error ? (
          <div id="tricks">
            <h3>{props.alley}</h3>
          {trickData && trickData.map((trick, i) => 
          (
              <LevelContainer trick={trick} key={i} handlePlay={handlePlay} nr={i}/>
          ))}
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
}

export default LevelList
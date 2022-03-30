import {React, useState, useEffect} from 'react'
import LevelContainer from './LevelContainer'
import tricksDataService from '../services/tricksDataService'
import { faHourglass3 } from '@fortawesome/free-solid-svg-icons'
import TrickPage from './TrickPage'
import "../stylesheets/LevelList.css";



const LevelList = (props) => {
  const [trickData, setTrickData] = useState([]) // trickData useState
  const [loading, setLoading] = useState(true) //for  Loading
  const [error, setError] = useState("") // for Error
  const [play, setPlay] = useState(false) //state if you are in the list or no

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
      console.log(res.data)
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
        {/*if the data is loading too long*/}
      {loading && <div>Loading...</div>}
      {!loading && (
        !error ? (
          <div id="tricks">
            <h3>{props.alley}</h3>
            {/* displaying the data from the API */}
          {trickData && trickData.map((trick, i) => 
          (
            // render LevelContainer and send the trick and the handlePlay function
            <LevelContainer trick={trick} key={i} handlePlay={handlePlay}/>

          )
          )}
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
      <TrickPage trick={currTrick}/>
    )
  )
}

export default LevelList
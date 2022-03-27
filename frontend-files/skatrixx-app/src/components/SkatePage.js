import {React, useState, useEffect} from 'react'
import skateDataService from '../services/skateDataService'
import SkateBoardPreview from './SkateBoardPreview';
import TrickPage from './TrickPage';
import SkateStats from './SkateStats';
import "../stylesheets/SkateStats.css"



function SkatePage() {
  const initialLastSkateData = {
    _id: "",
    speed: null,
    height: null,
    airtime: null,
    rotation: null,
    accelX: null,
    accelY: null,
    accelZ: null,
    gyroZ: null,
  }

  const [skateData, setSkateData] = useState(initialLastSkateData) // skateData useState
  const [loading, setLoading] = useState(true) // Loading
  const [error, setError] = useState(""); // Error

  //  update Data on component reload
  // on react component loading
  useEffect(() => {
    retrieveLastSkateData()
  }, [])
  
  // Get last record in skate data (async await axiox data retrieving)
  const retrieveLastSkateData = async () => {
    setLoading(true)
    try {
      const res = await skateDataService.getLastStat()
      setSkateData(res.data)
      // console.log(res.data)
    } 
    catch (err) {
      console.log(err.message)
      setError("Error occurs while retrieving skate data!")
    }
    setLoading(false)
  }

  return (
    <div>
    {loading && <div>Loading...</div>}
    {!loading && (
      !error ? (
      <div className='skateStatPage'>
        {skateData && 
        (
          <>
          <SkateBoardPreview />
          <SkateStats skateStat={skateData}/>
          </>
          // <span key={skateData._id}>{skateData.airtime}</span>
        )
        }
      </div>
      )
      :
      (
        <div>{error}</div>
      )
      
    )}
    </div>
  )
}

export default SkatePage;
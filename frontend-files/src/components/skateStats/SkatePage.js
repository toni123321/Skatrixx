import {React, useState, useEffect} from 'react'
import skateDataService from '../../services/skateDataService'
import SkateBoardPreview from './SkateBoardPreview';
import SkateStats from './SkateStats';
import "../../stylesheets/skateStats/SkateStats.css"



function SkatePage() {
  const initialLastPerformance = {
    max_height: null,
    max_airtime: null,
    avg_rotationY: null,
    avg_rotationZ: null,
    result: ""
  }

  const [skateData, setSkateData] = useState(initialLastPerformance) // skateData useState
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
      const res = await skateDataService.getLastPerformance()
      setSkateData(res.data)
    } 
    catch (err) {
      console.log(err.message)
      setError("Error occurs while retrieving skate data!")
    }
    setLoading(false)
  }

  return (
    <div>
    <SkateBoardPreview />
    {loading && <div>Loading...</div>}
    {!loading && (
      !error ? (
      <div className='skateStatPage'>
        {skateData && 
        (
          <SkateStats skateStat={skateData}/>
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
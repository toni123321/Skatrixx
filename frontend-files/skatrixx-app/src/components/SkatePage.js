import {React, useState, useEffect} from 'react'
import skateDataService from '../services/skateDataService'
import axios from 'axios'

function SkatePage() {
  const [skateData, setSkateData] = useState([]) // skateData useState
  const [loading, setLoading] = useState(true) // Loading
  const [error, setError] = useState(""); // Error

  //  update Data on component reload
  // on react component loading
  useEffect(() => {
    retrieveSkateData()
  }, [])
  
  // Get skate data (async await axiox data retrieving)
  const retrieveSkateData = async () => {
    setLoading(true)
    try {
      const res = await skateDataService.getAll()
      setSkateData(res.data)
      // console.log(res.data)
    } 
    catch (err) {
      // console.log(err.message)
      setError("Error occurs while retrieving skate data!")
    }
    setLoading(false)
  }

  return (
    <div>
    <div>SkatePage</div>
    {loading && <div>Loading...</div>}
    {!loading && (
      !error ? (
        <div>
        {skateData.map(item => 
        (
          <span key={item._id}>{item.airtime}</span>
        )
        )}
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

export default SkatePage
import {React, useEffect, useState} from 'react'
import "../../stylesheets/levels/Statistic.css"
import good from "../../images/good.gif"
import skateDataService from '../../services/skateDataService'
import { Link } from 'react-router-dom';

function Statistic(props) {
  const initialLastPerformance = {
    max_height: null,
    max_airtime: null,
    avg_rotationY: null,
    avg_rotationZ: null,
    result: ""
  }
  const [skateData, setSkateData] = useState(initialLastPerformance) // skateData useState


  useEffect(() => {
    retrieveLastSkateData()
  }, [])
  
  // Get last record in skate data (async await axiox data retrieving)
  const retrieveLastSkateData = async () => {
    try {
      const res = await skateDataService.getLastPerformance()
      setSkateData(res.data)
    } 
    catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className='performance-wrapper'>
      <div className="performance-container container-border">
        <div className="default-container"></div>
        <h3 id="performance-title">Overall performance</h3>
        <p id="performance-result">{skateData && skateData.result}</p>
        <img src={good} alt="good" id="performance-img"/>
        <div class="statistics-container">
            {skateData && (
              <div class="stats">
                  <div className="stat">
                      <p className="stat-value" class="mes">{skateData.max_height} cm</p>
                      <p className="stat-text" class="st-title">Height</p>
                  </div>
                  <div className="stat">
                      <p className="stat-value" class="mes">{skateData.max_airtime} sec</p>
                      <p className="stat-text" class="st-title">Airtime</p>
                  </div>
                  <div className="stat">
                      <p className="stat-value" class="mes">{skateData.avg_rotationY} °</p>
                      <p className="stat-text" class="st-title">Horizontal</p>
                      <p className="stat-text" class="st-title">Rotation</p>
                  </div>
                  <div className="stat">
                      <p className="stat-value" class="mes">{skateData.avg_rotationZ} °</p>
                      <p className="stat-text" class="st-title">Vertical</p>
                      <p className="stat-text" class="st-title">Rotation</p>
                  </div>
              </div>
            )}
        </div>
        <Link className="default-link" to={'/game'}>
          <button className="default-button" id="solo-game-play-again">Play again</button>
        </Link>
      </div>
     
    </div>
  )
}
export default Statistic
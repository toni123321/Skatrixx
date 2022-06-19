import {React, useEffect, useState} from 'react'
import "../../stylesheets/levels/Statistic.css"
import good from "../../images/good.gif"
import skateDataService from '../../services/skateDataService'
import { Link } from 'react-router-dom';
import Loading from '../Loading';

function Statistic(props) {

  const [skateData, setSkateData] = useState(null) // skateData useState

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
  if(skateData !== null) {
  return (
    <div className='performance-wrapper'>
      <div className="performance-container container-border">
        <div className="default-container"></div>
        <p id="performance-result">{skateData && skateData.result}</p>
        <img src={skateData && skateData.result_gif} alt="good" id="performance-img"/>
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
  )} else {return (<Loading/>)}
}
export default Statistic
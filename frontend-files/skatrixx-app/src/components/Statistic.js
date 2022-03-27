import {React, useEffect} from 'react'
import "../stylesheets/Statistic.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Statistic() {

  let speed = 85;
  let height = 25;
  let rotation = 65;
  let airtime = 45;

  useEffect(() => {
    
  }, [])
  
  return (
    <div className='statistics'>
        {/* <div className="progress" id='speed' role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
        <div className="progress" id='height' role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
        <div className="progress" id='rotation' role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
        <div className="progress" id='airtime' role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div> */}
        <div id='progress-bars'>
          <div>
            <h3 className="title">Speed</h3>
          <CircularProgressbar className='bar' value={speed} text={`${speed}%`} />;
          <h3 className="title">Height</h3>
          <CircularProgressbar className='bar' value={height} text={`${height}%`} />;
          </div>
          <div>
          <h3 className="title">Rotation</h3>
          <CircularProgressbar className='bar' value={rotation} text={`${rotation}%`} />;
          <h3 className="title">Airtime</h3>
          <CircularProgressbar className='bar' value={airtime} text={`${airtime}%`} />;
          </div>
        </div>
        <div id="buttons">
        <button id="undo">Undo</button>
        <button id="save">Save</button>
        </div>
    </div>
  )
}
export default Statistic
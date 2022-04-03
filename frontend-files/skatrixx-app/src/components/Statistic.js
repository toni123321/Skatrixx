import {React, useEffect, useState} from 'react'
import "../stylesheets/Statistic.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Statistic() {

  let speed = 85;
  let height = 25;
  let rotation = 65;
  let airtime = 45;
  
  const [ovrStat, setOvrStat] = useState(50)

  return (
    <div className='statistics'>
        <div id='progress-bars'>         
          <h3 className="title">Statistic</h3>
          <div>
            <CircularProgressbar className='bar' value={ovrStat} text={ovrStat} />;
          </div>
        </div>
        <div id="stat-btns">
        <button id="undo">Undo</button>
        <button id="save">Save</button>
        </div>
    </div>
  )
}
export default Statistic
import {React, useState} from 'react';
import speedImg from "../images/skateStats/speed.png"
import heightImg from "../images/skateStats/height.png"
import rotaitonImg from "../images/skateStats/rotate.png"
import airtimeImg from "../images/skateStats/airtime.png"

function SkateStats({skateStat}) {
    const [stat, setStat] = useState(skateStat)

    return (
        <div className='skate-stat-parent'>
        <div className="skate-stat-container">
            <div className="skate-stat-item">
                <img src={speedImg} alt="Speed"/>
                <div>
                    <div>{stat.speed}</div>
                    <div className='skate-stat-text'>Speed</div>
                </div>
            </div>
            <div className="skate-stat-item">
                <img src={heightImg} alt="Height"/>
                <div>
                    <div>{stat.height}</div>
                    <div className='skate-stat-text'>Height</div>
                </div>
            </div>
            <div className="skate-stat-item">
                <img src={rotaitonImg} alt="Rotation"/>
                <div>
                    <div>{stat.rotation}</div>
                    <div className='skate-stat-text'>Rotation</div>
                </div>
            </div>
            <div className="skate-stat-item">
                <img src={airtimeImg} height="45px" width="45px" alt="Airtime"/>
                <div>
                    <div>{stat.airtime}</div>
                    <div className='skate-stat-text'>Airtime</div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default SkateStats;
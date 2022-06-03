import {React, useState} from 'react';
import speedImg from "../../images/skateStats/speed.png"
import heightImg from "../../images/skateStats/height.png"
import rotaitonImg from "../../images/skateStats/rotate.png"
import airtimeImg from "../../images/skateStats/airtime.png"

function SkateStats({skateStat}) {
    const [stat, setStat] = useState(skateStat)

    return (
        <div className='skate-stat-parent'>
        <div className="skate-stat-container">
            <div className="skate-stat-item">
                <img src={speedImg} alt="Speed"/>
                <div className='stat'>
                    <div className='value'>
                        <div>{stat.speed}</div>
                        <div className='skate-stat-dimensions'>km/h</div>
                    </div>
                    <div className='skate-stat-text'>Speed</div>
                </div>
            </div>
            <div className="skate-stat-item">
                <img src={heightImg} alt="Height"/>
                <div className='stat'>
                    <div className='value'>
                        <div>{stat.height}</div>
                        <div className='skate-stat-dimensions'>cm</div>
                    </div>
                    <div className='skate-stat-text'>Height</div>
                </div>
            </div>
            <div className="skate-stat-item">
                <img src={rotaitonImg} alt="Rotation"/>
                <div className='stat'>
                    <div className='value'>
                        <div>{stat.rotation}</div>
                        <div className='skate-stat-dimensions top'>°</div>
                    </div>
                    <div className='skate-stat-text'>Rotation</div>
                </div>
            </div>
            <div className="skate-stat-item">
                <img src={airtimeImg} height="45px" width="45px" alt="Airtime"/>
                <div className='stat'>
                    <div className='value'>
                        <div>{stat.airtime}</div>
                        <div className='skate-stat-dimensions'>sec</div>
                    </div>
                    <div className='skate-stat-text'>Airtime</div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default SkateStats;
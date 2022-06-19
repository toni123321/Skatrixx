import {React, useState} from 'react';
import heightImg from "../../images/skateStats/height.png"
import rotaitonImg from "../../images/skateStats/rotate.png"
import airtimeImg from "../../images/skateStats/airtime.png"

function SkateStats({skateStat}) {
    const [stat, setStat] = useState(skateStat)

    return (
        <div className='skate-stat-parent'>
        <div className="skate-stat-container">
            <div className="skate-stat-item">
                <img src={heightImg} alt="Height"/>
                <div className='stat'>
                    <div className='value'>
                        <div>{stat.max_airtime}</div>
                        <div className='skate-stat-dimensions'>cm</div>
                    </div>
                    <div className='skate-stat-text'>Height</div>
                </div>
            </div>
            <div className="skate-stat-item">
                <img src={airtimeImg} height="45px" width="45px" alt="Airtime"/>
                <div className='stat'>
                    <div className='value'>
                        <div>{stat.avg_rotationZ}</div>
                        <div className='skate-stat-dimensions'>sec</div>
                    </div>
                    <div className='skate-stat-text'>Airtime</div>
                </div>
            </div>
            <div className="skate-stat-item">
                <img src={rotaitonImg} alt="Rotation"/>
                <div className='stat'>
                    <div className='value'>
                        <div>{stat.avg_rotationY}</div>
                        <div className='skate-stat-dimensions top'>°</div>
                    </div>
                    <div className='skate-stat-text'>Vertical</div>
                </div>
            </div>
            <div className="skate-stat-item">
                <img src={rotaitonImg} alt="Rotation"/>
                <div className='stat'>
                    <div className='value'>
                        <div>{stat.avg_rotationZ}</div>
                        <div className='skate-stat-dimensions top'>°</div>
                    </div>
                    <div className='skate-stat-text'>Horizontal</div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default SkateStats;
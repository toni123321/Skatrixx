import React, { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import "../../stylesheets/skateGame/SkateGame.css"
import SkateGameParticipant from './SkateGameParticipant';
import SkateGamePick from './SkateGamePick';
import SkateGameVote from './SkateGameVote';

function SkateGame({}) {

  const [voting, setVoting] = useState(false);
  const [picking, setPicking] = useState(false)
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(30);

  const renderTime = ({ remainingTime }) => {
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  }

  const checkEvent = () => {
    if(picking) {return (<SkateGamePick/>)}
    if(voting) {return (<SkateGameVote/>)}
  }


  return (
    <div className='skate-game'>
      <p className='skate-game-notifier'>Eric is now attempting the Ollie</p>
      <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={duration}
            colors="#CF2121"
            onComplete={() => [true, 1000]}
          >
            {renderTime}
          </CountdownCircleTimer>
          <div className='skate-game-participants'>
            <SkateGameParticipant userId={"6249734a528e0cad7bc2aca2"}/>
            <SkateGameParticipant userId={"6249734a528e0cad7bc2aca2"}/>
            <SkateGameParticipant userId={"6249734a528e0cad7bc2aca2"}/>
          </div>
          {checkEvent()}
    </div>
  )
  }

export default SkateGame
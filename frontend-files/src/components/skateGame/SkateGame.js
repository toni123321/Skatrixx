import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import "../../stylesheets/skateGame/SkateGame.css"
import SkateGameParticipant from './SkateGameParticipant';
import SkateGamePick from './SkateGamePick';
import SkateGameVote from './SkateGameVote';
import { getSkateGame } from '../../services/skateGameService';
import Loading from '../Loading';

function SkateGame() {

  const { id } = useParams()
  const [voting, setVoting] = useState(false);
  const [picking, setPicking] = useState(false)
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(30);
  const [skateGame, setSkateGame] = useState(undefined);

  const loadGame = async () => {
    setSkateGame(await getSkateGame(id))
  }

  useEffect(() => {
    loadGame()
  }, [])
  

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

if(skateGame !== undefined) {
  return (
    <div className='skate-game'>
      <p className='skate-game-notifier'>Eric is now attempting the Ollie</p>
      {console.log(skateGame)}
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
            {skateGame.players.map((player,index) => (
              <SkateGameParticipant userId={player} key={index}/>
            ))}
          </div>
          {checkEvent()}
    </div>
  )} else {return (<Loading/>)}
  }

export default SkateGame
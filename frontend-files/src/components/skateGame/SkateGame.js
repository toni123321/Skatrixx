import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import "../../stylesheets/skateGame/SkateGame.css"
import SkateGameParticipant from './SkateGameParticipant';
import SkateGamePick from './SkateGamePick';
import SkateGameVote from './SkateGameVote';
import { getSkateGame } from '../../services/skateGameService';
import Loading from '../Loading';
import { getUser } from '../../services/userService';

function SkateGame() {

  const { id } = useParams()
  const [voting, setVoting] = useState(false);
  const [score, setScore] = useState({
    
  })
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [durationTrick, setDurationTrick] = useState(30);
  const [durationVote, setDurationVote] = useState(10);
  const [skateGame, setSkateGame] = useState(undefined);

  const loadGame = async () => {
    setSkateGame(await getSkateGame(id))
  }

  useEffect(() => {
    loadGame()
  }, [])
  

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0 && !voting) {
      setVoting(true)
      remainingTime = durationVote
      setKey((prevKey) => prevKey + 1);
    }
    if(remainingTime === 0 && voting) {
      setVoting(false)
      remainingTime = durationTrick
      setKey((prevKey) => prevKey + 1);
    }
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  }

  const checkEvent = () => {
    if(voting) {return (<SkateGameVote/>)}
  }

if(skateGame !== undefined) {
  return (
    <div className='skate-game'>
      {/* <p className='skate-game-notifier'>{skateGame.players[skateGame.trickPicker]} is now <br/> attempting the Ollie</p> */}
      <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={voting ? durationVote : durationTrick}
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
import React, { useState, useEffect } from 'react';
import "../../stylesheets/levels/TrickPage.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import moduleStateService from "../../services/moduleStateService"
import skateDataService from '../../services/skateDataService'
import Statistic from './Statistic';
import { useParams, useNavigate } from "react-router-dom";

const TrickPage = (props) => {
    // Timer
    const [key, setKey] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(60);
    const [isListening, setIsListening] = useState(true);
    const { id } = useParams()
    const navigate = useNavigate();

    const startTrickAttempt = () => {
      setIsPlaying(true)
      moduleStateService.startTrick()
    }

    const endTrickAttempt = () => {
      setIsPlaying(false)
      moduleStateService.endTrick()
      skateDataService.processLastPerformance()
      navigate(`/trick/${id}/stat`)
    }

    const renderTime = ({ remainingTime }) => {
      if (remainingTime === 0) {
        endTrickAttempt()
      }
    
      return (
        <div className="timer">
          <div className="text">Remaining</div>
          <div className="value">{remainingTime}</div>
          <div className="text">seconds</div>
        </div>
      );
    };

    const commands = [
      {
        command: ["start", "begin", "go", "now"],
        callback: ({command}) => {
          startTrickAttempt()
        }
      },
      {
        command: ["stop", "pause", "wait"],
        callback: ({command}) => {
          endTrickAttempt()
        }
      },
      {
        command: ["reset", "restart", "again", "refresh"],
        callback: ({command}) => {
          setKey((prevKey) => prevKey + 1);
          setIsPlaying(false)
        }
      },
      {
        command: "clear",
        callback: ({resetTranscript}) => resetTranscript()
      }
    ]

    //Speech command
    const {
      listening,
      browserSupportsSpeechRecognition,
      transcript
    } = useSpeechRecognition( {commands} );
    const startListening = () => SpeechRecognition.startListening({ continuous: true });
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  

    const changeMicrophoneState = () => {
      if (isListening) {
        SpeechRecognition.stopListening()
        setIsListening(false)
      }
      else{
        SpeechRecognition.startListening()
        setIsListening(true)
      }
    }
 
    return (
      <div className='timer-container'>
        <p
            className="back-button"
            onClick={() => {
              window.history.back()
            }}
          >
          <i class="fa-solid fa-angle-left"></i>
        </p>
        <div className="timer-circle-wrapper">
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={duration}
            colors="#CF2121"
            onComplete={() => [true, 1000]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <div className="speech-recognition-wrapper">
          <i class={isListening ? "fas fa-microphone fa-2x": "fa-solid fa-microphone-slash fa-2x"} onClick={changeMicrophoneState}></i>
          <p>{isListening ? "Listening to your commands..." : "Microphone turn off"}</p>
          <div>{transcript}</div>
        </div>
        <div className="button-wrapper">
          <i className="fa-solid fa-circle-pause" onClick={endTrickAttempt}></i>
          <i className="fa-solid fa-circle-play" onClick={startTrickAttempt}></i>
          <i className="fa-solid fa-clock-rotate-left"
          onClick={() => {
            setKey((prevKey) => prevKey + 1);
            setIsPlaying(false);
          }}
          ></i>
        </div>
      </div>
    )
 }


export default TrickPage;

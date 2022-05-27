import React, { useState, useEffect } from 'react';
import "../../stylesheets/levels/TrickPage.css";
import Timer from 'simple-circle-timer'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const TrickPage = () => {

    // Timer
    const [ timerExists, setTimerExists ] = useState( false )
    const [ running, setRunning ] = useState( true )
    const [ reset, setReset ] = useState( false )

    useEffect(() => {
      mountPaused()
    }, [])


    //     useEffect(() => {
    //     SpeechRecognition.startListening({continues:true})
    //     console.log("listeing starts")
    // }, [])

  
    //new timer is loaded in a paused state, awaiting 'play' command
    const mountPaused = () => {
      setTimerExists( true )
      setRunning( false )
    }

    //Speech command
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const commands = [
      {
        command: ["Start *"],
        callback: ({command}) => setMessage({command}),
        setRunning: true
      },
      {
        command: "clear",
        callback: ({resetTranscript}) => resetTranscript()
      }
    ]
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  
 
    return (
      <>
      <div className='timerContainer'>
      <div className='speechCommand'>
      <div>
      <p className='speechText'>{transcript}</p>
        {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
        <i class="fas fa-microphone fa-2x" id="timerIcons" onClick={SpeechRecognition.startListening}> {listening ? 'on' : 'off'}</i>
        {/* <button onClick={SpeechRecognition.startListening}>Start</button> */}
      </div>
      </div>
      {timerExists ? <Timer id={'timer'} running={running} setRunning={setRunning} reset={reset} setReset={setReset} fillColor={'rgba(166, 31, 31, 1)'} bgColor={'#101010'}/> : null }
        <div className={'iconsContainer'} style={{ display: 'flex' }}>
          {/* <button onClick={() => setRunning( true )}>Play</button> */}
          <i class="fas fa-play fa-2x" id="timerIcons" onClick={() => setRunning( true )}></i>
          <i class="fa-solid fa-pause fa-2x" id="timerIcons" onClick={() => setRunning( false )}></i>
          <i class="fa-solid fa-undo fa-2x" id="timerIcons" onClick={() => setReset( true )}></i>
          </div>
        </div> 
      </>
    )
 }


export default TrickPage;

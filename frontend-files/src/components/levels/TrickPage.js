import React, { useState, useEffect } from 'react';
import "../../stylesheets/levels/TrickPage.css";
import Timer from 'simple-circle-timer'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const TrickPage = () => {

    // Timer
    const [ timerExists, setTimerExists ] = useState( false )
    const [ running, setRunning ] = useState( true )
    const [ reset, setReset ] = useState( false )

   //new timer is loaded in a paused state, awaiting 'play' command
   const mountPaused = () => {
     setTimerExists( true )
     setRunning( false )
   }

    useEffect(() => {
      mountPaused()
    }, [])


      useEffect(() => {
        startListening()
 }, [])

    const commands = [
      {
        command: ["start", "begin", "go", "now"],
        callback: ({command}) => setRunning(true),
        setRunning: true
      },
      {
        command: ["stop", "pause", "wait"],
        callback: ({command}) => setRunning(false),
        setRunning: true
      },
      {
        command: ["reset", "restart", "again", "refresh"],
        callback: ({command}) => setReset(true),
        setRunning: true
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
        } = useSpeechRecognition( {commands} );
        const startListening = () => SpeechRecognition.startListening({ continuous: true });
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  
 
    return (
      <>
      <div className='timerContainer'>
      <div className='speechCommand'>
      <div>
        <i class="fas fa-microphone fa-2x" id="timerIcons" onClick={SpeechRecognition.startListening}> {listening ? 'on' : 'off'}</i>
      </div>
      </div>
      {timerExists ? <Timer id={'timer'} running={running} setRunning={setRunning} reset={reset} setReset={setReset} fillColor={'rgba(166, 31, 31, 1)'} bgColor={'#101010'} onChange={startTimerWithSpeech}/> : null }
        <div className={'iconsContainer'} style={{ display: 'flex' }}>
          <i class="fas fa-play fa-2x" id="timerIcons" onClick={() => setRunning( true )}></i>
          <i class="fa-solid fa-pause fa-2x" id="timerIcons" onClick={() => setRunning( false )}></i>
          <i class="fa-solid fa-undo fa-2x" id="timerIcons" onClick={() => setReset( true )}></i>
          </div>
        </div> 
      </>
    )
 }


export default TrickPage;

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
        startListening()
        mountPaused()
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
          transcript
        } = useSpeechRecognition( {commands} );
        const startListening = () => SpeechRecognition.startListening({ continuous: true });
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  
 
    return (
      <div className='timerContainer'>
      <div className='speechCommand'>
      </div>
      {timerExists ? <Timer id={'timer'} running={running} setRunning={setRunning} reset={reset} setReset={setReset} fillColor={'rgba(166, 31, 31, 1)'} bgColor={'#101010'}/> : null }
      <div>
        <i class="fas fa-microphone fa-2x" onClick={SpeechRecognition.startListening}></i>
        <p>Listening to your commands...</p>
        <p>{transcript}</p>
      </div>
        </div> 
    )
 }


export default TrickPage;

import React, { useState, useEffect } from 'react';
import "../../stylesheets/levels/TrickPage.css";
import Timer from 'simple-circle-timer'

function TrickPage() {

  
    const [ timerExists, setTimerExists ] = useState( false )
    const [ running, setRunning ] = useState( true )
    const [ reset, setReset ] = useState( false )

    useEffect(() => {
      mountPaused()
    }, [])
  
    //new timer is loaded in a paused state, awaiting 'play' command
    const mountPaused = () => {
      setTimerExists( true )
      setRunning( false )
    }

    
    return (
      <>
      <div className='timerContainer'>
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

import { React, useState, useEffect } from "react";
import "../../stylesheets/levels/TrickPage.css";
import { useTimer } from "react-timer-hook";
import Statistic from "./Statistic";
import { endTrick, startTrick } from "../../services/moduleStateService";

function TrickPage(props) {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60); // 1 minute timer
  const { seconds, reset, start, pause } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => console.warn("onExpire called"),
  });
  const [isStarted, setIsStarted] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false)

  const toggleStart = async () => {

    if (!isStarted) {
      start();
      await startTrick()
    } else {
      pause();
      setTimerFinished(true)
      await endTrick()
    }

    setIsStarted(!isStarted);
  };

  return (
   !timerFinished ? (
    <div>
    <p
      id="back"
      onClick={() => {
        props.handleGoBack();
      }}
    >
      &lt;
    </p>
    <h2 id="trickName">{props.trick.name}</h2>
    <div id="VideoDiv">
      <iframe
        id="videoFrame"
        src={props.trick.videoLink}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
      />{" "}
    </div>
    <div className="timer-parent">
      <div className="timer">
        <div className="time-text">Time:</div>
        <div className="time-sec">
          <div id="sec">{seconds} sec</div>
          <i className="fa-solid fa-hourglass"></i>
        </div>
      </div>
    </div>
    <h5 id="des-title">Description:</h5>
    <p id="des">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>

    <button type="button" onClick={toggleStart}>
      {!isStarted ? "Start" : "Done"}
    </button>
    
  </div>
   ): (
   <Statistic trick={props.trick}/>
   )
  );
}

export default TrickPage;

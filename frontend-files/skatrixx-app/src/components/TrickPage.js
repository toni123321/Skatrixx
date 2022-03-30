import { React, useState, useEffect } from "react";
import "../stylesheets/TrickPage.css";
import { useTimer } from "react-timer-hook";
import Statistic from "./Statistic";

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

  const toggleStart = () => {

    if (!isStarted) {
      start();
    } else {
      pause();
      setTimerFinished(true)

    }

    setIsStarted(!isStarted);
  };

  return (
   !timerFinished ? (
    <div>
    <h2 id="TrickName">{props.trick.name}</h2>
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

    <h5>Description:</h5>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>

    <button type="button" onClick={toggleStart}>
      {!isStarted ? "Start" : "Done"}
    </button>
    <div id="sec">{seconds}</div>
  </div>
   ): (
   <Statistic/>
   )
  );
}

export default TrickPage;

import { React, useState, useEffect } from "react";
import "../../stylesheets/levels/TrickPage.css";

function TrickPage(props) {

  return (
    <div>
    <div id="VideoDiv">
      <iframe
        id="videoFrame"
        src={props.trick.videoLink}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />
    </div>
    <button type="button" id="trickBtn">Start</button>
  </div>
  )
}

export default TrickPage;

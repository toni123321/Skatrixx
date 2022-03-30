import {React, useState, useEffect} from 'react'
import "../stylesheets/TrickPage.css"

function TrickPage(props) {

  return (
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

      <button type="button" onclick="">
        START
      </button>
    </div>
  );
}

export default TrickPage;
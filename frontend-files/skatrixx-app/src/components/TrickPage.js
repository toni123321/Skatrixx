import {React, useState, useEffect} from 'react'
import "../stylesheets/TrickPage.css"

function TrickPage() {

  return (
    <div>
      <h2 id="TrickName">Ollie</h2>
      <div id="VideoDiv">
        <iframe
          id="videoFrame"
          src="https://www.youtube.com/embed/E7wJTI-1dvQ"
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
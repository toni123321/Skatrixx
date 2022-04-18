//слагам кмаерата от сайта
import React, { useState, useRef } from "react";
import {Camera} from "react-camera-pro";

function CameraComponent() {
    const camera = useRef(null);
    const [image, setImage] = useState(null);
  return (
      <div>
    <Camera ref={camera} />
    <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
    <img src={image} alt='skateboard'/>
  </div>
  )
}

export default CameraComponent
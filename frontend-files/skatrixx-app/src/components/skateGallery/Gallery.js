import React, {useState} from 'react'

import "../../stylesheets/Gallery.css"
import image1 from "../../images/skateboards/1.jpg"
import image2 from "../../images/skateboards/2.jpg"
import image3 from "../../images/skateboards/3.jpg"
import image4 from "../../images/skateboards/4.jpg"
import CameraComponent from './CameraComponent'

function Gallery() {

  const [viewedImage, setViewedImage] = useState(undefined);
  const images = [
    image1,
    image2,
    image3,
    image4,
    image1,
    image2,
    image3,
    image1,
    image2,
    image3,
    image4
  ]

  const handleOpenImage = (img) => {
    setViewedImage(img);
  }
  return (
    <div className='gallery'>
      <CameraComponent/>
      {/* {images.map(image => (
        <div className='gallery-container' onClick={() => {handleOpenImage(image)}}>
          <img src={image} alt=''/>
        </div>
      ))}
      {viewedImage !== undefined ? 
      <div id='viewImage'>
        <p onClick={() => {handleOpenImage(undefined)}}>X</p>
        <img src={viewedImage} alt=''/>
      </div> : ''} */}
    </div>
  )
}

export default Gallery

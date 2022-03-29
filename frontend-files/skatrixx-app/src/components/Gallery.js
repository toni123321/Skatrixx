import React from 'react'

import "../stylesheets/Gallery.css"
import image from "../images/badges/Badge3.png"

function Gallery() {

  return (
    <div className='gallery'>
        <div className='gallery-container'>
            <img src={image} alt=''/>
        </div>
        <div className='gallery-container'>
            <img src={image} alt=''/>
        </div>
        <div className='gallery-container'>
            <img src={image} alt=''/>
        </div>
    </div>
  )
}

export default Gallery
import React, {useState} from 'react'
import "../../stylesheets/gallery/Gallery.css"
import image1 from "../../images/skateboards/1.jpg"
import image2 from "../../images/skateboards/2.jpg"
import image3 from "../../images/skateboards/3.jpg"
import image4 from "../../images/skateboards/4.jpg"
import imageAdd from "../../images/add new image.png"
import CameraComponent from './CameraComponent' 
import UploadImage from './UploadImage' 
import Modal from './Modal' 
import { UnpackDepthRGBAShader } from 'three-stdlib'
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
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const [galleryMode, setgalleryMode] = useState('Gallery');
  const handleChange = () => {
    if(galleryMode === 'Gallery') {
      return (
        <div className='gallery'>
          {/* <CameraComponent/> */}
          <img src={imageAdd} id="addimg" onClick={togglePopup}></img>
        {isOpen && <Modal
          content={<>
           <button className="skateBtn" id="upload" onClick={() => {setgalleryMode("Upload")}}>Upload Image</button>
           <button className="skateBtn" id="camera" onClick={() => {setgalleryMode("Camera")}}>Camera</button>
          </>}
          handleClose={togglePopup}
          />}
          {images.map(image => (
            <div className='gallery-container' onClick={() => {handleOpenImage(image)}}>
              <img src={image} alt=''/>
            </div>
          ))}
          {viewedImage !== undefined ? 
          <div id='viewImage'>
            <p onClick={() => {handleOpenImage(undefined)}}>X</p>
            <img src={viewedImage} alt=''/>
          </div> : ''}
        </div>
      )
    }
    else if(galleryMode === 'Upload'){
      return(
        <div className='friends-tab'>
          <UploadImage/> 
        </div>
    )
    } 
    else if(galleryMode === 'Camera'){
      return(
        <div className='friends-tab'>
            <CameraComponent/>
        </div>
    )
    }    
 
}
return(
  handleChange()   
)
}

export default Gallery

import React, {useState, useEffect} from 'react'
import "../../stylesheets/gallery/Gallery.css"
import {storage} from '../../services/firebaseService'
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage" //reference where in our bucket is the image,listing all the files
import {v4} from 'uuid' //for randomizing letters
import image1 from "../../images/skateboards/1.jpg"
import image2 from "../../images/skateboards/2.jpg"
import image3 from "../../images/skateboards/3.jpg"
import image4 from "../../images/skateboards/4.jpg"
import imageAdd from "../../images/add new image.png"
import CameraComponent from './CameraComponent' 
import UploadImage from './UploadImage' 
import Modal from './Modal'


function Gallery() {
  // --- useStates or ref

  // View certain image
  const [viewedImage, setViewedImage] = useState(undefined);
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrls, setImageUrls] = useState([]);
  const [outputImg, setOutputImg] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [galleryMode, setgalleryMode] = useState('Gallery');
  const imageListRef = ref(storage, "images/")
  
  // const images = [
  //   image1,
  //   image2,
  //   image3,
  //   image4,
  //   image1,
  //   image2,
  //   image3,
  //   image1,
  //   image2,
  //   image3,
  //   image4
  // ]
  
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, [])

  // --- Methods
  const onImageChosen = (event) => {
    setImageUpload(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      setOutputImg(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleOpenImage = (img) => {
    setViewedImage(img);
  }
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const uploadFile = () => {
    if (imageUpload == null) return;
    //functions from firebase
    ////the name and the path where we store it as we are making folder as well as to make it unique
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`) 
    //where to be upload and the image itself 
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url])
      })
    })
    togglePopup()
  }
  
  
  const handleChange = () => {
    if(galleryMode === 'Gallery') {
      return (
        <div className='gallery'>
        {isOpen && <Modal
          content={<>
          <div id="outputImgContainer">
            {outputImg !== "" ? (<img src={outputImg} id="outputImg" alt=""/>) : (<></>)}
            <button onClick={uploadFile}> Upload Image</button>
          </div>
          </>}
          handleClose={togglePopup}
          />}
          <div className='gallery-container'>
                <label htmlFor="image_input" >
                  <img src={imageAdd} alt="upload-button" id="uploading" onClick={togglePopup}/>
                </label>
                <input type="file" id="image_input" name="file"  onChange={onImageChosen}></input>
              {/* <img src={imageAdd} id="addimg" ></img> */}
          </div>
          {imageUrls.map(image => (
            <div className='gallery-container' onClick={() => {handleOpenImage(image)}}>
              <img src={image}  className="galleryImage" alt=''/>
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
}
return(
  handleChange()   
)
}


export default Gallery

import React, {useState, useEffect} from 'react'
import "../../stylesheets/gallery/Gallery.css"
import {storage} from '../../services/firebaseService'
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage" //reference where in our bucket is the image,listing all the files
import {v4} from 'uuid' //for randomizing letters
import imageAdd from "../../images/add new image.png"
import gallery from "../../images/Image Gallery.png"
import Modal from './Modal'
import skateboardImage from '../../services/skateGallery'
import { loggedUser } from '../../services/api_client';
import Loading from '../Loading'


function Gallery() {
  // --- useStates or ref
 
  // View certain image
  const [viewedImage, setViewedImage] = useState(undefined)
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrls, setImageUrls] = useState([])
  const [outputImg, setOutputImg] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [galleryMode, setgalleryMode] = useState('Gallery')
  const imageListRef = ref(storage, "images/")
  const [images, setImages] = useState([])

  // currUser
  const [userId, setUserId] = useState("")
  const [loading, setLoading] = useState(true) // Loading

  
  useEffect(() => {
    getSkateboardImages()
    setUserId(loggedUser)
  }, [])

  useEffect(() => {
    getSkateboardImages()
  }, [images.length])


  const getSkateboardImages = async (user_id) => {
    setLoading(true)
    const skateboardImages = await skateboardImage.getAllByUserId()
    setImages(skateboardImages.data)
    setLoading(false)
  }

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
    if(!isOpen){
      setImageUpload(null);
      setOutputImg(null);
    }
  }
  const uploadFile = () => {
    if (imageUpload == null) return;
    //functions from firebase
    ////the name and the path where we store it as we are making folder as well as to make it unique
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`) 
    //where to be upload and the image itself 
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        //setImageUrls((prev) => [...prev, url])
        const data = {
          user_id: userId,
          dateAdded: Date.now(),
          image: url
        }
        const newSkateImage = postImage(data)
        setImages(prev => [...prev, newSkateImage])
        
      })
    })
    togglePopup()
  }

  const postImage = async (data) => {
    return await skateboardImage.uploadImage(data);
  }
  
  
  const handleChange = () => {
    if(galleryMode === 'Gallery') {
      return (
        <div className='gallery'>
        {isOpen && <Modal
          content={<>
          <div id="outputImgContainer">
            <div id="imageFrame" className={`${outputImg === null ? 'imageFrame-selectFiles': ''}`}>
            {outputImg !== null ? 
            (<img src={outputImg} id="outputImg" alt=""/>) 
            : 
            (
                <div id="selectFilesBtn">
                  <label htmlFor="image_input" >
                    <img src={gallery} alt="upload-button" id="uploading"/>
                    <p>Select skate image...</p>
                  </label>
                  <input type="file" id="image_input" name="file" onChange={onImageChosen}></input>
                </div>
            )}
            </div>
            <button className='uploadImage default-button' sid="uploadBtn" onClick={uploadFile}> Upload Image</button>
          </div>
          </>}
          handleClose={togglePopup}
          />}
          <div className='gallery-container' id="add_new_image">
                  <label htmlFor="image_input" onClick={togglePopup}>
                    {/* <img src={imageAdd} alt="upload-button" id="uploading" onClick={togglePopup}/> */}
                    <i class="fa-solid fa-circle-plus"></i>
                    <p>New one</p>
                  </label>
                  <input type="file" id="image_input" name="file"  onChange={onImageChosen}></input>
          </div>
          {loading && <Loading/>}
          {images &&
            images.map(image => (
              <div className='gallery-container' onClick={() => {handleOpenImage(image.image)}}>
                <img src={image.image}  className="galleryImage" alt=''/>
              </div>
            ))
          }
          {viewedImage !== undefined ? 
          <div id='viewImage'>
            <p onClick={() => {handleOpenImage(undefined)}}><i class="fa-solid fa-xmark"></i></p>
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

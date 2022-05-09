import React, { useState, useRef, useEffect } from "react";
// import {Camera} from "react-camera-pro";
import "../../stylesheets/CameraComponent.css"
import {storage} from '../../services/firebase'
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage" //reference where in our bucket is the image,listing all the files
import {v4} from 'uuid' //for randomizing letters

function CameraComponent() {
    // const camera = useRef(null);
    // const [numberOfCameras, setNumberOfCameras] = useState(0);
    const [image, setImage] = useState(null);
    const [imageUpload, setImageUpload] = useState(null)
  const [imageUrls, setImageUrls] = useState([]);

  const imageListRef = ref(storage, "images/")

  const uploadFile = () => {
    if (imageUpload == null) return;
    //functions from firebase
    ////the name and the path where we store it as we are making folder as well as to make it unique
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`) 
    //where to be upload and the image itself 
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      })
      
    }
 )}
 useEffect(() => {
  listAll(imageListRef).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  });
}, []);
  return (
      <div>
           {/* image upload will take the value of the input and to access the file and can access multiple and put them in array */}
           <input
           type="file"
           onChange={(event) => {
             setImageUpload(event.target.files[0]);
           }}
         />
         <button onClick={uploadFile}> Upload Image</button>
         {imageUrls.map((url) => {
           return <img src={url} />;
         })}
        {/* <Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras}/>
        <button id="cameraBtn" onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
        <div id="tookImg">
        <img id="taken" src={image} alt='skateboard'/>
        </div>
        <button
        hidden={numberOfCameras <= 1}
        onClick={() => {
          camera.current.switchCamera(); */}
        }}
      />
    </div>
  )
}

export default CameraComponent
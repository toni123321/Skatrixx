import {useState, useEffect} from "react";  
import {storage} from '../../services/firebaseService'
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage" //reference where in our bucket is the image,listing all the files
import {v4} from 'uuid' //for randomizing letters
import imageAdd from "../../images/add new image.png"
// import { set } from 'mongoose';
// something with rules only people logged in
// register the app in project settings 

function UploadImage() {
  const [imageUpload, setImageUpload] = useState(null)
  const [imageUrls, setImageUrls] = useState([]);
  const [outputImg, setOutputImg] = useState(null)

  const imageListRef = ref(storage, "images/")

  const uploadFile = () => {
    if (imageUpload == null)      return;
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
 const onImageChosen = (event) => {
  setImageUpload(event.target.files[0])
  if (event.target.files && event.target.files[0]) {
    setOutputImg(URL.createObjectURL(event.target.files[0]))
  }
 }

 useEffect(() => {
  listAll(imageListRef).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  });
}, []);

  return(
    <div>
        {/* image upload will take the value of the input and to access the file and can access multiple and put them in array */}     
             {outputImg !== "" ? (<img src={outputImg} alt=""/>) : (<></>)}
         <button className='default-button'id="uploadBtn" onClick={uploadFile}> Upload Image</button>
         <div className="displayImages">
         {imageUrls.map((url) => {
           return <img src={url} className="galleryImage" alt="" />;
         })}
         </div>
    </div>
  )
}

export default UploadImage;


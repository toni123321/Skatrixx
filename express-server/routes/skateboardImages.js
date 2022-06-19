const express = require('express')
const router = express.Router()
const SkateboardImage = require('../models/skateboardImage')


async function getSkateboardImage(req, res, next){
    let skateboardImage
    try{
        skateboardImage=await SkateboardImage.findById(req.params.id)
    if(skateboardImage == null){
        return res.status(404).json({message: 'Cannot find skateboardImage'})
    }
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }

    res.skateboardImage=skateboardImage
    next()
}

//get all request of the images (if you add parameter user_id you get images of a specific user)
router.get('/', async(req,res) => {
    try{
        let skateboardImage = null
        const userId = req.query.user_id
        if (userId != null) {
            skateboardImage=await SkateboardImage.find()
            skateboardImage = skateboardImage.filter(skateImage => skateImage.user_id == userId) 
        }
        else{
            skateboardImage=await SkateboardImage.find() 
        }
        res.send(skateboardImage)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
  })
//get only one pic
router.get('/:id', getSkateboardImage, (req,res)=>{
    res.send(res.skateboardImage)
 })
//post an image 
router.post('/',async(req,res)=>{
    const skateboardImage =new SkateboardImage({
        user_id : req.body.user_id,
        dateAdded : req.body.dateAdded,
        image : req.body.image
        
    })

    try{
      const newSkateboardImage=await skateboardImage.save()
      
      res.status(201).json(newSkateboardImage)
    }catch(err){
      res.status(400).json({message: err.message})
    }
})

//delete a post
router.delete('/:id', getSkateboardImage, async (req,res)=>{
    try{
        await res.skateboardImage.remove()
        res.json({message: 'Deleted skateboardImage'})
    }
    catch (err){
        res.status(500).json({message :err.message})
    }
   
})


module.exports = router
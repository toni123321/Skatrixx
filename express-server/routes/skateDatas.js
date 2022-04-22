const express=require('express')
const router=express.Router()
const SkateData=require('../models/skateData')


async function getSkateData(req, res, next){
    let skateData
  try{skateData=await SkateData.findById(req.params.id)
   if(skateData == null){
       return res.status(404).json({message: 'Cannot find skate data'})}}
  catch(err){
     return res.status(500).json({message: err.message})
  }
  res.skateData=skateData
  next()
}

//Get all skate data - polzvai - http://localhost:3000/skateDatas !!!
router.get('/', async(req,res) => {
  try{const skateData=await SkateData.find() 
    res.send(skateData)
  }catch(err){
      res.status(500).json({message: err.message})
  }
})

router.get('/lastRecord', async(req, res) => {
  try {
    const skateData = await SkateData.find().sort({_id:-1}).limit(2);
    res.send(skateData)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})


//Get skate data by ID
router.get('/:id', getSkateData, (req,res)=>{
try
{  res.send(res.skateData)
}catch(err){
   res.status(500).json({message: err.message})
}})

//Post skate data
router.post('/',async(req,res)=>{
  const skateData=new SkateData({
      speed:req.body.speed, height: req.body.height,
      airtime: req.body.airtime,rotation: req.body.rotation,
      accelX: req.body.accelX, accelY: req.body.accelY,
      accelZ: req.body.accelZ, gyroZ: req.body.gyroZ
  })
  try{
    const newSkateData=await skateData.save()
    res.status(201).json(newSkateData)
  }catch(err){
    res.status(400).json({message: err.message})
  }
})




module.exports=router
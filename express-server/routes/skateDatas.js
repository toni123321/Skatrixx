const express=require('express')
const router=express.Router()
const SkateData=require('../models/skateData')
const skateDataService = require('../services/skateDataService')
const SkatePerformance = require('../models/skatePerformance')


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

//Get all skate data
router.get('/', async(req,res) => {
  try{
    const skateData=await SkateData.find().sort({_id:-1});
    res.send(skateData)
  }catch(err){
      res.status(500).json({message: err.message})
  }
})

// Process last performance
router.post('/processLastPerformance', async(req, res) => {
  try {
    const skateData = await SkateData.find().sort({_id:-1});
    const lastPerformance = skateDataService.getLastPerformance(skateData)
    const skatePerformance = new SkatePerformance({
        max_height: lastPerformance.max_height,
        max_airtime: lastPerformance.max_airtime,
        avg_rotationY: lastPerformance.avg_rotationY,
        avg_rotationZ: lastPerformance.avg_rotationZ,
        result: lastPerformance.result
    })
    const newSkatePerformance=await skatePerformance.save()
    res.status(201).json(newSkatePerformance)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

// Get last performance
router.get('/getLastPerformance', async(req, res) => {
  try {
    const skatePerformances = await SkatePerformance.find().sort({_id:-1});
    res.send(skatePerformances[0])
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
      status: req.body.status,
      height: req.body.height,
      airtime: req.body.airtime,
      rotationY:req.body.rotationY,
      rotationZ: req.body.rotationZ,
  })
  try{
    const newSkateData=await skateData.save()
    res.status(201).json(newSkateData)
  }catch(err){
    res.status(400).json({message: err.message})
  }
})




module.exports=router
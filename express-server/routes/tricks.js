const express=require('express')
const router=express.Router()
const TrickData=require('../models/trick')


async function getTrickData(req, res, next) {
    let trickData
    try{
        trickData = await TrickData.findById(req.params.id)
        if (trickData == null) {
            return res.status(404).json({message: 'Cannot find trick data'})
        }
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
    res.trickData = trickData
    next()
}

async function getTricksByDifficulty(req, res, next) {
    let trickData
    try{
        trickData = await TrickData.find({difficulty : req.params.difficulty})
        if (trickData == null) {
            return res.status(404).json({message: 'Cannot find trick data'})
        }
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
    res.trickData = trickData
    next()
}

// Get all skate data - use - http://localhost:3000/tricks !!!

router.get('/', async(req,res) => {
    try{
        const trickData = await TrickData.find() 
        res.send(trickData)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/:difficulty', getTricksByDifficulty,(req, res) => {
    try {
        res.send(res.trickData)
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})

// Get trick data by ID
router.get('/:id', getTrickData, (req, res) => {
    try {  
        res.send(res.trickData)
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})

// Post trick data
router.post('/', async(req, res) => {

    const trickData = new TrickData({
        name: req.body.name,
        xp: req.body.xp,
        videoLink: req.body.videoLink,
        difficulty: req.body.difficulty
    })
    try {
        const newTrickData = await trickData.save()
        res.status(201).json(newTrickData)
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }

})

//Update trick
router.patch('/:id', getTrickData, async(req,res)=>{
    if(req.body.name !=null){
        res.trickData.name=req.body.name
    }
    if(req.body.xp!= null){
        res.trickData.xp=req.body.xp
    }
    if(req.body.videoLink!= null){
        res.trickData.videoLink=req.body.videoLink
    }
    if(req.body.difficulty!= null){
        res.trickData.difficulty=req.body.difficulty
    }
    try{
        const updatedTrick=await res.trickData.save()
        res.json(updatedTrick)
    }catch(err){
         res.status(400).json({message: err.message})
    }
})



module.exports=router
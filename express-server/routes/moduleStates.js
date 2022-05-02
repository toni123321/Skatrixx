const express = require('express')
const router = express.Router()
const moduleState = require('../models/moduleState')
const res = require('express/lib/response')


//Get all moduleStates
router.get('/', async(req,res)=>{
    try{
        const moduleStates=await moduleState.find()
        res.send(moduleStates)
    }catch(err){
        res.status(500).json({message: err.message})
    }
 })


 //Update moduleState start
router.patch('/start',async(req,res)=>{
 
    
    try{
        const moduleStates = await moduleState.findOne().sort({$natural: -1}).limit(1)
        if( moduleStates.isStarted==false){
            moduleStates.isStarted=true
        }
        await  moduleStates.save() 
        res.status(201).json(moduleStates)
    }catch(err){
         res.status(400).json({message: err.message})
    }
})

 //Update moduleState finish
 router.patch('/finish',async(req,res)=>{
 
    try{
        const moduleStates = await moduleState.findOne().sort({$natural: -1}).limit(1)
        if( moduleStates.isStarted==true){
            moduleStates.isStarted=false
        }
        await  moduleStates.save()      
        res.status(201).json(moduleStates)
    }catch(err){
         res.status(400).json({message: err.message})
    }
})
 
//Post user 
// router.post('/',async(req,res)=>{
//     const mOduleState=new moduleState({
//         isStarted: req.body.isStarted
//     })
//     try{
//       const newModuleState=await mOduleState.save()
//       res.status(201).json(newModuleState)
//     }catch(err){
//       res.status(400).json({message: err.message})
//     }
// })







module.exports=router
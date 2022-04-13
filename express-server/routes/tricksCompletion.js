const express=require('express')
const router=express.Router()
const MyTricks=require('../models/mytricks')

async function getMyTricks(req, res, next) {
    let mytricks
    try{
        mytricks = await MyTricks.find({user_id : req.params.user_id}, {trick_id : req.params.trick_id})
        if (mytricks == null) {
            //post request
            return res.status(404).json({message: 'Cannot find my trick'})
        }
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
    res.mytricks = mytricks
    next() 

}


router.get('/', getMyTricks,(req,res) => {
    try{
        res.send(res.mytricks)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


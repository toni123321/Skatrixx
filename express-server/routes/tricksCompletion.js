const express=require('express')
const router=express.Router()
const MyTricks=require('../models/mytricks')

async function getMyTricks(req, res, next) {
    let mytricks
    try{
        mytricks = await MyTricks.find({user_id : req.params.user_id}, {trick_id : req.params.trick_id}, {isSkate : req.params.isSkate})
        if (mytricks == null) {
            //post request
            router.post(async(res) => {
                var mytrick = {user_id: req.params.user_id, trick_id : req.params.trick_id, isSkate : req.params.isSkate}
                try {
                    await mytrick.save()
                    
                    //claim Badge for First success on this trick

                    const newMyTrick = "First success on this trick!"
                    res.status(201).json(newMyTrick)
                }
                catch(err) {
                    res.status(400).json({message: err.message})
                }
            })

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


router.post('/', async(req, res) => {

    const mytricks = new MyTricks({
        user_id: req.body.user_id,
        trick_id: req.body.trick_id,
        isSkate: req.body.isSkate
    })
    try {
        const newMyTrick = await mytricks.save()
        res.status(201).json(newMyTrick)
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
})





module.exports=router
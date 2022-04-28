const e = require('cors')
const express = require('express')
const router = express.Router()
const MyTricks = require('../models/mytricks')

router.get('/', async(req,res) => {
    //counting them
    try{
            const query = {user_id : req.body.user_id,
            trick_id : req.body.trick_id,
            isSkate : req.body.isSkate}

            const count = await MyTricks.countDocuments(query)

            let response
            if(count == 1){
                response = "User claimed badge for *1 trick"
            }
            else if(count == 10){
                response = "User claimed badge for *10 trick"
            }
            else{
                response = count
            }
        
        res.send(response)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

router.post('/', async(req, res) => {

    const mytrick = new MyTricks({
        user_id: req.body.user_id,
        trick_id: req.body.trick_id,
        isSkate: req.body.isSkate
    })
    try{
        const newMyTrick = await mytrick.save()
        res.status(201).json(newMyTrick)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})



module.exports=router
const express = require('express')
const router = express.Router()
const MyTricks = require('../models/mytricks')
const { getMyTricks, post, checkAchievement } = require('../services/trickAchievementService')

router.get('/', getMyTricks,(req,res) => {
    try{
        res.send(res.mytricks)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

router.post('/', post,(req, res) => {

    try {
        res.send(res.mytricks)
    }
    catch(err) {
        res.status(400).json({message: err.message})
    }
})

router.get('/achievement', checkAchievement,(req,res) => {

})



module.exports=router
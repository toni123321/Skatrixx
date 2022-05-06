const express = require('express')
const router = express.Router()
const Consistency = require('../models/consistency')


router.get('/', async(req, res) => {
    const query = {
        user_id: req.body.user_id
    }

    let response
    try{
        const consistency = await Consistency.find(query)
        const length = consistency[0].loginDate.length
        if(length == 7){
            response = "7 days in a row"
        }
        else{
            response = length.toString()
        }
        

        res.status(201).json(response)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

router.post('/', async(req, res) => {

    const formatted = Date.now()
    //const formatted = dt.format("%Y-%m-%d")

    const consistency = new Consistency({
        user_id: req.body.user_id
    })

    consistency.loginDate.push(formatted)
    
    try{
        const newConsistency = await consistency.save()
        res.status(201).json(newConsistency)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

router.put('/', async(req, res) => {

    const formatted = new Date(Date.now())

    const query = {
        user_id: req.body.user_id
    }
    try{
        const consistency = await Consistency.find(query)
        let lastDate = consistency[0].loginDate[consistency[0].loginDate.length-1]
        lastDate.setDate(lastDate.getDate()+1)
        //console.log(lastDate.getHours())
        if(lastDate.getDate() == formatted.getDate()){
            consistency[0].loginDate.push(formatted)
            res.status(201).json(consistency)
        }
        else{
            consistency[0].loginDate.length = 0
            consistency[0].loginDate.push(formatted)
            
            res.status(201).json(consistency)
        }
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router
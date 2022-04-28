const express = require('express')
const router = express.Router()
const Consistency = require('../models/consistency')


router.get('/', async(req, res) => {
    const query = {
        user_id: req.body.user_id
    }

    try{
        const consistency = await Consistency.find(query)
        const newDate = consistency[0].loginDate[consistency[0].loginDate.length-1]
        newDate.setDate(newDate.getDate()+1)

        res.status(201).json(newDate)
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

    /*const dt = dateTime.create();
    const formatted = dt.format('Y-m-d');*/
    const formatted = Date.now()
    
    const query = {
        user_id: req.body.user_id
    }
    try{
        const consistency = await Consistency.find(query)
        const lastDate = consistency.loginDate.last()
        lastDate.setDate(lastDate.getDate()+1)
        if(lastDate == formatted){
            consistency.loginDate.push(formatted)
            res.status(201).json(consistency)
        }
        else{
            consistency.loginDate.length = 0
            consistency.loginDate.push(formatted)
            
            res.status(201).json(consistency)
        }
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router